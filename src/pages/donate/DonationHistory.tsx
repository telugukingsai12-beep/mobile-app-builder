import { useState } from 'react';
import { Calendar, Download, Filter, TrendingUp } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DonationHistory() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const donations = [
    {
      id: '1',
      ngo: {
        name: 'Green Earth Foundation',
        avatar: '/placeholder.svg',
      },
      amount: '₹1,000',
      date: 'Dec 15, 2024',
      time: '2:30 PM',
      status: 'completed',
      transactionId: 'TXN123456789',
      impactUpdate: 'Your donation helped plant 50 trees this month!',
    },
    {
      id: '2',
      ngo: {
        name: 'Education First',
        avatar: '/placeholder.svg',
      },
      amount: '₹500',
      date: 'Dec 10, 2024',
      time: '11:15 AM',
      status: 'completed',
      transactionId: 'TXN987654321',
      impactUpdate: 'Provided books to 10 children',
    },
    {
      id: '3',
      ngo: {
        name: 'Health for All',
        avatar: '/placeholder.svg',
      },
      amount: '₹2,000',
      date: 'Nov 28, 2024',
      time: '4:45 PM',
      status: 'completed',
      transactionId: 'TXN456789123',
      impactUpdate: null,
    },
  ];

  const totalDonated = donations.reduce(
    (sum, d) => sum + parseInt(d.amount.replace('₹', '').replace(',', '')),
    0
  );

  return (
    <Layout userRole="donor" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Donation History</h1>
          <p className="text-muted-foreground">Track your contributions and impact</p>
        </div>

        {/* Summary Card */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground mb-1">Total Donated</p>
              <p className="text-4xl font-bold text-primary">₹{totalDonated.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {donations.length} donations this year
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Filters */}
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
              <Button variant="outline" className="w-full gap-2">
                <Filter className="h-4 w-4" />
                Filter by NGO
              </Button>
            </div>
          </div>
        </Card>

        {/* Donation List */}
        <div className="space-y-4">
          {donations.map((donation) => (
            <Card key={donation.id} className="p-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={donation.ngo.avatar} />
                      <AvatarFallback>{donation.ngo.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{donation.ngo.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {donation.date} • {donation.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{donation.amount}</p>
                    <Badge variant="secondary" className="mt-1">
                      {donation.status}
                    </Badge>
                  </div>
                </div>

                {/* Impact Update */}
                {donation.impactUpdate && (
                  <div className="bg-muted rounded-lg p-4 flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm mb-1">Impact Update</p>
                      <p className="text-sm text-muted-foreground">
                        {donation.impactUpdate}
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-mono">{donation.transactionId}</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Receipt
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
