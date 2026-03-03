import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Clock, 
  Target,
  BookOpen,
  Lightbulb,
  BarChart3
} from 'lucide-react';

export function ProgressAnalytics() {
  const performanceData = [
    { month: 'Jul', xp: 120, goals: 3, avgScore: 78 },
    { month: 'Aug', xp: 180, goals: 5, avgScore: 82 },
    { month: 'Sep', xp: 220, goals: 6, avgScore: 85 },
    { month: 'Oct', xp: 280, goals: 7, avgScore: 88 },
    { month: 'Nov', xp: 320, goals: 8, avgScore: 90 },
  ];

  const feedbackTrends = [
    { aspect: 'Clarity', current: 88, previous: 73, change: 15 },
    { aspect: 'Structure', current: 85, previous: 75, change: 10 },
    { aspect: 'Grammar', current: 92, previous: 88, change: 4 },
    { aspect: 'Depth', current: 80, previous: 76, change: 4 },
  ];

  const studyPatterns = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 3.8 },
    { day: 'Wed', hours: 5.2 },
    { day: 'Thu', hours: 4.0 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 2.8 },
    { day: 'Sun', hours: 3.2 },
  ];

  const grades = [
    { course: 'Data Structures', code: 'CS101', grade: 'A-', credits: 6, status: 'completed' },
    { course: 'Algorithm Analysis', code: 'CS201', grade: 'B+', credits: 6, status: 'in-progress' },
    { course: 'Database Systems', code: 'CS102', grade: 'A', credits: 6, status: 'completed' },
    { course: 'Web Development', code: 'CS103', grade: 'A-', credits: 4, status: 'completed' },
  ];

  const maxXP = Math.max(...performanceData.map(d => d.xp));
  const maxHours = Math.max(...studyPatterns.map(d => d.hours));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2 font-semibold">Progress & Analytics</h1>
        <p className="text-gray-400">Track your academic performance and learning patterns</p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-6 h-6 text-purple-400" />
              <Badge className="bg-purple-500 text-white border-0">+12%</Badge>
            </div>
            <p className="text-sm text-purple-400 mb-1">Total XP</p>
            <p className="text-3xl text-white font-semibold">750</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-green-400" />
              <Badge className="bg-green-500 text-white border-0">+20%</Badge>
            </div>
            <p className="text-sm text-green-400 mb-1">Goals Completed</p>
            <p className="text-3xl text-white font-semibold">8</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <Badge className="bg-blue-500 text-white border-0">A-</Badge>
            </div>
            <p className="text-sm text-blue-400 mb-1">Avg Grade</p>
            <p className="text-3xl text-white font-semibold">3.7</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-orange-400" />
              <Badge className="bg-orange-500 text-white border-0">27h</Badge>
            </div>
            <p className="text-sm text-orange-400 mb-1">Weekly Study</p>
            <p className="text-3xl text-white font-semibold">3.9h</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* XP Progression */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white font-medium">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              XP Progression
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((data, idx) => (
                <div key={data.month}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-400">{data.month}</span>
                    <span className="text-white font-medium">{data.xp} XP</span>
                  </div>
                  <div className="relative w-full bg-[#1a1a1a] border border-[#262626] rounded-full h-3 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(data.xp / maxXP) * 100}%`,
                        animationDelay: `${idx * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/20">
              <p className="text-sm text-gray-300">
                📈 You've earned 320 XP this month - that's a 14% increase from last month!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Study Time Analytics */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white font-medium">
              <Clock className="w-5 h-5 text-blue-400" />
              Study Time Analytics
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {studyPatterns.map((data, idx) => (
                <div key={data.day}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-400">{data.day}</span>
                    <span className="text-white font-medium">{data.hours}h</span>
                  </div>
                  <div className="relative w-full bg-[#1a1a1a] border border-[#262626] rounded-full h-3 overflow-hidden">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(data.hours / maxHours) * 100}%`,
                        animationDelay: `${idx * 100}ms`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20">
              <p className="text-sm text-gray-300">
                💡 Your study consistency improved by 18% this week!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Trends & Grades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feedback Trends */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white font-medium">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Feedback Trends
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackTrends.map((trend, idx) => (
                <div key={trend.aspect} className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white mb-1 font-medium">{trend.aspect}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#0a0a0a] border border-[#262626] rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${trend.current}%`,
                            animationDelay: `${idx * 150}ms`
                          }}
                        />
                      </div>
                      <span className="text-sm text-gray-400 w-12 text-right">{trend.current}%</span>
                    </div>
                  </div>
                  <div className={`ml-4 flex items-center gap-1 ${
                    trend.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trend.change > 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">+{trend.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Grade Overview */}
        <Card className="bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white font-medium">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Grade Overview
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {grades.map((grade) => (
                <div key={grade.code} className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">{grade.course}</p>
                    <p className="text-xs text-gray-500">{grade.code} • {grade.credits} credits</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      className={grade.status === 'completed' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      }
                    >
                      {grade.status}
                    </Badge>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      {grade.grade}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
              <p className="text-sm text-gray-300">
                🎓 Your GPA is 3.7 - above class average of 3.4!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white font-medium">
            <Lightbulb className="w-5 h-5 text-purple-400" />
            Predictive Insights
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-sm text-purple-400 mb-2 font-medium">📊 Performance Pattern</h4>
              <p className="text-sm text-gray-300">
                You perform best on Wednesday and Thursday, with 23% higher productivity than weekends.
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-sm text-blue-400 mb-2 font-medium">⏰ Optimal Study Time</h4>
              <p className="text-sm text-gray-300">
                Your focus peaks between 2-5 PM. Consider scheduling difficult tasks during this window.
              </p>
            </div>
            <div className="bg-[#1a1a1a] border border-green-500/20 rounded-lg p-4">
              <h4 className="text-sm text-green-400 mb-2 font-medium">📈 Pacing Improvement</h4>
              <p className="text-sm text-gray-300">
                Your task completion pacing has improved by 12% this month. Keep up the momentum!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
