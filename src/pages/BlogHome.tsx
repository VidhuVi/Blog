import React, { useState, useMemo } from 'react';
import { getAllPosts, getFeaturedPost, getAllTags } from '../lib/posts';
import { PostCard } from '../components/PostCard';
import { Search, Filter, Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export const BlogHome: React.FC = () => {
  const allPosts = useMemo(() => getAllPosts(), []);
  const featuredPost = useMemo(() => getFeaturedPost(), []);
  const allTags = useMemo(() => getAllTags(), []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return posts;
  }, [allPosts, searchQuery]);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-6 md:px-16 max-w-[1600px] mx-auto">
        <div className="max-w-4xl">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            PERSONAL PERSPECTIVES & ESSAYS
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] text-gray-900 mb-8">
            Reflections on <br />
            <span className="font-editorial italic font-light text-blue-600 pr-2">technology,</span>
            human agency & world views.
          </h1>
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-light max-w-2xl">
            A minimalist digital journal by Vidhu P Vinod exploring structural thinking, deep work, modern software craftsmanship, and navigating complex systems.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200/80">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search essays by keyword, topic, or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-16 pb-24">
        {/* Featured Essay Section (only when no active search) */}
        {!searchQuery && featuredPost && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <span className="text-blue-600 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Highlighted Thought
              </span>
              <span className="text-gray-400 font-editorial italic text-sm">Editorial Choice</span>
            </div>
            <PostCard post={featuredPost} variant="featured" />
          </section>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b border-gray-200 pb-6">
          <div>
            <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-2">
              {searchQuery ? `SEARCH: "${searchQuery}"` : 'RECENT PERSPECTIVES'}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">
              {searchQuery ? `Results for "${searchQuery}"` : 'All Written Essays'}
            </h2>
          </div>
          <p className="text-gray-500 font-editorial italic text-base max-w-sm mt-4 md:mt-0">
            Showing {filteredPosts.length} article{filteredPosts.length === 1 ? '' : 's'} written with editorial intent.
          </p>
        </div>

        {/* Essays Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center max-w-xl mx-auto my-12">
            <Filter className="w-10 h-10 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching essays found</h3>
            <p className="text-gray-500 text-sm mb-6">
              Try refining your search keyword.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="bg-blue-600 text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded hover:bg-blue-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Dark Callout Banner per design.md section 7.5 */}
        <section className="bg-[#111111] text-white py-24 px-8 md:px-16 text-center mt-28 rounded-3xl relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 leading-tight">
              Curious to explore more of my <br />
              <span className="font-editorial italic font-light text-gray-300">projects & background?</span>
            </h2>
            <p className="text-gray-400 font-editorial italic text-lg md:text-xl mb-10 max-w-xl mx-auto">
              Visit my primary portfolio site to see interactive applications, open source work, and detailed experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://vidhuvinod.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-4 text-sm font-semibold hover:bg-blue-500 transition-colors rounded flex items-center justify-center gap-2 uppercase tracking-wider"
              >
                Visit Portfolio Website ↗
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
