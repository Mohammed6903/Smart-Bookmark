import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from '@/app/auth/actions'
import { BookmarkIcon, Zap, Shield, Layers, ArrowRight, Search, Sparkles } from 'lucide-react'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-10 border-b border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
              <BookmarkIcon className="h-4 w-4" />
            </div>
            <span className="font-bold text-lg">Smart Bookmark</span>
          </div>
          <form action={signInWithGoogle}>
            <Button variant="outline" size="sm" className="border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all" type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pt-20 md:pt-32 md:pb-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs sm:text-sm text-primary mb-6 sm:mb-8 animate-fade-in-up">
            {/* <Sparkles className="h-3.5 w-3.5" /> */}
            Built with Next.js, Supabase &amp; Real-time Sync
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-4 sm:mb-6 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
            Save it.
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Find it. Fast.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            A modern bookmark manager with instant search, category organization, and beautiful previews. Your links, perfectly organized.
          </p>

          <form action={signInWithGoogle} className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all" type="submit">
              <svg
                className="mr-2 h-5 w-5"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Get Started with Google
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
        <div className="perspective-[2000px]">
          <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30 transform rotate-x-2 hover:rotate-x-0 transition-transform duration-700 ease-out">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-card/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-muted/30 text-xs text-muted-foreground/60 flex items-center gap-1.5 max-w-xs w-full justify-center">
                  <Search className="h-3 w-3" />
                  smart-bookmark-sable.vercel.app/
                </div>
              </div>
            </div>
            {/* Screenshot */}
            <img
              src="/bookmark_preview.png"
              alt="Smart Bookmark Manager Dashboard"
              className="w-full h-auto block"
            />
          </div>
        </div>
        {/* Glow under the preview */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Everything you need</h2>
          <p className="text-muted-foreground">Simple, fast, and thoughtfully designed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: Zap,
              title: "Real-time Sync",
              desc: "Changes appear instantly across all your sessions with Supabase real-time."
            },
            {
              icon: Layers,
              title: "Smart Categories",
              desc: "Organize bookmarks into custom categories with automatic metadata extraction."
            },
            {
              icon: Shield,
              title: "Secure & Private",
              desc: "Row-level security ensures only you can access your bookmarks."
            }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group p-5 sm:p-6 rounded-xl border border-border/40 bg-card/30 hover:bg-card/60 hover:border-border/60 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/30 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookmarkIcon className="h-3.5 w-3.5" />
            Smart Bookmark
          </div>
          <p className="text-xs text-muted-foreground/60">
            Built with Next.js, Supabase, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
