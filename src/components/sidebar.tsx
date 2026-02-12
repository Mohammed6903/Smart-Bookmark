'use client'

import { BookmarkIcon, LayoutDashboard, Folder, Heart } from 'lucide-react'
import { Tables } from '@/types/supabase'
import { cn } from '@/lib/utils'

interface SidebarProps {
    bookmarks: Tables<'bookmarks'>[]
    selectedCategory: string | null
    onSelectCategory: (category: string | null) => void
}

const CATEGORY_COLORS: Record<string, string> = {
    'Favourites': 'text-pink-400',
    'Work': 'text-blue-400',
    'Inspiration': 'text-purple-400',
    'Research': 'text-emerald-400',
    'Projects': 'text-amber-400',
    'Learning': 'text-cyan-400',
    'News': 'text-orange-400',
    'Entertainment': 'text-rose-400',
}

function getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category] || 'text-muted-foreground'
}

export function Sidebar({ bookmarks, selectedCategory, onSelectCategory }: SidebarProps) {
    // Count bookmarks per category
    const categoryCounts = bookmarks.reduce<Record<string, number>>((acc, b) => {
        const cat = b.category || 'Favourites'
        acc[cat] = (acc[cat] || 0) + 1
        return acc
    }, {})

    const categories = Object.entries(categoryCounts).sort(([a], [b]) => a.localeCompare(b))

    return (
        <aside className="w-64 flex-shrink-0 border-r border-border/50 bg-card/30 flex flex-col">
            {/* Logo */}
            <div className="p-5 border-b border-border/50">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                        <BookmarkIcon className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-base">Smart Bookmark</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                <button
                    onClick={() => onSelectCategory(null)}
                    className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        selectedCategory === null
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                >
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                </button>

                <div className="pt-4 pb-1 px-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        Categories
                    </p>
                </div>

                {categories.map(([category, count]) => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                            selectedCategory === category
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                        )}
                    >
                        <div className="flex items-center gap-2.5">
                            <Folder className={cn("h-4 w-4", getCategoryColor(category))} />
                            <span>{category}</span>
                        </div>
                        <span className={cn(
                            "text-xs tabular-nums px-1.5 py-0.5 rounded-md",
                            selectedCategory === category
                                ? "bg-primary/20 text-primary"
                                : "bg-muted/50 text-muted-foreground/70"
                        )}>
                            {count}
                        </span>
                    </button>
                ))}
            </nav>
        </aside>
    )
}
