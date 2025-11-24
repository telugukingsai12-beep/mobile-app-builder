import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Users, HandHeart, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-6">
            <span className="text-3xl font-bold text-primary-foreground">NC</span>
          </div>
          <h1 className="text-5xl font-bold mb-6">Welcome to NGOCONNECT</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connecting NGOs, Volunteers, and Donors for Maximum Social Impact
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="touch-friendly gap-2" asChild>
              <Link to={ROUTES.LOGIN}>
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="touch-friendly" asChild>
              <Link to={ROUTES.REGISTER}>Create Account</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6 rounded-lg bg-card border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For Volunteers</h3>
            <p className="text-muted-foreground">
              Discover meaningful opportunities aligned with your skills and make a real difference in your community.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
              <Heart className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For NGOs</h3>
            <p className="text-muted-foreground">
              Connect with passionate volunteers and donors to amplify your impact and grow your initiatives.
            </p>
          </div>

          <div className="text-center p-6 rounded-lg bg-card border border-border">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <HandHeart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">For Donors</h3>
            <p className="text-muted-foreground">
              Support trustworthy organizations and track the real-world impact of your contributions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
