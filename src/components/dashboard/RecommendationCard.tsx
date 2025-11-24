import { TrendingUp, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Recommendation {
  id: string;
  title: string;
  organization: string;
  location: string;
  matchPercentage: number;
  skills: string[];
  imageUrl?: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  onApply: (id: string) => void;
}

export const RecommendationCard = ({ recommendation, onApply }: RecommendationCardProps) => {
  return (
    <Card className="overflow-hidden">
      {recommendation.imageUrl && (
        <div className="h-32 bg-muted" style={{ backgroundImage: `url(${recommendation.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-semibold">{recommendation.title}</h4>
          <Badge variant="secondary" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            {recommendation.matchPercentage}%
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">{recommendation.organization}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{recommendation.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {recommendation.skills.map((skill) => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
        <Button className="w-full" onClick={() => onApply(recommendation.id)}>
          Apply Now
        </Button>
      </div>
    </Card>
  );
};
