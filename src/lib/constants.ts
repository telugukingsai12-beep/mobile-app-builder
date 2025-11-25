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
  EDIT_PROFILE: '/profile/edit',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  MESSAGES_CHAT: '/messages/:conversationId',
  EVENTS: '/events',
  EVENT_DETAILS: '/events/:id',
  CREATE_EVENT: '/events/create',
  OPPORTUNITIES: '/opportunities',
  OPPORTUNITY_DETAILS: '/opportunities/:id',
  VOLUNTEER_BOOKINGS: '/volunteer/bookings',
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
