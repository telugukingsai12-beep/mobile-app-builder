import { Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'event' | 'volunteer' | 'donation' | 'system';
}

interface ActivityFeedProps {
  activities: Activity[];
}

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'event':
        return 'bg-blue-500/10 text-blue-500';
      case 'volunteer':
        return 'bg-green-500/10 text-green-500';
      case 'donation':
        return 'bg-purple-500/10 text-purple-500';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Recent Activities</h3>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity.type)}`}>
                <Clock className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-xs text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
