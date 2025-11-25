import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Bookmark, Share2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function OpportunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const opportunity = {
    id: '1',
    title: 'Community Teaching Assistant',
    ngo: {
      name: 'Education First',
      avatar: '/placeholder.svg',
      verified: true,
      rating: 4.9,
    },
    location: 'Mumbai, Maharashtra',
    type: 'Regular',
    commitment: '4 hours/week',
    matchPercentage: 95,
    description: 'We are looking for passionate individuals to assist in teaching underprivileged children. You will help with homework, conduct interactive sessions, and support the primary teacher in classroom activities. This is a great opportunity to make a real difference in children\'s education.',
    requirements: [
      'Good communication skills',
      'Patient and understanding',
      'Available on weekends',
      'Basic subject knowledge (Math, English)',
    ],
    skills: ['Teaching', 'Communication', 'Patience'],
    benefits: [
      'Certificate of completion',
      'Skill development',
      'Network with like-minded people',
      'Make real impact',
    ],
  };

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/opportunities')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Opportunities
        </Button>

        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{opportunity.title}</h1>
                <Badge variant="secondary">{opportunity.matchPercentage}% Match</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{opportunity.commitment}</span>
                </div>
                <Badge variant="outline">{opportunity.type}</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* NGO Info */}
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={opportunity.ngo.avatar} />
                <AvatarFallback>{opportunity.ngo.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{opportunity.ngo.name}</h3>
                  {opportunity.ngo.verified && <Badge variant="secondary">Verified</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">Rating: {opportunity.ngo.rating}/5.0</p>
              </div>
              <Button variant="outline" size="sm">View Profile</Button>
            </div>
          </Card>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">About This Opportunity</h2>
            <p className="text-muted-foreground leading-relaxed">{opportunity.description}</p>
          </div>

          {/* Requirements */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Requirements</h2>
            <ul className="space-y-2">
              {opportunity.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xl font-semibold mb-3">Skills You'll Use</h2>
            <div className="flex gap-2 flex-wrap">
              {opportunity.skills.map((skill) => (
                <Badge key={skill} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h2 className="text-xl font-semibold mb-3">What You'll Get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunity.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <span className="text-primary">✓</span>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg">Apply Now</Button>
            <Button variant="outline" size="lg">Save for Later</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
