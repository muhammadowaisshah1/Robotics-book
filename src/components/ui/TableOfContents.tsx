import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -35% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden xl:block sticky top-24 w-64 shrink-0"
    >
      <div className="border-l border-border pl-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <List className="h-4 w-4" />
          On this page
        </div>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-sm transition-colors duration-200",
                  item.level === 2 ? "pl-0" : "pl-4",
                  activeId === item.id
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default TableOfContents;
