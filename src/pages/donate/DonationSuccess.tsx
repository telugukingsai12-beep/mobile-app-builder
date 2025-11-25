import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, Share2, Heart } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DonationSuccess() {
  const navigate = useNavigate();

  const donation = {
    id: 'DON-2024-001',
    ngo: {
      name: 'Green Earth Foundation',
      avatar: '/placeholder.svg',
    },
    amount: '₹1,000',
    date: 'Dec 15, 2024',
    time: '2:30 PM',
    transactionId: 'TXN123456789',
  };

  const relatedNGOs = [
    {
      id: '1',
      name: 'Education First',
      avatar: '/placeholder.svg',
      category: 'Education',
    },
    {
      id: '2',
      name: 'Health for All',
      avatar: '/placeholder.svg',
      category: 'Health',
    },
  ];

  return (
    <Layout userRole="donor" menuOpen={false} onMenuToggle={() => {}}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Message */}
        <Card className="p-8 text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">Donation Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your generous contribution
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-muted rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={donation.ngo.avatar} />
                <AvatarFallback>{donation.ngo.name[0]}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-semibold">{donation.ngo.name}</p>
                <p className="text-sm text-muted-foreground">Donation Received</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-1">{donation.amount}</p>
              <p className="text-sm text-muted-foreground">
                {donation.date} • {donation.time}
              </p>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">Transaction ID</p>
              <p className="text-sm font-mono">{donation.transactionId}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Button
            className="w-full"
            size="lg"
            onClick={() => navigate('/donor/dashboard')}
          >
            Return to Dashboard
          </Button>
        </Card>

        {/* Impact Message */}
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Your Impact</h3>
              <p className="text-muted-foreground text-sm">
                Your donation will help plant 50 trees and contribute to a greener environment. 
                You'll receive updates on how your contribution is making a difference.
              </p>
            </div>
          </div>
        </Card>

        {/* Related NGOs */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Support Similar Causes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedNGOs.map((ngo) => (
              <Card
                key={ngo.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/donate/${ngo.id}`)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={ngo.avatar} />
                    <AvatarFallback>{ngo.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{ngo.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {ngo.category}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  Donate Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
