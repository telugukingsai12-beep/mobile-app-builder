import { useState } from 'react';
import { Search, Filter, Bookmark, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OpportunitiesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const opportunities = [
    {
      id: '1',
      title: 'Community Teaching Assistant',
      ngo: 'Education First',
      location: 'Mumbai, Maharashtra',
      type: 'Regular',
      commitment: '4 hours/week',
      matchPercentage: 95,
      skills: ['Teaching', 'Communication'],
      applied: false,
    },
    {
      id: '2',
      title: 'Animal Shelter Volunteer',
      ngo: 'Pet Care Foundation',
      location: 'Delhi',
      type: 'Flexible',
      commitment: '2-3 hours/week',
      matchPercentage: 88,
      skills: ['Animal Care', 'Compassion'],
      applied: false,
    },
    {
      id: '3',
      title: 'Web Developer for NGO',
      ngo: 'Tech for Good',
      location: 'Remote',
      type: 'Project-based',
      commitment: '10 hours total',
      matchPercentage: 92,
      skills: ['Web Development', 'React'],
      applied: true,
    },
  ];

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Volunteer Opportunities</h1>
          <p className="text-muted-foreground">Find opportunities that match your skills and interests</p>
        </div>

        {/* Search */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search opportunities..."
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
        <Tabs defaultValue="recommended" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="all">All Opportunities</TabsTrigger>
            <TabsTrigger value="applied">Applied</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended" className="space-y-4">
            {opportunities.map((opp) => (
              <Card
                key={opp.id}
                className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/opportunities/${opp.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">{opp.title}</h3>
                      <Badge variant="secondary">{opp.matchPercentage}% Match</Badge>
                      {opp.applied && <Badge>Applied</Badge>}
                    </div>
                    <p className="text-muted-foreground">{opp.ngo}</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bookmark className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{opp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{opp.commitment}</span>
                  </div>
                  <Badge variant="outline">{opp.type}</Badge>
                </div>

                <div className="flex gap-2 mb-4">
                  {opp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>

                <Button className="w-full sm:w-auto">View Details</Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all">
            <p className="text-center text-muted-foreground py-8">All opportunities will be shown here</p>
          </TabsContent>

          <TabsContent value="applied">
            <p className="text-center text-muted-foreground py-8">Your applications will appear here</p>
          </TabsContent>

          <TabsContent value="saved">
            <p className="text-center text-muted-foreground py-8">Saved opportunities will appear here</p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
