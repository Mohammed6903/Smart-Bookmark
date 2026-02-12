'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tables } from '@/types/supabase'
import { Trash2, ExternalLink, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

const BADGE_COLORS: Record<string, string> = {
    'Favourites': 'bg-pink-500/15 text-pink-400 border-pink-500/20',
    'Work': 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    'Inspiration': 'bg-purple-500/15 text-purple-400 border-purple-500/20',
    'Research': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    'Projects': 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    'Learning': 'bg-cyan-500/15 text-cyan-400 border-cyan-500/20',
    'News': 'bg-orange-500/15 text-orange-400 border-orange-500/20',
    'Entertainment': 'bg-rose-500/15 text-rose-400 border-rose-500/20',
}

function getBadgeColor(category: string): string {
    return BADGE_COLORS[category] || 'bg-muted text-muted-foreground border-border/50'
}

interface BookmarkCardProps {
    bookmark: Tables<'bookmarks'>
    onDelete: (id: string) => void
    isPending?: boolean
}

export function BookmarkCard({ bookmark, onDelete, isPending }: BookmarkCardProps) {
    const category = bookmark.category || 'Favourites'

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.15 }}
            className="h-full"
        >
            <Card className={`h-full flex flex-col overflow-hidden group border border-border/40 hover:border-border/70 hover:shadow-lg transition-all duration-200 ${isPending ? 'opacity-60' : ''}`}>
                {/* Image */}
                <div className="relative w-full h-36 bg-muted/20 overflow-hidden">
                    {bookmark.meta_image ? (
                        <img
                            src={bookmark.meta_image}
                            alt={bookmark.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10">
                            <Globe className="h-10 w-10 text-muted-foreground/20" />
                        </div>
                    )}
                    {/* Hover actions overlay */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-destructive hover:text-destructive-foreground shadow-sm"
                            onClick={() => onDelete(bookmark.id)}
                            disabled={isPending}
                        >
                            <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-primary hover:text-primary-foreground shadow-sm"
                            asChild
                        >
                            <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <CardContent className="flex-1 flex flex-col p-4">
                    <div className="flex items-start gap-2 mb-1.5">
                        {bookmark.meta_favicon ? (
                            <img
                                src={bookmark.meta_favicon}
                                alt=""
                                className="w-4 h-4 rounded flex-shrink-0 mt-0.5"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                }}
                            />
                        ) : (
                            <Globe className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                        )}
                        <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors" title={bookmark.title}>
                            {bookmark.title}
                        </h3>
                    </div>

                    <p className="text-xs text-muted-foreground/60 truncate mb-3" title={bookmark.url}>
                        {new URL(bookmark.url).hostname.replace('www.', '')}
                    </p>

                    <div className="mt-auto">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getBadgeColor(category)}`}>
                            {category}
                        </span>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
