import Image from "next/image";
import Link from "next/link";
<<<<<<< Updated upstream
import { Github, Linkedin, Layers, Code } from "lucide-react"; 
import hazwanImg from "../../img/hazwan.JPEG"; 
import rafaImg from "../../img/rafa.png"; 

const AppHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/90 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Back to Homepage">
          <Layers className="h-6 w-6 text-sky-400" />
          <span className="text-xl font-bold text-white">CerminRupa</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#" 
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {}
          <Link
            href="/teams" 
            className="inline-flex items-center justify-center rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-300 shadow-sm hover:bg-gray-700 hover:text-white gap-1.5 transition-colors"
          >
            <Code className="h-4 w-4" />
            <span>Developers</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

=======
import { Github, Linkedin } from "lucide-react";
import hazwanImg from "../../img/hazwan.jpg";
import rafaImg from "../../img/rafa.png";
>>>>>>> Stashed changes

export default function DevelopersPage() {
  return (
    <div className="bg-black text-gray-200 min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">Our Developers</h1>
        <p className="text-gray-400 mb-12 text-center">
          The talented team behind CerminRupa
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {}
          <div className="group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-700 shadow-sm transition-all hover:shadow-md hover:shadow-sky-500/30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={hazwanImg}
                alt="Developer 1 - Hazwan Adhikara Nasution"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h2 className="text-2xl font-bold text-white mb-1">
                  Hazwan Adhikara Nasution
                </h2>
                <p className="text-sky-300 mb-4 text-sm">Lead Developer</p>
                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Navigating the World of Software Engineering & AI | Passionate
                  Learner | Second Year Undergraduate Information Technology
                  Student at Institut Teknologi Sepuluh Nopember.
                </p>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <Link
                    href="https://github.com/HazwanAdhikara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                    aria-label="Hazwan Adhikara Nasution's GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/hazwanadh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                    aria-label="Hazwan Adhikara Nasution's LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="group relative overflow-hidden rounded-xl bg-gray-900 border border-gray-700 shadow-sm transition-all hover:shadow-md hover:shadow-sky-500/30">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={rafaImg} 
                alt="Developer 2 - Rafael Gunawan"
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="transform translate-y-12 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                <h2 className="text-2xl font-bold text-white mb-1">
                  Rafael Gunawan
                </h2>
                <p className="text-sky-300 mb-4 text-sm">Co-Lead Developer</p>
                <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Web Security Enthusiast | Second Year Undergraduate Information Technology
                  Student at Institut Teknologi Sepuluh Nopember.
                </p>
                <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                  <Link
                    href="https://github.com/kokonz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                    aria-label="Rafael Gunawan's GitHub Profile"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/rafaelgun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-sky-400 transition-colors"
                    aria-label="Rafael Gunawan's LinkedIn Profile"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}