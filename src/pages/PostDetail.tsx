import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../lib/posts';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { TableOfContents } from '../components/TableOfContents';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { PostCard } from '../components/PostCard';
import { ArrowLeft, Clock, Calendar, Share2, Check, ArrowUpRight, User, BookOpen } from 'lucide-react';

export const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = post ? getRelatedPosts(post.slug, post.tags) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-24">
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-lg shadow-xl">
          <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-black text-gray-900 mb-2">Essay Not Found</h1>
          <p className="text-gray-600 text-sm mb-6">
            The essay you are looking for may have been moved or renamed.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider rounded hover:bg-blue-700 transition-colors inline-block"
          >
            Back to All Essays
          </Link>
        </div>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] relative">
      <ReadingProgressBar />

      {/* Article Header Container */}
      <header className="pt-12 pb-16 px-6 md:px-16 max-w-[1600px] mx-auto border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-blue-600 uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Essays
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mb-6 font-medium">
            <span className="bg-blue-50 text-blue-600 font-bold uppercase tracking-widest px-3 py-1 rounded">
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1]">
            {post.title}
          </h1>

          {post.subtitle && (
            <p className="font-editorial italic text-gray-600 text-xl md:text-2xl mb-8 leading-relaxed">
              {post.subtitle}
            </p>
          )}

          {/* Author Metadata & Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-gray-200/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">
                VV
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Vidhu P Vinod</p>
                <p className="text-xs text-gray-500 font-editorial italic">Personal Perspectives & Essays</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="bg-white border border-gray-200 hover:border-gray-900 text-gray-700 px-4 py-2 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" /> Link Copied
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" /> Share Link
                  </>
                )}
              </button>

              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-3 py-2 rounded text-xs font-semibold transition-colors"
              >
                Share on X
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      {post.coverImage && (
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 my-12">
          <div className="max-w-4xl mx-auto aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Body Content Grid */}
      <main className="max-w-[1600px] mx-auto px-6 md:px-16 py-8 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Prose Column */}
          <article className="lg:col-span-8 bg-white border border-gray-200/80 rounded-2xl p-8 md:p-14 shadow-sm">
            <MarkdownRenderer content={post.content} />

            {/* Post Tags */}
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mr-2 flex items-center">
                Tags:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/topics#${tag.toLowerCase()}`}
                  className="text-xs bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white px-3 py-1 rounded transition-colors font-medium"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            {/* Author Footnote Box */}
            <div className="mt-12 p-8 bg-[#111111] text-white rounded-xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-400">AUTHOR FOOTNOTE</p>
                <h4 className="text-xl font-bold">Written by Vidhu P Vinod</h4>
                <p className="text-gray-400 text-sm font-light">
                  Exploring philosophy, software craftsmanship, and human agency. Find more projects on my personal portfolio.
                </p>
              </div>
              <a
                href="https://vidhuvinod.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded hover:bg-blue-500 transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                Portfolio <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>

          {/* Sticky Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8 sticky top-28 self-start">
            <TableOfContents content={post.content} />

            {/* Related Essays */}
            {relatedPosts.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
                  Related Perspectives
                </h4>
                <div className="space-y-4">
                  {relatedPosts.map((rel) => (
                    <div key={rel.slug} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <Link
                        to={`/post/${rel.slug}`}
                        className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 block mb-1"
                      >
                        {rel.title}
                      </Link>
                      <p className="text-xs text-gray-400">{rel.readTime}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};
