'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export function useRealtimeBookmarks() {
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const channel = supabase
            .channel('realtime-bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                () => {
                    router.refresh()
                }
            )
            .subscribe((status) => {
                if (status === 'SUBSCRIBED') {
                    // Optional: console.log('Ready to receive realtime events')
                }
            })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, router])
}
