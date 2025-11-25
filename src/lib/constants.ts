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
  VOLUNTEER_BOOKINGS: '/volunteer/bookings',
  
  // Donor routes
  DONOR_DASHBOARD: '/donor/dashboard',
  DONOR_HISTORY: '/donor/history',
  
  // Admin routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_USERS: '/admin/users',
  ADMIN_MODERATION: '/admin/moderation',
  ADMIN_ANALYTICS: '/admin/analytics',
  
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
  DONATE: '/donate',
  DONATE_CHECKOUT: '/donate/:ngoId',
  DONATE_SUCCESS: '/donate/success',
  SEARCH: '/search',
  NOTIFICATIONS: '/notifications',
  HELP: '/help',
  OFFLINE: '/offline',
} as const;

// User roles
export type UserRole = 'admin' | 'ngo' | 'volunteer' | 'donor';

export const USER_ROLES = {
  ADMIN: 'admin' as UserRole,
  NGO: 'ngo' as UserRole,
  VOLUNTEER: 'volunteer' as UserRole,
  DONOR: 'donor' as UserRole,
} as const;
