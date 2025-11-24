// Route constants
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // NGO routes
  NGO_DASHBOARD: '/ngo/dashboard',
  
  // Volunteer routes
  VOLUNTEER_DASHBOARD: '/volunteer/dashboard',
  
  // Donor routes
  DONOR_DASHBOARD: '/donor/dashboard',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  
  // Common routes
  PROFILE: '/profile',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  EVENTS: '/events',
  OPPORTUNITIES: '/opportunities',
  DONATE: '/donate',
} as const;

// User roles
export type UserRole = 'admin' | 'ngo' | 'volunteer' | 'donor';

export const USER_ROLES = {
  ADMIN: 'admin' as UserRole,
  NGO: 'ngo' as UserRole,
  VOLUNTEER: 'volunteer' as UserRole,
  DONOR: 'donor' as UserRole,
} as const;
