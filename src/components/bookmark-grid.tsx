'use client'

import { useOptimistic, startTransition } from 'react'
import { Tables } from '@/types/supabase'
import { BookmarkCard } from '@/components/bookmark-card'
import { BookmarkForm } from '@/components/bookmark-form'
import { addBookmark, deleteBookmark } from '@/app/dashboard/actions'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { useRealtimeBookmarks } from '@/hooks/use-realtime-bookmarks'
import { BookmarkIcon } from 'lucide-react'

interface BookmarkGridProps {
    initialBookmarks: Tables<'bookmarks'>[]
}

export function BookmarkGrid({ initialBookmarks }: BookmarkGridProps) {
    useRealtimeBookmarks()

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

        const tempId = crypto.randomUUID()
        const newBookmark: Tables<'bookmarks'> = {
            id: tempId,
            user_id: '',
            url: url,
            title: url,
            meta_image: null,
            meta_favicon: null,
            category: 'Favourites',
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
        <div className="space-y-6">
            <BookmarkForm onAddBookmark={handleAddBookmark} />

            {optimisticBookmarks.length === 0 ? (
                <div className="text-center py-16 px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-primary/10 mb-3">
                        <BookmarkIcon className="h-8 w-8 text-primary/60" />
                    </div>
                    <h3 className="text-base font-medium mb-1">No bookmarks yet</h3>
                    <p className="text-sm text-muted-foreground">Add your first bookmark above to get started</p>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
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
            )}
        </div>
    )
}
