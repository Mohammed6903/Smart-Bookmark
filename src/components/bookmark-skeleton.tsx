import { Skeleton } from '@/components/ui/skeleton'

export function BookmarkSkeleton() {
    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-col items-center space-y-4">
                {/* Favicon + Title line */}
                <div className="flex w-full items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
                {/* URL / Meta Image area */}
                <Skeleton className="h-32 w-full rounded-md" />
            </div>
        </div>
    )
}
