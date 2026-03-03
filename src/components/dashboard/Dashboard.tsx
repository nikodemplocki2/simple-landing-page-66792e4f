import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  TrendingUp,
  Target,
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles,
  Calendar,
  AlertCircle,
  Award,
  GraduationCap,
  Bell,
  MapPin,
  Briefcase,
  HelpCircle,
  Mail,
  Laptop
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'XP This Week', value: '750', change: '+120', icon: TrendingUp, color: 'indigo' },
    { label: 'Tasks Today', value: '6', change: '2 remaining', icon: CheckCircle2, color: 'green' },
  ];

  const todayTasks = [
    { id: 1, title: 'Finish Binary Tree assignment', completed: false, urgent: true, course: 'CS101' },
    { id: 2, title: 'Review Algorithm midterm prep', completed: false, urgent: true, course: 'CS201' },
    { id: 3, title: 'Read Database chapter 8', completed: true, urgent: false, course: 'CS102' },
    { id: 4, title: 'Complete daily reflection', completed: false, urgent: false, course: 'LearnBoost' },
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'Data Structures Assignment 3', course: 'CS101', date: 'Nov 12', days: 2, urgent: true },
    { id: 2, title: 'Algorithm Analysis Midterm', course: 'CS201', date: 'Nov 14', days: 4, urgent: true },
    { id: 3, title: 'Database Design Project', course: 'CS102', date: 'Nov 18', days: 8, urgent: false },
  ];

  const recentActivity = [
    { id: 1, type: 'grade', title: 'Data Structures Lab 2', detail: 'Grade: A-', time: '2h ago' },
    { id: 2, type: 'feedback', title: 'Algorithm Quiz 3', detail: 'AI feedback available', time: '5h ago' },
    { id: 3, type: 'achievement', title: 'Earned "Consistent Learner" badge', detail: '7-day streak!', time: '1d ago' },
  ];

  // University data
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

  const careerListings = [
    { id: 1, company: 'TechCorp AB', position: 'Software Engineering Intern', location: 'Stockholm', type: 'Internship' },
    { id: 2, company: 'DataSolutions Sweden', position: 'Junior Developer', location: 'Gothenburg', type: 'Full-time' },
    { id: 3, company: 'Innovation Labs', position: 'Summer Research Assistant', location: 'Uppsala', type: 'Part-time' },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-[32px] font-semibold text-white tracking-tight">
          Good afternoon, Marta 👋
        </h1>
        <p className="text-[15px] text-[#a1a1aa]">
          You're on a 7-day streak. Let's keep the momentum going!
        </p>
      </div>

      {/* AI Insights Banner - Full Width */}
      <Card className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-[15px] font-semibold text-white">✨ AI Insight</h4>
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-[#a1a1aa] text-[11px] font-medium">
                  Personalized
                </span>
              </div>
              <p className="text-[14px] text-[#d4d4d8] mb-4 leading-relaxed">
                You're ahead of schedule! You've completed 3 tasks earlier than planned this week. Your clarity score improved by 15% since last week.
              </p>
              <div className="flex items-center gap-3">
                <Button 
                  size="sm" 
                  className="h-9 text-[13px] bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 border-0 shadow-lg shadow-indigo-500/20"
                >
                  View Progress
                </Button>
                <button className="text-[13px] text-[#a1a1aa] hover:text-white transition-colors">
                  Why this suggestion?
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 1. Stats Grid - XP THIS WEEK & Tasks Today */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-[#141414] border-[#262626] hover:border-[#3f3f46] transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[12px] text-[#71717a] uppercase tracking-wider font-medium">
                    {stat.label}
                  </span>
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-600/10 flex items-center justify-center`}>
                    <Icon className={`w-4.5 h-4.5 text-${stat.color}-400`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[28px] font-semibold text-white tracking-tight">{stat.value}</p>
                  <p className="text-[13px] text-[#71717a]">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 2. This Week's Schedule - Full Width */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white text-[17px] font-semibold">
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

      {/* 3. Recent Activity & Grades & Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[17px] font-semibold text-white mb-1">Recent Activity</h3>
                <p className="text-[13px] text-[#71717a]">Latest updates</p>
              </div>
            </div>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg border border-[#262626] hover:bg-[#1a1a1a] transition-all cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'grade' ? 'bg-green-500/10' :
                    activity.type === 'feedback' ? 'bg-blue-500/10' :
                    'bg-purple-500/10'
                  }`}>
                    {activity.type === 'grade' && <Award className="w-4.5 h-4.5 text-green-400" />}
                    {activity.type === 'feedback' && <Sparkles className="w-4.5 h-4.5 text-blue-400" />}
                    {activity.type === 'achievement' && <Target className="w-4.5 h-4.5 text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-white mb-0.5">{activity.title}</p>
                    <p className="text-[12px] text-[#71717a] mb-1">{activity.detail}</p>
                    <p className="text-[11px] text-[#52525b]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grades & Exams */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white text-[17px] font-semibold">
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

      {/* 4. Upcoming Deadlines & Career Office */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Deadlines */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-[17px] font-semibold text-white mb-1">Upcoming Deadlines</h3>
                <p className="text-[13px] text-[#71717a]">Next 7 days</p>
              </div>
            </div>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline) => (
                <div
                  key={deadline.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    deadline.urgent
                      ? 'border-red-500/20 bg-red-500/5 hover:bg-red-500/10'
                      : 'border-[#262626] hover:bg-[#1a1a1a]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[14px] font-medium text-white mb-1">{deadline.title}</p>
                      <p className="text-[12px] text-[#71717a]">{deadline.course}</p>
                    </div>
                    {deadline.urgent && (
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 ml-3" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[12px]">
                    <Clock className="w-3.5 h-3.5 text-[#71717a]" />
                    <span className="text-[#a1a1aa]">{deadline.date}</span>
                    <span className="text-[#71717a]">•</span>
                    <span className={deadline.urgent ? 'text-red-400' : 'text-[#a1a1aa]'}>
                      {deadline.days} days left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Office */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white text-[17px] font-semibold">
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
            <Button variant="outline" className="w-full border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white mt-2">
              View All Opportunities
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}