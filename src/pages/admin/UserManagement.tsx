import { useState } from 'react';
import { Search, Filter, MoreVertical, UserCheck, UserX, Shield } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const users = [
    {
      id: '1',
      name: 'Priya Kumar',
      email: 'priya@example.com',
      role: 'volunteer',
      status: 'active',
      joinedDate: 'Dec 1, 2024',
      avatar: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Green Earth Foundation',
      email: 'contact@greenearth.org',
      role: 'ngo',
      status: 'active',
      joinedDate: 'Nov 15, 2024',
      avatar: '/placeholder.svg',
      verified: true,
    },
    {
      id: '3',
      name: 'Raj Malhotra',
      email: 'raj@example.com',
      role: 'donor',
      status: 'active',
      joinedDate: 'Oct 20, 2024',
      avatar: '/placeholder.svg',
    },
    {
      id: '4',
      name: 'Suspended User',
      email: 'suspended@example.com',
      role: 'volunteer',
      status: 'blocked',
      joinedDate: 'Sep 10, 2024',
      avatar: '/placeholder.svg',
    },
  ];

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'ngo':
        return 'secondary';
      case 'volunteer':
        return 'outline';
      case 'donor':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout userRole="admin" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage all platform users and permissions</p>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-muted-foreground text-sm">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm">NGOs</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'ngo').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm">Volunteers</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'volunteer').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-muted-foreground text-sm">Donors</p>
            <p className="text-2xl font-bold">
              {users.filter((u) => u.role === 'donor').length}
            </p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        {user.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <Shield className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        Joined {user.joinedDate}
                      </p>
                    </div>
                    <Badge
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                    >
                      {user.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <UserCheck className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        {user.status === 'active' ? (
                          <DropdownMenuItem className="text-destructive">
                            <UserX className="h-4 w-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ngos">
            <p className="text-center text-muted-foreground py-8">
              NGO users will be shown here
            </p>
          </TabsContent>

          <TabsContent value="volunteers">
            <p className="text-center text-muted-foreground py-8">
              Volunteer users will be shown here
            </p>
          </TabsContent>

          <TabsContent value="donors">
            <p className="text-center text-muted-foreground py-8">
              Donor users will be shown here
            </p>
          </TabsContent>

          <TabsContent value="pending">
            <p className="text-center text-muted-foreground py-8">
              Pending verifications will appear here
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
