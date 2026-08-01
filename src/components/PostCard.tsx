import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types/blog';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

export const PostCard: React.FC<PostCardProps> = ({ post, variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out grid grid-cols-1 lg:grid-cols-12 mb-16">
        <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-gray-100 relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute top-6 left-6 bg-blue-600 text-white text-[11px] font-bold tracking-widest uppercase px-3.5 py-1 rounded shadow">
            Featured Essay
          </div>
        </div>
        <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 text-xs text-gray-400 mb-4 font-medium">
              <span className="text-blue-600 font-bold uppercase tracking-widest">{post.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
            </div>

            <Link to={`/post/${post.slug}`}>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                {post.title}
              </h2>
            </Link>

            {post.subtitle && (
              <p className="font-editorial italic text-gray-600 text-lg mb-4">
                {post.subtitle}
              </p>
            )}

            <p className="text-gray-600 text-base leading-relaxed font-light mb-6">
              {post.excerpt}
            </p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              to={`/post/${post.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-all uppercase tracking-wider"
            >
              Read Full Essay <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-out flex flex-col justify-between h-full">
      <div>
        <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        </div>
        <div className="p-8">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-medium">
            <span className="text-blue-600 font-bold uppercase tracking-widest">{post.category}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>

          <Link to={`/post/${post.slug}`}>
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-500 text-sm leading-relaxed font-light mb-6 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="px-8 pb-8 pt-0 flex items-center justify-between border-t border-gray-100 mt-auto">
        <span className="text-xs text-gray-400 font-medium">{post.date}</span>
        <Link
          to={`/post/${post.slug}`}
          className="text-xs font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-1 uppercase tracking-wider"
        >
          Read <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
