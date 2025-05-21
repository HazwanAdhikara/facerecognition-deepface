import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Code, Layers, SlidersHorizontal } from "lucide-react";
import faceRecognitionImg from "../../public/facerecognition.jpg";
import { ThemeToggle } from "../components/theme-toggle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col mx-auto max-w-screen-xl">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Layers className="h-6 w-6" />
            <span className="text-xl font-bold">CerminRupa</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/teams"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground gap-1"
            >
              <Code className="h-4 w-4" />
              <span>Developers</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Cari Kembaran Yuk!
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl font-light/relaxed">
                    Penasaran untuk mencari kembaran Anda di dunia ini? Kami
                    dapat membantu anda menemukannya dengan persentase kemiripan
                    wajah dengan presisi.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/compare">
                    <button className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90 px-4 py-3 text-md font-bold gap-1">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="relative mx-auto aspect-video w-full max-w-[600px] overflow-hidden rounded-xl border bg-muted/50 lg:aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-full w-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-transparent to-background/80" />
                    <Image
                      src={faceRecognitionImg || "/placeholder.svg"}
                      alt="Image comparison example"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  CerminRupa Comparison Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our tools make image comparison simple, accurate, and
                  insightful.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <SlidersHorizontal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Side-by-Side Comparison</h3>
                <p className="text-center text-muted-foreground">
                  Compare images with an interactive slider to easily spot
                  differences between before and after.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Pixel-Perfect Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Analyze images at the pixel level with advanced tools to
                  highlight even the smallest differences.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Developer API</h3>
                <p className="text-center text-muted-foreground">
                  Integrate our comparison tools into your workflow with our
                  comprehensive API and SDK.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[800px]">
              <p className="text-xl italic text-muted-foreground">
                "Comparison is the root cause of all evil. Why compare when no
                two people are alike?"
              </p>
              <p className="text-sm text-muted-foreground">― Haresh Sippy</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
