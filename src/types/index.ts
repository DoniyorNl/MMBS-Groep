export type Locale = "nl" | "en";

export interface Service {
  slug: string;
  icon: string;
  image: string;
  pricePerM2: number;
}

export interface Project {
  slug: string;
  title: string;
  location: string;
  year: number;
  type: "restauratie" | "nieuwbouw" | "renovatie" | "isolatie";
  image: string;
  images: string[];
  description: string;
  client?: string;
  surface?: number;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  company: string;
  role: string;
  text: string;
  rating: number;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  linkedin?: string;
}

export interface Vacature {
  id: string;
  title: string;
  location: string;
  type: "fulltime" | "parttime";
  description: string;
  requirements: string[];
  published: string;
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  published: string;
  category: "company" | "project" | "industry";
  author: string;
}
