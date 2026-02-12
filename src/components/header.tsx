'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import { Search, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
    onMenuClick?: () => void
}

export function Header({ user, title, count, searchQuery, onSearchChange, onMenuClick }: HeaderProps) {
    return (
        <header className="h-14 border-b border-border/50 bg-background flex items-center justify-between px-3 sm:px-6 flex-shrink-0 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-8 w-8 flex-shrink-0"
                    onClick={onMenuClick}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
                <span className="text-sm text-muted-foreground flex-shrink-0">({count})</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search bookmarks..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-8 w-36 md:w-48 rounded-md border border-border/50 bg-muted/30 pl-9 pr-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/30 transition-colors"
                    />
                </div>
                <ThemeToggle />
                <UserNav user={user} />
            </div>
        </header>
    )
}
