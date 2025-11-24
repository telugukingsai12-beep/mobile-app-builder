import { useState } from 'react';
import { User, Settings, Edit, LogOut, Award, Clock, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function Profile() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Mock user data - will be replaced with real data from Supabase
  const userRole = 'volunteer';
  const userData = {
    name: 'Rahul Kumar',
    email: 'rahul.kumar@example.com',
    avatar: '',
    role: 'Volunteer',
    joinedDate: 'January 2024',
    bio: 'Passionate about environmental conservation and community service.',
    location: 'Chennai, Tamil Nadu',
    stats: {
      hoursContributed: 124,
      eventsAttended: 15,
      impactPoints: 450,
    },
    skills: ['Environmental Conservation', 'Teamwork', 'Teaching', 'Event Management'],
  };

  return (
    <Layout userRole={userRole} menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
              <p className="text-muted-foreground mb-2">{userData.email}</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <Badge variant="secondary">{userData.role}</Badge>
                <Badge variant="outline">Member since {userData.joinedDate}</Badge>
              </div>
            </div>
            <Button onClick={() => navigate('/profile/edit')} className="gap-2">
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </Card>

        {/* Stats Cards - Volunteer Only */}
        {userRole === 'volunteer' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hours Contributed</p>
                  <p className="text-2xl font-bold">{userData.stats.hoursContributed}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Events Attended</p>
                  <p className="text-2xl font-bold">{userData.stats.eventsAttended}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Impact Points</p>
                  <p className="text-2xl font-bold">{userData.stats.impactPoints}</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Bio & Location */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">About</h2>
          <p className="text-muted-foreground mb-4">{userData.bio}</p>
          <p className="text-sm">
            <span className="font-medium">Location:</span> {userData.location}
          </p>
        </Card>

        {/* Skills - Volunteer Only */}
        {userRole === 'volunteer' && (
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Skills & Interests</h2>
            <div className="flex flex-wrap gap-2">
              {userData.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => navigate('/profile/edit')}
            >
              <Edit className="h-5 w-5" />
              Edit Profile Information
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
              Account Settings
            </Button>
            <Separator />
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
