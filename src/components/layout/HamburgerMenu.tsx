import { 
  User, 
  Settings, 
  Calendar, 
  Heart, 
  BarChart3, 
  HelpCircle, 
  Info, 
  LogOut,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import { ROUTES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: 'admin' | 'ngo' | 'volunteer' | 'donor';
}

export const HamburgerMenu = ({ isOpen, onClose, userRole = 'volunteer' }: HamburgerMenuProps) => {
  const menuItems = [
    ...(userRole === 'volunteer' ? [
      { icon: Calendar, label: 'My Bookings', path: '/volunteer/bookings' }
    ] : []),
    ...(userRole === 'donor' ? [
      { icon: Heart, label: 'My Donations', path: '/donor/history' }
    ] : []),
    ...(userRole === 'ngo' ? [
      { icon: BarChart3, label: 'Analytics', path: '/ngo/analytics' }
    ] : []),
    ...(userRole === 'admin' ? [
      { icon: BarChart3, label: 'Admin Panel', path: ROUTES.ADMIN_DASHBOARD }
    ] : []),
    { icon: User, label: 'Profile', path: ROUTES.PROFILE },
    { icon: Settings, label: 'Settings', path: ROUTES.SETTINGS },
    { icon: HelpCircle, label: 'Help Center', path: '/help' },
    { icon: Info, label: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="touch-friendly"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors touch-friendly hover:bg-muted text-foreground"
                    activeClassName="bg-primary text-primary-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 touch-friendly"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
