import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const formatInline = (text: string): React.ReactNode => {
    // Matches markdown links [label](url), bold **text**, italic *text*, code `text`
    const parts = text.split(/(\[.*?\]\(.*?\)|\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      // Link [label](url)
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, label, url] = linkMatch;
        return (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline underline-offset-4 font-semibold transition-colors inline-items-center"
          >
            {label}
          </a>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="font-editorial italic">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i}>{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const renderParagraphOrBlock = (block: string, index: number) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    // H2 heading
    if (trimmed.startsWith('## ')) {
      const text = trimmed.replace('## ', '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h2 key={index} id={id} className="scroll-mt-28">
          {text}
        </h2>
      );
    }

    // H3 heading
    if (trimmed.startsWith('### ')) {
      const text = trimmed.replace('### ', '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return (
        <h3 key={index} id={id} className="scroll-mt-28">
          {text}
        </h3>
      );
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      const quoteText = trimmed.replace(/^>\s*/gm, '');
      return <blockquote key={index}>{formatInline(quoteText)}</blockquote>;
    }

    // Code Block
    if (trimmed.startsWith('```')) {
      const lines = trimmed.split('\n');
      const lang = lines[0].replace('```', '').trim();
      const code = lines.slice(1, -1).join('\n');
      return (
        <div key={index} className="relative group">
          {lang && (
            <span className="absolute top-3 right-4 text-[10px] uppercase font-bold tracking-widest text-gray-500">
              {lang}
            </span>
          )}
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Ordered List (1. 2. etc)
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').filter((l) => /^\d+\.\s/.test(l.trim())).map((line) => line.replace(/^\d+\.\s*/, ''));
      return (
        <ol key={index} className="list-decimal list-outside space-y-2.5 my-5 ml-6 text-gray-800">
          {items.map((item, i) => (
            <li key={i} className="pl-1 leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ol>
      );
    }

    // Unordered List (* or -)
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter((l) => /^[\*\-]\s/.test(l.trim())).map((line) => line.replace(/^[\*\-]\s*/, ''));
      return (
        <ul key={index} className="list-disc list-outside space-y-2.5 my-5 ml-6 text-gray-800">
          {items.map((item, i) => (
            <li key={i} className="pl-1 leading-relaxed">
              {formatInline(item)}
            </li>
          ))}
        </ul>
      );
    }

    // Horizontal Rule (---, ***, ___)
    if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
      return <hr key={index} className="my-10 border-0 border-t border-gray-200/80" />;
    }

    // Paragraph
    return <p key={index}>{formatInline(trimmed)}</p>;
  };

  const blocks = content.split(/\n\n+/);

  return <div className="prose-editorial">{blocks.map((b, idx) => renderParagraphOrBlock(b, idx))}</div>;
};

