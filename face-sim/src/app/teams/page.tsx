import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import hazwanImg from "../../img/hazwan.JPEG";
import rafaImg from "../../img/rafa.png";

export default function DevelopersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Our Developers</h1>
      <p className="text-muted-foreground mb-12">
        The talented team behind CerminRupa
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Developer 1 */}
        <div className="group relative overflow-hidden rounded-xl bg-background border shadow-sm transition-all hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={hazwanImg || "/placeholder.svg"}
              alt="Developer 1"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <h2 className="text-2xl font-bold text-white mb-1">
                Hazwan Adhikara Nasution
              </h2>
              <p className="text-white/80 mb-4">Lead Developer</p>
              <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Navigating the World of Software Engineering & AI | Passionate
                Learner | Second Year Undergraduate Information Technology
                Student at Institut Teknologi Sepuluh Nopember.
              </p>
              <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href="https://github.com/HazwanAdhikara"
                  className="text-white hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/hazwanadh/"
                  className="text-white hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Developer 2 */}
        <div className="group relative overflow-hidden rounded-xl bg-background border shadow-sm transition-all hover:shadow-md">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={rafaImg || "/placeholder.svg"}
              alt="Developer 2"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform">
              <h2 className="text-2xl font-bold text-white mb-1">
                Rafael Gunawan
              </h2>
              <p className="text-white/80 mb-4">UI/UX Developer</p>
              <p className="text-white/90 mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                Frontend specialist with a background in design. Focuses on
                creating beautiful, accessible interfaces and smooth user
                experiences.
              </p>
              <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link
                  href="https://github.com/kokonz"
                  className="text-white hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/rafaelgun/"
                  className="text-white hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
