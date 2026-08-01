import { BlogPost, TopicTag } from '../types/blog';

// Import raw markdown files eager using Vite glob import
const modules = import.meta.glob('../content/posts/*.md', { query: '?raw', eager: true });

function parseFrontmatter(rawContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const yamlBlock = match[1];
  const content = match[2];

  const data: Record<string, any> = {};
  const lines = yamlBlock.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let valueStr = line.slice(colonIndex + 1).trim();

    // Parse array string e.g. ["Tag1", "Tag2"]
    if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
      const items = valueStr
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''));
      data[key] = items;
    } else if (valueStr === 'true' || valueStr === 'false') {
      data[key] = valueStr === 'true';
    } else {
      // Strip surrounding quotes
      data[key] = valueStr.replace(/^["']|["']$/g, '');
    }
  }

  return { data, content };
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in modules) {
    const raw = (modules[path] as { default: string }).default || (modules[path] as unknown as string);
    const { data, content } = parseFrontmatter(raw);

    if (data.slug && data.title) {
      posts.push({
        slug: data.slug,
        title: data.title,
        subtitle: data.subtitle || '',
        date: data.date || '',
        readTime: data.readTime || '5 min read',
        tags: Array.isArray(data.tags) ? data.tags : [],
        category: data.category || 'Perspectives',
        featured: Boolean(data.featured),
        excerpt: data.excerpt || '',
        coverImage: data.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
        content,
      });
    }
  }

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) || posts[0];
}

export function getAllTags(): TopicTag[] {
  const posts = getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const descriptions: Record<string, string> = {
    Technology: 'Essays on software architecture, tools, digital craftsmanship, and technological trends.',
    Design: 'Perspectives on visual restraint, typography, spatial systems, and user experience.',
    Philosophy: 'Reflections on deep work, solitude, mental clarity, and foundational thinking.',
    Mindset: 'Mental models, personal growth, and focus strategies in a noisy digital environment.',
    'World Views': 'Long-form analysis of human agency, societal systems, and future horizons.',
    Systems: 'Structural thinking, feedback loops, and navigating complex environments.',
    Life: 'Personal anecdotes, observations, and heuristics for daily living.',
    'Decision Making': 'Frameworks for risk assessment, inversion, and high-stakes choices.',
  };

  return Array.from(tagMap.entries()).map(([name, count]) => ({
    name,
    count,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    description: descriptions[name] || `Essays exploring ${name.toLowerCase()} and related perspectives.`,
  }));
}

export function searchPosts(query: string, tag: string | null): BlogPost[] {
  let posts = getAllPosts();

  if (tag) {
    posts = posts.filter((p) => p.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return posts;
}

export function getRelatedPosts(currentSlug: string, tags: string[]): BlogPost[] {
  const posts = getAllPosts().filter((p) => p.slug !== currentSlug);
  return posts
    .map((post) => {
      const sharedCount = post.tags.filter((t) => tags.includes(t)).length;
      return { post, sharedCount };
    })
    .sort((a, b) => b.sharedCount - a.sharedCount)
    .slice(0, 2)
    .map((item) => item.post);
}
