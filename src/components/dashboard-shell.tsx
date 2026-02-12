'use client'

import { useState, useOptimistic, startTransition, useMemo } from 'react'
import { Tables } from '@/types/supabase'
import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'
import { BookmarkForm } from '@/components/bookmark-form'
import { BookmarkCard } from '@/components/bookmark-card'
import { addBookmark, deleteBookmark } from '@/app/dashboard/actions'
import { AnimatePresence, motion } from 'framer-motion'
import { toast } from 'sonner'
import { useRealtimeBookmarks } from '@/hooks/use-realtime-bookmarks'
import { BookmarkIcon } from 'lucide-react'

interface DashboardShellProps {
    initialBookmarks: Tables<'bookmarks'>[]
    user: {
        email?: string
        user_metadata?: {
            avatar_url?: string
            full_name?: string
        }
    }
}

export function DashboardShell({ initialBookmarks, user }: DashboardShellProps) {
    useRealtimeBookmarks()

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

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

    const filteredBookmarks = useMemo(() => {
        let result = optimisticBookmarks

        if (selectedCategory) {
            result = result.filter((b) => (b.category || 'Favourites') === selectedCategory)
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase()
            result = result.filter(
                (b) =>
                    b.title.toLowerCase().includes(q) ||
                    b.url.toLowerCase().includes(q) ||
                    (b.category || '').toLowerCase().includes(q)
            )
        }

        return result
    }, [optimisticBookmarks, selectedCategory, searchQuery])

    const handleAddBookmark = async (formData: FormData) => {
        const url = formData.get('url') as string
        const title = (formData.get('title') as string)?.trim() || url
        const category = (formData.get('category') as string)?.trim() || 'Favourites'

        const tempId = crypto.randomUUID()
        const newBookmark: Tables<'bookmarks'> = {
            id: tempId,
            user_id: '',
            url: url,
            title: title,
            category: category,
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

    const displayTitle = selectedCategory || 'All Bookmarks'

    return (
        <>
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <Sidebar
                    bookmarks={optimisticBookmarks}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header
                        user={user}
                        title={displayTitle}
                        count={filteredBookmarks.length}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />

                    <main className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6 max-w-full">
                            {/* Form */}
                            <BookmarkForm onAddBookmark={handleAddBookmark} />

                            {/* Grid */}
                            {filteredBookmarks.length === 0 ? (
                                <div className="text-center py-20 px-4">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-muted/50 mb-4">
                                        <BookmarkIcon className="h-8 w-8 text-muted-foreground/40" />
                                    </div>
                                    <h3 className="text-base font-medium mb-1">
                                        {searchQuery ? 'No results found' : selectedCategory ? `No bookmarks in "${selectedCategory}"` : 'No bookmarks yet'}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {searchQuery ? 'Try a different search term' : 'Add your first bookmark above to get started'}
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredBookmarks.map((bookmark) => (
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
                    </main>
                </div>
            </div>
        </>
    )
}
