import { motion } from "framer-motion";
import { Chapter, Section } from "@/data/bookContent";
import { Info, AlertTriangle, Lightbulb, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChapterContentProps {
  chapter: Chapter;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

const renderSection = (section: Section, index: number) => {
  const baseDelay = 0.1 + index * 0.05;

  switch (section.type) {
    case 'heading':
      const HeadingTag = section.level === 1 ? 'h1' : section.level === 2 ? 'h2' : 'h3';
      const headingStyles = {
        1: "text-3xl md:text-4xl font-bold text-gradient-gold mb-6 mt-8 first:mt-0",
        2: "text-2xl md:text-3xl font-semibold text-foreground mb-4 mt-8",
        3: "text-xl md:text-2xl font-medium text-foreground mb-3 mt-6",
      };
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay }}
        >
          <HeadingTag className={`font-heading ${headingStyles[section.level || 2]}`}>
            {section.content}
          </HeadingTag>
        </motion.div>
      );

    case 'paragraph':
      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay }}
          className="text-foreground/90 leading-relaxed mb-4 text-lg"
        >
          {section.content}
        </motion.p>
      );

    case 'list':
      return (
        <motion.ul
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay }}
          className="space-y-2 mb-6 ml-4"
        >
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-foreground/90">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-lg">{item}</span>
            </li>
          ))}
        </motion.ul>
      );

    case 'callout':
      const calloutStyles = {
        info: { bg: "bg-accent/10", border: "border-accent", icon: <Info className="h-5 w-5 text-accent" /> },
        warning: { bg: "bg-orange-500/10", border: "border-orange-500", icon: <AlertTriangle className="h-5 w-5 text-orange-500" /> },
        tip: { bg: "bg-green-500/10", border: "border-green-500", icon: <Lightbulb className="h-5 w-5 text-green-500" /> },
      };
      const style = calloutStyles[section.calloutType || 'info'];
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay }}
          className={`flex gap-4 rounded-lg border ${style.border} ${style.bg} p-4 mb-6`}
        >
          <div className="shrink-0 mt-0.5">{style.icon}</div>
          <p className="text-foreground/90">{section.content}</p>
        </motion.div>
      );

    case 'table':
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: baseDelay }}
          className="mb-6 overflow-x-auto"
        >
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-primary/20">
                {section.tableData?.headers.map((header, i) => (
                  <th key={i} className="border border-border px-4 py-3 text-left font-heading font-semibold text-foreground">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.tableData?.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="even:bg-muted/30">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-border px-4 py-3 text-foreground/90">
                      {cell}
                    </td>
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
    <motion.article
      key={chapter.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-57px)]"
    >
      {/* Chapter Header */}
      <div className="border-b border-border bg-gradient-to-b from-secondary/50 to-transparent px-6 py-12 md:px-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary mb-4">
            Chapter {chapter.number}
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-3">
            {chapter.title}
          </h1>
          {chapter.subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground font-heading">
              {chapter.subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Chapter Body */}
      <div className="px-6 py-8 md:px-12 md:py-12 max-w-4xl">
        {chapter.content.map((section, index) => renderSection(section, index))}
      </div>

      {/* Navigation */}
      <div className="border-t border-border px-6 py-6 md:px-12">
        <div className="flex items-center justify-between max-w-4xl">
          <Button
            variant="outline"
            onClick={() => onNavigate('prev')}
            disabled={!hasPrev}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => onNavigate('next')}
            disabled={!hasNext}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default ChapterContent;
