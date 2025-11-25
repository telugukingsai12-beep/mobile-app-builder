import { useState } from 'react';
import { Calendar, MapPin, Clock, QrCode, Star } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function MyBookings() {
  const [menuOpen, setMenuOpen] = useState(false);

  const upcomingBookings = [
    {
      id: '1',
      event: 'Tree Plantation Drive',
      ngo: 'Green Earth Foundation',
      date: 'Dec 1, 2024',
      time: '9:00 AM - 11:00 AM',
      location: 'Central Park, Mumbai',
      status: 'confirmed',
    },
    {
      id: '2',
      event: 'Beach Cleanup Campaign',
      ngo: 'Ocean Warriors',
      date: 'Dec 5, 2024',
      time: '7:00 AM - 9:00 AM',
      location: 'Marina Beach, Chennai',
      status: 'confirmed',
    },
  ];

  const pastBookings = [
    {
      id: '3',
      event: 'Community Food Drive',
      ngo: 'Help the Hungry',
      date: 'Nov 20, 2024',
      time: '10:00 AM - 2:00 PM',
      location: 'Community Center, Delhi',
      status: 'completed',
      hours: 4,
      rated: false,
    },
    {
      id: '4',
      event: 'Animal Shelter Support',
      ngo: 'Pet Care Foundation',
      date: 'Nov 15, 2024',
      time: '2:00 PM - 5:00 PM',
      location: 'City Animal Shelter',
      status: 'completed',
      hours: 3,
      rated: true,
      rating: 5,
    },
  ];

  const totalHours = 48;
  const goalHours = 100;

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
          <p className="text-muted-foreground">Track your volunteer activities and hours</p>
        </div>

        {/* Hours Tracking */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">Volunteer Hours</h3>
                <p className="text-muted-foreground text-sm">Your progress this year</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">{totalHours}</p>
                <p className="text-sm text-muted-foreground">of {goalHours} hours</p>
              </div>
            </div>
            <Progress value={(totalHours / goalHours) * 100} />
          </div>
        </Card>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{booking.event}</h3>
                      <p className="text-muted-foreground text-sm">{booking.ngo}</p>
                    </div>
                    <Badge variant="secondary">Confirmed</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <QrCode className="h-4 w-4" />
                      Check-in QR
                    </Button>
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{booking.event}</h3>
                      <p className="text-muted-foreground text-sm">{booking.ngo}</p>
                    </div>
                    <Badge>Completed</Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-primary">
                      <span>{booking.hours} hours</span>
                    </div>
                  </div>

                  {!booking.rated ? (
                    <Button variant="outline" className="w-full gap-2">
                      <Star className="h-4 w-4" />
                      Rate Your Experience
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span>You rated this {booking.rating}/5</span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
