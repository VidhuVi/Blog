import React from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const headings: Heading[] = [];
  const lines = content.split('\n');

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const text = line.replace('## ', '').trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ id, text, level: 2 });
    } else if (line.startsWith('### ')) {
      const text = line.replace('### ', '').trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ id, text, level: 3 });
    }
  });

  if (headings.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h4 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
        Outline & Sections
      </h4>
      <ul className="space-y-2.5 text-xs font-medium">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${h.id}`}
              className="text-gray-600 hover:text-blue-600 transition-colors line-clamp-1 block"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
