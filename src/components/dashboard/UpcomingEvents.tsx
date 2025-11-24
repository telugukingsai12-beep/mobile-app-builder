import { Calendar, MapPin, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  volunteers: number;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface UpcomingEventsProps {
  events: Event[];
  onViewAll?: () => void;
}

export const UpcomingEvents = ({ events, onViewAll }: UpcomingEventsProps) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Upcoming Events</h3>
        {onViewAll && (
          <Button variant="ghost" size="sm" onClick={onViewAll}>
            View All
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium">{event.title}</h4>
              <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                {event.status}
              </Badge>
            </div>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>{event.volunteers} volunteers</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
