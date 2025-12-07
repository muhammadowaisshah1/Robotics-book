import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import BookHeader from "@/components/book/BookHeader";
import BookSidebar from "@/components/book/BookSidebar";
import BookCover from "@/components/book/BookCover";
import ChapterContent from "@/components/book/ChapterContent";
import { chapters } from "@/data/bookContent";
import { cn } from "@/lib/utils";

const Index = () => {
  const [currentView, setCurrentView] = useState<'cover' | 'chapter'>('cover');
  const [currentChapterId, setCurrentChapterId] = useState(chapters[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentChapter = chapters.find(ch => ch.id === currentChapterId) || chapters[0];
  const currentIndex = chapters.findIndex(ch => ch.id === currentChapterId);

  const handleStartReading = useCallback(() => {
    setCurrentView('chapter');
    setCurrentChapterId(chapters[0].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChapterSelect = useCallback((chapterId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentView('chapter');
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex >= 0 && newIndex < chapters.length) {
      setCurrentChapterId(chapters[newIndex].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  if (currentView === 'cover') {
    return <BookCover onStartReading={handleStartReading} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <BookHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <BookSidebar
        isOpen={isSidebarOpen}
        currentChapter={currentChapterId}
        onChapterSelect={handleChapterSelect}
      />
      
      <main className={cn(
        "pt-[57px] transition-all duration-300",
        "lg:ml-72"
      )}>
        <AnimatePresence mode="wait">
          <ChapterContent
            key={currentChapterId}
            chapter={currentChapter}
            onNavigate={handleNavigate}
            hasPrev={currentIndex > 0}
            hasNext={currentIndex < chapters.length - 1}
          />
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
