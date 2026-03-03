import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  TrendingUp,
  Trophy,
  Flame,
  Target,
  BookOpen,
  Clock,
  Calendar,
  Award,
  Star,
  Zap
} from 'lucide-react';

export function ProgressTracking() {
  // Mock data
  const overallStats = {
    totalGoalsCompleted: 24,
    currentStreak: 12,
    longestStreak: 18,
    totalStudyHours: 156,
    averageDaily: 3.2,
    level: 7,
    currentXP: 2450,
    nextLevelXP: 3000
  };

  const weeklyData = [
    { week: 'Week 1', hours: 18, goals: 3 },
    { week: 'Week 2', hours: 22, goals: 4 },
    { week: 'Week 3', hours: 20, goals: 3 },
    { week: 'Week 4', hours: 25, goals: 5 }
  ];

  const subjectProgress = [
    { subject: 'Interaction Design', progress: 85, goals: 8, hours: 45 },
    { subject: 'Data Science', progress: 70, goals: 6, hours: 38 },
    { subject: 'Psychology', progress: 60, goals: 5, hours: 32 },
    { subject: 'Research Methods', progress: 90, goals: 5, hours: 41 }
  ];

  const achievements = [
    { 
      id: 1,
      title: 'First Goal', 
      description: 'Complete your first academic goal',
      icon: Target,
      unlocked: true,
      date: '2025-09-15'
    },
    { 
      id: 2,
      title: 'Week Warrior', 
      description: '7-day study streak',
      icon: Flame,
      unlocked: true,
      date: '2025-10-01'
    },
    { 
      id: 3,
      title: 'Goal Crusher', 
      description: 'Complete 10 goals',
      icon: Trophy,
      unlocked: true,
      date: '2025-10-15'
    },
    { 
      id: 4,
      title: 'Early Bird', 
      description: 'Study before 8 AM for 5 days',
      icon: Star,
      unlocked: true,
      date: '2025-10-22'
    },
    { 
      id: 5,
      title: 'Century Club', 
      description: 'Complete 100 hours of study',
      icon: Clock,
      unlocked: true,
      date: '2025-10-28'
    },
    { 
      id: 6,
      title: 'Streak Master', 
      description: '14-day study streak',
      icon: Flame,
      unlocked: false,
      date: null
    },
    { 
      id: 7,
      title: 'Knowledge Seeker', 
      description: 'Complete 50 goals',
      icon: BookOpen,
      unlocked: false,
      date: null
    },
    { 
      id: 8,
      title: 'Level 10', 
      description: 'Reach level 10',
      icon: Zap,
      unlocked: false,
      date: null
    }
  ];

  const milestones = [
    { title: 'Joined LearnBoost', date: '2025-09-10', icon: Star },
    { title: 'Completed First Goal', date: '2025-09-15', icon: Target },
    { title: 'Reached Level 5', date: '2025-10-05', icon: Zap },
    { title: '100 Study Hours', date: '2025-10-28', icon: Clock },
    { title: 'Current Level 7', date: '2025-11-01', icon: Trophy }
  ];

  const xpProgress = (overallStats.currentXP / overallStats.nextLevelXP) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1>Progress Tracking</h1>
        <p className="text-gray-600 mt-1">Monitor your learning journey and celebrate achievements</p>
      </div>

      {/* Level & XP Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-purple-100 text-sm">Current Level</p>
              <h2 className="text-3xl font-semibold">Level {overallStats.level}</h2>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{overallStats.currentXP} XP</span>
              <span>{overallStats.nextLevelXP} XP</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-white rounded-full h-3 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-sm text-purple-100">
              {overallStats.nextLevelXP - overallStats.currentXP} XP until Level {overallStats.level + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.currentStreak} days</p>
                <p className="text-xs text-gray-500 mt-1">Longest: {overallStats.longestStreak} days</p>
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
                <p className="text-2xl font-semibold text-gray-900">{overallStats.totalGoalsCompleted}</p>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Study Hours</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.totalStudyHours}h</p>
                <p className="text-xs text-gray-500 mt-1">This semester</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Average</p>
                <p className="text-2xl font-semibold text-gray-900">{overallStats.averageDaily}h</p>
                <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">By Subject</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Monthly Progress
              </CardTitle>
              <p className="text-sm text-gray-600">Your study hours and goals completed per week</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyData.map((week, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{week.week}</span>
                      <span className="text-gray-600">{week.hours} hours • {week.goals} goals</span>
                    </div>
                    <Progress value={(week.hours / 30) * 100} className="h-2" />
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  <strong>Total this month:</strong> {weeklyData.reduce((sum, w) => sum + w.hours, 0)} hours • 
                  {' '}{weeklyData.reduce((sum, w) => sum + w.goals, 0)} goals completed
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Study Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Your Study Patterns
              </CardTitle>
              <p className="text-sm text-gray-600">AI-detected insights about your learning habits</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-sm">
                  📈 <strong>Peak Performance:</strong> You're most productive between 9 AM - 12 PM
                </p>
              </div>
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm">
                  ⚡ <strong>Consistency:</strong> You study 5 days per week on average
                </p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm">
                  🎯 <strong>Goal Completion:</strong> Your completion rate has improved by 25% this month
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Progress by Subject
              </CardTitle>
              <p className="text-sm text-gray-600">Track your performance across different courses</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {subjectProgress.map((subject, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{subject.subject}</h4>
                      <p className="text-sm text-gray-600">
                        {subject.goals} goals • {subject.hours} hours
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{subject.progress}%</p>
                    </div>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Achievements
              </CardTitle>
              <p className="text-sm text-gray-600">
                Unlocked: {achievements.filter(a => a.unlocked).length} of {achievements.length}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div 
                      key={achievement.id} 
                      className={`p-4 border rounded-lg flex items-start gap-3 ${
                        achievement.unlocked 
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                          : 'bg-gray-50 border-gray-200 opacity-60'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        achievement.unlocked ? 'bg-yellow-400' : 'bg-gray-300'
                      }`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          {achievement.unlocked && <Badge className="bg-green-500 text-white text-xs">Unlocked</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-gray-500 mt-2">Unlocked on {new Date(achievement.date).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5" />
                Your Journey
              </CardTitle>
              <p className="text-sm text-gray-600">Major milestones in your learning journey</p>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-200" />
                <div className="space-y-6">
                  {milestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return (
                      <div key={index} className="relative flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center z-10">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">{new Date(milestone.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
