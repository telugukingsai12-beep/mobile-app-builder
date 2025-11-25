import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip, MoreVertical } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

export default function ChatScreen() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const conversation = {
    id: '1',
    participant: {
      name: 'Green Earth Foundation',
      avatar: '/placeholder.svg',
      online: true,
    },
  };

  const messages = [
    {
      id: '1',
      sender: 'other',
      content: 'Hi! Thank you for registering for the Tree Plantation Drive.',
      timestamp: '10:30 AM',
      status: 'read',
    },
    {
      id: '2',
      sender: 'me',
      content: 'Thank you! I\'m excited to participate.',
      timestamp: '10:32 AM',
      status: 'read',
    },
    {
      id: '3',
      sender: 'other',
      content: 'Great! Please arrive 15 minutes early for the briefing.',
      timestamp: '10:35 AM',
      status: 'read',
    },
    {
      id: '4',
      sender: 'me',
      content: 'Will do! Should I bring anything specific?',
      timestamp: '10:36 AM',
      status: 'delivered',
    },
    {
      id: '5',
      sender: 'other',
      content: 'Just comfortable clothes and enthusiasm! We\'ll provide all the equipment.',
      timestamp: '10:38 AM',
      status: 'sent',
    },
  ];

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <Layout userRole="volunteer" menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(!menuOpen)}>
      <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
        {/* Chat Header */}
        <Card className="p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate('/messages')}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="relative">
                <Avatar>
                  <AvatarImage src={conversation.participant.avatar} />
                  <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
                </Avatar>
                {conversation.participant.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div>
                <h2 className="font-semibold">{conversation.participant.name}</h2>
                <p className="text-xs text-muted-foreground">
                  {conversation.participant.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </Card>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'me'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className={`text-xs ${msg.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </span>
                  {msg.sender === 'me' && (
                    <span className="text-xs text-primary-foreground/70">
                      {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
