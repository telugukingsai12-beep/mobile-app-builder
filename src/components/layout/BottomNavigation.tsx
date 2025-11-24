import { Home, Compass, MessageSquare, User } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface BottomNavigationProps {
  userRole?: 'admin' | 'ngo' | 'volunteer' | 'donor';
}

export const BottomNavigation = ({ userRole = 'volunteer' }: BottomNavigationProps) => {
  const getDashboardRoute = () => {
    switch (userRole) {
      case 'admin':
        return ROUTES.ADMIN_DASHBOARD;
      case 'ngo':
        return ROUTES.NGO_DASHBOARD;
      case 'donor':
        return ROUTES.DONOR_DASHBOARD;
      default:
        return ROUTES.VOLUNTEER_DASHBOARD;
    }
  };

  const navItems: NavItem[] = [
    {
      icon: <Home className="h-5 w-5" />,
      label: 'Home',
      path: getDashboardRoute(),
    },
    {
      icon: <Compass className="h-5 w-5" />,
      label: 'Discover',
      path: userRole === 'volunteer' ? ROUTES.OPPORTUNITIES : ROUTES.EVENTS,
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: 'Messages',
      path: ROUTES.MESSAGES,
    },
    {
      icon: <User className="h-5 w-5" />,
      label: 'Profile',
      path: ROUTES.PROFILE,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 py-3 px-6 touch-friendly transition-colors text-muted-foreground hover:text-foreground"
              activeClassName="text-primary"
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};
