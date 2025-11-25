import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users, Share2, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TimeSlotPicker } from '@/components/events/TimeSlotPicker';

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const event = {
    id: '1',
    title: 'Tree Plantation Drive',
    description: 'Join us for a meaningful tree plantation drive where we will plant over 500 saplings in the Central Park area. This event is perfect for nature lovers and those who want to contribute to environmental conservation. All necessary equipment will be provided.',
    date: 'Dec 1, 2024',
    location: 'Central Park, Mumbai',
    category: 'Environment',
    image: '/placeholder.svg',
    ngo: {
      name: 'Green Earth Foundation',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.8,
    },
    skills: ['Physical Fitness', 'Teamwork', 'Outdoor Work'],
    timeSlots: [
      { id: '1', time: '9:00 AM - 11:00 AM', available: 15, total: 25 },
      { id: '2', time: '11:00 AM - 1:00 PM', available: 8, total: 25 },
      { id: '3', time: '2:00 PM - 4:00 PM', available: 20, total: 25 },
    ],
  };

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/events')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Button>

        {/* Hero Image */}
        <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <Badge className="absolute top-4 right-4">{event.category}</Badge>
        </div>

        {/* Event Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          {/* NGO Info */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={event.ngo.avatar} />
                <AvatarFallback>{event.ngo.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{event.ngo.name}</h3>
                  {event.ngo.verified && <Badge variant="secondary">Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">Rating: {event.ngo.rating}/5.0</p>
              </div>
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
          </Card>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About This Event</h2>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Skills Required */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Skills Required</h2>
            <div className="flex gap-2 flex-wrap">
              {event.skills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Available Time Slots</h2>
            <TimeSlotPicker
              slots={event.timeSlots}
              selectedSlot={selectedSlot}
              onSelectSlot={setSelectedSlot}
            />
          </div>

          {/* Register Button */}
          <Button 
            className="w-full" 
            size="lg"
            disabled={!selectedSlot}
            onClick={() => console.log('Register for slot:', selectedSlot)}
          >
            Register for Event
          </Button>
        </div>
      </div>
    </Layout>
  );
}
