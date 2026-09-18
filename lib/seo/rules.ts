export interface SeoCheckItem {
  id: string;
  category: "title" | "meta" | "content" | "headings" | "keyword" | "image" | "links" | "readability";
  label: string;
  pointsEarned: number;
  maxPoints: number;
  status: "passed" | "warning" | "failed";
  message: string;
  recommendation: string;
}

export interface SeoAnalysisResult {
  score: number;
  rating: "Needs Improvement" | "Basic" | "Good" | "Excellent";
  ratingColor: {
    text: string;
    bg: string;
    border: string;
    badge: string;
    progressBar: string;
  };
  checks: SeoCheckItem[];
  wordCount: number;
  readingTimeMinutes: number;
  keywordDensity: number;
  stats: {
    h2Count: number;
    h3Count: number;
    imageCount: number;
    internalLinkCount: number;
    externalLinkCount: number;
    paragraphCount: number;
  };
}

export interface SeoInputData {
  title: string;
  seoTitle?: string;
  slug?: string;
  focusKeyword?: string;
  seoDescription?: string;
  excerpt?: string;
  content: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  seoKeywords?: string;
}
