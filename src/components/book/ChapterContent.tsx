import { motion } from "framer-motion";
import { Chapter, ContentBlock } from "@/data/bookContent";
import { ChevronRight, ChevronLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/ui/CodeBlock";
import Callout from "@/components/ui/Callout";

interface ChapterContentProps {
  chapter: Chapter;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const renderBlock = (block: ContentBlock, index: number) => {
  const baseDelay = 0.05 + index * 0.02;

  switch (block.type) {
    case 'heading':
      const Tag = block.level === 2 ? 'h2' : 'h3';
      return (
        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: baseDelay }}>
          <Tag id={block.id} className={`font-heading scroll-mt-20 ${block.level === 2 ? 'text-2xl md:text-3xl font-semibold mb-4 mt-10 text-foreground pb-2 border-b border-border' : 'text-xl md:text-2xl font-semibold mb-3 mt-8 text-foreground'}`}>
            {block.text}
          </Tag>
        </motion.div>
      );

    case 'paragraph':
      return (
        <motion.p key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: baseDelay }} className="text-foreground/90 leading-relaxed mb-4">
          {block.text}
        </motion.p>
      );

    case 'list':
      const ListTag = block.ordered ? 'ol' : 'ul';
      return (
        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: baseDelay }}>
          <ListTag className={`mb-4 ml-6 space-y-2 ${block.ordered ? 'list-decimal' : 'list-disc'}`}>
            {block.items.map((item, i) => (
              <li key={i} className="text-foreground/90 leading-relaxed">{item}</li>
            ))}
          </ListTag>
        </motion.div>
      );

    case 'callout':
      return (
        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: baseDelay }}>
          <Callout type={block.calloutType} title={block.title}>{block.text}</Callout>
        </motion.div>
      );

    case 'code':
      return (
        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: baseDelay }}>
          <CodeBlock code={block.code} language={block.language} title={block.title} />
        </motion.div>
      );

    case 'table':
      return (
        <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: baseDelay }} className="mb-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {block.headers.map((header, i) => (
                  <th key={i} className="bg-muted/50 px-4 py-3 text-left font-semibold text-foreground border border-border">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-muted/20">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-4 py-3 border border-border text-foreground/90">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      );

    default:
      return null;
  }
};

const ChapterContent = ({ chapter, onNavigate, hasPrev, hasNext }: ChapterContentProps) => {
  return (
    <motion.article key={chapter.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-[calc(100vh-57px)]">
      {/* Chapter Header */}
      <div className="border-b border-border bg-gradient-to-b from-secondary/50 to-transparent px-6 py-12 md:px-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
              Chapter {chapter.number}
            </span>
            {chapter.readTime && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {chapter.readTime}
              </span>
            )}
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">{chapter.title}</h1>
          {chapter.subtitle && <p className="text-xl text-muted-foreground font-heading">{chapter.subtitle}</p>}
        </motion.div>
      </div>

      {/* Chapter Body */}
      <div className="px-6 py-8 md:px-12 md:py-12 max-w-4xl prose-docs">
        {chapter.sections.map((section) => (
          <div key={section.id}>
            {section.content.map((block, index) => renderBlock(block, index))}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="border-t border-border px-6 py-6 md:px-12">
        <div className="flex items-center justify-between max-w-4xl">
          <Button variant="outline" onClick={() => onNavigate('prev')} disabled={!hasPrev} className="gap-2">
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <Button variant="outline" onClick={() => onNavigate('next')} disabled={!hasNext} className="gap-2">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ChapterContent;
