import { Search } from "lucide-react";
import { motion } from "motion/react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onLogoClick?: () => void;
}

export function Header({ onSearch, onLogoClick }: HeaderProps) {
  return (
    <header className="border-b border-border px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center gap-3 sm:gap-4">
        <motion.button
          className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onLogoClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img
            src="/logo.svg"
            alt="Watch Me logo"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
          />
          <span className="text-lg sm:text-xl font-medium whitespace-nowrap">
            Watch Me
          </span>
        </motion.button>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for movies, shows, etc..."
              className="w-full bg-input-background rounded-full pl-10 pr-4 py-2 text-sm sm:text-base outline-none focus:ring-2 focus:ring-ring transition-shadow"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}
