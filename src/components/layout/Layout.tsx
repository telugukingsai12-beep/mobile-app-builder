import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showBottomNav?: boolean;
}

export const Layout = ({ children, className, showBottomNav = false }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <main className={cn(
        'container mx-auto px-4 py-6',
        showBottomNav && 'pb-20',
        className
      )}>
        {children}
      </main>
    </div>
  );
};
