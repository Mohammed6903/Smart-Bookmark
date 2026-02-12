'use client'

import { useOptimistic, startTransition } from 'react'
import { Tables } from '@/types/supabase'
import { BookmarkCard } from '@/components/bookmark-card'
import { BookmarkForm } from '@/components/bookmark-form'
import { addBookmark, deleteBookmark } from '@/app/dashboard/actions'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { useRealtimeBookmarks } from '@/hooks/use-realtime-bookmarks'

interface BookmarkGridProps {
    initialBookmarks: Tables<'bookmarks'>[]
}

export function BookmarkGrid({ initialBookmarks }: BookmarkGridProps) {
    useRealtimeBookmarks() // Enable realtime sync

    const [optimisticBookmarks, setOptimisticBookmarks] = useOptimistic(
        initialBookmarks,
        (state, action: { type: 'add' | 'delete'; payload: any }) => {
            if (action.type === 'add') {
                return [action.payload, ...state]
            } else if (action.type === 'delete') {
                return state.filter((b) => b.id !== action.payload)
            }
            return state
        }
    )

    const handleAddBookmark = async (formData: FormData) => {
        const url = formData.get('url') as string

        // Add optimistic bookmark
        const tempId = crypto.randomUUID()
        const newBookmark: Tables<'bookmarks'> = {
            id: tempId,
            user_id: '', // Not needed for display
            url: url,
            title: url, // Temporary title
            meta_image: null,
            meta_favicon: null,
            created_at: new Date().toISOString(),
        }

        startTransition(() => {
            setOptimisticBookmarks({ type: 'add', payload: { ...newBookmark, isPending: true } })
        })

        const result = await addBookmark(formData)

        if (!result.success) {
            toast.error(result.error)
        } else {
            toast.success("Bookmark added")
        }
    }

    const handleDeleteBookmark = async (id: string) => {
        startTransition(() => {
            setOptimisticBookmarks({ type: 'delete', payload: id })
        })
        const result = await deleteBookmark(id)
        if (!result.success) {
            toast.error(result.error)
        } else {
            toast.success("Bookmark deleted")
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <BookmarkForm onAddBookmark={handleAddBookmark} />
            </div>

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                <AnimatePresence mode='popLayout'>
                    {optimisticBookmarks.map((bookmark) => (
                        <BookmarkCard
                            key={bookmark.id}
                            bookmark={bookmark}
                            onDelete={handleDeleteBookmark}
                            isPending={(bookmark as any).isPending}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {optimisticBookmarks.length === 0 && (
                <div className="text-center text-muted-foreground py-10">
                    No bookmarks yet. Add one above!
                </div>
            )}
        </div>
    )
}
