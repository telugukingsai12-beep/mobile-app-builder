import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Eye } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContentModeration() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { toast } = useToast();

  const reportedContent = [
    {
      id: '1',
      type: 'event',
      title: 'Reported Event: Beach Cleanup',
      reporter: 'User123',
      reason: 'Inappropriate content',
      content: 'This event contains misleading information about the location.',
      reportedDate: 'Dec 15, 2024',
      status: 'pending',
      priority: 'high',
    },
    {
      id: '2',
      type: 'message',
      title: 'Reported Message',
      reporter: 'User456',
      reason: 'Spam',
      content: 'Repeated promotional messages being sent to multiple users.',
      reportedDate: 'Dec 14, 2024',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: '3',
      type: 'profile',
      title: 'Reported Profile: Fake NGO',
      reporter: 'User789',
      reason: 'Impersonation',
      content: 'This profile is impersonating a legitimate NGO.',
      reportedDate: 'Dec 13, 2024',
      status: 'reviewed',
      priority: 'high',
    },
  ];

  const handleApprove = (id: string) => {
    toast({
      title: 'Content Approved',
      description: 'The content has been marked as appropriate.',
    });
  };

  const handleReject = (id: string) => {
    toast({
      title: 'Content Removed',
      description: 'The reported content has been removed.',
      variant: 'destructive',
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout userRole="admin" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Content Moderation</h1>
          <p className="text-muted-foreground">Review and moderate reported content</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>
                <p className="text-2xl font-bold">
                  {reportedContent.filter((c) => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-muted-foreground text-sm">Approved</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-muted-foreground text-sm">Removed</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-muted-foreground text-sm">In Review</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {reportedContent
              .filter((item) => item.status === 'pending')
              .map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          {getPriorityBadge(item.priority)}
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Reported by <span className="font-medium">{item.reporter}</span> •{' '}
                          {item.reportedDate}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold mb-1">Reason:</p>
                        <p className="text-sm text-muted-foreground">{item.reason}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold mb-1">Details:</p>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold">Moderation Notes:</p>
                      <Textarea placeholder="Add your review notes..." rows={2} />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button
                        className="flex-1"
                        variant="default"
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Content
                      </Button>
                      <Button
                        className="flex-1"
                        variant="destructive"
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Remove Content
                      </Button>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="reviewed">
            <p className="text-center text-muted-foreground py-8">
              Reviewed content will appear here
            </p>
          </TabsContent>

          <TabsContent value="history">
            <p className="text-center text-muted-foreground py-8">
              Moderation history will be shown here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
