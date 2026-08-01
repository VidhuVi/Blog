import React, { useMemo } from 'react';
import { getAllTags, getAllPosts } from '../lib/posts';
import { PostCard } from '../components/PostCard';
import { Compass, Hash, Sparkles } from 'lucide-react';

export const TopicsPage: React.FC = () => {
  const tags = useMemo(() => getAllTags(), []);
  const allPosts = useMemo(() => getAllPosts(), []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <section className="pt-16 pb-16 px-6 md:px-16 max-w-[1600px] mx-auto">
        <div className="max-w-4xl">
          <p className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
            <Compass className="w-4 h-4" /> ESSAY DIRECTORY BY TOPIC
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6">
            Explore by <span className="font-editorial italic font-light text-blue-600">theme & category.</span>
          </h1>
          <p className="text-gray-600 text-lg font-light max-w-2xl">
            Browse personal perspectives categorized into key areas of inquiry: technology, philosophy, systems thinking, human agency, and mindset.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-16 pb-24">
        {/* Topic Grid Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {tags.map((tag) => (
            <a
              key={tag.name}
              href={`#${tag.name.toLowerCase()}`}
              className="group bg-white border border-gray-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-blue-600 font-bold text-lg group-hover:text-blue-700 flex items-center gap-1">
                  <Hash className="w-4 h-4" /> {tag.name}
                </span>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full">
                  {tag.count} Essay{tag.count === 1 ? '' : 's'}
                </span>
              </div>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-4">
                {tag.description}
              </p>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                View Essays ↓
              </span>
            </a>
          ))}
        </div>

        {/* Grouped Posts Sections */}
        <div className="space-y-24">
          {tags.map((tag) => {
            const topicPosts = allPosts.filter((p) => p.tags.includes(tag.name));
            return (
              <section key={tag.name} id={tag.name.toLowerCase()} className="scroll-mt-24">
                <div className="flex items-end justify-between pb-4 border-b border-gray-200 mb-8">
                  <div>
                    <span className="text-blue-600 text-xs font-bold tracking-widest uppercase mb-1 block">
                      TOPIC DIRECTORY
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                      #{tag.name}
                    </h2>
                  </div>
                  <p className="text-gray-400 font-editorial italic text-sm">
                    {topicPosts.length} article{topicPosts.length === 1 ? '' : 's'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {topicPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};
