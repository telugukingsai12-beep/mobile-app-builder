import { useState } from 'react';
import { DollarSign, Heart, TrendingUp, Search, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function DonorDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { icon: DollarSign, label: 'Total Donated', value: '₹25,000', trend: { value: '+₹5,000 this month', isPositive: true } },
    { icon: Heart, label: 'NGOs Supported', value: 8, trend: { value: '2 new this month', isPositive: true } },
    { icon: TrendingUp, label: 'Lives Impacted', value: '500+', trend: { value: 'Growing impact', isPositive: true } },
  ];

  const activities = [
    { id: '1', title: 'Donation Successful', description: 'Donated ₹5,000 to Green Earth Foundation', timestamp: '3 days ago', type: 'donation' as const },
    { id: '2', title: 'Impact Update', description: 'Your contribution helped plant 50 trees', timestamp: '1 week ago', type: 'system' as const },
    { id: '3', title: 'Thank You Message', description: 'Ocean Warriors NGO sent you a message', timestamp: '2 weeks ago', type: 'system' as const },
  ];

  const recommendedNGOs = [
    { id: '1', name: 'Green Earth Foundation', cause: 'Environmental Conservation', verified: true, impact: '5,000 trees planted' },
    { id: '2', name: 'Education For All', cause: 'Child Education', verified: true, impact: '200 children educated' },
    { id: '3', name: 'Health Heroes', cause: 'Healthcare', verified: true, impact: '1,000 patients treated' },
  ];

  const quickActions = [
    { icon: Heart, label: 'Quick Donate', onClick: () => navigate('/donate'), variant: 'default' as const },
    { icon: Search, label: 'Explore NGOs', onClick: () => navigate('/discover') },
    { icon: History, label: 'Donation History', onClick: () => navigate('/donor/history') },
  ];

  return (
    <Layout userRole="donor" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Priya!</h1>
          <p className="text-white/90">Your generosity is creating real change in the world.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Recommended NGOs */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recommended NGOs</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/discover')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedNGOs.map((ngo) => (
              <Card key={ngo.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/ngo/${ngo.id}`)}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{ngo.name}</h4>
                  {ngo.verified && <Badge variant="secondary">Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{ngo.cause}</p>
                <p className="text-xs text-primary font-medium">{ngo.impact}</p>
              </Card>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <ActivityFeed activities={activities} />
      </div>
    </Layout>
  );
}
