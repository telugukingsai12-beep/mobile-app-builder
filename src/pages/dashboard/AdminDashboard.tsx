import { useState } from 'react';
import { Users, Shield, BarChart3, AlertTriangle, Database, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const stats = [
    { icon: Users, label: 'Total Users', value: 1248, trend: { value: '+156 this month', isPositive: true } },
    { icon: Shield, label: 'Verified NGOs', value: 45, trend: { value: '5 pending', isPositive: false } },
    { icon: BarChart3, label: 'Platform Activity', value: '95%', trend: { value: 'High engagement', isPositive: true } },
  ];

  const activities = [
    { id: '1', title: 'New NGO Registration', description: 'Health Heroes submitted verification documents', timestamp: '1 hour ago', type: 'system' as const },
    { id: '2', title: 'Content Reported', description: 'Event flagged for review by user', timestamp: '3 hours ago', type: 'system' as const },
    { id: '3', title: 'User Milestone', description: 'Platform reached 1,000 active volunteers', timestamp: '1 day ago', type: 'system' as const },
  ];

  const pendingApprovals = [
    { id: '1', type: 'NGO Verification', title: 'Health Heroes', description: 'Healthcare organization awaiting verification', priority: 'high' },
    { id: '2', type: 'Content Moderation', title: 'Event Report', description: 'User reported inappropriate content', priority: 'medium' },
    { id: '3', type: 'User Appeal', title: 'Account Suspension', description: 'User appealing account suspension', priority: 'low' },
  ];

  const quickActions = [
    { icon: Users, label: 'Manage Users', onClick: () => navigate('/admin/users'), variant: 'default' as const },
    { icon: Shield, label: 'Verify NGOs', onClick: () => navigate('/admin/verifications') },
    { icon: Eye, label: 'Content Moderation', onClick: () => navigate('/admin/moderation') },
    { icon: BarChart3, label: 'View Analytics', onClick: () => navigate('/admin/analytics') },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Layout userRole="admin" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 text-white rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-white/90">Manage and monitor the NGOCONNECT platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <StatsCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* System Alerts */}
        <Card className="p-4 border-yellow-500/50 bg-yellow-500/5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold">System Alerts</h3>
          </div>
          <p className="text-sm text-muted-foreground">5 NGO verifications pending approval</p>
        </Card>

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Pending Approvals */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Pending Approvals</h3>
            <Badge variant="secondary">{pendingApprovals.length} items</Badge>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div key={item.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="outline" className="mb-2">{item.type}</Badge>
                    <h4 className="font-medium">{item.title}</h4>
                  </div>
                  <Badge variant={getPriorityColor(item.priority)}>{item.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default">Review</Button>
                  <Button size="sm" variant="outline">Dismiss</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activities */}
        <ActivityFeed activities={activities} />
      </div>
    </Layout>
  );
}
