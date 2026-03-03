import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  BookOpen,
  Search,
  Filter,
  Download,
  ExternalLink,
  Star,
  Clock,
  FileText,
  Video,
  Link as LinkIcon,
  BookMarked,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'link' | 'article';
  subject: string;
  description: string;
  url: string;
  duration?: string;
  pages?: number;
  saved: boolean;
  addedDate: string;
  aiRecommended?: boolean;
}

export function ResourceManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [resources] = useState<Resource[]>([
    {
      id: 1,
      title: 'User Research Methods - Complete Guide',
      type: 'pdf',
      subject: 'Interaction Design',
      description: 'Comprehensive guide covering interviews, surveys, usability testing, and data analysis techniques.',
      url: '#',
      pages: 45,
      saved: true,
      addedDate: '2025-10-15',
      aiRecommended: true
    },
    {
      id: 2,
      title: 'Introduction to Machine Learning',
      type: 'video',
      subject: 'Data Science',
      description: 'Stanford CS229 lecture covering supervised learning fundamentals and practical applications.',
      url: '#',
      duration: '1h 15m',
      saved: false,
      addedDate: '2025-10-20',
      aiRecommended: true
    },
    {
      id: 3,
      title: 'Cognitive Psychology: Memory and Learning',
      type: 'article',
      subject: 'Psychology',
      description: 'Research paper on working memory, long-term memory consolidation, and effective study techniques.',
      url: '#',
      saved: true,
      addedDate: '2025-10-22'
    },
    {
      id: 4,
      title: 'Figma Design System Tutorial',
      type: 'video',
      subject: 'Interaction Design',
      description: 'Step-by-step guide to building scalable design systems in Figma with components and variants.',
      url: '#',
      duration: '45m',
      saved: false,
      addedDate: '2025-10-25'
    },
    {
      id: 5,
      title: 'Research Methodology Handbook',
      type: 'pdf',
      subject: 'Research Methods',
      description: 'Complete handbook covering qualitative and quantitative research methods for academic writing.',
      url: '#',
      pages: 120,
      saved: true,
      addedDate: '2025-10-28'
    },
    {
      id: 6,
      title: 'Python for Data Analysis',
      type: 'link',
      subject: 'Data Science',
      description: 'Interactive course covering pandas, numpy, and data visualization with practical exercises.',
      url: '#',
      saved: false,
      addedDate: '2025-10-30',
      aiRecommended: true
    },
    {
      id: 7,
      title: 'UX Writing Best Practices',
      type: 'article',
      subject: 'Interaction Design',
      description: 'Guide to writing clear, concise microcopy for user interfaces and digital products.',
      url: '#',
      saved: false,
      addedDate: '2025-11-01'
    },
    {
      id: 8,
      title: 'Statistical Analysis in Psychology',
      type: 'pdf',
      subject: 'Psychology',
      description: 'Comprehensive guide to statistical methods used in psychological research and experiments.',
      url: '#',
      pages: 67,
      saved: true,
      addedDate: '2025-11-02'
    }
  ]);

  const [savedResources, setSavedResources] = useState(
    resources.filter(r => r.saved)
  );

  const handleSaveResource = (id: number) => {
    const resource = resources.find(r => r.id === id);
    if (resource) {
      if (savedResources.find(r => r.id === id)) {
        setSavedResources(savedResources.filter(r => r.id !== id));
        toast.success('Resource removed from saved');
      } else {
        setSavedResources([...savedResources, resource]);
        toast.success('Resource saved successfully');
      }
    }
  };

  const handleDownload = (title: string) => {
    toast.success(`Downloading: ${title}`);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'video': return <Video className="w-5 h-5 text-purple-500" />;
      case 'link': return <LinkIcon className="w-5 h-5 text-blue-500" />;
      case 'article': return <BookMarked className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getResourceBadgeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'video': return 'bg-purple-100 text-purple-700';
      case 'link': return 'bg-blue-100 text-blue-700';
      case 'article': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const aiRecommendedResources = resources.filter(r => r.aiRecommended);

  const resourcesBySubject = resources.reduce((acc, resource) => {
    if (!acc[resource.subject]) {
      acc[resource.subject] = [];
    }
    acc[resource.subject].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Learning Resources</h1>
        <p className="text-gray-600 mt-1">Access study materials, videos, and recommended content</p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search resources by title, subject, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Resources</p>
                <p className="text-2xl font-semibold text-gray-900">{resources.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Saved</p>
                <p className="text-2xl font-semibold text-gray-900">{savedResources.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Subjects</p>
                <p className="text-2xl font-semibold text-gray-900">{Object.keys(resourcesBySubject).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookMarked className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:border-purple-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          {resource.aiRecommended && (
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Pick
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`text-xs ${getResourceBadgeColor(resource.type)}`}>
                            {resource.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {resource.subject}
                          </Badge>
                          {resource.duration && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {resource.duration}
                            </span>
                          )}
                          {resource.pages && (
                            <span className="text-xs text-gray-500">
                              {resource.pages} pages
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          Added {new Date(resource.addedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSaveResource(resource.id)}
                      >
                        <Star className={`w-4 h-4 ${savedResources.find(r => r.id === resource.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        {savedResources.find(r => r.id === resource.id) ? 'Saved' : 'Save'}
                      </Button>
                      {resource.type === 'pdf' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownload(resource.title)}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedResources.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No saved resources yet</p>
                <p className="text-sm text-gray-500 mt-1">Save resources to access them quickly later</p>
              </CardContent>
            </Card>
          ) : (
            savedResources.map((resource) => (
              <Card key={resource.id} className="hover:border-purple-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getResourceIcon(resource.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{resource.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={`text-xs ${getResourceBadgeColor(resource.type)}`}>
                              {resource.type.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {resource.subject}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSaveResource(resource.id)}
                        >
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          Remove
                        </Button>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="w-4 h-4" />
                          Open
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          {Object.entries(resourcesBySubject).map(([subject, subjectResources]) => (
            <Card key={subject}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="w-5 h-5" />
                  {subject}
                </CardTitle>
                <p className="text-sm text-gray-600">{subjectResources.length} resources available</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjectResources.map((resource) => (
                  <div key={resource.id} className="p-3 border rounded-lg flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3 flex-1">
                      {getResourceIcon(resource.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{resource.title}</h4>
                        <p className="text-xs text-gray-500">{resource.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => handleSaveResource(resource.id)}
                      >
                        <Star className={`w-4 h-4 ${savedResources.find(r => r.id === resource.id) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
