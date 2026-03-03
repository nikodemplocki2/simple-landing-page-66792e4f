import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Flame,
  BookOpen,
  Trophy,
  Sparkles,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function WeeklySummary() {
  // Mock data for current week
  const currentWeek = {
    weekNumber: 44,
    dateRange: 'Oct 28 - Nov 3, 2025',
    stats: {
      goalsCompleted: 5,
      studyHours: 25,
      streakDays: 7,
      averageSession: 3.5,
      focusScore: 87
    },
    comparison: {
      goals: 2, // +2 vs last week
      hours: 3, // +3 hours vs last week  
      focus: -5 // -5% vs last week
    },
    dailyBreakdown: [
      { day: 'Monday', date: 'Oct 28', hours: 4, goals: 1, focus: 90 },
      { day: 'Tuesday', date: 'Oct 29', hours: 3, goals: 1, focus: 85 },
      { day: 'Wednesday', date: 'Oct 30', hours: 2, goals: 0, focus: 75 },
      { day: 'Thursday', date: 'Oct 31', hours: 5, goals: 2, focus: 92 },
      { day: 'Friday', date: 'Nov 1', hours: 3, goals: 1, focus: 88 },
      { day: 'Saturday', date: 'Nov 2', hours: 5, goals: 0, focus: 80 },
      { day: 'Sunday', date: 'Nov 3', hours: 3, goals: 0, focus: 95 }
    ],
    topSubjects: [
      { name: 'Interaction Design', hours: 10, percentage: 40 },
      { name: 'Data Science', hours: 8, percentage: 32 },
      { name: 'Psychology', hours: 7, percentage: 28 }
    ],
    achievements: [
      { title: 'Perfect Week', description: 'Studied every day this week' },
      { title: '25 Hours', description: 'Reached 25 study hours milestone' }
    ],
    highlights: [
      'Completed 5 goals - your best week yet! 🎯',
      'Maintained a 7-day study streak 🔥',
      'Thursday was your most productive day with 5 hours',
      'Your focus score improved by 8% mid-week'
    ],
    areasForImprovement: [
      'Consider scheduling more deep work sessions in the morning',
      'Wednesday showed lower engagement - try breaking tasks into smaller chunks',
      'You can increase your weekly goal completion rate by 20% next week'
    ],
    aiInsights: {
      bestTime: '9-11 AM',
      optimalDuration: '90 minutes',
      recommendedBreaks: '15 minutes every 90 minutes',
      nextWeekFocus: 'Psychology exam preparation'
    }
  };

  const handleExport = () => {
    toast.success('Summary exported as PDF');
  };

  const handleShare = () => {
    toast.success('Summary link copied to clipboard');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Weekly Summary</h1>
          <p className="text-gray-600 mt-1">
            Week {currentWeek.weekNumber}: {currentWeek.dateRange}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Achievement Banner */}
      <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold mb-2">Outstanding Week! 🎉</h2>
              <p className="text-green-100">
                You completed {currentWeek.stats.goalsCompleted} goals and studied for {currentWeek.stats.studyHours} hours. 
                This is your best performance this month!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Target className="w-5 h-5 text-blue-600" />
                {currentWeek.comparison.goals > 0 && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{currentWeek.comparison.goals}
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-semibold">{currentWeek.stats.goalsCompleted}</p>
              <p className="text-sm text-gray-600">Goals Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Clock className="w-5 h-5 text-purple-600" />
                {currentWeek.comparison.hours > 0 && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +{currentWeek.comparison.hours}h
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-semibold">{currentWeek.stats.studyHours}h</p>
              <p className="text-sm text-gray-600">Study Hours</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <p className="text-2xl font-semibold">{currentWeek.stats.streakDays}</p>
              <p className="text-sm text-gray-600">Day Streak</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <p className="text-2xl font-semibold">{currentWeek.stats.averageSession}h</p>
              <p className="text-sm text-gray-600">Avg Session</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Sparkles className="w-5 h-5 text-pink-600" />
                {currentWeek.comparison.focus < 0 && (
                  <Badge className="bg-orange-100 text-orange-700 text-xs">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    {currentWeek.comparison.focus}%
                  </Badge>
                )}
              </div>
              <p className="text-2xl font-semibold">{currentWeek.stats.focusScore}%</p>
              <p className="text-sm text-gray-600">Focus Score</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Daily Breakdown
            </CardTitle>
            <p className="text-sm text-gray-600">Your activity throughout the week</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentWeek.dailyBreakdown.map((day, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{day.day}</h4>
                    <p className="text-xs text-gray-500">{day.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{day.hours}h</p>
                    <p className="text-xs text-gray-600">{day.goals} goals</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={day.focus} className="h-1.5 flex-1" />
                  <span className="text-xs text-gray-600">{day.focus}% focus</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Study Time by Subject */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Time by Subject
            </CardTitle>
            <p className="text-sm text-gray-600">Where you spent your study time</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentWeek.topSubjects.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <span className="text-sm text-gray-600">{subject.hours}h ({subject.percentage}%)</span>
                </div>
                <Progress value={subject.percentage} className="h-2" />
              </div>
            ))}
            
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3">This Week's Achievements</h4>
              <div className="space-y-2">
                {currentWeek.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Highlights & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Week Highlights
            </CardTitle>
            <p className="text-sm text-gray-600">Your biggest wins this week</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentWeek.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Growth Areas
            </CardTitle>
            <p className="text-sm text-gray-600">Opportunities for next week</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {currentWeek.areasForImprovement.map((area, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Recommendations for Next Week
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-purple-100">Best Study Time</p>
              <p className="font-semibold">{currentWeek.aiInsights.bestTime}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-purple-100">Optimal Session Length</p>
              <p className="font-semibold">{currentWeek.aiInsights.optimalDuration}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-purple-100">Recommended Breaks</p>
              <p className="font-semibold">{currentWeek.aiInsights.recommendedBreaks}</p>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm text-purple-100">Priority Focus</p>
              <p className="font-semibold">{currentWeek.aiInsights.nextWeekFocus}</p>
            </div>
          </div>
          <p className="text-sm text-purple-100 pt-2">
            Based on your patterns, following these recommendations could improve your productivity by up to 30% next week.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
