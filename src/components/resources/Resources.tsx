import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  Sparkles, 
  GraduationCap, 
  Users, 
  BookOpen,
  FileText,
  Video,
  Link as LinkIcon,
  Heart,
  Search,
  Filter,
  ThumbsUp,
  Download,
  ExternalLink
} from 'lucide-react';

export function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'ai', label: 'AI Recommended' },
    { id: 'teacher', label: 'Teacher Materials' },
    { id: 'peer', label: 'Peer Shared' },
    { id: 'saved', label: 'My Library' },
  ];

  const resources = [
    {
      id: 1,
      title: 'Big O Notation Cheat Sheet',
      description: 'Complete guide to time and space complexity analysis',
      type: 'document',
      source: 'ai',
      category: 'Algorithms',
      upvotes: 42,
      saved: true,
      relevance: 95,
      url: '#'
    },
    {
      id: 2,
      title: 'Binary Search Trees - Video Tutorial Series',
      description: 'Step-by-step implementation and visualization of BST operations',
      type: 'video',
      source: 'teacher',
      category: 'Data Structures',
      upvotes: 38,
      saved: false,
      teacherName: 'Prof. Anderson',
      url: '#'
    },
    {
      id: 3,
      title: 'Database Normalization Guide',
      description: 'Understanding 1NF, 2NF, 3NF with practical examples',
      type: 'document',
      source: 'teacher',
      category: 'Database Systems',
      upvotes: 56,
      saved: true,
      teacherName: 'Prof. Chen',
      url: '#'
    },
    {
      id: 4,
      title: 'Leetcode Practice Problems - Trees',
      description: 'Curated list of tree problems from easy to hard',
      type: 'link',
      source: 'peer',
      category: 'Data Structures',
      upvotes: 29,
      saved: false,
      sharedBy: 'Anna K.',
      url: '#'
    },
    {
      id: 5,
      title: 'SQL Query Optimization Techniques',
      description: 'Learn to write efficient database queries with indexing and joins',
      type: 'document',
      source: 'ai',
      category: 'Database Systems',
      upvotes: 34,
      saved: true,
      relevance: 88,
      url: '#'
    },
    {
      id: 6,
      title: 'Graph Algorithms Visualization Tool',
      description: 'Interactive tool for understanding DFS, BFS, Dijkstra, and more',
      type: 'link',
      source: 'peer',
      category: 'Algorithms',
      upvotes: 67,
      saved: false,
      sharedBy: 'Erik S.',
      url: '#'
    },
  ];

  const sourceConfig = {
    ai: { icon: Sparkles, label: 'AI Recommended', color: 'purple' },
    teacher: { icon: GraduationCap, label: 'Teacher Material', color: 'blue' },
    peer: { icon: Users, label: 'Peer Shared', color: 'green' },
  };

  const typeIcons = {
    document: FileText,
    video: Video,
    link: LinkIcon,
  };

  const filteredResources = resources.filter((resource) => {
    if (activeFilter !== 'all' && activeFilter === 'saved' && !resource.saved) return false;
    if (activeFilter !== 'all' && activeFilter !== 'saved' && resource.source !== activeFilter) return false;
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2 text-white">Resources</h1>
        <p className="text-gray-400">Access curated materials from AI, teachers, and peers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">AI Recommended</p>
                <p className="text-2xl text-white">12</p>
              </div>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 mb-1">Teacher Materials</p>
                <p className="text-2xl text-white">18</p>
              </div>
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 mb-1">Peer Shared</p>
                <p className="text-2xl text-white">24</p>
              </div>
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-400 mb-1">Saved Items</p>
                <p className="text-2xl text-white">8</p>
              </div>
              <Heart className="w-6 h-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input 
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1a1a1a] border-[#262626] text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className={activeFilter === filter.id ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white'}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations Banner */}
      {activeFilter === 'all' && (
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-none">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl mb-2">✨ Personalized for You</h3>
                <p className="text-purple-100 mb-4">
                  Based on your current courses and performance, we've curated these resources to help you excel in Data Structures and Algorithm Analysis.
                </p>
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30">
                  View All AI Recommendations
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => {
          const config = sourceConfig[resource.source as keyof typeof sourceConfig];
          const SourceIcon = config.icon;
          const TypeIcon = typeIcons[resource.type as keyof typeof typeIcons];

          return (
            <Card key={resource.id} className="bg-[#141414] border-[#262626] hover:border-[#363636] transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg ${
                        config.color === 'purple' ? 'bg-purple-500/10' : 
                        config.color === 'blue' ? 'bg-blue-500/10' : 
                        'bg-green-500/10'
                      } flex items-center justify-center flex-shrink-0`}>
                        <TypeIcon className={`w-5 h-5 ${
                          config.color === 'purple' ? 'text-purple-400' : 
                          config.color === 'blue' ? 'text-blue-400' : 
                          'text-green-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm mb-1 text-white">{resource.title}</h3>
                        <p className="text-xs text-gray-400">{resource.description}</p>
                      </div>
                    </div>
                    <button className="flex-shrink-0">
                      <Heart 
                        className={`w-5 h-5 ${
                          resource.saved 
                            ? 'text-red-500 fill-red-500' 
                            : 'text-gray-500 hover:text-red-500'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className={`text-xs ${
                      config.color === 'purple' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                      config.color === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                      'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      <SourceIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                    <Badge className="text-xs bg-[#1a1a1a] text-gray-300 border-[#262626]">
                      {resource.category}
                    </Badge>
                    {resource.source === 'ai' && (
                      <Badge className="text-xs bg-purple-500 text-white border-0">
                        {resource.relevance}% match
                      </Badge>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#262626]">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <button className="flex items-center gap-1.5 hover:text-purple-400">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{resource.upvotes}</span>
                      </button>
                      {resource.source === 'teacher' && (
                        <span className="text-xs">{resource.teacherName}</span>
                      )}
                      {resource.source === 'peer' && (
                        <span className="text-xs">Shared by {resource.sharedBy}</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* My Library Section */}
      {activeFilter === 'saved' && filteredResources.length === 0 && (
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">Your library is empty</p>
            <Button variant="outline" onClick={() => setActiveFilter('all')} className="border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              Browse Resources
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}