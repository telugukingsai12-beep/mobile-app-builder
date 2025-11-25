import { WifiOff, RefreshCw } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Offline() {
  const pendingActions = [
    { id: '1', action: 'Event Registration', status: 'pending' },
    { id: '2', action: 'Message to NGO', status: 'pending' },
  ];

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Layout userRole="volunteer" menuOpen={false} onMenuToggle={() => {}}>
      <div className="max-w-2xl mx-auto space-y-6 py-12">
        {/* Offline Indicator */}
        <Card className="p-8 text-center">
          <div className="mx-auto w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
            <WifiOff className="h-10 w-10 text-muted-foreground" />
          </div>
          
          <h1 className="text-3xl font-bold mb-3">You're Offline</h1>
          <p className="text-muted-foreground mb-6">
            It looks like you've lost your internet connection. Some features may be limited until you're back online.
          </p>

          <Button onClick={handleRetry} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Connection
          </Button>
        </Card>

        {/* Pending Actions */}
        {pendingActions.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Pending Actions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              These actions will be completed once you're back online:
            </p>
            <div className="space-y-3">
              {pendingActions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <span className="text-sm font-medium">{action.action}</span>
                  <Badge variant="secondary">{action.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Available Offline Features */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Available Offline</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span className="text-sm">View your profile and settings</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span className="text-sm">Browse cached events and opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span className="text-sm">View your booking history</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">✓</span>
              <span className="text-sm">Access help and support documentation</span>
            </li>
          </ul>
        </Card>

        {/* Tips */}
        <Card className="p-6 bg-muted">
          <h3 className="font-semibold mb-2">💡 Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Check your WiFi or mobile data connection</li>
            <li>• Try moving to an area with better signal</li>
            <li>• Restart your router if you're on WiFi</li>
            <li>• Contact your internet service provider if the issue persists</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
