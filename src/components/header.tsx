'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import { Search } from 'lucide-react'

interface HeaderProps {
    user: {
        email?: string
        user_metadata?: {
            avatar_url?: string
            full_name?: string
        }
    }
    title: string
    count: number
    searchQuery: string
    onSearchChange: (query: string) => void
}

export function Header({ user, title, count, searchQuery, onSearchChange }: HeaderProps) {
    return (
        <header className="h-14 border-b border-border/50 bg-background flex items-center justify-between px-6 flex-shrink-0">
            <div className="flex items-center gap-3">
                <h1 className="text-lg font-semibold">{title}</h1>
                <span className="text-sm text-muted-foreground">({count})</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-8 w-48 rounded-md border border-border/50 bg-muted/30 pl-9 pr-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-colors"
                    />
                </div>
                <ThemeToggle />
                <UserNav user={user} />
            </div>
        </header>
    )
}
