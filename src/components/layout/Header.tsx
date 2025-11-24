import { Search, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onMenuClick?: () => void;
  showSearch?: boolean;
  title?: string;
}

export const Header = ({ onMenuClick, showSearch = true, title }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <Button
              variant="ghost"
              size="icon"
              className="touch-friendly"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary" />
            {title && <h1 className="text-lg font-semibold">{title}</h1>}
          </div>
        </div>

        {showSearch && (
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-9"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative touch-friendly">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
          </Button>
        </div>
      </div>
    </header>
  );
};
