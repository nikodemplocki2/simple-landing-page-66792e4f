import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { 
  Target, 
  TrendingUp,
  Flame,
  Trophy,
  Clock,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Calendar,
  BookOpen,
  Zap
} from 'lucide-react';

interface DashboardHomeProps {
  studentName: string;
  program: string;
}

export function DashboardHome({ studentName, program }: DashboardHomeProps) {
  // Mock data - in real app this would come from API/backend
  const studentStats = {
    currentStreak: 12,
    goalsCompleted: 8,
    weeklyProgress: 75,
    totalPoints: 2450,
    level: 7
  };

  const activeGoals = [
    { 
      id: 1,
      title: 'Complete UX Research Assignment', 
      subject: 'Interaction Design', 
      progress: 85,
      dueDate: '2025-11-10',
      priority: 'high'
    },
    { 
      id: 2,
      title: 'Finish Machine Learning Module 3', 
      subject: 'Data Science', 
      progress: 60,
      dueDate: '2025-11-12',
      priority: 'medium'
    },
    { 
      id: 3,
      title: 'Study for Psychology Exam', 
      subject: 'Psychology', 
      progress: 40,
      dueDate: '2025-11-15',
      priority: 'high'
    }
  ];

  const recentAchievements = [
    { 
      id: 1,
      title: 'Week Warrior',
      description: 'Completed 7 days streak',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    },
    { 
      id: 2,
      title: 'Goal Crusher',
      description: 'Completed 5 goals this month',
      icon: Trophy,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100'
    },
    { 
      id: 3,
      title: 'Early Bird',
      description: 'Started studying before 8 AM',
      icon: Sparkles,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    }
  ];

  const aiNudges = [
    {
      id: 1,
      type: 'motivation',
      message: "Great progress on your UX assignment! You're 85% done. Just one more session to finish it! 🎯",
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'suggestion',
      message: "Based on your study patterns, mornings work best for you. Consider scheduling your ML study session for tomorrow 9 AM.",
      time: '5 hours ago'
    },
    {
      id: 3,
      type: 'reminder',
      message: "Your Psychology exam is in 12 days. You're currently at 40% preparation. Let's break it into smaller daily tasks?",
      time: '1 day ago'
    }
  ];

  const weeklyActivity = [
    { day: 'Mon', hours: 3 },
    { day: 'Tue', hours: 4 },
    { day: 'Wed', hours: 2 },
    { day: 'Thu', hours: 5 },
    { day: 'Fri', hours: 3 },
    { day: 'Sat', hours: 1 },
    { day: 'Sun', hours: 2 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'secondary';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date('2025-11-03');
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div>
        <h1>Welcome back, {studentName.split(' ')[0]}! 👋</h1>
        <p className="text-gray-600 mt-1">You're making great progress. Keep up the momentum!</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-semibold text-gray-900">{studentStats.currentStreak} days</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goals Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{studentStats.goalsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Progress</p>
                <p className="text-2xl font-semibold text-gray-900">{studentStats.weeklyProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Level {studentStats.level}</p>
                <p className="text-2xl font-semibold text-gray-900">{studentStats.totalPoints} XP</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Goals
            </CardTitle>
            <p className="text-sm text-gray-600">Your current academic goals and progress</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.subject}</p>
                  </div>
                  <Badge variant={getPriorityColor(goal.priority)} className="text-xs">
                    {goal.priority}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Due in {getDaysUntilDue(goal.dueDate)} days</span>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Goals
            </Button>
          </CardContent>
        </Card>

        {/* AI Nudges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Insights & Nudges
            </CardTitle>
            <p className="text-sm text-gray-600">Personalized recommendations for you</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiNudges.map((nudge) => (
              <div key={nudge.id} className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm">{nudge.message}</p>
                <p className="text-xs text-gray-500 mt-2">{nudge.time}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Insights
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              This Week's Activity
            </CardTitle>
            <p className="text-sm text-gray-600">Your study hours throughout the week</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500 to-purple-300 rounded-t-lg transition-all hover:from-purple-600 hover:to-purple-400"
                    style={{ height: `${(day.hours / 5) * 100}%`, minHeight: '20px' }}
                  />
                  <span className="text-xs text-gray-600">{day.day}</span>
                  <span className="text-xs font-medium">{day.hours}h</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm">
                <strong>Total this week:</strong> {weeklyActivity.reduce((sum, day) => sum + day.hours, 0)} hours
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Recent Achievements
            </CardTitle>
            <p className="text-sm text-gray-600">Your latest unlocked achievements</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAchievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                  <div className={`w-12 h-12 ${achievement.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${achievement.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full">
              View All Achievements
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Quick Actions
          </CardTitle>
          <p className="text-sm text-gray-600">Common tasks to boost your productivity</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start gap-2">
              <Target className="w-4 h-4" />
              Set New Goal
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <BookOpen className="w-4 h-4" />
              Browse Resources
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Calendar className="w-4 h-4" />
              View Weekly Summary
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
