# Smart Bookmark Manager

A production-grade, real-time bookmark manager built with **Next.js 14 (App Router)**, **Supabase**, **Tailwind CSS**, and **framer-motion**.

## Features

- **Authentication**: secure Google OAuth via Supabase Auth.
- **Smart Metadata**: Automatically fetches title, image, and favicon from URLs.
- **Optimistic UI**: Instant feedback for adding/deleting bookmarks.
- **Real-Time Sync**: Updates instantly across multiple tabs/devices using Supabase Realtime.
- **Responsive Design**: Mobile-friendly grid layout with dark/light mode.
- **Security**: Row Level Security (RLS) ensures users only access their own data.

## Tech Stack

- **Framework**: Next.js 14 (App Router, Server Actions)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: lucide-react
- **Animations**: framer-motion
- **State**: React Hooks + Server Actions + Supabase Realtime

## Setup

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
   ```

3. **Database Setup**
   Run the migration to create the schema:
   ```bash
   npx supabase db push
   ```

## Architecture & Security

### Row Level Security (RLS)
The `bookmarks` table has RLS enabled with a strict policy:
```sql
CREATE POLICY "Users manage own bookmarks"
  ON public.bookmarks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```
This ensures that even if API endpoints are exposed, users can never read or modify another user's data.

### Real-Time Strategy
We use a hybrid approach for the smoothest UX:
1. **Optimistic UI**: The client immediately updates the UI (via `useOptimistic`) when a user performs an action.
2. **Server Actions**: The mutation is sent to the server.
3. **Realtime Subscription**: A `useEffect` hook listens for `postgres_changes` events from Supabase.
4. **Revalidation**: When an event (INSERT/DELETE) occurs, `router.refresh()` is triggered to reload the Server Component payload, ensuring all clients stay in sync with the database source of truth.

### Metadata Fetching
Metadata is fetched server-side in the `addBookmark` action using `fetch` and `cheerio`. This avoids CORS issues and hides the logic from the client.
