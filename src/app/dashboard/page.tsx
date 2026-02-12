import { createClient } from '@/lib/supabase/server'
import { BookmarkGrid } from '@/components/bookmark-grid'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
    const supabase = await createClient()

    const { data: bookmarks, error } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching bookmarks:', error)
    }

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">My Bookmarks</h2>
            <BookmarkGrid initialBookmarks={bookmarks ?? []} />
        </div>
    )
}
