import { useState } from 'react';
import { Users, Calendar, DollarSign, MessageSquare, Plus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { UpcomingEvents } from '@/components/dashboard/UpcomingEvents';

export default function NGODashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { icon: Users, label: 'Active Volunteers', value: 45, trend: { value: '+12% this month', isPositive: true } },
    { icon: Calendar, label: 'Upcoming Events', value: 8, trend: { value: '3 this week', isPositive: true } },
    { icon: DollarSign, label: 'Total Donations', value: '₹2,45,000', trend: { value: '+18% this month', isPositive: true } },
  ];

  const activities = [
    { id: '1', title: 'New Volunteer Application', description: 'Priya Kumar applied for Tree Plantation Drive', timestamp: '2 hours ago', type: 'volunteer' as const },
    { id: '2', title: 'Donation Received', description: 'Anonymous donated ₹5,000', timestamp: '5 hours ago', type: 'donation' as const },
    { id: '3', title: 'Event Published', description: 'Beach Cleanup Drive is now live', timestamp: '1 day ago', type: 'event' as const },
  ];

  const upcomingEvents = [
    { id: '1', title: 'Tree Plantation Drive', date: 'Dec 1, 2024 9:00 AM', location: 'Central Park', volunteers: 25, status: 'upcoming' as const },
    { id: '2', title: 'Beach Cleanup', date: 'Dec 5, 2024 7:00 AM', location: 'Marina Beach', volunteers: 40, status: 'upcoming' as const },
  ];

  const quickActions = [
    { icon: Plus, label: 'Create Event', onClick: () => navigate('/events/create'), variant: 'default' as const },
    { icon: Plus, label: 'Post Opportunity', onClick: () => navigate('/opportunities/create'), variant: 'default' as const },
    { icon: MessageSquare, label: 'View Messages', onClick: () => navigate('/messages') },
    { icon: Eye, label: 'View Applications', onClick: () => navigate('/ngo/applications') },
  ];

  return (
    <Layout userRole="ngo" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Green Earth Foundation!</h1>
          <p className="text-primary-foreground/90">Here's what's happening with your organization today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Upcoming Events & Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UpcomingEvents events={upcomingEvents} onViewAll={() => navigate('/events')} />
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </Layout>
  );
}
