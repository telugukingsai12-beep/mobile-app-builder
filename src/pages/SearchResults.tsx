import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('environment');
  const [menuOpen, setMenuOpen] = useState(false);

  const ngoResults = [
    {
      id: '1',
      name: 'Green Earth Foundation',
      description: 'Working towards environmental conservation',
      avatar: '/placeholder.svg',
      verified: true,
      category: 'Environment',
    },
  ];

  const eventResults = [
    {
      id: '1',
      title: 'Tree Plantation Drive',
      ngo: 'Green Earth Foundation',
      date: 'Dec 1, 2024',
      location: 'Central Park',
      category: 'Environment',
    },
  ];

  const opportunityResults = [
    {
      id: '1',
      title: 'Environmental Awareness Campaign',
      ngo: 'Green Earth Foundation',
      type: 'Regular',
      category: 'Environment',
    },
  ];

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Search Results</h1>
          <p className="text-muted-foreground">
            Showing results for "{searchQuery}"
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
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
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">
              All ({ngoResults.length + eventResults.length + opportunityResults.length})
            </TabsTrigger>
            <TabsTrigger value="ngos">NGOs ({ngoResults.length})</TabsTrigger>
            <TabsTrigger value="events">Events ({eventResults.length})</TabsTrigger>
            <TabsTrigger value="opportunities">
              Opportunities ({opportunityResults.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {/* NGOs */}
            <div>
              <h3 className="font-semibold text-lg mb-3">NGOs</h3>
              {ngoResults.map((ngo) => (
                <Card
                  key={ngo.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer mb-3"
                  onClick={() => navigate(`/ngo/${ngo.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={ngo.avatar} />
                      <AvatarFallback>{ngo.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{ngo.name}</h4>
                        {ngo.verified && <Badge variant="secondary">Verified</Badge>}
                        <Badge variant="outline">{ngo.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{ngo.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Events */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Events</h3>
              {eventResults.map((event) => (
                <Card
                  key={event.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer mb-3"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold mb-1">{event.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{event.ngo}</p>
                      <div className="flex gap-2 text-xs text-muted-foreground">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                </Card>
              ))}
            </div>

            {/* Opportunities */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Opportunities</h3>
              {opportunityResults.map((opp) => (
                <Card
                  key={opp.id}
                  className="p-4 hover:shadow-md transition-shadow cursor-pointer mb-3"
                  onClick={() => navigate(`/opportunities/${opp.id}`)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold mb-1">{opp.title}</h4>
                      <p className="text-sm text-muted-foreground">{opp.ngo}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{opp.type}</Badge>
                      <Badge variant="outline">{opp.category}</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ngos">
            <p className="text-center text-muted-foreground py-8">NGO results will appear here</p>
          </TabsContent>

          <TabsContent value="events">
            <p className="text-center text-muted-foreground py-8">
              Event results will appear here
            </p>
          </TabsContent>

          <TabsContent value="opportunities">
            <p className="text-center text-muted-foreground py-8">
              Opportunity results will appear here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
