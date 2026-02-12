import { createClient } from '@/lib/supabase/server'
import { DashboardShell } from '@/components/dashboard-shell'

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

    const { data: { user } } = await supabase.auth.getUser()

    return <DashboardShell initialBookmarks={bookmarks ?? []} user={user!} />
}
