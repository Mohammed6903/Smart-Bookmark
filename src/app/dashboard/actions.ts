'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import * as cheerio from 'cheerio'

export async function addBookmark(formData: FormData) {
    const url = formData.get('url') as string
    if (!url) {
        return { success: false, error: 'URL is required' }
    }

    let title = url
    let meta_image = null
    let meta_favicon = null

    try {
        // 1. Fetch metadata
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000) // 5s timeout

        const response = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
            signal: controller.signal,
            next: { revalidate: 3600 },
        })
        clearTimeout(timeoutId)

        if (response.ok) {
            const html = await response.text()
            const $ = cheerio.load(html)

            title =
                $('meta[property="og:title"]').attr('content') ||
                $('title').text() ||
                url
            meta_image =
                $('meta[property="og:image"]').attr('content') ||
                $('meta[name="twitter:image"]').attr('content') ||
                null

            // Simple favicon extraction
            let faviconHref =
                $('link[rel="icon"]').attr('href') ||
                $('link[rel="shortcut icon"]').attr('href') ||
                null

            if (faviconHref) {
                if (!faviconHref.startsWith('http')) {
                    const urlObj = new URL(url)
                    meta_favicon = `${urlObj.protocol}//${urlObj.host}${faviconHref.startsWith('/') ? '' : '/'
                        }${faviconHref}`
                } else {
                    meta_favicon = faviconHref
                }
            } else {
                const urlObj = new URL(url)
                meta_favicon = `${urlObj.protocol}//${urlObj.host}/favicon.ico`
            }
        }
    } catch (err) {
        console.warn('Metadata fetch failed, falling back to defaults:', err)
        // Fallback to Google Favicon service if direct fetch fails
        try {
            const urlObj = new URL(url)
            meta_favicon = `https://www.google.com/s2/favicons?domain=${urlObj.hostname}&sz=128`
        } catch {
            // ignore invalid URL parsing
        }
    }

    try {
        // 2. Insert into DB
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            return { success: false, error: 'Unauthorized' }
        }

        const { error } = await supabase.from('bookmarks').insert({
            url,
            title,
            meta_image,
            meta_favicon,
            user_id: user.id,
        })

        if (error) {
            console.error('Database Error:', error)
            return { success: false, error: 'Failed to save bookmark' }
        }

        revalidatePath('/dashboard')
        return { success: true }
    } catch (err) {
        console.error('Add Bookmark Error:', err)
        return { success: false, error: 'Failed to add bookmark. Please try again.' }
    }
}

export async function deleteBookmark(id: string) {
    const supabase = await createClient()
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)

    if (error) {
        console.error('Delete Error:', error)
        return { success: false, error: 'Failed to delete bookmark' }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
