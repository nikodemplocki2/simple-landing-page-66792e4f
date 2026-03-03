import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  Plus, 
  Target, 
  Calendar, 
  Clock, 
  Sparkles, 
  FileText, 
  Building2, 
  User,
  CheckCircle2,
  Circle,
  ChevronRight,
  Award
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function MyGoals() {
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null);

  const activeGoals = [
    {
      id: 1,
      title: 'Complete Data Structures Course with A grade',
      description: 'Master all fundamental data structures and achieve high performance',
      type: 'assignment',
      source: 'From Assignment',
      progress: 68,
      dueDate: 'Dec 15, 2025',
      linkedCourse: 'CS101 - Data Structures',
      xpEarned: 180,
      estimatedTime: '2 weeks remaining',
      milestones: [
        { id: 1, title: 'Complete Arrays & Linked Lists module', completed: true },
        { id: 2, title: 'Pass Trees & Graphs quiz', completed: true },
        { id: 3, title: 'Submit final project', completed: false },
        { id: 4, title: 'Prepare for final exam', completed: false },
      ]
    },
    {
      id: 2,
      title: 'Build a personal portfolio website',
      description: 'Create and deploy a professional portfolio showcasing my projects',
      type: 'personal',
      source: 'Personal Goal',
      progress: 45,
      dueDate: 'Nov 30, 2025',
      linkedCourse: null,
      xpEarned: 90,
      estimatedTime: '3 weeks remaining',
      milestones: [
        { id: 1, title: 'Design wireframes', completed: true },
        { id: 2, title: 'Set up development environment', completed: true },
        { id: 3, title: 'Build homepage and project gallery', completed: false },
        { id: 4, title: 'Deploy to production', completed: false },
      ]
    },
    {
      id: 3,
      title: 'Register for Spring 2026 courses',
      description: 'Complete course registration and plan next semester schedule',
      type: 'university',
      source: 'From University',
      progress: 30,
      dueDate: 'Nov 20, 2025',
      linkedCourse: 'University Administration',
      xpEarned: 30,
      estimatedTime: '10 days remaining',
      milestones: [
        { id: 1, title: 'Review available courses', completed: true },
        { id: 2, title: 'Meet with academic advisor', completed: false },
        { id: 3, title: 'Submit registration form', completed: false },
      ]
    },
  ];

  const goalTypeConfig = {
    assignment: { color: 'purple', icon: FileText },
    personal: { color: 'blue', icon: User },
    university: { color: 'green', icon: Building2 },
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2 font-semibold">My Goals</h1>
          <p className="text-gray-400">Track and manage your academic and personal objectives</p>
        </div>
        <Button 
          onClick={() => setShowCreateGoal(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0 gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Goal
        </Button>
      </div>

      {/* Goal Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-400 mb-1">Active Goals</p>
                <p className="text-3xl text-white font-semibold">3</p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-400 mb-1">Completed This Month</p>
                <p className="text-3xl text-white font-semibold">5</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-400 mb-1">XP Earned</p>
                <p className="text-3xl text-white font-semibold">300</p>
              </div>
              <Award className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals List */}
      <div className="space-y-4">
        {activeGoals.map((goal) => {
          const config = goalTypeConfig[goal.type as keyof typeof goalTypeConfig];
          const Icon = config.icon;
          
          return (
            <Card 
              key={goal.id}
              className="bg-[#141414] border-[#262626] hover:border-indigo-500/30 transition-all cursor-pointer"
              onClick={() => setSelectedGoal(goal.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        config.color === 'purple' ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30' :
                        config.color === 'blue' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30' :
                        'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          config.color === 'purple' ? 'text-purple-400' :
                          config.color === 'blue' ? 'text-blue-400' :
                          'text-green-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-white mb-1 font-medium">{goal.title}</h3>
                        <p className="text-sm text-gray-400">{goal.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Badge className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                            {goal.source}
                          </Badge>
                          {goal.linkedCourse && (
                            <span className="text-xs text-gray-500">{goal.linkedCourse}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Progress</span>
                      <span className="text-white">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-[#1a1a1a] rounded-full h-2 overflow-hidden border border-[#262626]">
                      <div 
                        className={`h-full rounded-full ${
                          config.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
                          config.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {goal.dueDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {goal.estimatedTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-purple-400">
                      <Award className="w-4 h-4" />
                      <span>{goal.xpEarned} XP</span>
                    </div>
                  </div>

                  {/* Milestones Preview */}
                  <div className="flex items-center gap-2 pt-2 border-t border-[#262626]">
                    {goal.milestones.map((milestone) => (
                      <div 
                        key={milestone.id}
                        className={`w-2 h-2 rounded-full ${
                          milestone.completed ? 'bg-green-500' : 'bg-gray-600'
                        }`}
                        title={milestone.title}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      {goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} milestones
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Create Goal Dialog */}
      <Dialog open={showCreateGoal} onOpenChange={setShowCreateGoal}>
        <DialogContent className="max-w-2xl bg-[#141414] border-[#262626] text-white">
          <DialogTitle className="sr-only">Create New Goal</DialogTitle>
          <DialogDescription className="sr-only">Set a new academic or personal objective</DialogDescription>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl text-white mb-2 font-semibold">Create New Goal</h2>
              <p className="text-gray-400">Set a new academic or personal objective</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Goal Title</label>
                <Input 
                  placeholder="e.g., Master React and build 3 projects" 
                  className="bg-[#1a1a1a] border-[#262626] text-white placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Description</label>
                <Textarea 
                  placeholder="Describe your goal and what you want to achieve..."
                  rows={3}
                  className="bg-[#1a1a1a] border-[#262626] text-white placeholder:text-gray-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Goal Type</label>
                  <select className="w-full px-3 py-2 bg-[#1a1a1a] border border-[#262626] text-white rounded-lg">
                    <option>Personal Goal</option>
                    <option>From Assignment</option>
                    <option>From University</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Due Date</label>
                  <Input 
                    type="date" 
                    className="bg-[#1a1a1a] border-[#262626] text-white"
                  />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium mb-2">✨ AI Suggestion</p>
                    <p className="text-sm text-gray-300">
                      Based on your goal, I recommend breaking it into 4 smaller milestones:
                    </p>
                    <ul className="text-sm text-gray-300 mt-2 space-y-1 ml-4 list-disc">
                      <li>Complete React fundamentals course</li>
                      <li>Build a todo app with state management</li>
                      <li>Create a weather app with API integration</li>
                      <li>Develop a full-stack project with authentication</li>
                    </ul>
                    <Button variant="link" className="text-purple-400 hover:text-purple-300 p-0 h-auto mt-2">
                      Apply AI suggestions
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#262626]">
              <Button 
                variant="outline" 
                className="flex-1 bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white"
                onClick={() => setShowCreateGoal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0"
                onClick={() => {
                  toast.success('Goal created successfully! +20 XP earned');
                  setShowCreateGoal(false);
                }}
              >
                Create Goal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Goal Details Dialog */}
      {selectedGoal && (
        <Dialog open={!!selectedGoal} onOpenChange={() => setSelectedGoal(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-[#141414] border-[#262626] text-white">
            {(() => {
              const goal = activeGoals.find(g => g.id === selectedGoal);
              if (!goal) return null;
              
              const config = goalTypeConfig[goal.type as keyof typeof goalTypeConfig];
              const Icon = config.icon;

              return (
                <div className="space-y-6">
                  <DialogTitle className="sr-only">{goal.title}</DialogTitle>
                  <DialogDescription className="sr-only">View and manage goal details</DialogDescription>
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      config.color === 'purple' ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30' :
                      config.color === 'blue' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30' :
                      'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        config.color === 'purple' ? 'text-purple-400' :
                        config.color === 'blue' ? 'text-blue-400' :
                        'text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl text-white mb-2 font-semibold">{goal.title}</h2>
                      <p className="text-gray-400">{goal.description}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge className="bg-indigo-500/10 text-indigo-400 border-indigo-500/20">{goal.source}</Badge>
                        {goal.linkedCourse && (
                          <span className="text-sm text-gray-500">{goal.linkedCourse}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Overall Progress</span>
                      <span className="text-2xl text-white font-semibold">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-[#0a0a0a] rounded-full h-3 overflow-hidden border border-[#262626]">
                      <div 
                        className={`h-full rounded-full ${
                          config.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
                          config.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#262626]">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">XP Earned</p>
                        <p className="text-xl text-purple-400 font-semibold">{goal.xpEarned}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Due Date</p>
                        <p className="text-xl text-white">{goal.dueDate}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">Time Left</p>
                        <p className="text-xl text-white">{goal.estimatedTime}</p>
                      </div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div>
                    <h3 className="text-lg text-white mb-4 font-medium">Milestones</h3>
                    <div className="space-y-3">
                      {goal.milestones.map((milestone) => (
                        <div 
                          key={milestone.id}
                          className="flex items-center gap-3 p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg"
                        >
                          {milestone.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                          )}
                          <span className={`flex-1 ${
                            milestone.completed ? 'text-gray-500 line-through' : 'text-white'
                          }`}>
                            {milestone.title}
                          </span>
                          {!milestone.completed && (
                            <Button size="sm" variant="outline" className="bg-[#0a0a0a] border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                              Mark Complete
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white font-medium mb-2">✨ AI Recommendation</p>
                        <p className="text-sm text-gray-300">
                          You're making great progress! Consider dedicating 2 hours this week to complete the next milestone. Your current pace suggests you'll finish ahead of schedule.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-[#262626]">
                    <Button variant="outline" className="flex-1 bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white">
                      Edit Goal
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0">
                      Update Progress
                    </Button>
                  </div>
                </div>
              );
            })()}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
