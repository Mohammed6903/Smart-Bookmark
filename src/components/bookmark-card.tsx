'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import { Trash2, ExternalLink, Globe } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BookmarkCardProps {
    bookmark: Tables<'bookmarks'>
    onDelete: (id: string) => void
    isPending?: boolean
}

export function BookmarkCard({ bookmark, onDelete, isPending }: BookmarkCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            transition={{ duration: 0.2 }}
            className="h-full"
        >
            <Card className={`h-full flex flex-col overflow-hidden group ${isPending ? 'opacity-70' : ''}`}>
                <div className="relative w-full h-32 bg-muted">
                    {bookmark.meta_image ? (
                        <img
                            src={bookmark.meta_image} // using standard img for external URLs to avoid Next.js Image config complexity for arbitrary domains
                            alt={bookmark.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                            <Globe className="h-10 w-10 text-muted-foreground/50" />
                        </div>
                    )}
                </div>

                <CardContent className="flex-1 p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2 overflow-hidden">
                            {bookmark.meta_favicon ? (
                                <img
                                    src={bookmark.meta_favicon}
                                    alt=""
                                    className="w-4 h-4 rounded-sm"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none'
                                    }}
                                />
                            ) : (
                                <Globe className="w-4 h-4 text-muted-foreground" />
                            )}
                            <h3 className="font-semibold truncate text-sm leading-tight" title={bookmark.title}>
                                {bookmark.title}
                            </h3>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate" title={bookmark.url}>
                        {bookmark.url}
                    </p>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex justify-between items-center bg-card">
                    <span className="text-[10px] text-muted-foreground">
                        {new Date(bookmark.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => onDelete(bookmark.id)}
                            disabled={isPending}
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                <span className="sr-only">Open</span>
                            </a>
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
