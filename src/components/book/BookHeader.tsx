import { Book, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface BookHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const BookHeader = ({ isSidebarOpen, toggleSidebar }: BookHeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden text-foreground hover:bg-secondary"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Book className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-heading text-lg font-semibold text-foreground">
                Physical AI & Humanoid Robotics
              </h1>
              <p className="text-xs text-muted-foreground">Textbook — First Edition</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block text-sm text-muted-foreground">
            Panaversity
          </span>
        </div>
      </div>
    </motion.header>
  );
};

export default BookHeader;
