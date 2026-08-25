import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Brand & Hak Cipta */}
        <div>
          <p className="font-bold text-lg">MyPortfolio</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nama Kamu. All rights reserved.
          </p>
        </div>

        {/* Navigasi Cepat */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <Link
            href="/projects"
            className="hover:text-foreground transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="hover:text-foreground transition-colors"
          >
            Blog
          </Link>
        </div>

        {/* Social Media Link */}
        <div className="flex gap-4 text-sm font-medium">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
