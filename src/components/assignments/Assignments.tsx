import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock,
  Sparkles,
  User,
  Users as UsersIcon,
  AlertCircle,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Assignments() {
  const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const assignments = [
    {
      id: 1,
      title: 'Binary Search Tree Implementation',
      course: 'Data Structures',
      courseCode: 'CS101',
      dueDate: 'Nov 12, 2025',
      daysLeft: 2,
      status: 'pending',
      urgent: true,
      hasAiFeedback: false,
      hasTeacherFeedback: false,
      hasPeerFeedback: false,
    },
    {
      id: 2,
      title: 'Algorithm Analysis Midterm Prep',
      course: 'Algorithm Analysis',
      courseCode: 'CS201',
      dueDate: 'Nov 14, 2025',
      daysLeft: 4,
      status: 'in-progress',
      urgent: true,
      hasAiFeedback: true,
      hasTeacherFeedback: false,
      hasPeerFeedback: false,
    },
    {
      id: 3,
      title: 'Hash Table Lab',
      course: 'Data Structures',
      courseCode: 'CS101',
      dueDate: 'Nov 8, 2025',
      daysLeft: -2,
      status: 'graded',
      grade: 'A-',
      urgent: false,
      hasAiFeedback: true,
      hasTeacherFeedback: true,
      hasPeerFeedback: true,
    },
    {
      id: 4,
      title: 'Database Design Project',
      course: 'Database Systems',
      courseCode: 'CS102',
      dueDate: 'Nov 18, 2025',
      daysLeft: 8,
      status: 'pending',
      urgent: false,
      hasAiFeedback: false,
      hasTeacherFeedback: false,
      hasPeerFeedback: false,
    },
  ];

  const filteredAssignments = statusFilter === 'All' 
    ? assignments 
    : assignments.filter(a => 
        statusFilter === 'Pending' ? a.status === 'pending' :
        statusFilter === 'In Progress' ? a.status === 'in-progress' :
        statusFilter === 'Graded' ? a.status === 'graded' :
        false
      );

  const getStatusBadge = (status: string, urgent: boolean, daysLeft: number) => {
    if (status === 'graded') {
      return <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-[11px]">Graded</Badge>;
    }
    if (urgent && daysLeft <= 3) {
      return <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[11px]">Urgent</Badge>;
    }
    if (status === 'in-progress') {
      return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[11px]">In Progress</Badge>;
    }
    return <Badge className="bg-[#262626] text-[#71717a] border-[#3f3f46] text-[11px]">Not Started</Badge>;
  };

  if (selectedAssignment) {
    const assignment = assignments.find(a => a.id === selectedAssignment);
    if (!assignment) return null;

    return (
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => setSelectedAssignment(null)}
          className="text-[13px] h-8 -ml-2 text-[#a1a1aa] hover:text-white hover:bg-[#1f1f1f]"
        >
          ← Back to Assignments
        </Button>

        {/* Assignment Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-[#71717a]">{assignment.courseCode}</span>
            <span className="text-[13px] text-[#3f3f46]">•</span>
            <span className="text-[13px] text-[#71717a]">{assignment.course}</span>
            <span className="text-[13px] text-[#3f3f46]">•</span>
            {getStatusBadge(assignment.status, assignment.urgent, assignment.daysLeft)}
          </div>
          <h1 className="text-[32px] font-semibold text-white tracking-tight">{assignment.title}</h1>
          <div className="flex items-center gap-2 text-[13px]">
            <Clock className="w-4 h-4 text-[#71717a]" />
            <span className="text-[#a1a1aa]">Due {assignment.dueDate}</span>
            {assignment.status !== 'graded' && (
              <>
                <span className="text-[#3f3f46]">•</span>
                <span className={assignment.urgent ? 'text-red-400' : 'text-[#a1a1aa]'}>
                  {assignment.daysLeft > 0 ? `${assignment.daysLeft} days left` : 'Overdue'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="submission" className="w-full">
          <TabsList className="bg-[#141414] border-b border-[#262626] w-full justify-start rounded-none p-0 h-auto">
            <TabsTrigger 
              value="submission"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-4 py-3 text-[13px] text-[#71717a] data-[state=active]:text-white"
            >
              Submission
            </TabsTrigger>
            <TabsTrigger 
              value="ai-feedback"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-4 py-3 text-[13px] text-[#71717a] data-[state=active]:text-white"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI Feedback
            </TabsTrigger>
            <TabsTrigger 
              value="teacher-feedback"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-4 py-3 text-[13px] text-[#71717a] data-[state=active]:text-white"
            >
              <User className="w-3.5 h-3.5 mr-1.5" />
              Teacher
            </TabsTrigger>
            <TabsTrigger 
              value="peer-feedback"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent px-4 py-3 text-[13px] text-[#71717a] data-[state=active]:text-white"
            >
              <UsersIcon className="w-3.5 h-3.5 mr-1.5" />
              Peers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="submission" className="mt-6">
            <Card className="bg-[#141414] border-[#262626]">
              <CardContent className="p-8">
                {assignment.status === 'pending' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-[16px] font-semibold text-white mb-2">Upload Your Work</h3>
                    <p className="text-[13px] text-[#a1a1aa] mb-6">
                      Drag and drop files here or click to browse
                    </p>
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 shadow-lg shadow-indigo-500/20">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                  </div>
                ) : assignment.status === 'graded' ? (
                  <div>
                    <div className="flex items-center justify-between p-5 rounded-xl bg-green-500/10 border border-green-500/20 mb-6">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                        <div>
                          <p className="text-[14px] font-medium text-white">Submitted and Graded</p>
                          <p className="text-[12px] text-[#a1a1aa]">Submitted on Nov 8, 2025</p>
                        </div>
                      </div>
                      <div className="text-[28px] font-semibold text-green-400">
                        {assignment.grade}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[14px] font-medium text-white">Submitted Files</h4>
                      <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#262626]">
                        <p className="text-[13px] text-white">hash_table_implementation.py</p>
                        <p className="text-[11px] text-[#71717a] mt-1">2.4 MB • Submitted Nov 8</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="text-[14px] font-medium text-white mb-1">Work in Progress</p>
                        <p className="text-[13px] text-[#a1a1aa]">You have a draft saved. Continue working on your submission.</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-feedback" className="mt-6">
            <Card className="bg-[#141414] border-[#262626]">
              <CardContent className="p-8">
                {assignment.hasAiFeedback ? (
                  <div className="space-y-5">
                    <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                      <div className="flex items-start gap-3 mb-4">
                        <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-[15px] font-semibold text-white mb-2">✨ AI Analysis</h4>
                          <p className="text-[13px] text-[#d4d4d8] leading-relaxed">
                            Your implementation demonstrates strong understanding of hash table concepts. The collision handling is well-implemented.
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-[#1a1a1a]/60">
                          <p className="text-[11px] text-[#71717a] mb-1">Structure</p>
                          <p className="text-[18px] font-semibold text-white">92%</p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#1a1a1a]/60">
                          <p className="text-[11px] text-[#71717a] mb-1">Clarity</p>
                          <p className="text-[18px] font-semibold text-white">88%</p>
                        </div>
                        <div className="p-3 rounded-lg bg-[#1a1a1a]/60">
                          <p className="text-[11px] text-[#71717a] mb-1">Efficiency</p>
                          <p className="text-[18px] font-semibold text-white">85%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Sparkles className="w-12 h-12 mx-auto mb-3 text-[#3f3f46]" />
                    <p className="text-[13px] text-[#71717a]">
                      AI feedback will be available after submission
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teacher-feedback" className="mt-6">
            <Card className="bg-[#141414] border-[#262626]">
              <CardContent className="p-8">
                {assignment.hasTeacherFeedback ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[13px] font-medium">
                        PA
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[14px] font-medium text-white">Prof. Anderson</p>
                          <p className="text-[12px] text-[#71717a]">Nov 8, 2025</p>
                        </div>
                        <div className="space-y-3">
                          <p className="text-[13px] text-[#d4d4d8] leading-relaxed">
                            Excellent work on this assignment! Your implementation of the hash table is clean and efficient.
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">A-</Badge>
                            <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">+50 XP</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <User className="w-12 h-12 mx-auto mb-3 text-[#3f3f46]" />
                    <p className="text-[13px] text-[#71717a]">
                      Teacher feedback will be available after grading
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peer-feedback" className="mt-6">
            <Card className="bg-[#141414] border-[#262626]">
              <CardContent className="p-8">
                {assignment.hasPeerFeedback ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#262626]">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-[11px]">
                          AK
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-[13px] font-medium text-white">Anna K.</p>
                            <p className="text-[11px] text-[#71717a]">Nov 7, 2025</p>
                          </div>
                          <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
                            Great implementation! The code is well-structured and easy to follow.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <UsersIcon className="w-12 h-12 mx-auto mb-3 text-[#3f3f46]" />
                    <p className="text-[13px] text-[#71717a] mb-4">
                      No peer feedback yet
                    </p>
                    <Button variant="outline" className="border-[#262626] text-white hover:bg-[#1f1f1f]">
                      Request Peer Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-[32px] font-semibold text-white tracking-tight">Assignments</h1>
        <p className="text-[15px] text-[#a1a1aa]">
          {assignments.filter(a => a.status !== 'graded').length} active • {assignments.filter(a => a.status === 'graded').length} completed
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        {['All', 'Pending', 'In Progress', 'Graded'].map((filter) => (
          <Button
            key={filter}
            variant={statusFilter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(filter)}
            className={`h-8 text-[13px] ${
              statusFilter === filter
                ? 'bg-white text-black hover:bg-white/90'
                : 'border-[#262626] text-[#a1a1aa] hover:bg-[#1f1f1f] hover:text-white'
            }`}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filteredAssignments.map((assignment) => (
          <Card 
            key={assignment.id}
            className="bg-[#141414] border-[#262626] hover:border-[#3f3f46] transition-all cursor-pointer group"
            onClick={() => setSelectedAssignment(assignment.id)}
          >
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  assignment.status === 'graded' ? 'bg-green-500/10' :
                  assignment.urgent ? 'bg-red-500/10' :
                  'bg-blue-500/10'
                }`}>
                  {assignment.status === 'graded' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : assignment.urgent ? (
                    <AlertCircle className="w-5 h-5 text-red-400" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-[15px] font-medium text-white mb-1 group-hover:text-indigo-400 transition-colors">
                        {assignment.title}
                      </h3>
                      <p className="text-[12px] text-[#71717a]">{assignment.courseCode} • {assignment.course}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#71717a] group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-4" />
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 text-[12px] text-[#71717a]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{assignment.dueDate}</span>
                    </div>
                    {getStatusBadge(assignment.status, assignment.urgent, assignment.daysLeft)}
                    {assignment.grade && (
                      <span className="text-[13px] font-medium text-green-400">{assignment.grade}</span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
