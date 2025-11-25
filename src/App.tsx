import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import NGODashboard from "./pages/dashboard/NGODashboard";
import VolunteerDashboard from "./pages/dashboard/VolunteerDashboard";
import DonorDashboard from "./pages/dashboard/DonorDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Settings from "./pages/profile/Settings";
import EventsList from "./pages/events/EventsList";
import EventDetails from "./pages/events/EventDetails";
import CreateEvent from "./pages/events/CreateEvent";
import OpportunitiesList from "./pages/opportunities/OpportunitiesList";
import OpportunityDetails from "./pages/opportunities/OpportunityDetails";
import MyBookings from "./pages/volunteer/MyBookings";
import MessagesList from "./pages/messages/MessagesList";
import ChatScreen from "./pages/messages/ChatScreen";
import DonationScreen from "./pages/donate/DonationScreen";
import DonationCheckout from "./pages/donate/DonationCheckout";
import DonationSuccess from "./pages/donate/DonationSuccess";
import DonationHistory from "./pages/donate/DonationHistory";
import UserManagement from "./pages/admin/UserManagement";
import ContentModeration from "./pages/admin/ContentModeration";
import PlatformAnalytics from "./pages/admin/PlatformAnalytics";
import SearchResults from "./pages/SearchResults";
import Notifications from "./pages/Notifications";
import HelpSupport from "./pages/HelpSupport";
import Offline from "./pages/Offline";
import { ROUTES } from "./lib/constants";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          
          {/* Dashboard Routes */}
          <Route path={ROUTES.NGO_DASHBOARD} element={<NGODashboard />} />
          <Route path={ROUTES.VOLUNTEER_DASHBOARD} element={<VolunteerDashboard />} />
          <Route path={ROUTES.DONOR_DASHBOARD} element={<DonorDashboard />} />
          <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          
          {/* Profile Routes */}
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path={ROUTES.EDIT_PROFILE} element={<EditProfile />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
          
          {/* Event Routes */}
          <Route path={ROUTES.EVENTS} element={<EventsList />} />
          <Route path={ROUTES.EVENT_DETAILS} element={<EventDetails />} />
          <Route path={ROUTES.CREATE_EVENT} element={<CreateEvent />} />
          
          {/* Opportunity Routes */}
          <Route path={ROUTES.OPPORTUNITIES} element={<OpportunitiesList />} />
          <Route path={ROUTES.OPPORTUNITY_DETAILS} element={<OpportunityDetails />} />
          
          {/* Volunteer Routes */}
          <Route path={ROUTES.VOLUNTEER_BOOKINGS} element={<MyBookings />} />
          
          {/* Message Routes */}
          <Route path={ROUTES.MESSAGES} element={<MessagesList />} />
          <Route path={ROUTES.MESSAGES_CHAT} element={<ChatScreen />} />
          
          {/* Donation Routes */}
          <Route path={ROUTES.DONATE} element={<DonationScreen />} />
          <Route path={ROUTES.DONATE_CHECKOUT} element={<DonationCheckout />} />
          <Route path={ROUTES.DONATE_SUCCESS} element={<DonationSuccess />} />
          <Route path={ROUTES.DONOR_HISTORY} element={<DonationHistory />} />
          
          {/* Admin Routes */}
          <Route path={ROUTES.ADMIN_USERS} element={<UserManagement />} />
          <Route path={ROUTES.ADMIN_MODERATION} element={<ContentModeration />} />
          <Route path={ROUTES.ADMIN_ANALYTICS} element={<PlatformAnalytics />} />
          
          {/* Utility Routes */}
          <Route path={ROUTES.SEARCH} element={<SearchResults />} />
          <Route path={ROUTES.NOTIFICATIONS} element={<Notifications />} />
          <Route path={ROUTES.HELP} element={<HelpSupport />} />
          <Route path={ROUTES.OFFLINE} element={<Offline />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
