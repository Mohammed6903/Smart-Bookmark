import { createClient } from '@/lib/supabase/server'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'
import { BookmarkIcon } from 'lucide-react'
import Link from 'next/link'

export async function Header() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
                    <BookmarkIcon className="h-6 w-6" />
                    <span className="hidden font-bold sm:inline-block">
                        Smart Bookmarks
                    </span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <ThemeToggle />
                    {user && <UserNav user={user} />}
                </div>
            </div>
        </header>
    )
}
