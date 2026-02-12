'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'

interface BookmarkFormProps {
    onAddBookmark: (formData: FormData) => Promise<void>
}

export function BookmarkForm({ onAddBookmark }: BookmarkFormProps) {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                const url = formData.get('url') as string
                if (!url) {
                    toast.error("Please enter a URL")
                    return
                }
                try {
                    new URL(url)
                } catch {
                    toast.error("Invalid URL format")
                    return
                }

                formRef.current?.reset()
                await onAddBookmark(formData)
            }}
            className="w-full rounded-xl border border-border/50 bg-card/50 p-4 space-y-3"
        >
            <Input
                type="url"
                name="url"
                placeholder="Paste URL to save..."
                required
                className="h-11 text-sm bg-muted/30 border-border/40 focus:border-primary/50 placeholder:text-muted-foreground/50"
            />
            <div className="flex gap-3">
                <Input
                    type="text"
                    name="title"
                    placeholder="Optional Title..."
                    className="h-10 text-sm bg-muted/30 border-border/40 focus:border-primary/50 placeholder:text-muted-foreground/50 flex-1"
                />
                <Input
                    type="text"
                    name="category"
                    placeholder="Category..."
                    className="h-10 text-sm bg-muted/30 border-border/40 focus:border-primary/50 placeholder:text-muted-foreground/50 w-44"
                />
                <Button type="submit" className="h-10 px-5 gap-2 font-medium shadow-sm">
                    <Plus className="h-4 w-4" />
                    Save Bookmark
                </Button>
            </div>
        </form>
    )
}
