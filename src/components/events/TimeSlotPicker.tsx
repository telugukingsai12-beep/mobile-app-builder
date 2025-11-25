import { Clock, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TimeSlot {
  id: string;
  time: string;
  available: number;
  total: number;
}

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (slotId: string) => void;
}

export const TimeSlotPicker = ({ slots, selectedSlot, onSelectSlot }: TimeSlotPickerProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {slots.map((slot) => {
        const isSelected = selectedSlot === slot.id;
        const isFull = slot.available === 0;
        const availabilityPercentage = (slot.available / slot.total) * 100;

        return (
          <Card
            key={slot.id}
            className={cn(
              'p-4 cursor-pointer transition-all hover:shadow-md',
              isSelected && 'border-primary bg-primary/5',
              isFull && 'opacity-50 cursor-not-allowed'
            )}
            onClick={() => !isFull && onSelectSlot(slot.id)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{slot.time}</span>
                </div>
                {isFull && <Badge variant="destructive">Full</Badge>}
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{slot.available} spots left</span>
                </div>
                <span className="text-muted-foreground">{slot.total} total</span>
              </div>

              {/* Availability Bar */}
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all',
                    availabilityPercentage > 50 && 'bg-green-500',
                    availabilityPercentage > 25 && availabilityPercentage <= 50 && 'bg-yellow-500',
                    availabilityPercentage <= 25 && 'bg-red-500'
                  )}
                  style={{ width: `${availabilityPercentage}%` }}
                />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
