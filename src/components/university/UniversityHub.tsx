import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  GraduationCap, 
  Bell, 
  FileText, 
  Briefcase,
  HelpCircle,
  Mail,
  Laptop,
  Clock,
  MapPin,
  Building2,
  Trophy,
  Award,
  BookOpen
} from 'lucide-react';

export function UniversityHub() {
  const schedule = [
    { id: 1, course: 'Data Structures', code: 'CS101', time: '09:00 - 11:00', room: 'Hall A-204', day: 'Monday' },
    { id: 2, course: 'Algorithm Analysis', code: 'CS201', time: '13:00 - 15:00', room: 'Lab B-105', day: 'Monday' },
    { id: 3, course: 'Database Systems', code: 'CS102', time: '10:00 - 12:00', room: 'Hall C-301', day: 'Tuesday' },
    { id: 4, course: 'Data Structures', code: 'CS101', time: '14:00 - 16:00', room: 'Lab A-102', day: 'Wednesday' },
    { id: 5, course: 'Web Development', code: 'CS103', time: '09:00 - 11:00', room: 'Lab D-210', day: 'Thursday' },
  ];

  const grades = [
    { course: 'Data Structures', code: 'CS101', grade: 'A-', points: 3.7, credits: 6, status: 'Final' },
    { course: 'Algorithm Analysis', code: 'CS201', grade: 'B+', points: 3.3, credits: 6, status: 'Midterm' },
    { course: 'Database Systems', code: 'CS102', grade: 'A', points: 4.0, credits: 6, status: 'Final' },
    { course: 'Web Development', code: 'CS103', grade: 'A-', points: 3.7, credits: 4, status: 'Final' },
  ];

  const exams = [
    { id: 1, course: 'Algorithm Analysis', code: 'CS201', date: 'Nov 14, 2025', time: '09:00', room: 'Hall A-101', type: 'Midterm' },
    { id: 2, course: 'Database Systems', code: 'CS102', date: 'Nov 20, 2025', time: '14:00', room: 'Hall B-205', type: 'Quiz' },
    { id: 3, course: 'Data Structures', code: 'CS101', date: 'Dec 15, 2025', time: '10:00', room: 'Hall A-204', type: 'Final' },
  ];

  const announcements = [
    { 
      id: 1, 
      title: 'New library resources available for Computer Science students',
      department: 'Library Services',
      date: 'Nov 8, 2025',
      priority: 'normal',
      content: 'Access to O\'Reilly Learning Platform now available through student portal.'
    },
    { 
      id: 2, 
      title: 'Exam schedule published - Check your courses',
      department: 'Academic Office',
      date: 'Nov 7, 2025',
      priority: 'high',
      content: 'Fall semester examination schedule is now available. Review dates and rooms for all your courses.'
    },
    { 
      id: 3, 
      title: 'Spring 2026 course registration opens Nov 15',
      department: 'Student Services',
      date: 'Nov 5, 2025',
      priority: 'high',
      content: 'Register for next semester courses starting November 15. Meet with your advisor before registration.'
    },
  ];

  const forms = [
    { id: 1, title: 'Course Registration Form', deadline: 'Nov 20, 2025', status: 'pending' },
    { id: 2, title: 'Grade Appeal Request', deadline: 'Dec 1, 2025', status: 'available' },
    { id: 3, title: 'Exam Conflict Resolution', deadline: 'Nov 30, 2025', status: 'available' },
  ];

  const careerListings = [
    { id: 1, company: 'TechCorp AB', position: 'Software Engineering Intern', location: 'Stockholm', type: 'Internship' },
    { id: 2, company: 'DataSolutions Sweden', position: 'Junior Developer', location: 'Gothenburg', type: 'Full-time' },
    { id: 3, company: 'Innovation Labs', position: 'Summer Research Assistant', location: 'Uppsala', type: 'Part-time' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl text-white">University Hub</h1>
          <p className="text-gray-400">Connected to Stockholm University Systems</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 mb-1">Active Courses</p>
                <p className="text-2xl text-white">4</p>
              </div>
              <GraduationCap className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 mb-1">Current GPA</p>
                <p className="text-2xl text-white">3.7</p>
              </div>
              <Trophy className="w-6 h-6 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-400 mb-1">Upcoming Exams</p>
                <p className="text-2xl text-white">3</p>
              </div>
              <FileText className="w-6 h-6 text-orange-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">Total Credits</p>
                <p className="text-2xl text-white">22</p>
              </div>
              <Award className="w-6 h-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Schedule */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white">
              <Calendar className="w-5 h-5 text-blue-400" />
              This Week's Schedule
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {schedule.map((item) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="w-16 text-center bg-blue-600 text-white rounded-lg p-2 flex-shrink-0">
                  <p className="text-xs">{item.day.slice(0, 3)}</p>
                  <p className="text-xs mt-1">{item.time.split(' - ')[0]}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white mb-1">{item.course}</p>
                  <p className="text-xs text-gray-400 mb-1">{item.code}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.room}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Grades & Exams */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white">
              <GraduationCap className="w-5 h-5 text-green-400" />
              Grades & Exams
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {grades.map((grade) => (
                <div key={grade.code} className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">{grade.course}</p>
                    <p className="text-xs text-gray-500">{grade.code} • {grade.credits} credits</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs border-[#262626] text-gray-400">{grade.status}</Badge>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white">
                      {grade.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-[#262626]">
              <p className="text-sm text-gray-400 mb-2">Upcoming Exams:</p>
              <div className="space-y-2">
                {exams.slice(0, 2).map((exam) => (
                  <div key={exam.id} className="flex items-center justify-between text-sm p-2 bg-orange-500/10 rounded border border-orange-500/20">
                    <div>
                      <p className="text-white">{exam.course}</p>
                      <p className="text-xs text-gray-500">{exam.date} • {exam.room}</p>
                    </div>
                    <Badge className="bg-orange-500 text-white border-0">{exam.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white">
            <Bell className="w-5 h-5 text-purple-400" />
            University Announcements
          </h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id}
              className={`p-4 rounded-lg border ${
                announcement.priority === 'high'
                  ? 'bg-purple-500/10 border-purple-500/20'
                  : 'bg-[#1a1a1a] border-[#262626]'
              }`}
            >
              <div className="flex items-start gap-3">
                {announcement.priority === 'high' && (
                  <Bell className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-sm text-white">{announcement.title}</h4>
                    {announcement.priority === 'high' && (
                      <Badge className="bg-purple-500 text-white border-0 text-xs">Important</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{announcement.content}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{announcement.department}</span>
                    <span>•</span>
                    <span>{announcement.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Forms & Applications and Career Office */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forms */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-blue-400" />
              Forms & Applications
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {forms.map((form) => (
              <div key={form.id} className="flex items-center justify-between p-3 bg-[#1a1a1a] rounded-lg border border-[#262626]">
                <div className="flex-1">
                  <p className="text-sm text-white mb-1">{form.title}</p>
                  <p className="text-xs text-gray-500">Deadline: {form.deadline}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={form.status === 'pending' ? 'bg-orange-500 text-white border-0' : 'bg-[#0a0a0a] text-gray-400 border-[#262626]'}
                  >
                    {form.status}
                  </Badge>
                  <Button size="sm" variant="outline" className="border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                    {form.status === 'pending' ? 'Continue' : 'Start'}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Career Office */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white">
              <Briefcase className="w-5 h-5 text-green-400" />
              Career Office
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {careerListings.map((listing) => (
              <div key={listing.id} className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-sm text-white mb-1">{listing.position}</p>
                    <p className="text-xs text-gray-400">{listing.company}</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    {listing.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {listing.location}
                  </span>
                  <Button size="sm" variant="outline" className="h-7 text-xs border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              View All Opportunities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* University Services */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardHeader>
          <h3 className="text-white">University Services</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <HelpCircle className="w-6 h-6 text-blue-400" />
              <span className="text-sm">Helpdesk</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <Mail className="w-6 h-6 text-purple-400" />
              <span className="text-sm">Student Mail</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <Laptop className="w-6 h-6 text-green-400" />
              <span className="text-sm">Software Licenses</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <BookOpen className="w-6 h-6 text-orange-400" />
              <span className="text-sm">Library Portal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}