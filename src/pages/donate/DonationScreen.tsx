import { useState } from 'react';
import { Search, Filter, Heart, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DonationScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const quickAmounts = [100, 500, 1000, 5000];

  const featuredNGOs = [
    {
      id: '1',
      name: 'Green Earth Foundation',
      description: 'Working towards environmental conservation and sustainability',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.8,
      totalDonations: '₹2,45,000',
      supporters: 156,
      category: 'Environment',
    },
    {
      id: '2',
      name: 'Education First',
      description: 'Providing quality education to underprivileged children',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.9,
      totalDonations: '₹3,78,000',
      supporters: 243,
      category: 'Education',
    },
    {
      id: '3',
      name: 'Health for All',
      description: 'Healthcare services and medical camps for rural areas',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.7,
      totalDonations: '₹1,95,000',
      supporters: 98,
      category: 'Health',
    },
  ];

  const recentDonations = [
    { ngo: 'Green Earth Foundation', amount: '₹1,000', time: '2 hours ago' },
    { ngo: 'Education First', amount: '₹500', time: '1 day ago' },
  ];

  return (
    <Layout userRole="donor" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Support a Cause</h1>
          <p className="text-muted-foreground">Make a difference with your contribution</p>
        </div>

        {/* Quick Donate Section */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
          <h3 className="font-semibold text-lg mb-4">Quick Donate</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="lg"
                className="h-16 text-lg font-semibold"
              >
                ₹{amount}
              </Button>
            ))}
          </div>
          <Input
            type="number"
            placeholder="Enter custom amount"
            className="mb-3"
          />
          <Button className="w-full" size="lg">
            Continue to Donate
          </Button>
        </Card>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search NGOs or causes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent Donations</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-4">
            {featuredNGOs.map((ngo) => (
              <Card
                key={ngo.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/donate/${ngo.id}`)}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={ngo.avatar} />
                    <AvatarFallback>{ngo.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{ngo.name}</h3>
                        {ngo.verified && <Badge variant="secondary">Verified</Badge>}
                        <Badge variant="outline">{ngo.category}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{ngo.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{ngo.totalDonations}</span>
                        <span className="text-muted-foreground">raised</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="font-semibold">{ngo.supporters}</span>
                        <span className="text-muted-foreground">supporters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">{ngo.rating}</span>
                      </div>
                    </div>
                    <Button>Donate Now</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trending">
            <p className="text-center text-muted-foreground py-8">Trending NGOs will appear here</p>
          </TabsContent>

          <TabsContent value="recent" className="space-y-3">
            {recentDonations.map((donation, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{donation.ngo}</p>
                    <p className="text-sm text-muted-foreground">{donation.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-lg">
                    {donation.amount}
                  </Badge>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
