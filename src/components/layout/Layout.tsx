import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { HamburgerMenu } from './HamburgerMenu';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showBottomNav?: boolean;
  userRole?: 'admin' | 'ngo' | 'volunteer' | 'donor';
  menuOpen?: boolean;
  onMenuToggle?: () => void;
}

export const Layout = ({ 
  children, 
  className, 
  showBottomNav = true,
  userRole = 'volunteer',
  menuOpen = false,
  onMenuToggle
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={onMenuToggle} showSearch={true} />
      <main className={cn(
        'container mx-auto px-4 py-6',
        showBottomNav && 'pb-20',
        className
      )}>
        {children}
      </main>
      {showBottomNav && <BottomNavigation userRole={userRole} />}
      <HamburgerMenu isOpen={menuOpen} onClose={() => onMenuToggle?.()} userRole={userRole} />
    </div>
  );
};
