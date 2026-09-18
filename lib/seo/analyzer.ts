import { SeoInputData, SeoAnalysisResult, SeoCheckItem } from "./rules";

function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function countOccurrences(text: string, keyword: string): number {
  if (!text || !keyword) return 0;
  const normalizedText = text.toLowerCase();
  const normalizedKeyword = keyword.toLowerCase().trim();
  if (!normalizedKeyword) return 0;

  // Escape regex special characters
  const escaped = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`\\b${escaped}\\b`, "gi");
  const matches = normalizedText.match(regex);
  return matches ? matches.length : 0;
}

export function calculateSeoScore(data: SeoInputData): SeoAnalysisResult {
  const effectiveTitle = (data.seoTitle || data.title || "").trim();
  const effectiveMeta = (data.seoDescription || data.excerpt || "").trim();
  const focusKeyword = (data.focusKeyword || "").trim().toLowerCase();
  const contentHtml = data.content || "";
  const plainContent = stripHtml(contentHtml);

  // Word count & stats
  const words = plainContent.length > 0 ? plainContent.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  // Headings analysis
  const h2Matches = contentHtml.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  const h3Matches = contentHtml.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
  const h2Count = h2Matches.length;
  const h3Count = h3Matches.length;

  // Images & links analysis
  const imgMatches = contentHtml.match(/<img[^>]*>/gi) || [];
  const imgCount = imgMatches.length + (data.thumbnail ? 1 : 0);
  const imgAltMatches = contentHtml.match(/<img[^>]+alt=["']([^"']+)["'][^>]*>/gi) || [];

  // Internal and external links
  const linkMatches = contentHtml.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  linkMatches.forEach((tag) => {
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (hrefMatch && hrefMatch[1]) {
      const href = hrefMatch[1].trim();
      if (href.startsWith("http://") || href.startsWith("https://")) {
        externalLinkCount++;
      } else if (href.startsWith("/") || href.startsWith("#") || !href.includes("://")) {
        internalLinkCount++;
      }
    }
  });

  // Paragraphs & lists
  const paragraphMatches = contentHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  const listMatches = contentHtml.match(/<(ul|ol)[^>]*>([\s\S]*?)<\/(ul|ol)>/gi) || [];
  const paragraphCount = paragraphMatches.length;

  // Keyword density
  let keywordDensity = 0;
  let keywordInTitle = false;
  let keywordInMeta = false;
  let keywordInContent = false;
  let keywordInIntro = false;
  let keywordInSlug = false;

  if (focusKeyword) {
    const kwOccurrences = countOccurrences(plainContent, focusKeyword);
    keywordDensity = wordCount > 0 ? (kwOccurrences / wordCount) * 100 : 0;

    keywordInTitle = effectiveTitle.toLowerCase().includes(focusKeyword);
    keywordInMeta = effectiveMeta.toLowerCase().includes(focusKeyword);
    keywordInContent = kwOccurrences > 0;

    // Intro check (first 100 words)
    const introWords = words.slice(0, 100).join(" ").toLowerCase();
    keywordInIntro = introWords.includes(focusKeyword);

    // Slug check
    const slug = (data.slug || "").toLowerCase();
    const cleanKeyword = focusKeyword.replace(/[^a-z0-9]+/g, "-");
    keywordInSlug = slug.includes(cleanKeyword) || cleanKeyword.split("-").some((part) => part.length > 3 && slug.includes(part));
  }

  const checks: SeoCheckItem[] = [];

  // ==========================================
  // 1. TITLE CHECKS (Max 20 pts)
  // ==========================================
  // Title presence (6 pts)
  if (effectiveTitle.length > 0) {
    checks.push({
      id: "title_exists",
      category: "title",
      label: "SEO Title tersedia",
      pointsEarned: 6,
      maxPoints: 6,
      status: "passed",
      message: `Title telah ditentukan (${effectiveTitle.length} karakter).`,
      recommendation: "Pertahankan judul artikel yang informatif.",
    });
  } else {
    checks.push({
      id: "title_exists",
      category: "title",
      label: "SEO Title tidak boleh kosong",
      pointsEarned: 0,
      maxPoints: 6,
      status: "failed",
      message: "Judul artikel / SEO title belum diisi.",
      recommendation: "Tambahkan judul artikel yang menarik dan deskriptif.",
    });
  }

  // Title length: 40-60 characters ideal (7 pts)
  if (effectiveTitle.length >= 40 && effectiveTitle.length <= 60) {
    checks.push({
      id: "title_length",
      category: "title",
      label: "Panjang SEO Title optimal (40–60 karakter)",
      pointsEarned: 7,
      maxPoints: 7,
      status: "passed",
      message: `Panjang judul sangat ideal (${effectiveTitle.length}/60 karakter).`,
      recommendation: "Judul akan tampil sempurna di hasil pencarian Google tanpa terpotong.",
    });
  } else if ((effectiveTitle.length >= 25 && effectiveTitle.length < 40) || (effectiveTitle.length > 60 && effectiveTitle.length <= 75)) {
    checks.push({
      id: "title_length",
      category: "title",
      label: "Panjang SEO Title cukup baik",
      pointsEarned: 4,
      maxPoints: 7,
      status: "warning",
      message: `Panjang judul (${effectiveTitle.length} karakter) bisa dioptimalkan.`,
      recommendation: effectiveTitle.length < 40
        ? "Usahakan panjang judul minimal 40 karakter agar lebih informatif."
        : "Judul lebih dari 60 karakter mungkin terpotong di hasil pencarian Google.",
    });
  } else {
    checks.push({
      id: "title_length",
      category: "title",
      label: "Panjang SEO Title perlu disesuaikan",
      pointsEarned: 1,
      maxPoints: 7,
      status: "failed",
      message: effectiveTitle.length === 0 ? "Title kosong." : `Panjang judul (${effectiveTitle.length} karakter) kurang ideal.`,
      recommendation: "Gunakan 40 hingga 60 karakter untuk performa pencarian terbaik.",
    });
  }

  // Keyword in title (7 pts)
  if (!focusKeyword) {
    checks.push({
      id: "title_keyword",
      category: "title",
      label: "Focus Keyword pada title",
      pointsEarned: 0,
      maxPoints: 7,
      status: "warning",
      message: "Belum menentukan Focus Keyword.",
      recommendation: "Masukkan focus keyword pada kolom SEO untuk mengukur kesesuaian judul.",
    });
  } else if (keywordInTitle) {
    checks.push({
      id: "title_keyword",
      category: "title",
      label: "Focus Keyword ada di SEO Title",
      pointsEarned: 7,
      maxPoints: 7,
      status: "passed",
      message: `Keyword "${focusKeyword}" ditemukan pada judul artikel.`,
      recommendation: "Bagus! Mesin pencari dapat mengenali relevansi topik artikel dengan cepat.",
    });
  } else {
    checks.push({
      id: "title_keyword",
      category: "title",
      label: "Focus Keyword tidak ditemukan di Title",
      pointsEarned: 0,
      maxPoints: 7,
      status: "failed",
      message: `Keyword "${focusKeyword}" belum ada di judul.`,
      recommendation: `Sisipkan keyword "${focusKeyword}" ke dalam judul artikel secara alami.`,
    });
  }

  // ==========================================
  // 2. META DESCRIPTION CHECKS (Max 20 pts)
  // ==========================================
  // Meta description exists (6 pts)
  if (effectiveMeta.length > 0) {
    checks.push({
      id: "meta_exists",
      category: "meta",
      label: "Meta description tersedia",
      pointsEarned: 6,
      maxPoints: 6,
      status: "passed",
      message: `Meta description / excerpt terisi (${effectiveMeta.length} karakter).`,
      recommendation: "Meta description memberikan ringkasan yang jelas untuk Google.",
    });
  } else {
    checks.push({
      id: "meta_exists",
      category: "meta",
      label: "Meta description belum diisi",
      pointsEarned: 0,
      maxPoints: 6,
      status: "failed",
      message: "Meta description atau excerpt masih kosong.",
      recommendation: "Tuliskan ringkasan artikel menarik antara 120–160 karakter.",
    });
  }

  // Meta length: 120-160 characters ideal (7 pts)
  if (effectiveMeta.length >= 120 && effectiveMeta.length <= 160) {
    checks.push({
      id: "meta_length",
      category: "meta",
      label: "Panjang Meta Description ideal (120–160 karakter)",
      pointsEarned: 7,
      maxPoints: 7,
      status: "passed",
      message: `Panjang meta description optimal (${effectiveMeta.length}/160 karakter).`,
      recommendation: "Deskripsi akan ditampilkan utuh pada snippet hasil pencarian Google.",
    });
  } else if ((effectiveMeta.length >= 70 && effectiveMeta.length < 120) || (effectiveMeta.length > 160 && effectiveMeta.length <= 180)) {
    checks.push({
      id: "meta_length",
      category: "meta",
      label: "Panjang Meta Description cukup baik",
      pointsEarned: 4,
      maxPoints: 7,
      status: "warning",
      message: `Panjang deskripsi (${effectiveMeta.length} karakter) bisa dioptimalkan.`,
      recommendation: effectiveMeta.length < 120
        ? "Usahakan meta description sekitar 120–160 karakter agar informatif."
        : "Deskripsi lebih dari 160 karakter dapat terpotong titik-titik (...) di Google.",
    });
  } else {
    checks.push({
      id: "meta_length",
      category: "meta",
      label: "Panjang Meta Description perlu diperbaiki",
      pointsEarned: 1,
      maxPoints: 7,
      status: "failed",
      message: effectiveMeta.length === 0 ? "Deskripsi kosong." : `Panjang deskripsi (${effectiveMeta.length} karakter) di luar rentang yang dianjurkan.`,
      recommendation: "Targetkan panjang deskripsi antara 120 hingga 160 karakter.",
    });
  }

  // Keyword in Meta Description (7 pts)
  if (!focusKeyword) {
    checks.push({
      id: "meta_keyword",
      category: "meta",
      label: "Focus Keyword pada Meta Description",
      pointsEarned: 0,
      maxPoints: 7,
      status: "warning",
      message: "Belum menentukan Focus Keyword.",
      recommendation: "Tentukan focus keyword untuk memeriksa keberadaannya di meta description.",
    });
  } else if (keywordInMeta) {
    checks.push({
      id: "meta_keyword",
      category: "meta",
      label: "Focus Keyword ada di Meta Description",
      pointsEarned: 7,
      maxPoints: 7,
      status: "passed",
      message: `Keyword "${focusKeyword}" ditemukan dalam meta description.`,
      recommendation: "Kata kunci akan dicetak tebal oleh Google bila dicari oleh pembaca.",
    });
  } else {
    checks.push({
      id: "meta_keyword",
      category: "meta",
      label: "Focus Keyword tidak ada di Meta Description",
      pointsEarned: 0,
      maxPoints: 7,
      status: "failed",
      message: `Keyword "${focusKeyword}" tidak ada di meta description.`,
      recommendation: `Sisipkan keyword "${focusKeyword}" ke dalam deskripsi artikel secara natural.`,
    });
  }

  // ==========================================
  // 3. CONTENT CHECKS (Max 20 pts)
  // ==========================================
  // Word count (10 pts)
  if (wordCount >= 300) {
    checks.push({
      id: "content_words",
      category: "content",
      label: "Panjang artikel memadai (≥300 kata)",
      pointsEarned: 10,
      maxPoints: 10,
      status: "passed",
      message: `Artikel memiliki ${wordCount} kata (~${readingTimeMinutes} min baca).`,
      recommendation: "Panjang konten sangat baik untuk pemeringkatan artikel mendalam.",
    });
  } else if (wordCount >= 150) {
    checks.push({
      id: "content_words",
      category: "content",
      label: "Panjang artikel sedang",
      pointsEarned: 6,
      maxPoints: 10,
      status: "warning",
      message: `Artikel memiliki ${wordCount} kata.`,
      recommendation: "Usahakan artikel memiliki minimal 300 kata untuk ulasan yang komprehensif.",
    });
  } else {
    checks.push({
      id: "content_words",
      category: "content",
      label: "Artikel terlalu pendek",
      pointsEarned: 2,
      maxPoints: 10,
      status: "failed",
      message: `Artikel baru memiliki ${wordCount} kata.`,
      recommendation: "Tambahkan pembahasan yang lebih mendalam dan rinci (minimal 300 kata).",
    });
  }

  // Keyword in content & density (10 pts)
  if (!focusKeyword) {
    checks.push({
      id: "content_keyword_density",
      category: "content",
      label: "Kepadatan kata kunci konten",
      pointsEarned: 0,
      maxPoints: 10,
      status: "warning",
      message: "Focus Keyword belum diisi.",
      recommendation: "Isi focus keyword untuk mengukur kepadatan kata kunci dalam artikel.",
    });
  } else if (keywordInContent && keywordDensity >= 0.5 && keywordDensity <= 3.5) {
    checks.push({
      id: "content_keyword_density",
      category: "content",
      label: "Kepadatan kata kunci seimbang (0.5% - 3%)",
      pointsEarned: 10,
      maxPoints: 10,
      status: "passed",
      message: `Kepadatan keyword "${focusKeyword}" sangat seimbang (${keywordDensity.toFixed(1)}%).`,
      recommendation: "Distribusi kata kunci natural dan terbebas dari keyword stuffing.",
    });
  } else if (keywordInContent && (keywordDensity < 0.5 || keywordDensity > 3.5)) {
    checks.push({
      id: "content_keyword_density",
      category: "content",
      label: "Kepadatan kata kunci perlu disesuaikan",
      pointsEarned: 5,
      maxPoints: 10,
      status: "warning",
      message: keywordDensity < 0.5
        ? `Keyword hanya muncul sedikit (${keywordDensity.toFixed(1)}%).`
        : `Keyword muncul terlalu sering (${keywordDensity.toFixed(1)}% - potensi keyword stuffing).`,
      recommendation: keywordDensity < 0.5
        ? "Tambahkan penyebutan keyword di beberapa paragraf secara kontekstual."
        : "Kurangi pengulangan keyword agar tulisan terasa lebih alami dibaca.",
    });
  } else {
    checks.push({
      id: "content_keyword_density",
      category: "content",
      label: "Keyword tidak ditemukan dalam konten",
      pointsEarned: 0,
      maxPoints: 10,
      status: "failed",
      message: `Keyword "${focusKeyword}" belum digunakan dalam badan artikel.`,
      recommendation: `Sisipkan keyword "${focusKeyword}" di beberapa bagian isi artikel.`,
    });
  }

  // ==========================================
  // 4. HEADING STRUCTURE (Max 10 pts)
  // ==========================================
  // H2 presence (6 pts)
  if (h2Count >= 1) {
    checks.push({
      id: "heading_h2",
      category: "headings",
      label: "Memiliki Subheading H2",
      pointsEarned: 6,
      maxPoints: 6,
      status: "passed",
      message: `Ditemukan ${h2Count} heading H2 dalam artikel.`,
      recommendation: "Struktur subtopik memudahkan pembaca memindai materi utama.",
    });
  } else {
    checks.push({
      id: "heading_h2",
      category: "headings",
      label: "Belum ada Subheading H2",
      pointsEarned: 0,
      maxPoints: 6,
      status: "failed",
      message: "Artikel belum memiliki heading H2.",
      recommendation: "Gunakan heading H2 di editor untuk memecah artikel menjadi bagian-bagian terstruktur.",
    });
  }

  // H3 presence or multiple headings (4 pts)
  if (h3Count >= 1 || h2Count >= 2) {
    checks.push({
      id: "heading_sub",
      category: "headings",
      label: "Hierarki heading bertingkat",
      pointsEarned: 4,
      maxPoints: 4,
      status: "passed",
      message: `Terdapat variasi heading (${h2Count} H2, ${h3Count} H3).`,
      recommendation: "Hierarki heading logis dan mudah dinavigasi.",
    });
  } else {
    checks.push({
      id: "heading_sub",
      category: "headings",
      label: "Tingkatkan hierarki sub-heading",
      pointsEarned: 1,
      maxPoints: 4,
      status: "warning",
      message: "Hanya terdapat sedikit struktur heading.",
      recommendation: "Tambahkan sub-heading H3 untuk menjelaskan poin-poin turunan.",
    });
  }

  // ==========================================
  // 5. KEYWORD STRATEGY (Max 10 pts)
  // ==========================================
  // Focus keyword set (3 pts)
  if (focusKeyword.length > 0) {
    checks.push({
      id: "keyword_defined",
      category: "keyword",
      label: "Focus Keyword telah ditentukan",
      pointsEarned: 3,
      maxPoints: 3,
      status: "passed",
      message: `Target kata kunci: "${focusKeyword}".`,
      recommendation: "Fokus keyword memandu optimasi seluruh elemen halaman.",
    });
  } else {
    checks.push({
      id: "keyword_defined",
      category: "keyword",
      label: "Focus Keyword belum ditentukan",
      pointsEarned: 0,
      maxPoints: 3,
      status: "failed",
      message: "Belum ada focus keyword yang diset.",
      recommendation: "Tentukan 1 focus keyword utama pada kolom SEO Assistant.",
    });
  }

  // Keyword in Intro (4 pts)
  if (focusKeyword && keywordInIntro) {
    checks.push({
      id: "keyword_in_intro",
      category: "keyword",
      label: "Keyword ada di paragraf pembuka",
      pointsEarned: 4,
      maxPoints: 4,
      status: "passed",
      message: `Keyword "${focusKeyword}" muncul di 100 kata pertama.`,
      recommendation: "Sangat baik! Pembuka langsung relevan dengan niat pencarian.",
    });
  } else if (focusKeyword) {
    checks.push({
      id: "keyword_in_intro",
      category: "keyword",
      label: "Keyword belum ada di pembuka",
      pointsEarned: 1,
      maxPoints: 4,
      status: "warning",
      message: `Keyword "${focusKeyword}" tidak ditemukan di paragraf pertama.`,
      recommendation: "Sebutkan fokus kata kunci di kalimat awal atau paragraf pertama artikel.",
    });
  } else {
    checks.push({
      id: "keyword_in_intro",
      category: "keyword",
      label: "Keyword di pembuka artikel",
      pointsEarned: 0,
      maxPoints: 4,
      status: "warning",
      message: "Belum menentukan Focus Keyword.",
      recommendation: "Tentukan kata kunci utama terlebih dahulu.",
    });
  }

  // Keyword in Slug (3 pts)
  if (focusKeyword && keywordInSlug) {
    checks.push({
      id: "keyword_in_slug",
      category: "keyword",
      label: "Keyword ada dalam URL Slug",
      pointsEarned: 3,
      maxPoints: 3,
      status: "passed",
      message: "URL Slug mengandung kata kunci target.",
      recommendation: "Struktur URL bersih dan search engine friendly.",
    });
  } else if (focusKeyword) {
    checks.push({
      id: "keyword_in_slug",
      category: "keyword",
      label: "Keyword belum optimal di URL Slug",
      pointsEarned: 1,
      maxPoints: 3,
      status: "warning",
      message: `Slug "${data.slug || ""}" belum memuat kata kunci "${focusKeyword}".`,
      recommendation: "Gunakan kata kunci di dalam URL slug artikel.",
    });
  } else {
    checks.push({
      id: "keyword_in_slug",
      category: "keyword",
      label: "Keyword dalam URL Slug",
      pointsEarned: 0,
      maxPoints: 3,
      status: "warning",
      message: "Belum menentukan Focus Keyword.",
      recommendation: "Sertakan target keyword dalam URL slug.",
    });
  }

  // ==========================================
  // 6. IMAGE & THUMBNAIL (Max 10 pts)
  // ==========================================
  // Thumbnail exists (5 pts)
  if (data.thumbnail && data.thumbnail.trim().length > 0) {
    checks.push({
      id: "thumbnail_exists",
      category: "image",
      label: "Thumbnail / Cover Image tersedia",
      pointsEarned: 5,
      maxPoints: 5,
      status: "passed",
      message: "Thumbnail artikel telah diunggah.",
      recommendation: "Thumbnail akan digunakan pada kartu blog dan Open Graph media sosial.",
    });
  } else {
    checks.push({
      id: "thumbnail_exists",
      category: "image",
      label: "Thumbnail belum diunggah",
      pointsEarned: 0,
      maxPoints: 5,
      status: "failed",
      message: "Artikel belum memiliki thumbnail gambar.",
      recommendation: "Unggah gambar thumbnail dengan aspek rasio 16:9 agar tampilan menarik.",
    });
  }

  // Alt text on thumbnail / content images (5 pts)
  const hasThumbnailAlt = !!(data.thumbnailAlt && data.thumbnailAlt.trim().length > 0);
  const hasContentAlt = imgAltMatches.length > 0 || imgMatches.length === 0;

  if (hasThumbnailAlt || (data.thumbnail && hasContentAlt)) {
    checks.push({
      id: "image_alt_text",
      category: "image",
      label: "Image Alt Text terisi",
      pointsEarned: 5,
      maxPoints: 5,
      status: "passed",
      message: "Gambar memiliki teks alternatif (Alt Text) yang deskriptif.",
      recommendation: "Alt text membantu aksesibilitas pembaca layar dan SEO gambar Google.",
    });
  } else {
    checks.push({
      id: "image_alt_text",
      category: "image",
      label: "Lengkapi Alt Text pada gambar",
      pointsEarned: 2,
      maxPoints: 5,
      status: "warning",
      message: "Beberapa gambar belum memiliki teks alt.",
      recommendation: "Isi kolom Alt Text pada thumbnail atau gambar di editor untuk meningkatkan SEO.",
    });
  }

  // ==========================================
  // 7. LINKS (Max 5 pts)
  // ==========================================
  if (internalLinkCount > 0 && externalLinkCount > 0) {
    checks.push({
      id: "links_presence",
      category: "links",
      label: "Tautan internal & eksternal tersedia",
      pointsEarned: 5,
      maxPoints: 5,
      status: "passed",
      message: `Ditemukan ${internalLinkCount} internal link dan ${externalLinkCount} external link.`,
      recommendation: "Kombinasi tautan memperkuat otoritas artikel dan navigasi pembaca.",
    });
  } else if (internalLinkCount > 0 || externalLinkCount > 0) {
    checks.push({
      id: "links_presence",
      category: "links",
      label: "Tautan parsial dalam konten",
      pointsEarned: 3,
      maxPoints: 5,
      status: "warning",
      message: internalLinkCount === 0 ? "Belum ada tautan internal." : "Belum ada tautan eksternal rujukan.",
      recommendation: internalLinkCount === 0
        ? "Tambahkan link ke halaman portfolio atau artikel lain (internal link)."
        : "Sertakan link sumber rujukan terpercaya (external link).",
    });
  } else {
    checks.push({
      id: "links_presence",
      category: "links",
      label: "Belum ada tautan rujukan",
      pointsEarned: 0,
      maxPoints: 5,
      status: "warning",
      message: "Tidak ditemukan tautan internal maupun eksternal di dalam artikel.",
      recommendation: "Tambahkan link ke artikel lain atau dokumentasi resmi terkait.",
    });
  }

  // ==========================================
  // 8. READABILITY (Max 5 pts)
  // ==========================================
  const hasGoodParagraphs = paragraphCount >= 2 || (wordCount > 100 && paragraphCount >= 1);
  const hasLists = listMatches.length > 0;

  if (hasGoodParagraphs && (hasLists || h2Count >= 2)) {
    checks.push({
      id: "readability_format",
      category: "readability",
      label: "Keterbacaan & formatting rapi",
      pointsEarned: 5,
      maxPoints: 5,
      status: "passed",
      message: "Paragraf terdistribusi baik dengan list atau sub-heading.",
      recommendation: "Tata letak nyaman dibaca di layar desktop maupun smartphone.",
    });
  } else if (hasGoodParagraphs) {
    checks.push({
      id: "readability_format",
      category: "readability",
      label: "Keterbacaan artikel standar",
      pointsEarned: 3,
      maxPoints: 5,
      status: "warning",
      message: "Format paragraf cukup baik.",
      recommendation: "Gunakan poin bullet/nomor atau kutipan untuk variasi ritme membaca.",
    });
  } else {
    checks.push({
      id: "readability_format",
      category: "readability",
      label: "Keterbacaan perlu ditingkatkan",
      pointsEarned: 1,
      maxPoints: 5,
      status: "failed",
      message: "Struktur teks masih padat atau terlalu singkat.",
      recommendation: "Pecah teks panjang menjadi paragraf-paragraf pendek (maksimal 3–4 kalimat).",
    });
  }

  // Calculate total score
  const totalScore = Math.min(100, Math.max(0, checks.reduce((sum, item) => sum + item.pointsEarned, 0)));

  // Rating and color configuration
  let rating: SeoAnalysisResult["rating"] = "Needs Improvement";
  let ratingColor: SeoAnalysisResult["ratingColor"] = {
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-200 dark:border-red-900/50",
    badge: "bg-red-500 text-white",
    progressBar: "bg-red-500",
  };

  if (totalScore >= 80) {
    rating = "Excellent";
    ratingColor = {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-900/50",
      badge: "bg-emerald-500 text-white",
      progressBar: "bg-emerald-500",
    };
  } else if (totalScore >= 60) {
    rating = "Good";
    ratingColor = {
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-200 dark:border-blue-900/50",
      badge: "bg-blue-500 text-white",
      progressBar: "bg-blue-500",
    };
  } else if (totalScore >= 40) {
    rating = "Basic";
    ratingColor = {
      text: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-900/50",
      badge: "bg-amber-500 text-white",
      progressBar: "bg-amber-500",
    };
  }

  return {
    score: totalScore,
    rating,
    ratingColor,
    checks,
    wordCount,
    readingTimeMinutes,
    keywordDensity,
    stats: {
      h2Count,
      h3Count,
      imageCount: imgCount,
      internalLinkCount,
      externalLinkCount,
      paragraphCount,
    },
  };
}
