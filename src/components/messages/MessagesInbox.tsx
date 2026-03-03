import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  MessageSquare, 
  Send, 
  Search,
  GraduationCap,
  Users,
  Building2,
  Paperclip,
  Star,
  Archive,
  Trash2,
  Sparkles
} from 'lucide-react';

export function MessagesInbox() {
  const [selectedThread, setSelectedThread] = useState<number | null>(1);
  const [filter, setFilter] = useState<'all' | 'teachers' | 'groups' | 'admin'>('all');
  const [messageText, setMessageText] = useState('');

  const threads = [
    {
      id: 1,
      sender: 'Prof. Anderson',
      senderType: 'teacher',
      subject: 'Re: Assignment 3 Extension Request',
      preview: 'Thank you for reaching out. I can grant you a 2-day extension...',
      unread: true,
      starred: false,
      timestamp: '2 hours ago',
      course: 'CS101',
      messages: [
        { id: 1, from: 'You', content: 'Hi Professor Anderson, I am requesting a 2-day extension for Assignment 3 due to illness. I have a doctor\'s note available.', timestamp: 'Yesterday 14:30', isOwn: true },
        { id: 2, from: 'Prof. Anderson', content: 'Thank you for reaching out. I can grant you a 2-day extension. Please upload the doctor\'s note to the assignment portal and submit by Nov 14. Feel free to reach out if you need clarification on any requirements.', timestamp: '2 hours ago', isOwn: false }
      ]
    },
    {
      id: 2,
      sender: 'Study Group - Algorithm Warriors',
      senderType: 'group',
      subject: 'Tomorrow\'s study session',
      preview: 'Hey everyone! Just confirming we meet at 3 PM in the library...',
      unread: true,
      starred: true,
      timestamp: '3 hours ago',
      course: 'CS201',
      messages: []
    },
    {
      id: 3,
      sender: 'Academic Office',
      senderType: 'admin',
      subject: 'Spring 2026 Registration Reminder',
      preview: 'This is a reminder that course registration for Spring 2026...',
      unread: false,
      starred: false,
      timestamp: 'Yesterday',
      course: null,
      messages: []
    },
    {
      id: 4,
      sender: 'Prof. Chen',
      senderType: 'teacher',
      subject: 'Great work on Database Project!',
      preview: 'I wanted to commend you on your excellent work on the database...',
      unread: false,
      starred: true,
      timestamp: '2 days ago',
      course: 'CS102',
      messages: []
    },
    {
      id: 5,
      sender: 'CS Department',
      senderType: 'admin',
      subject: 'New library resources available',
      preview: 'We are pleased to announce that students now have access to...',
      unread: false,
      starred: false,
      timestamp: '3 days ago',
      course: null,
      messages: []
    },
  ];

  const filterConfig = {
    all: { label: 'All Messages', icon: MessageSquare },
    teachers: { label: 'Teachers', icon: GraduationCap },
    groups: { label: 'Groups', icon: Users },
    admin: { label: 'Admin', icon: Building2 },
  };

  const getSenderIcon = (type: string) => {
    switch (type) {
      case 'teacher':
        return GraduationCap;
      case 'group':
        return Users;
      case 'admin':
        return Building2;
      default:
        return MessageSquare;
    }
  };

  const filteredThreads = threads.filter(thread => {
    if (filter === 'all') return true;
    if (filter === 'teachers') return thread.senderType === 'teacher';
    if (filter === 'groups') return thread.senderType === 'group';
    if (filter === 'admin') return thread.senderType === 'admin';
    return true;
  });

  const currentThread = threads.find(t => t.id === selectedThread);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2 text-white">Messages & Inbox</h1>
          <p className="text-gray-400">Communicate with teachers, peers, and university staff</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2 text-white">
          <Send className="w-4 h-4" />
          New Message
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 mb-1">Unread</p>
                <p className="text-2xl text-white">2</p>
              </div>
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">From Teachers</p>
                <p className="text-2xl text-white">8</p>
              </div>
              <GraduationCap className="w-6 h-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 mb-1">Group Messages</p>
                <p className="text-2xl text-white">5</p>
              </div>
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-400 mb-1">Starred</p>
                <p className="text-2xl text-white">3</p>
              </div>
              <Star className="w-6 h-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <Card className="lg:col-span-1 bg-[#141414] border-[#262626]">
          <CardHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input 
                  placeholder="Search messages..."
                  className="pl-10 bg-[#1a1a1a] border-[#262626] text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {Object.entries(filterConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  return (
                    <Button
                      key={key}
                      variant={filter === key ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFilter(key as any)}
                      className={filter === key ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white'}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {config.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 p-0">
            {filteredThreads.map((thread) => {
              const Icon = getSenderIcon(thread.senderType);
              return (
                <button
                  key={thread.id}
                  onClick={() => setSelectedThread(thread.id)}
                  className={`w-full text-left p-4 border-b border-[#262626] transition-all hover:bg-[#1a1a1a] ${
                    selectedThread === thread.id
                      ? 'bg-purple-500/10 border-l-4 border-l-purple-500'
                      : thread.unread
                      ? 'bg-blue-500/10'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      thread.senderType === 'teacher' ? 'bg-purple-500/20' :
                      thread.senderType === 'group' ? 'bg-green-500/20' :
                      'bg-blue-500/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        thread.senderType === 'teacher' ? 'text-purple-400' :
                        thread.senderType === 'group' ? 'text-green-400' :
                        'text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm truncate ${thread.unread ? 'text-white' : 'text-gray-400'}`}>
                          {thread.sender}
                        </p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {thread.starred && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                          {thread.unread && (
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                          )}
                        </div>
                      </div>
                      <p className={`text-sm mb-1 truncate ${thread.unread ? 'text-white' : 'text-gray-500'}`}>
                        {thread.subject}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{thread.preview}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">{thread.timestamp}</span>
                        {thread.course && (
                          <Badge variant="outline" className="text-xs border-[#262626] text-gray-400">{thread.course}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Message Thread */}
        <Card className="lg:col-span-2 bg-[#141414] border-[#262626]">
          {currentThread ? (
            <>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      currentThread.senderType === 'teacher' ? 'bg-purple-500/20' :
                      currentThread.senderType === 'group' ? 'bg-green-500/20' :
                      'bg-blue-500/20'
                    }`}>
                      {(() => {
                        const Icon = getSenderIcon(currentThread.senderType);
                        return <Icon className={`w-6 h-6 ${
                          currentThread.senderType === 'teacher' ? 'text-purple-400' :
                          currentThread.senderType === 'group' ? 'text-green-400' :
                          'text-blue-400'
                        }`} />;
                      })()}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg mb-1 text-white">{currentThread.sender}</h3>
                      <p className="text-sm text-gray-400 mb-2">{currentThread.subject}</p>
                      {currentThread.course && (
                        <Badge variant="outline" className="text-xs border-[#262626] text-gray-400">{currentThread.course}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[#262626] text-gray-400 hover:bg-[#1a1a1a] hover:text-white">
                      <Star className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#262626] text-gray-400 hover:bg-[#1a1a1a] hover:text-white">
                      <Archive className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-[#262626] text-gray-400 hover:bg-[#1a1a1a] hover:text-white">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Message Thread */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {currentThread.messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] ${message.isOwn ? 'order-2' : ''}`}>
                          <div className={`p-4 rounded-lg ${
                            message.isOwn 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-[#1a1a1a] border border-[#262626] text-white'
                          }`}>
                            <p className={`text-xs mb-2 ${message.isOwn ? 'text-purple-200' : 'text-gray-400'}`}>
                              {message.from}
                            </p>
                            <p className="text-sm">{message.content}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Smart Suggestion */}
                  {currentThread.senderType === 'teacher' && (
                    <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                      <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-purple-300 mb-2">✨ AI Suggestion</p>
                          <p className="text-sm text-purple-200 mb-3">
                            Consider thanking Prof. Anderson for the extension and confirming the new deadline.
                          </p>
                          <Button variant="outline" size="sm" className="text-purple-300 border-purple-500/30 hover:bg-purple-500/20">
                            Use Suggested Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reply Box */}
                  <div className="space-y-3 pt-4 border-t border-[#262626]">
                    <Textarea 
                      placeholder="Type your reply..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={4}
                      className="bg-[#1a1a1a] border-[#262626] text-white placeholder:text-gray-500"
                    />
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="sm" className="border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                        <Paperclip className="w-4 h-4 mr-2" />
                        Attach File
                      </Button>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center py-20">
              <div className="text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 text-gray-500" />
                <p>Select a message to view conversation</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Announcements Channel */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white">
            <Building2 className="w-5 h-5 text-blue-400" />
            University Announcements
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#262626]">
              <p className="text-sm text-white mb-1">Exam schedule published - Check your University Hub</p>
              <p className="text-xs text-gray-500">Academic Office • 2 days ago</p>
            </div>
            <div className="p-3 bg-[#1a1a1a] rounded-lg border border-[#262626]">
              <p className="text-sm text-white mb-1">New library resources available for Computer Science students</p>
              <p className="text-xs text-gray-500">Library Services • 3 days ago</p>
            </div>
            <Button variant="outline" className="w-full border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              View All Announcements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}