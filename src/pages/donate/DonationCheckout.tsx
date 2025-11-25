import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Heart, QrCode } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export default function DonationCheckout() {
  const { ngoId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [amount, setAmount] = useState('1000');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const ngo = {
    id: '1',
    name: 'Green Earth Foundation',
    avatar: '/placeholder.svg',
    verified: true,
  };

  const handleDonate = () => {
    setShowQR(true);
  };

  const handlePaymentComplete = () => {
    toast({
      title: 'Donation Successful!',
      description: 'Thank you for your generous contribution.',
    });
    navigate('/donate/success');
  };

  return (
    <Layout userRole="donor" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate('/donate')} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Donations
        </Button>

        <div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Donation</h1>
          <p className="text-muted-foreground">Support the cause you care about</p>
        </div>

        {/* NGO Info */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={ngo.avatar} />
              <AvatarFallback>{ngo.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">{ngo.name}</h3>
                {ngo.verified && <Badge variant="secondary">Verified</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">
                Your donation will help support their mission
              </p>
            </div>
          </div>
        </Card>

        {!showQR ? (
          <Card className="p-6 space-y-6">
            {/* Amount */}
            <div className="space-y-3">
              <Label htmlFor="amount">Donation Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
              />
              <div className="flex gap-2">
                {[500, 1000, 2000, 5000].map((amt) => (
                  <Button
                    key={amt}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(amt.toString())}
                  >
                    ₹{amt}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Message to NGO (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Share why this cause matters to you..."
                rows={3}
              />
            </div>

            {/* Anonymous Donation */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="anonymous">Donate Anonymously</Label>
                <p className="text-sm text-muted-foreground">
                  Your name won't be shown to the NGO
                </p>
              </div>
              <Switch
                id="anonymous"
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
              />
            </div>

            <Separator />

            {/* Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-lg">
                <span className="font-semibold">Total Donation</span>
                <span className="font-bold text-primary">₹{amount || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>100% of your donation goes to the NGO</span>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleDonate}
              disabled={!amount || parseInt(amount) <= 0}
            >
              Proceed to Payment
            </Button>
          </Card>
        ) : (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Scan QR Code to Pay</h3>
                <p className="text-muted-foreground">
                  Use any UPI app to complete your donation
                </p>
              </div>
              
              {/* QR Code Placeholder */}
              <div className="mx-auto w-64 h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="h-24 w-24 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">QR Code will appear here</p>
                </div>
              </div>

              <div className="text-center space-y-1">
                <p className="font-semibold text-2xl">₹{amount}</p>
                <p className="text-sm text-muted-foreground">to {ngo.name}</p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowQR(false)}
                >
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handlePaymentComplete}>
                  Payment Complete
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
