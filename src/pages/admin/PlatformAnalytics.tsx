import { useState } from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Download } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function PlatformAnalytics() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const kpiData = [
    {
      label: 'Total Users',
      value: '2,456',
      change: '+12.5%',
      icon: Users,
      trend: 'up',
    },
    {
      label: 'Active Events',
      value: '89',
      change: '+8.2%',
      icon: Calendar,
      trend: 'up',
    },
    {
      label: 'Total Donations',
      value: '₹12.5L',
      change: '+18.7%',
      icon: DollarSign,
      trend: 'up',
    },
    {
      label: 'Volunteer Hours',
      value: '3,456',
      change: '+15.3%',
      icon: TrendingUp,
      trend: 'up',
    },
  ];

  const engagementData = [
    { metric: 'Daily Active Users', value: '456', percentage: 18.6 },
    { metric: 'Event Registrations', value: '234', percentage: 9.5 },
    { metric: 'Donation Completion Rate', value: '87%', percentage: 87 },
    { metric: 'Message Response Rate', value: '92%', percentage: 92 },
  ];

  return (
    <Layout userRole="admin" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Platform Analytics</h1>
            <p className="text-muted-foreground">Monitor platform performance and growth</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Date Range Picker */}
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">Apply Filter</Button>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((kpi) => (
            <Card key={kpi.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <kpi.icon className="h-8 w-8 text-primary" />
                <span className={`text-sm font-semibold ${
                  kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-3xl font-bold mb-1">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="engagement" className="space-y-6">
          <TabsList>
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="growth">Growth Trends</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="content">Content Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="engagement" className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Engagement Metrics</h3>
              <div className="space-y-4">
                {engagementData.map((item) => (
                  <div key={item.metric} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.metric}</span>
                      <span className="text-muted-foreground">{item.value}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Top Performing Events</h3>
              <div className="space-y-3">
                {[
                  { name: 'Tree Plantation Drive', volunteers: 125, engagement: 94 },
                  { name: 'Beach Cleanup', volunteers: 98, engagement: 89 },
                  { name: 'Community Food Drive', volunteers: 87, engagement: 92 },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.volunteers} volunteers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{event.engagement}%</p>
                      <p className="text-xs text-muted-foreground">Engagement</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="growth">
            <Card className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Growth charts will be displayed here
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="revenue">
            <Card className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Revenue analytics will be shown here
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card className="p-6">
              <p className="text-center text-muted-foreground py-8">
                Content statistics will appear here
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
