import { useState } from 'react';
import { Clock, Award, Calendar, Heart, Search, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecommendationCard } from '@/components/dashboard/RecommendationCard';

export default function VolunteerDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { icon: Clock, label: 'Hours Contributed', value: 124, trend: { value: '+8 this month', isPositive: true } },
    { icon: Calendar, label: 'Events Attended', value: 15, trend: { value: '2 upcoming', isPositive: true } },
    { icon: Award, label: 'Impact Points', value: 450, trend: { value: 'Top 10%', isPositive: true } },
  ];

  const activities = [
    { id: '1', title: 'Completed Event', description: 'Tree Plantation Drive - 4 hours contributed', timestamp: '2 days ago', type: 'volunteer' as const },
    { id: '2', title: 'New Opportunity Match', description: 'Beach Cleanup matches your skills', timestamp: '1 week ago', type: 'event' as const },
    { id: '3', title: 'Achievement Unlocked', description: 'Earned "Environmental Hero" badge', timestamp: '2 weeks ago', type: 'system' as const },
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Beach Cleanup Drive',
      organization: 'Ocean Warriors NGO',
      location: 'Marina Beach, Chennai',
      matchPercentage: 95,
      skills: ['Environmental', 'Teamwork', 'Physical Activity'],
    },
    {
      id: '2',
      title: 'Teaching Assistant',
      organization: 'Education For All',
      location: 'Downtown Community Center',
      matchPercentage: 88,
      skills: ['Teaching', 'Communication', 'Patience'],
    },
  ];

  const quickActions = [
    { icon: Search, label: 'Find Opportunities', onClick: () => navigate('/opportunities'), variant: 'default' as const },
    { icon: Calendar, label: 'My Bookings', onClick: () => navigate('/volunteer/bookings') },
    { icon: Edit, label: 'Update Skills', onClick: () => navigate('/profile/edit') },
    { icon: Heart, label: 'Saved Opportunities', onClick: () => navigate('/volunteer/saved') },
  ];

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Rahul!</h1>
          <p className="text-white/90">You've made a real difference. Keep up the amazing work!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Recommended Opportunities */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                recommendation={rec}
                onApply={(id) => navigate(`/opportunities/${id}`)}
              />
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <ActivityFeed activities={activities} />
      </div>
    </Layout>
  );
}
