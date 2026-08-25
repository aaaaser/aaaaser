import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    // min-h-[calc(100vh-4rem)] membuat tinggi section persis 1 layar penuh dikurangi tinggi Navbar (4rem = 64px)
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden px-4">
      
      {/* Background Effect (Glow / Blur Bulat di Belakang) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      {/* Konten Utama */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs sm:text-sm font-medium bg-muted border rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Available for Freelance & Full-time
        </div>

        {/* Judul Utama */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight">
          Membangun Website Modern dengan <span className="text-primary">Next.js & React</span>
        </h1>

        {/* Deskripsi */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Halo, saya <span className="font-semibold text-foreground">Nama Kamu</span>. 
          Seorang Full-Stack Developer yang fokus menciptakan pengalaman web yang cepat, responsif, dan interaktif.
        </p>

        {/* Tombol Aksi */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto text-base">
            <Link href="/projects">Lihat Projects Saya →</Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto text-base">
            <Link href="#contact">Hubungi Saya</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}