import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookmarkIcon, Globe, Shield, Sparkles, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signInWithGoogle } from './actions'

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        redirect('/dashboard')
    }

    return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center p-4">
        {/* Hero Section */}
        <div className="max-w-6xl w-full mx-auto text-center space-y-8 mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 animate-fade-in-up">
            {/* <Sparkles className="h-4 w-4 text-primary mr-2" /> */}
            <span className="text-sm font-medium">Built with Next.js & Supabase</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Your Bookmarks,
            <br />
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Beautifully Organized
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Save, organize, and access your favorite links from anywhere.
            Lightning fast, secure, and elegantly simple.
          </p>
        </div>

        {/* Sign In Card */}
        <Card className="w-full max-w-md shadow-2xl border-primary/10 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg animate-float">
              <BookmarkIcon className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold mb-2">Get Started</CardTitle>
              <CardDescription className="text-base">
                Sign in with Google to start organizing your bookmarks
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <form action={signInWithGoogle}>
              <Button className="w-full h-12 text-lg shadow-lg hover:shadow-xl transition-all duration-300" size="lg" type="submit">
                <svg
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Sign in with Google
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Instantly save and retrieve bookmarks with optimized performance and real-time sync
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Your data is encrypted and protected with enterprise-grade security powered by Supabase
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Access Anywhere</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Access your bookmarks from any device, anytime with cloud synchronization
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
