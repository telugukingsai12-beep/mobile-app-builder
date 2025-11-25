import { useState } from 'react';
import { Search, Filter, MapPin, Calendar, Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';

export default function EventsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ['Environment', 'Education', 'Health', 'Animal Welfare', 'Community'];

  const events = [
    {
      id: '1',
      title: 'Tree Plantation Drive',
      date: 'Dec 1, 2024',
      time: '9:00 AM',
      location: 'Central Park, Mumbai',
      volunteers: 25,
      maxVolunteers: 50,
      category: 'Environment',
      image: '/placeholder.svg',
      ngo: 'Green Earth Foundation',
    },
    {
      id: '2',
      title: 'Beach Cleanup Campaign',
      date: 'Dec 5, 2024',
      time: '7:00 AM',
      location: 'Marina Beach, Chennai',
      volunteers: 40,
      maxVolunteers: 60,
      category: 'Environment',
      image: '/placeholder.svg',
      ngo: 'Ocean Warriors',
    },
    {
      id: '3',
      title: 'Free Medical Camp',
      date: 'Dec 8, 2024',
      time: '10:00 AM',
      location: 'Community Center, Delhi',
      volunteers: 15,
      maxVolunteers: 30,
      category: 'Health',
      image: '/placeholder.svg',
      ngo: 'Health for All',
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Volunteer Events</h1>
          <p className="text-muted-foreground">Find and join events that match your interests</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events or locations..."
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

        {/* Category Chips */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={selectedCategory === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="aspect-video bg-muted relative">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                <Badge className="absolute top-3 right-3">{event.category}</Badge>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.ngo}</p>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.volunteers}/{event.maxVolunteers} volunteers</span>
                  </div>
                </div>
                <Button className="w-full" size="sm">View Details</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* FAB for NGOs */}
        <FloatingActionButton
          onClick={() => navigate('/events/create')}
          label="Create Event"
        />
      </div>
    </Layout>
  );
}
