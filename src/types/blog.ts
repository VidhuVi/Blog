export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  featured?: boolean;
  excerpt: string;
  coverImage: string;
  content: string;
}

export interface TopicTag {
  name: string;
  count: number;
  description: string;
  slug: string;
}

export interface FilterOptions {
  searchQuery: string;
  selectedTag: string | null;
  selectedCategory: string | null;
}
