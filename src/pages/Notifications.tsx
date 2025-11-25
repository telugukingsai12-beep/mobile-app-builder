import { useState } from 'react';
import { Bell, CheckCheck, Filter, Trash2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Notifications() {
  const [menuOpen, setMenuOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      type: 'booking',
      title: 'Event Reminder',
      message: 'Tree Plantation Drive starts tomorrow at 9:00 AM',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Green Earth Foundation sent you a message',
      time: '5 hours ago',
      read: false,
    },
    {
      id: '3',
      type: 'donation',
      title: 'Donation Confirmed',
      message: 'Your donation of ₹1,000 was successful',
      time: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'application',
      title: 'Application Approved',
      message: 'Your volunteer application has been approved',
      time: '2 days ago',
      read: true,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return '📅';
      case 'message':
        return '💬';
      case 'donation':
        return '💰';
      case 'application':
        return '✅';
      default:
        return '🔔';
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with your activities
            </p>
          </div>
          <Badge variant="default" className="text-lg px-3 py-1">
            {unreadCount} new
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <CheckCheck className="h-4 w-4" />
            Mark All as Read
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 text-destructive">
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read">
              Read ({notifications.length - unreadCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 hover:shadow-md transition-shadow cursor-pointer ${
                  !notification.read ? 'border-l-4 border-l-primary bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold">{notification.title}</h3>
                      {!notification.read && (
                        <Badge variant="default" className="ml-2">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="unread">
            {notifications.filter((n) => !n.read).length > 0 ? (
              <div className="space-y-3">
                {notifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <Card
                      key={notification.id}
                      className="p-4 border-l-4 border-l-primary bg-primary/5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No unread notifications</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="read">
            <p className="text-center text-muted-foreground py-8">
              Read notifications will appear here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
