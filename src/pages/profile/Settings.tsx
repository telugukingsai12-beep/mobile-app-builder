import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Lock, Globe, Shield, HelpCircle, Info } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    events: true,
    messages: true,
    donations: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
  });

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/profile')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Notification Preferences</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notif">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Switch
                id="email-notif"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notif">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch
                id="push-notif"
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="events-notif">Event Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about events</p>
              </div>
              <Switch
                id="events-notif"
                checked={notifications.events}
                onCheckedChange={(checked) => setNotifications({ ...notifications, events: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messages-notif">Messages</Label>
                <p className="text-sm text-muted-foreground">Get notified about new messages</p>
              </div>
              <Switch
                id="messages-notif"
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
              />
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Privacy Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="profile-visible">Public Profile</Label>
                <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
              </div>
              <Switch
                id="profile-visible"
                checked={privacy.profileVisible}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, profileVisible: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-email">Show Email</Label>
                <p className="text-sm text-muted-foreground">Display email on profile</p>
              </div>
              <Switch
                id="show-email"
                checked={privacy.showEmail}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, showEmail: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-phone">Show Phone Number</Label>
                <p className="text-sm text-muted-foreground">Display phone on profile</p>
              </div>
              <Switch
                id="show-phone"
                checked={privacy.showPhone}
                onCheckedChange={(checked) => setPrivacy({ ...privacy, showPhone: checked })}
              />
            </div>
          </div>
        </Card>

        {/* Account Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Account Security</h2>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3">
              <Lock className="h-5 w-5" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3">
              <Shield className="h-5 w-5" />
              Two-Factor Authentication
            </Button>
          </div>
        </Card>

        {/* Language & Region */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Language & Region</h2>
          </div>
          <Button variant="outline" className="w-full justify-between">
            English (India)
            <span className="text-muted-foreground">→</span>
          </Button>
        </Card>

        {/* Help & Support */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Help & Support</h2>
          </div>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => navigate('/help')}>
              <HelpCircle className="h-5 w-5" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3" onClick={() => navigate('/about')}>
              <Info className="h-5 w-5" />
              About NGOCONNECT
            </Button>
          </div>
        </Card>

        {/* Save Button */}
        <Button className="w-full">Save Settings</Button>
      </div>
    </Layout>
  );
}
