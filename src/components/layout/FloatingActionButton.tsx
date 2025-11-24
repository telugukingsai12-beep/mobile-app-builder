import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const FloatingActionButton = ({ 
  onClick, 
  label,
  className 
}: FloatingActionButtonProps) => {
  return (
    <Button
      size="lg"
      className={cn(
        'fixed bottom-20 right-6 z-40 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all touch-friendly',
        label && 'w-auto px-6 gap-2',
        className
      )}
      onClick={onClick}
    >
      <Plus className="h-6 w-6" />
      {label && <span className="font-medium">{label}</span>}
    </Button>
  );
};
