import { useState } from 'react';
import { Search, MessageSquare, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';

export default function MessagesList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const conversations = [
    {
      id: '1',
      participant: {
        name: 'Green Earth Foundation',
        avatar: '/placeholder.svg',
        type: 'ngo',
      },
      lastMessage: 'Thank you for registering! We look forward to seeing you.',
      timestamp: '2 hours ago',
      unread: 2,
      online: true,
    },
    {
      id: '2',
      participant: {
        name: 'Priya Kumar',
        avatar: '/placeholder.svg',
        type: 'volunteer',
      },
      lastMessage: 'Looking forward to the event!',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
    },
    {
      id: '3',
      participant: {
        name: 'Education First',
        avatar: '/placeholder.svg',
        type: 'ngo',
      },
      lastMessage: 'Your application has been approved.',
      timestamp: '3 days ago',
      unread: 1,
      online: false,
    },
  ];

  const filteredConversations = conversations.filter((conv) =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold mb-2">Messages</h1>
          <p className="text-muted-foreground">Connect with NGOs and volunteers</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredConversations.length > 0 ? (
            filteredConversations.map((conversation) => (
              <Card
                key={conversation.id}
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/messages/${conversation.id}`)}
              >
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.participant.avatar} />
                      <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold truncate">{conversation.participant.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {conversation.participant.type}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <Badge variant="default" className="ml-2 h-5 w-5 flex items-center justify-center p-0 rounded-full">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No conversations found</p>
            </div>
          )}
        </div>

        <FloatingActionButton
          onClick={() => console.log('Start new conversation')}
          label="New Message"
        />
      </div>
    </Layout>
  );
}
