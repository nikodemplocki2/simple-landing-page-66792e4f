import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Award, 
  Trophy, 
  Star,
  ThumbsUp,
  Send,
  Target,
  BookOpen,
  TrendingUp
} from 'lucide-react';

export function CommunityHub() {
  const [newMessage, setNewMessage] = useState('');

  const classCommunities = [
    { id: 1, name: 'Data Structures - CS101', members: 45, unread: 3, active: true },
    { id: 2, name: 'Algorithm Analysis - CS201', members: 38, unread: 0, active: true },
    { id: 3, name: 'Database Systems - CS102', members: 42, unread: 1, active: false },
  ];

  const studyGroups = [
    { id: 1, name: 'Algorithm Warriors', members: 6, challenge: 'Complete 5 practice problems', progress: 60 },
    { id: 2, name: 'Code & Coffee', members: 4, challenge: 'Study 10 hours this week', progress: 75 },
  ];

  const feedbackRequests = [
    { 
      id: 1, 
      student: 'Erik S.', 
      assignment: 'Binary Search Tree Implementation',
      course: 'CS101',
      timeAgo: '2 hours ago',
      xpReward: 15
    },
    { 
      id: 2, 
      student: 'Anna K.', 
      assignment: 'Database Schema Design',
      course: 'CS102',
      timeAgo: '5 hours ago',
      xpReward: 20
    },
  ];

  const discussions = [
    {
      id: 1,
      author: 'Maria L.',
      avatar: 'M',
      content: 'Just finished the Trees assignment! The recursive approach really helped. Anyone else struggling with balancing AVL trees?',
      course: 'CS101',
      timeAgo: '1 hour ago',
      likes: 12,
      replies: 5,
      tags: ['assignment', 'trees']
    },
    {
      id: 2,
      author: 'Johan P.',
      avatar: 'J',
      content: 'Found a great resource for understanding Big O notation. Link in comments! 🎯',
      course: 'CS201',
      timeAgo: '3 hours ago',
      likes: 24,
      replies: 8,
      tags: ['resources', 'algorithms']
    },
    {
      id: 3,
      author: 'Sara K.',
      avatar: 'S',
      content: 'Our study group meets tomorrow at 3 PM in the library. We\'re reviewing sorting algorithms. All welcome!',
      course: 'CS201',
      timeAgo: '4 hours ago',
      likes: 18,
      replies: 12,
      tags: ['study-group', 'algorithms']
    },
  ];

  const topHelpers = [
    { name: 'Anna K.', reviews: 28, rating: 4.9, badge: 'Insightful Reviewer' },
    { name: 'Erik S.', reviews: 22, rating: 4.8, badge: 'Top Helper' },
    { name: 'Lisa M.', reviews: 19, rating: 4.7, badge: 'Community Champion' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2 text-white">Community & Peer Hub</h1>
        <p className="text-gray-400">Connect, collaborate, and learn together</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 mb-1">Communities</p>
                <p className="text-2xl text-white">3</p>
              </div>
              <Users className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">Study Groups</p>
                <p className="text-2xl text-white">2</p>
              </div>
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 mb-1">Reviews Given</p>
                <p className="text-2xl text-white">12</p>
              </div>
              <Star className="w-6 h-6 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-400 mb-1">Helper Rank</p>
                <p className="text-2xl text-white">Top 15%</p>
              </div>
              <Trophy className="w-6 h-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Discussion Feed */}
          <Card className="bg-[#141414] border-[#262626]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-white">
                  <MessageCircle className="w-5 h-5 text-blue-400" />
                  Discussions
                </h3>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  New Post
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* New Post Input */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#262626]">
                <Textarea 
                  placeholder="Share your thoughts, ask a question, or start a discussion..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={3}
                  className="mb-3 bg-[#0a0a0a] border-[#262626] text-white placeholder:text-gray-500"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-[#262626] border-[#262626] text-gray-400">
                      #assignment
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-[#262626] border-[#262626] text-gray-400">
                      #question
                    </Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-[#262626] border-[#262626] text-gray-400">
                      #resource
                    </Badge>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>

              {/* Discussion Posts */}
              {discussions.map((discussion) => (
                <div key={discussion.id} className="border border-[#262626] rounded-lg p-4 hover:bg-[#1a1a1a] transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                      {discussion.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-white">{discussion.author}</span>
                        <Badge variant="outline" className="text-xs border-[#262626] text-gray-400">{discussion.course}</Badge>
                        <span className="text-xs text-gray-500">• {discussion.timeAgo}</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-3">{discussion.content}</p>
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400">
                          <ThumbsUp className="w-4 h-4" />
                          <span>{discussion.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400">
                          <MessageCircle className="w-4 h-4" />
                          <span>{discussion.replies} replies</span>
                        </button>
                        {discussion.tags.map((tag) => (
                          <Badge key={tag} className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Feedback Requests */}
          <Card className="bg-[#141414] border-[#262626]">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-white">
                <Star className="w-5 h-5 text-purple-400" />
                Pending Feedback Requests
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedbackRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex-1">
                    <p className="text-sm text-white mb-1">{request.assignment}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <span>{request.student}</span>
                      <span>•</span>
                      <span>{request.course}</span>
                      <span>•</span>
                      <span>{request.timeAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge className="bg-purple-500 text-white border-0">+{request.xpReward} XP</Badge>
                    <Button size="sm" variant="outline" className="border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Class Communities */}
          <Card className="bg-[#141414] border-[#262626]">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-white">
                <Users className="w-5 h-5 text-blue-400" />
                My Communities
              </h3>
            </CardHeader>
            <CardContent className="space-y-2">
              {classCommunities.map((community) => (
                <button
                  key={community.id}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    community.active
                      ? 'bg-blue-500/10 border-blue-500/30'
                      : 'bg-[#1a1a1a] border-[#262626] hover:border-[#363636]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">{community.name}</span>
                    {community.unread > 0 && (
                      <Badge className="bg-red-500 text-white border-0">{community.unread}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{community.members} members</p>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Study Groups */}
          <Card className="bg-[#141414] border-[#262626]">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-white">
                <Target className="w-5 h-5 text-purple-400" />
                Study Groups
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyGroups.map((group) => (
                <div key={group.id} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white">{group.name}</span>
                    <Badge variant="outline" className="text-xs border-[#262626] text-gray-400">{group.members} members</Badge>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{group.challenge}</p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Challenge Progress</span>
                      <span>{group.progress}%</span>
                    </div>
                    <div className="w-full bg-[#1a1a1a] border border-[#262626] rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                        style={{ width: `${group.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                Create Study Group
              </Button>
            </CardContent>
          </Card>

          {/* Top Helpers */}
          <Card className="bg-[#141414] border-[#262626]">
            <CardHeader>
              <h3 className="flex items-center gap-2 text-white">
                <Award className="w-5 h-5 text-orange-400" />
                Top Helpers
              </h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {topHelpers.map((helper, idx) => (
                <div key={helper.name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${
                    idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-700'
                  } flex items-center justify-center text-white text-sm`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{helper.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                              i < Math.floor(helper.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{helper.reviews} reviews</span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1 border-[#262626] text-gray-400">{helper.badge}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}