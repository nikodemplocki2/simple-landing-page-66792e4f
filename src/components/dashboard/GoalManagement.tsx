import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { 
  Target, 
  Plus,
  CheckCircle,
  Clock,
  Calendar,
  Edit,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Goal {
  id: number;
  title: string;
  description: string;
  subject: string;
  priority: 'high' | 'medium' | 'low';
  progress: number;
  dueDate: string;
  status: 'active' | 'completed' | 'overdue';
  milestones: string[];
}

export function GoalManagement() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Complete UX Research Assignment',
      description: 'Conduct user interviews and create personas for the mobile app project',
      subject: 'Interaction Design',
      priority: 'high',
      progress: 85,
      dueDate: '2025-11-10',
      status: 'active',
      milestones: ['Research planning', 'Conduct interviews', 'Analyze data', 'Create deliverables']
    },
    {
      id: 2,
      title: 'Finish Machine Learning Module 3',
      description: 'Complete all video lectures, assignments, and the final quiz',
      subject: 'Data Science',
      priority: 'medium',
      progress: 60,
      dueDate: '2025-11-12',
      status: 'active',
      milestones: ['Watch lectures', 'Complete exercises', 'Submit assignment', 'Take quiz']
    },
    {
      id: 3,
      title: 'Study for Psychology Exam',
      description: 'Review chapters 1-8, practice questions, and create summary notes',
      subject: 'Psychology',
      priority: 'high',
      progress: 40,
      dueDate: '2025-11-15',
      status: 'active',
      milestones: ['Review chapters', 'Make notes', 'Practice questions', 'Final review']
    },
    {
      id: 4,
      title: 'Submit Literature Review',
      description: 'Complete and submit the literature review for thesis proposal',
      subject: 'Research Methods',
      priority: 'high',
      progress: 100,
      dueDate: '2025-10-28',
      status: 'completed',
      milestones: ['Find sources', 'Read papers', 'Write draft', 'Submit']
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    subject: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: ''
  });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.subject || !newGoal.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const goal: Goal = {
      id: goals.length + 1,
      ...newGoal,
      progress: 0,
      status: 'active',
      milestones: []
    };

    setGoals([goal, ...goals]);
    setNewGoal({ title: '', description: '', subject: '', priority: 'medium', dueDate: '' });
    setIsDialogOpen(false);
    toast.success('Goal created successfully! 🎯');
  };

  const handleUpdateProgress = (id: number, newProgress: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === id) {
        const status = newProgress === 100 ? 'completed' : 'active';
        if (newProgress === 100) {
          toast.success('Congratulations! Goal completed! 🎉');
        }
        return { ...goal, progress: newProgress, status };
      }
      return goal;
    }));
  };

  const handleDeleteGoal = (id: number) => {
    setGoals(goals.filter(goal => goal.id !== id));
    toast.success('Goal deleted');
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Completed</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">Active</Badge>;
    }
  };

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>My Goals</h1>
          <p className="text-gray-600 mt-1">Set, track, and achieve your academic goals</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a new academic goal to track your progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Complete Assignment 3"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Add more details about your goal..."
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject/Course *</Label>
                <Input
                  id="subject"
                  placeholder="e.g., Data Science"
                  value={newGoal.subject}
                  onChange={(e) => setNewGoal({ ...newGoal, subject: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={newGoal.priority} onValueChange={(value: any) => setNewGoal({ ...newGoal, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newGoal.dueDate}
                  onChange={(e) => setNewGoal({ ...newGoal, dueDate: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddGoal} className="flex-1">Create Goal</Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Goals</p>
                <p className="text-2xl font-semibold text-gray-900">{activeGoals.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-semibold text-gray-900">{completedGoals.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {goals.length > 0 ? Math.round((completedGoals.length / goals.length) * 100) : 0}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Active Goals
          </CardTitle>
          <p className="text-sm text-gray-600">Goals you're currently working on</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeGoals.length === 0 ? (
            <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No active goals yet. Create your first goal to get started!</p>
            </div>
          ) : (
            activeGoals.map((goal) => (
              <div key={goal.id} className="p-4 border rounded-lg space-y-4 hover:border-purple-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{goal.title}</h4>
                      <Badge variant={getPriorityColor(goal.priority)} className="text-xs">
                        {goal.priority}
                      </Badge>
                      {getStatusBadge(goal.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">
                        <strong>Subject:</strong> {goal.subject}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        Due in {getDaysUntilDue(goal.dueDate)} days
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUpdateProgress(goal.id, Math.min(goal.progress + 25, 100))}
                    >
                      +25% Progress
                    </Button>
                    {goal.progress < 100 && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateProgress(goal.id, 100)}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>

                {/* Milestones */}
                {goal.milestones.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Milestones:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {goal.milestones.map((milestone, index) => (
                        <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {milestone}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Completed Goals */}
      {completedGoals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Completed Goals
            </CardTitle>
            <p className="text-sm text-gray-600">Goals you've successfully achieved</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedGoals.map((goal) => (
              <div key={goal.id} className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h4 className="font-medium">{goal.title}</h4>
                      {getStatusBadge(goal.status)}
                    </div>
                    <p className="text-sm text-gray-600">{goal.subject}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Help Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Tips for Effective Goal Setting</h4>
              <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
                <li>Break large goals into smaller, manageable milestones</li>
                <li>Set realistic deadlines and adjust as needed</li>
                <li>Review and update your progress regularly</li>
                <li>Celebrate small wins to stay motivated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
