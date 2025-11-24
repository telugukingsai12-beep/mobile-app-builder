import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'outline' | 'secondary';
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export const QuickActions = ({ actions }: QuickActionsProps) => {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'outline'}
            className="justify-start gap-3 h-auto py-3 touch-friendly"
            onClick={action.onClick}
          >
            <action.icon className="h-5 w-5" />
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};
