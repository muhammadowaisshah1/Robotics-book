import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { chapters } from "@/data/bookContent";
import { BookOpen, Home, Cpu, Box, Brain, MessageSquare, Bot, Wrench, GraduationCap } from "lucide-react";

const chapterIcons: Record<string, React.ReactNode> = {
  "introduction": <Home className="h-4 w-4" />,
  "module-1": <Cpu className="h-4 w-4" />,
  "module-2": <Box className="h-4 w-4" />,
  "module-3": <Brain className="h-4 w-4" />,
  "module-4": <MessageSquare className="h-4 w-4" />,
  "humanoid-development": <Bot className="h-4 w-4" />,
  "hardware": <Wrench className="h-4 w-4" />,
  "assessments": <GraduationCap className="h-4 w-4" />,
};

interface BookSidebarProps {
  isOpen: boolean;
  currentChapter: string;
  onChapterSelect: (chapterId: string) => void;
}

const BookSidebar = ({ isOpen, currentChapter, onChapterSelect }: BookSidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => onChapterSelect(currentChapter)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -300,
        }}
        className={cn(
          "fixed left-0 top-[57px] z-40 h-[calc(100vh-57px)] w-72 border-r border-border bg-card",
          "lg:translate-x-0 lg:transition-none"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <span className="font-heading font-semibold">Table of Contents</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {chapters.map((chapter, index) => (
                <motion.li
                  key={chapter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => onChapterSelect(chapter.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200",
                      currentChapter === chapter.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <span className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm",
                      currentChapter === chapter.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {chapterIcons[chapter.id] || chapter.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        "truncate text-sm font-medium",
                        currentChapter === chapter.id ? "text-foreground" : ""
                      )}>
                        {chapter.title}
                      </p>
                      {chapter.subtitle && (
                        <p className="truncate text-xs text-muted-foreground">
                          {chapter.subtitle}
                        </p>
                      )}
                    </div>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border p-4">
            <p className="text-xs text-muted-foreground text-center">
              © 2025 Panaversity
            </p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default BookSidebar;
