'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

interface BookmarkFormProps {
    onAddBookmark: (formData: FormData) => Promise<void>
}

export function BookmarkForm({ onAddBookmark }: BookmarkFormProps) {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                const url = formData.get('url') as string
                if (!url) {
                    toast.error("Please enter a URL")
                    return
                }
                // Basic sync validation
                try {
                    new URL(url)
                } catch {
                    toast.error("Invalid URL format")
                    return
                }

                formRef.current?.reset()
                await onAddBookmark(formData)
            }}
            className="flex w-full max-w-lg items-center space-x-2"
        >
            <Input
                type="url"
                name="url"
                placeholder="https://example.com"
                required
                className="flex-1"
                autoComplete="off"
            />
            <Button type="submit">
                <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
        </form>
    )
}
