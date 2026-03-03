import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  FileText,
  Video,
  BookOpen,
  Sparkles,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  CircleDot,
  Lightbulb,
  Target,
  Eye,
  PenTool,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  X,
  Timer,
  Play,
  Trophy,
  Menu,
  Edit
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface DailyTask {
  id: string;
  course: string;
  courseCode: string;
  taskType: 'read' | 'watch' | 'write' | 'practice' | 'review';
  description: string;
  estimatedTime: string;
  completed: boolean;
  resourceType?: 'pdf' | 'video' | 'link';
  aiHint?: string;
}

interface SRLTask {
  id: string;
  type: 'monitor' | 'reflection';
  title: string;
  description: string;
  estimatedTime: string;
  completed: boolean;
  phase: 'monitor' | 'reflect';
}

interface DaySchedule {
  day: string;
  date: string;
  isToday: boolean;
  tasks: DailyTask[];
  srlTask?: SRLTask;
  completionRate: number;
}

export function AIRoadmap() {
  const currentWeekNumber = 3;
  const overallProgress = 68;

  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly' | 'semester'>('weekly');
  const [isEditMode, setIsEditMode] = useState(false);

  const dailyTips = [
    "Good morning, Marta! You're in Week 3 - the mid-semester point where motivation can dip. Tackle that User Research reading first while your creative energy is fresh, then reward yourself.",
    "You have 4 courses running in parallel. Try the 'One Course Per Day' approach: give today's focus to User Research and Machine Learning only. Quality over quantity!",
    "Your Python assignment is due Saturday. Break it into 3 mini-sessions across the week instead of one marathon. You'll thank yourself later!",
    "Creative work needs breaks! After your 45-min User Research reading, take a 10-min walk before the ML video. Your design brain will appreciate the reset.",
    "Week 3 is when many students lose steam. You've already completed 60% of today's tasks - that's amazing! Keep that consistency going, even if it's just one task per day.",
    "Balance tip: You have 2 design courses and 2 technical courses. Alternate between creative and analytical tasks to keep your mind engaged and avoid burnout.",
    "Mid-week check-in coming Wednesday! Use it to course-correct early. If the ML lectures feel rushed, flag it - your AI roadmap can adapt the pace.",
    "You're juggling User Research interviews AND Machine Learning fundamentals. That's a lot of new concepts! Review yesterday's notes for 5 minutes before starting today - it helps everything stick."
  ];

  // End of Day Reflection state
  const [isReflectionExpanded, setIsReflectionExpanded] = useState(false);
  const [reflectionData, setReflectionData] = useState({
    whatWentWell: '',
    whatToImprove: '',
    howDoYouFeel: ''
  });
  const [completedReflections, setCompletedReflections] = useState<string[]>(['Monday', 'Tuesday', 'Saturday']); // Track which days have saved reflections
  const [encouragementIndex, setEncouragementIndex] = useState(0);

  // Mid-Week Check-In state
  const [midWeekReflections, setMidWeekReflections] = useState({
    tasksCompleted: '',
    taskTiming: '',
    focusLevel: '',
    distractions: '',
    strategyChange: '',
    wantAITip: ''
  });

  // Weekly Reflection state
  const [weeklyReflections, setWeeklyReflections] = useState({
    proudAchievement: '',
    mostHelpfulTask: '',
    challenges: '',
    motivationLevel: '',
    changeForNextWeek: '',
    wantAIAdjustment: ''
  });

  // Practice Interview Answers state
  const [practiceAnswers, setPracticeAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: ''
  });
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  // Quiz Sprint state (for review tasks)
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizTimeRemaining, setQuizTimeRemaining] = useState(600); // 10 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Task modal state
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [openSRLTaskId, setOpenSRLTaskId] = useState<string | null>(null);
  const [inProgressTasks, setInProgressTasks] = useState<Set<string>>(new Set());
  const [canFinishTask, setCanFinishTask] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [writingContent, setWritingContent] = useState('');
  const contentScrollRef = useRef<HTMLDivElement>(null);
  
  // Store previous writing content for each assignment (simulating saved progress)
  const [savedWritingContent, setSavedWritingContent] = useState<Record<string, string>>({
    't1': 'Data cleaning is a crucial step in the data analysis process that involves identifying and correcting errors, inconsistencies, and inaccuracies in datasets. In my understanding, the primary goal of data cleaning is to ensure that the data used for analysis is accurate, complete, and reliable.\n\nOne of the key aspects of data cleaning is handling missing values. Missing data can occur for various reasons, such as human error during data entry, equipment malfunctions, or simply because certain information was not collected. There are several strategies to deal with missing values: we can remove rows or columns with missing data, fill in missing values with statistical measures like mean or median, or use more sophisticated imputation techniques.',
    'th1': '',
    's1': ''
  });

  const encouragementMessages = [
    "You made it through today, Marta — small wins add up!",
    "Learning isn't linear — rest counts too.",
    "Your focus today built momentum for tomorrow.",
    "Every study session is a step forward, even the challenging ones.",
    "Reflection is where growth happens. You're doing great!",
    "Progress over perfection — you're building lasting habits."
  ];

  const getTodayDay = () => {
    const today = weekSchedule.find(day => day.isToday);
    return today ? today.day : 'Monday';
  };

  const isTodayReflectionDay = () => {
    const today = weekSchedule.find(day => day.isToday);
    return today?.day === 'Sunday' && today.srlTask?.type === 'reflection';
  };

  const handleSaveReflection = () => {
    const todayDay = getTodayDay();
    if (!completedReflections.includes(todayDay)) {
      setCompletedReflections(prev => [...prev, todayDay]);
    }
    setReflectionData({ whatWentWell: '', whatToImprove: '', howDoYouFeel: '' });
    setIsReflectionExpanded(false);
    toast.success('✅ Reflection saved — great work closing your day mindfully.');
  };
  
  const [weekSchedule, setWeekSchedule] = useState<DaySchedule[]>([
    {
      day: 'Monday',
      date: 'Nov 4',
      isToday: true,
      completionRate: 0,
      tasks: [
        {
          id: 'm1',
          course: 'User Research Methods',
          courseCode: 'IX1305',
          taskType: 'read',
          description: 'Read Chapter 3: Interview Techniques (pages 45-68)',
          estimatedTime: '45 min',
          completed: false,
          resourceType: 'pdf'
        },
        {
          id: 'm2',
          course: 'User Research Methods',
          courseCode: 'IX1305',
          taskType: 'watch',
          description: 'Watch video: "Conducting Effective User Interviews"',
          estimatedTime: '25 min',
          completed: false,
          resourceType: 'video'
        },
        {
          id: 'm3',
          course: 'Intro to Machine Learning',
          courseCode: 'CS2401',
          taskType: 'read',
          description: 'Read lecture notes on Supervised Learning basics',
          estimatedTime: '30 min',
          completed: false,
          resourceType: 'pdf'
        }
      ]
    },
    {
      day: 'Tuesday',
      date: 'Nov 5',
      isToday: false,
      completionRate: 0,
      tasks: [
        {
          id: 't1',
          course: 'Python for Data Analysis',
          courseCode: 'DS1502',
          taskType: 'write',
          description: 'Write 100 words for Assignment 1: Data Cleaning Process',
          estimatedTime: '40 min',
          completed: false,
          resourceType: 'link'
        },
        {
          id: 't2',
          course: 'User Research Methods',
          courseCode: 'IX1305',
          taskType: 'practice',
          description: 'Practice interview questions preparation',
          estimatedTime: '30 min',
          completed: false,
          aiHint: 'Start learning for the exam to get better results! Consider reviewing Chapter 1-3 this week.'
        }
      ]
    },
    {
      day: 'Wednesday',
      date: 'Nov 6',
      isToday: false,
      completionRate: 0,
      tasks: [
        {
          id: 'w1',
          course: 'Intro to Machine Learning',
          courseCode: 'CS2401',
          taskType: 'watch',
          description: 'Watch Stanford CS229 Lecture 2 (40-55 min)',
          estimatedTime: '55 min',
          completed: false,
          resourceType: 'video'
        },
        {
          id: 'w2',
          course: 'Digital Design',
          courseCode: 'DM1203',
          taskType: 'read',
          description: 'Read article: "Principles of Visual Hierarchy"',
          estimatedTime: '20 min',
          completed: false,
          resourceType: 'link'
        }
      ],
      srlTask: {
        id: 'monitor-w3',
        type: 'monitor',
        title: 'Mid-Week Check-In',
        description: 'Review your progress and provide feedback on AI recommendations',
        estimatedTime: '10 min',
        completed: false,
        phase: 'monitor'
      }
    },
    {
      day: 'Thursday',
      date: 'Nov 7',
      isToday: false,
      completionRate: 0,
      tasks: [
        {
          id: 'th1',
          course: 'Python for Data Analysis',
          courseCode: 'DS1502',
          taskType: 'write',
          description: 'Continue Assignment 1: Add data visualization section',
          estimatedTime: '1 hr',
          completed: false
        },
        {
          id: 'th2',
          course: 'User Research Methods',
          courseCode: 'IX1305',
          taskType: 'review',
          description: 'Review notes from Monday\'s reading',
          estimatedTime: '20 min',
          completed: false,
          aiHint: 'Great progress on User Research! You\'re 60% done with this module.'
        }
      ]
    },
    {
      day: 'Friday',
      date: 'Nov 8',
      isToday: false,
      completionRate: 0,
      tasks: [
        {
          id: 'f1',
          course: 'Intro to Machine Learning',
          courseCode: 'CS2401',
          taskType: 'practice',
          description: 'Complete practice problems: Linear Regression exercises',
          estimatedTime: '45 min',
          completed: false
        },
        {
          id: 'f2',
          course: 'Digital Design',
          courseCode: 'DM1203',
          taskType: 'write',
          description: 'Start wireframes for Project 2',
          estimatedTime: '1 hr',
          completed: false
        }
      ]
    },
    {
      day: 'Saturday',
      date: 'Nov 9',
      isToday: false,
      completionRate: 0,
      tasks: [
        {
          id: 's1',
          course: 'Python for Data Analysis',
          courseCode: 'DS1502',
          taskType: 'write',
          description: 'Finalize Assignment 1 and proofread',
          estimatedTime: '1.5 hrs',
          completed: false
        },
        {
          id: 's2',
          course: 'Digital Design',
          courseCode: 'DM1203',
          taskType: 'practice',
          description: 'Create mood board for design inspiration',
          estimatedTime: '30 min',
          completed: false
        }
      ]
    },
    {
      day: 'Sunday',
      date: 'Nov 10',
      isToday: false,
      completionRate: 0,
      tasks: [
        {
          id: 'su1',
          course: 'User Research Methods',
          courseCode: 'IX1305',
          taskType: 'review',
          description: 'Review all materials covered this week',
          estimatedTime: '45 min',
          completed: false
        }
      ],
      srlTask: {
        id: 'reflect-w3',
        type: 'reflection',
        title: 'Weekly Reflection',
        description: 'Reflect on what you learned this week and plan for next week',
        estimatedTime: '15 min',
        completed: false,
        phase: 'reflect'
      }
    }
  ]);



  const getTaskIcon = (taskType: string) => {
    switch (taskType) {
      case 'read': return <FileText className="w-4 h-4" />;
      case 'watch': return <Video className="w-4 h-4" />;
      case 'write': return <PenTool className="w-4 h-4" />;
      case 'practice': return <Target className="w-4 h-4" />;
      case 'review': return <Eye className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTaskTypeColor = (taskType: string) => {
    switch (taskType) {
      case 'read': return 'text-blue-600 bg-blue-50';
      case 'watch': return 'text-purple-600 bg-purple-50';
      case 'write': return 'text-green-600 bg-green-50';
      case 'practice': return 'text-orange-600 bg-orange-50';
      case 'review': return 'text-pink-600 bg-pink-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const weeklyCompletionRate = Math.round(
    weekSchedule.reduce((sum, day) => sum + day.completionRate, 0) / weekSchedule.length
  );

  // Move task between days or reorder within same day
  const moveTask = (taskId: string, sourceDayIndex: number, targetDayIndex: number, targetPosition?: number) => {
    setWeekSchedule(prevSchedule => {
      const newSchedule = [...prevSchedule];
      const sourceDay = { ...newSchedule[sourceDayIndex] };
      const taskIndex = sourceDay.tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex === -1) return prevSchedule;
      
      const [movedTask] = sourceDay.tasks.splice(taskIndex, 1);
      sourceDay.tasks = [...sourceDay.tasks];
      newSchedule[sourceDayIndex] = sourceDay;
      
      if (sourceDayIndex === targetDayIndex) {
        // Reordering within same day
        const insertIndex = targetPosition !== undefined ? targetPosition : sourceDay.tasks.length;
        sourceDay.tasks.splice(insertIndex, 0, movedTask);
      } else {
        // Moving to different day
        const targetDay = { ...newSchedule[targetDayIndex] };
        const insertIndex = targetPosition !== undefined ? targetPosition : targetDay.tasks.length;
        targetDay.tasks = [...targetDay.tasks];
        targetDay.tasks.splice(insertIndex, 0, movedTask);
        newSchedule[targetDayIndex] = targetDay;
      }
      
      return newSchedule;
    });
  };

  // Get current open task details
  const getCurrentTask = () => {
    if (!openTaskId) return null;
    for (const day of weekSchedule) {
      const task = day.tasks.find(t => t.id === openTaskId);
      if (task) return task;
    }
    return null;
  };

  const getCurrentSRLTask = () => {
    if (!openSRLTaskId) return null;
    for (const day of weekSchedule) {
      if (day.srlTask?.id === openSRLTaskId) return day.srlTask;
    }
    return null;
  };

  // Handle scroll for read/practice/review tasks
  const handleContentScroll = () => {
    if (contentScrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentScrollRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      if (isAtBottom && !canFinishTask) {
        setCanFinishTask(true);
      }
    }
  };

  // Handle word count for write tasks
  useEffect(() => {
    const words = writingContent.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    // Enable finish button if word count >= 100 (arbitrary requirement for now)
    if (words.length >= 100) {
      setCanFinishTask(true);
    } else {
      setCanFinishTask(false);
    }
  }, [writingContent]);

  // Check if all Mid-Week Check-In questions are answered
  useEffect(() => {
    if (openSRLTaskId === 'monitor-w3') {
      const allAnswered = Object.values(midWeekReflections).every(answer => answer.trim().length > 0);
      setCanFinishTask(allAnswered);
    }
  }, [midWeekReflections, openSRLTaskId]);

  // Check if all Weekly Reflection questions are answered
  useEffect(() => {
    if (openSRLTaskId === 'reflect-w3') {
      const allAnswered = Object.values(weeklyReflections).every(answer => answer.trim().length > 0);
      setCanFinishTask(allAnswered);
    }
  }, [weeklyReflections, openSRLTaskId]);

  // Check if all Practice Interview answers are provided
  useEffect(() => {
    const currentTask = getCurrentTask();
    if (currentTask?.taskType === 'practice' && currentTask?.course === 'User Research Methods') {
      const allAnswered = Object.values(practiceAnswers).every(answer => answer.trim().length > 0);
      setCanFinishTask(allAnswered);
    }
  }, [practiceAnswers, openTaskId]);

  // Quiz timer countdown
  useEffect(() => {
    if (quizStarted && !quizCompleted && quizTimeRemaining > 0) {
      const timer = setTimeout(() => {
        setQuizTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizTimeRemaining === 0 && quizStarted && !quizCompleted) {
      // Auto-submit when time runs out
      handleQuizComplete();
    }
  }, [quizStarted, quizCompleted, quizTimeRemaining]);

  // Check if all quiz questions are answered
  useEffect(() => {
    const currentTask = getCurrentTask();
    if (currentTask?.taskType === 'review' && quizStarted) {
      const allAnswered = Object.keys(quizAnswers).length === 10;
      setCanFinishTask(allAnswered);
    }
  }, [quizAnswers, openTaskId, quizStarted]);

  // Handle video completion (simulated with timeout)
  const handleVideoComplete = () => {
    setCanFinishTask(true);
  };

  // Handle quiz completion
  const handleQuizComplete = () => {
    setQuizCompleted(true);
    setShowQuizResults(true);
    setCanFinishTask(true);
  };

  // Start quiz
  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizTimeRemaining(600); // Reset to 10 minutes
  };

  // Open task modal
  const handleStartTask = (taskId: string, isSRL: boolean = false) => {
    if (isSRL) {
      setOpenSRLTaskId(taskId);
      setOpenTaskId(null);
      setCanFinishTask(false);
      setWritingContent('');
      setWordCount(0);
    } else {
      setOpenTaskId(taskId);
      setOpenSRLTaskId(null);
      setCanFinishTask(false);
      
      // Load saved writing content if this is a write task
      const savedContent = savedWritingContent[taskId] || '';
      setWritingContent(savedContent);
      
      // Calculate word count for saved content
      const words = savedContent.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      
      // Reset practice answers and feedback
      setPracticeAnswers({
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        answer5: ''
      });
      setShowAIFeedback(false);
      
      // Reset quiz state
      setQuizAnswers({});
      setQuizStarted(false);
      setQuizCompleted(false);
      setShowQuizResults(false);
      setQuizTimeRemaining(600);
      
      // For video tasks, we'll provide a button to simulate watching
    }
  };

  // Close task modal
  const handleCloseTask = () => {
    if (openTaskId) {
      // Save writing content if this is a write task and there's content
      if (writingContent.trim()) {
        setSavedWritingContent(prev => ({
          ...prev,
          [openTaskId]: writingContent
        }));
      }
      setInProgressTasks(prev => new Set(prev).add(openTaskId));
      setOpenTaskId(null);
    }
    if (openSRLTaskId) {
      setInProgressTasks(prev => new Set(prev).add(openSRLTaskId));
      setOpenSRLTaskId(null);
      // Reset Mid-Week Check-In reflections
      setMidWeekReflections({
        tasksCompleted: '',
        taskTiming: '',
        focusLevel: '',
        distractions: '',
        strategyChange: '',
        wantAITip: ''
      });
      // Reset Weekly Reflection reflections
      setWeeklyReflections({
        proudAchievement: '',
        mostHelpfulTask: '',
        challenges: '',
        motivationLevel: '',
        changeForNextWeek: '',
        wantAIAdjustment: ''
      });
    }
    setCanFinishTask(false);
    setWritingContent('');
    setWordCount(0);
  };

  // Finish task
  const handleFinishTask = () => {
    if (openTaskId) {
      // Save writing content if this is a write task
      if (writingContent.trim()) {
        setSavedWritingContent(prev => ({
          ...prev,
          [openTaskId]: writingContent
        }));
      }
      
      // Find the task and mark it complete
      setWeekSchedule(prev => {
        const newSchedule = [...prev];
        for (let dayIndex = 0; dayIndex < newSchedule.length; dayIndex++) {
          const day = newSchedule[dayIndex];
          const task = day.tasks.find(t => t.id === openTaskId);
          if (task) {
            task.completed = true;
            
            // Recalculate completion rate
            const totalTasks = day.tasks.length + (day.srlTask ? 1 : 0);
            const completedTasks = day.tasks.filter(t => t.completed).length + (day.srlTask?.completed ? 1 : 0);
            day.completionRate = Math.round((completedTasks / totalTasks) * 100);
            
            toast.success('Task completed! 🎉');
            break;
          }
        }
        return newSchedule;
      });
      
      setInProgressTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(openTaskId);
        return newSet;
      });
      setOpenTaskId(null);
    }

    if (openSRLTaskId) {
      // Find the SRL task and mark it complete
      setWeekSchedule(prev => {
        const newSchedule = [...prev];
        for (let dayIndex = 0; dayIndex < newSchedule.length; dayIndex++) {
          const day = newSchedule[dayIndex];
          if (day.srlTask?.id === openSRLTaskId) {
            day.srlTask.completed = true;
            
            // Recalculate completion rate
            const totalTasks = day.tasks.length + 1;
            const completedTasks = day.tasks.filter(t => t.completed).length + 1;
            day.completionRate = Math.round((completedTasks / totalTasks) * 100);
            
            toast.success(`${day.srlTask.title} completed! Keep up the good work! 🎉`);
            break;
          }
        }
        return newSchedule;
      });
      
      setInProgressTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(openSRLTaskId);
        return newSet;
      });
      setOpenSRLTaskId(null);
    }

    setCanFinishTask(false);
    setWritingContent('');
    setWordCount(0);
  };

  // Skip task (for Mid-Week Check-In and Weekly Reflection)
  const handleSkipTask = () => {
    if (openSRLTaskId) {
      const currentSRLTask = getCurrentSRLTask();
      const taskTitle = currentSRLTask?.title || '';
      
      // Close the dialog without marking as complete
      setOpenSRLTaskId(null);
      
      // Reset reflections based on task type
      if (openSRLTaskId === 'monitor-w3') {
        setMidWeekReflections({
          tasksCompleted: '',
          taskTiming: '',
          focusLevel: '',
          distractions: '',
          strategyChange: '',
          wantAITip: ''
        });
        toast.info('Mid-Week Check-In skipped. You can come back to it anytime!');
      } else if (openSRLTaskId === 'reflect-w3') {
        setWeeklyReflections({
          proudAchievement: '',
          mostHelpfulTask: '',
          challenges: '',
          motivationLevel: '',
          changeForNextWeek: '',
          wantAIAdjustment: ''
        });
        toast.info('Weekly Reflection skipped. You can come back to it anytime!');
      }
      
      setCanFinishTask(false);
    }
  };

  // Get task button label
  const getTaskButtonLabel = (taskId: string, isCompleted: boolean) => {
    if (isCompleted) return 'Completed';
    if (inProgressTasks.has(taskId)) return 'Continue';
    return 'Start';
  };

  // Render task modal content
  const renderTaskModalContent = () => {
    const currentTask = getCurrentTask();
    const currentSRLTask = getCurrentSRLTask();
    
    if (currentTask) {
      const { taskType } = currentTask;
      
      // Handle Practice task for User Research Methods
      if (taskType === 'practice' && currentTask.course === 'User Research Methods') {
        const allAnswersProvided = Object.values(practiceAnswers).every(a => a.trim().length > 0);
        
        // Pre-defined interview questions
        const interviewQuestions = [
          "Can you walk me through the last time you opened your mobile banking app? What were you trying to do?",
          "Tell me about your first experience setting up the app. What do you remember most about that process?",
          "When you were getting started with the app, was there anything that confused you or made you pause?",
          "Think about a time when the app didn't work the way you expected. What happened, and how did that make you feel?",
          "If you could change one thing about your first week using the app, what would it be and why?"
        ];
        
        return (
          <div className="overflow-y-auto flex-1 p-8 space-y-6">
            {/* Scenario Description */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 border-l-4 border-orange-500">
              <div className="flex items-start gap-3 mb-3">
                <Target className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-semibold text-lg text-gray-900 mb-2">User Research Interview Practice</h2>
                  <p className="text-gray-700">
                    <strong>Scenario:</strong> You're being interviewed about your experience with a mobile banking app. The researcher wants to uncover pain points in the onboarding flow.
                  </p>
                </div>
              </div>
            </div>

            {/* Task Instructions */}
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
              <h3 className="font-medium text-gray-900 mb-3">Your Task</h3>
              <p className="text-sm text-gray-700 mb-3">
                Answer the <strong>five interview questions</strong> below as if you were a real user sharing your experience. Provide detailed, thoughtful responses that help the researcher understand your journey.
              </p>
              <div className="bg-white/60 rounded p-3">
                <p className="text-xs font-medium text-blue-900 mb-2">💡 Good interview answers should:</p>
                <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside ml-2">
                  <li>Include specific examples and stories from your experience</li>
                  <li>Go beyond surface-level responses to share underlying feelings and motivations</li>
                  <li>Be honest and clear about what worked and what didn't</li>
                  <li>Provide context that helps the researcher understand your perspective</li>
                </ul>
              </div>
            </div>

            {/* Answer Input Fields with Pre-defined Questions */}
            <div className="space-y-5">
              <h3 className="font-medium text-gray-900">Interview Questions</h3>
              
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="space-y-3 bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {num}
                    </span>
                    <div className="flex-1 space-y-3">
                      <p className="text-sm font-medium text-gray-900">
                        {interviewQuestions[num - 1]}
                      </p>
                      <Textarea
                        value={practiceAnswers[`answer${num}` as keyof typeof practiceAnswers]}
                        onChange={(e) => setPracticeAnswers(prev => ({
                          ...prev,
                          [`answer${num}`]: e.target.value
                        }))}
                        placeholder="Type your answer here... Be specific and share details about your experience."
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Evaluation Criteria */}
            <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 mb-2">AI Evaluation Criteria</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Once you complete all 5 answers, your responses will be evaluated on:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white/60 rounded p-3">
                  <p className="text-sm font-medium text-purple-900 mb-1">🎯 Depth</p>
                  <p className="text-xs text-gray-700">Do your answers reveal underlying motivations and feelings beyond surface-level facts?</p>
                </div>
                <div className="bg-white/60 rounded p-3">
                  <p className="text-sm font-medium text-purple-900 mb-1">💬 Clarity</p>
                  <p className="text-xs text-gray-700">Are your answers clear, specific, and easy to understand?</p>
                </div>
                <div className="bg-white/60 rounded p-3">
                  <p className="text-sm font-medium text-purple-900 mb-1">📖 Storytelling</p>
                  <p className="text-xs text-gray-700">Do you provide concrete examples and context that bring your experience to life?</p>
                </div>
                <div className="bg-white/60 rounded p-3">
                  <p className="text-sm font-medium text-purple-900 mb-1">🔍 Relevance</p>
                  <p className="text-xs text-gray-700">Do your answers directly address the question and provide actionable insights?</p>
                </div>
              </div>
            </div>

            {/* AI Feedback - Show when all answers are provided */}
            {allAnswersProvided && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500 animate-in fade-in duration-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-green-900 mb-2">✅ Excellent work, Marta! You've completed all interview questions.</p>
                      <p className="text-sm text-gray-700">
                        Here's AI feedback on your interview responses:
                      </p>
                    </div>
                    
                    <div className="bg-white/60 rounded-lg p-4 space-y-3 text-sm text-gray-700">
                      <div>
                        <p className="font-medium text-gray-900 mb-1">🎯 Depth: Strong</p>
                        <p>Your answers go beyond basic facts to share feelings and motivations. You explained not just what happened, but why it mattered to you and how it affected your experience. This depth helps researchers truly understand user pain points.</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-1">💬 Clarity: Excellent</p>
                        <p>Your responses are clear and well-structured. You communicate your thoughts in a way that's easy to follow, making it simple for the researcher to extract key insights.</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-1">📖 Storytelling: Good</p>
                        <p>You provided specific examples and context in several answers. To improve further, try to include more sensory details and timeline information (e.g., "When I first opened the app at 8am before my meeting..."). This makes your stories even more vivid and memorable.</p>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-1">🔍 Relevance: Strong</p>
                        <p>Your answers directly addressed each question and provided actionable insights. You stayed on topic while giving researchers the information they need to identify improvement opportunities.</p>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <p className="font-medium text-purple-900 mb-1">💡 What This Teaches You</p>
                        <p>As a UX researcher, you now understand what makes a good interview response from the participant's side. When you conduct interviews, listen for these qualities in your participants' answers. If responses feel shallow, use follow-up questions like "Can you tell me more about that?" or "How did that make you feel?" to encourage deeper sharing.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="pb-4"></div>
          </div>
        );
      }
      
      if (taskType === 'read') {
        return (
          <div 
            ref={contentScrollRef}
            onScroll={handleContentScroll}
            className="overflow-y-auto flex-1 p-8 space-y-4"
          >
            <h2 className="font-semibold text-lg text-gray-900 mb-2">Defining Self-Regulated Learning in Process Terms</h2>
            
            <p className="text-gray-700">
              Self-regulation is not a mental ability or an academic performance skill; rather, it is the self-directive process by which learners transform their mental abilities into academic skills. Learning is viewed as an activity that students do for themselves in a proactive way rather than as a covert event that happens to them in reaction to teaching.
            </p>
            
            <p className="text-gray-700">
              Self-regulation refers to self-generated thoughts, feelings, and behaviors that are oriented to attaining goals (Zimmerman, 2000). These learners are proactive in their efforts to learn because they are aware of their strengths and limitations and because they are guided by personally set goals and task-related strategies, such as using an arithmetic addition strategy to check the accuracy of solutions to subtraction problems. These learners monitor their behavior in terms of their goals and self-reflect on their increasing effectiveness. This enhances their self-satisfaction and motivation to continue to improve their methods of learning. Because of their superior motivation and adaptive learning methods, self-regulated students are not only more likely to succeed academically but to view their futures optimistically.
            </p>
            
            <p className="text-gray-700">
              Self-regulation is important because a major function of education is the development of lifelong learning skills. After graduation from high school or college, young adults must learn many important skills informally. For example, in business settings, they are often expected to learn a new position, such as selling a product, by observing proficient others and by practicing on their own. Those who develop high levels of skill position themselves for bonuses, early promotion, or more attractive jobs. In self-employment settings, both young and old must constantly self-refine their skills in order to survive. Their capability to self-regulate is especially challenged when they undertake long-term creative projects, such as works of art, literary texts, or inventions. In recreational settings, learners spend much personally regulated time learning diverse skills for self-entertainment, ranging from hobbies to sports.
            </p>
            
            <p className="text-gray-700">
              Although the relationship of self-reliance to success in life has been widely recognized, most students struggle to attain self-discipline in their methods of study today as they did a century ago. What does contemporary research tell us about this desirable but elusive personal quality?
            </p>
            
            <p className="text-gray-700">
              First, self-regulation of learning involves more than detailed knowledge of a skill; it involves the self-awareness, self-motivation, and behavioral skill to implement that knowledge appropriately. For example, there is evidence (Cleary & Zimmerman, 2000) that experts differ from non-experts in their application of knowledge at crucial times during learning performances, such as correcting specific deficiencies in technique.
            </p>
            
            <p className="text-gray-700">
              Second, contemporary research tells us that self-regulation of learning is not a single personal trait that individual students either possess or lack. Instead, it involves the selective use of specific processes that must be personally adapted to each learning task. The component skills include: (a) setting specific proximal goals for oneself, (b) adopting powerful strategies for attaining the goals, (c) monitoring one's performance selectively for signs of progress, (d) restructuring one's physical and social context to make it compatible with one's goals, (e) managing one's time use efficiently, (f) self-evaluating one's methods, (g) attributing causation to results, and (h) adapting future methods. A student's level of learning has been found to vary based on the presence or absence of these key self-regulatory processes (Schunk & Zimmerman, 1994; 1998).
            </p>
            
            <p className="text-gray-700">
              Third, contemporary research reveals that the self-motivated quality of self-regulated learners depends on several underlying beliefs, including perceived efficacy and intrinsic interest. Historically, educators have focused on social encouragement and extrinsic "bells and whistles" to try to elevate students' level of motivation. Unfortunately, self-directed studying or practicing was often derided as inherently boring, repetitive, and mind-numbing with catchy phrases such as "Drill and kill."
            </p>
            
            <p className="text-gray-700">
              However, interviews with experts reveal a very different picture of these experiences (Ericsson & Charness, 1994). Experts spend approximately four hours each day in study and practice and find these activities highly motivating. They vary their methods of study and practice in order to discover new strategies for self-improvement. With such diverse skills as chess, sports, and music, the quantity of an individual's studying and practicing is a strong predictor of his or her level of expertise. There is also evidence that the quality of practicing and studying episodes is highly predictive of a learner's level of skill (Zimmerman & Kitsantas, 1997; 1999).
            </p>
            
            <p className="text-gray-700">
              However, few beginners in a new discipline immediately derive powerful self-motivational benefits, and they may easily lose interest if they are not socially encouraged and guided, as most music teachers will readily attest (McPherson & Zimmerman, in press). Fortunately, the motivation of novices can be greatly enhanced when and if they use high-quality self-regulatory processes, such as close self-monitoring. Students who have the capabilities to detect subtle progress in learning will increase their levels of self-satisfaction and their beliefs in their personal efficacy to perform at a high level of skill (Schunk, 1983). Clearly, their motivation does not stem from the task itself, but rather from their use of self-regulatory processes, such as self-monitoring, and the effects of these processes on their self-beliefs.
            </p>
            <p className="text-gray-700 mb-8">
              {!canFinishTask && "Scroll to the bottom to enable the Finish button."}
            </p>
          </div>
        );
      } else if (taskType === 'review') {
        // Quiz questions about User Research Methods - Interview Techniques
        const quizQuestions = [
          {
            id: 1,
            question: "What is the primary goal of conducting user interviews in UX research?",
            options: [
              "To validate the researcher's assumptions about user behavior",
              "To uncover user needs, motivations, and pain points through open-ended conversation",
              "To collect quantitative data about user preferences",
              "To convince users to adopt the product being developed"
            ],
            correctAnswer: 1 // Index of correct option (0-based)
          },
          {
            id: 2,
            question: "Which interview technique encourages participants to share detailed stories about their experiences?",
            options: [
              "Closed-ended questioning",
              "Leading questions",
              "Contextual inquiry",
              "Yes/no questions"
            ],
            correctAnswer: 2
          },
          {
            id: 3,
            question: "When should a researcher use follow-up questions like 'Can you tell me more about that?'",
            options: [
              "Only at the end of the interview",
              "When the participant gives a shallow or surface-level response",
              "Never, as it might make participants uncomfortable",
              "Only when the interview is running ahead of schedule"
            ],
            correctAnswer: 1
          },
          {
            id: 4,
            question: "What is a 'leading question' in user research interviews?",
            options: [
              "A question that guides the conversation to relevant topics",
              "A question asked at the beginning of the interview",
              "A question that suggests or implies a desired answer",
              "A question that leads to more follow-up questions"
            ],
            correctAnswer: 2
          },
          {
            id: 5,
            question: "Why is it important to remain neutral during user interviews?",
            options: [
              "To save time by avoiding emotional discussions",
              "To prevent influencing the participant's responses with your own biases",
              "To maintain professional distance from participants",
              "To ensure all interviews have the same duration"
            ],
            correctAnswer: 1
          },
          {
            id: 6,
            question: "What does 'active listening' involve during a user interview?",
            options: [
              "Taking detailed notes without looking at the participant",
              "Paying full attention, showing engagement, and reflecting back what you hear",
              "Asking as many questions as possible",
              "Recording everything and reviewing it later"
            ],
            correctAnswer: 1
          },
          {
            id: 7,
            question: "When conducting user interviews, what is the benefit of asking about specific past experiences?",
            options: [
              "It makes the interview shorter",
              "It provides concrete, detailed insights rather than hypothetical opinions",
              "It's easier for participants to remember",
              "It requires less preparation from the researcher"
            ],
            correctAnswer: 1
          },
          {
            id: 8,
            question: "What should you do if a participant goes off-topic during an interview?",
            options: [
              "Immediately interrupt and redirect them to stay on schedule",
              "Let them continue indefinitely to build rapport",
              "Gently guide them back while acknowledging their input",
              "End the interview early"
            ],
            correctAnswer: 2
          },
          {
            id: 9,
            question: "Why is it valuable to ask participants about their emotions and feelings during an experience?",
            options: [
              "To make the interview more personal and friendly",
              "To understand the underlying motivations and impacts beyond surface behaviors",
              "To fill time if you run out of questions",
              "To test their emotional intelligence"
            ],
            correctAnswer: 1
          },
          {
            id: 10,
            question: "What is the purpose of piloting (testing) your interview questions before the actual research?",
            options: [
              "To practice your interviewing skills",
              "To identify confusing questions and refine the interview guide",
              "To collect preliminary data for analysis",
              "To determine how many participants you need"
            ],
            correctAnswer: 1
          }
        ];

        // Format time as MM:SS
        const formatTime = (seconds: number) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        // Calculate score
        const calculateScore = () => {
          let correct = 0;
          quizQuestions.forEach(q => {
            if (quizAnswers[q.id] === q.correctAnswer.toString()) {
              correct++;
            }
          });
          return correct;
        };

        const score = calculateScore();
        const percentage = Math.round((score / 10) * 100);

        // Quiz not started - show intro
        if (!quizStarted) {
          return (
            <div className="overflow-y-auto flex-1 p-8 flex items-center justify-center">
              <div className="max-w-2xl w-full space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-8 border-l-4 border-pink-500 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                      <Timer className="w-8 h-8 text-pink-600" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">Quiz Sprint Challenge</h2>
                  <p className="text-gray-700 mb-4">
                    Test your knowledge of <strong>Interview Techniques</strong> from Monday's reading (Chapter 3)
                  </p>
                </div>

                {/* Quiz Details */}
                <div className="bg-white rounded-xl border-2 border-gray-200 p-6 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Challenge Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-2xl font-semibold text-blue-900">10</p>
                      <p className="text-sm text-gray-700">Questions</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <p className="text-2xl font-semibold text-purple-900">10:00</p>
                      <p className="text-sm text-gray-700">Minutes</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="flex justify-center mb-2">
                        <Target className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-2xl font-semibold text-green-900">A-D</p>
                      <p className="text-sm text-gray-700">Multiple Choice</p>
                    </div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h3 className="font-medium text-green-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    How It Works
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>Answer all 10 multiple-choice questions about interview techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>You have 10 minutes to complete the quiz</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>The quiz will auto-submit when time runs out</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>You'll receive instant feedback on your performance</span>
                    </li>
                  </ul>
                </div>

                {/* Start Button */}
                <Button
                  onClick={handleStartQuiz}
                  className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-6 text-lg"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Quiz Sprint
                </Button>
              </div>
            </div>
          );
        }

        // Quiz in progress or completed
        return (
          <div className="overflow-y-auto flex-1 p-8 space-y-6">
            {/* Timer Bar */}
            <div className={`sticky top-0 z-10 rounded-lg p-4 border-2 ${
              quizTimeRemaining <= 60 ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className={`w-5 h-5 ${quizTimeRemaining <= 60 ? 'text-red-600' : 'text-gray-600'}`} />
                  <span className="font-medium text-gray-900">Time Remaining:</span>
                  <span className={`text-lg font-semibold ${
                    quizTimeRemaining <= 60 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {formatTime(quizTimeRemaining)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Progress:</span>
                  <span className="font-medium text-purple-600">
                    {Object.keys(quizAnswers).length} / 10
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    quizTimeRemaining <= 60 ? 'bg-red-500' : 'bg-gradient-to-r from-pink-500 to-rose-500'
                  }`}
                  style={{ width: `${(quizTimeRemaining / 600) * 100}%` }}
                />
              </div>
            </div>

            {/* Show results if completed */}
            {showQuizResults ? (
              <div className="space-y-6">
                {/* Results Header */}
                <div className={`rounded-xl p-8 border-l-4 text-center ${
                  percentage >= 80 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-500' :
                  percentage >= 60 ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-500' :
                  'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-500'
                }`}>
                  <div className="flex justify-center mb-4">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                      percentage >= 80 ? 'bg-green-100' :
                      percentage >= 60 ? 'bg-blue-100' :
                      'bg-orange-100'
                    }`}>
                      <Trophy className={`w-10 h-10 ${
                        percentage >= 80 ? 'text-green-600' :
                        percentage >= 60 ? 'text-blue-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {percentage >= 80 ? 'Excellent Work!' : percentage >= 60 ? 'Good Job!' : 'Keep Learning!'}
                  </h2>
                  <p className="text-4xl font-bold text-gray-900 mb-2">{score} / 10</p>
                  <p className="text-lg text-gray-700">Score: {percentage}%</p>
                </div>

                {/* AI Feedback */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-3">AI Feedback</h3>
                      <div className="space-y-3 text-sm text-gray-700">
                        {percentage >= 80 && (
                          <>
                            <p>
                              <strong>Outstanding performance, Marta!</strong> You've demonstrated a strong understanding of interview techniques. Your score shows you're well-prepared to conduct effective user research interviews.
                            </p>
                            <p>
                              You clearly understand the importance of open-ended questions, active listening, and remaining neutral during interviews. Keep applying these principles in your practical work!
                            </p>
                          </>
                        )}
                        {percentage >= 60 && percentage < 80 && (
                          <>
                            <p>
                              <strong>Good work, Marta!</strong> You have a solid grasp of the core interview techniques. Your score shows you understand the fundamentals.
                            </p>
                            <p>
                              To strengthen your knowledge, review the sections on follow-up questioning techniques and the importance of asking about specific past experiences rather than hypothetical scenarios.
                            </p>
                          </>
                        )}
                        {percentage < 60 && (
                          <>
                            <p>
                              <strong>Keep learning, Marta!</strong> This quiz helped identify areas where you can strengthen your understanding of interview techniques.
                            </p>
                            <p>
                              Consider re-reading Chapter 3, paying special attention to the sections on active listening, avoiding leading questions, and techniques for encouraging detailed responses. Practice makes perfect!
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Question Review */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Question Review</h3>
                  {quizQuestions.map((q) => {
                    const userAnswer = parseInt(quizAnswers[q.id] || '-1');
                    const isCorrect = userAnswer === q.correctAnswer;
                    
                    return (
                      <div key={q.id} className={`rounded-lg border-2 p-4 ${
                        isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
                      }`}>
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}>
                            {isCorrect ? '✓' : '✗'}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 mb-3">{q.id}. {q.question}</p>
                            <div className="space-y-2">
                              {q.options.map((option, idx) => (
                                <div key={idx} className={`p-2 rounded ${
                                  idx === q.correctAnswer ? 'bg-green-100 border border-green-400' :
                                  idx === userAnswer && !isCorrect ? 'bg-red-100 border border-red-400' :
                                  'bg-white border border-gray-200'
                                }`}>
                                  <span className="text-sm">
                                    <strong>{String.fromCharCode(65 + idx)}.</strong> {option}
                                    {idx === q.correctAnswer && ' ✓ Correct answer'}
                                    {idx === userAnswer && !isCorrect && ' ✗ Your answer'}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Quiz Questions */
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 border-l-4 border-pink-500">
                  <h3 className="font-semibold text-gray-900">Quiz Sprint: Interview Techniques</h3>
                  <p className="text-sm text-gray-700 mt-1">Select the best answer for each question</p>
                </div>

                {quizQuestions.map((q) => (
                  <div key={q.id} className="bg-white rounded-lg border-2 border-gray-200 p-6">
                    <p className="font-medium text-gray-900 mb-4">
                      {q.id}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option, idx) => (
                        <label
                          key={idx}
                          className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            quizAnswers[q.id] === idx.toString()
                              ? 'bg-pink-50 border-pink-400'
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={idx}
                            checked={quizAnswers[q.id] === idx.toString()}
                            onChange={(e) => setQuizAnswers(prev => ({
                              ...prev,
                              [q.id]: e.target.value
                            }))}
                            className="mt-1"
                          />
                          <span className="text-sm text-gray-700">
                            <strong>{String.fromCharCode(65 + idx)}.</strong> {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Submit Button */}
                {Object.keys(quizAnswers).length === 10 && !showQuizResults && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleQuizComplete}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-6 text-lg"
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      Submit Quiz
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      } else if (taskType === 'watch') {
        return (
          <div className="p-8 space-y-4 flex-1 flex flex-col overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto">
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/2wF9tWSugm4"
                  title="Self-Regulated Learning Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
            {!canFinishTask && (
              <div className="w-full max-w-4xl mx-auto">
                <Button 
                  onClick={handleVideoComplete}
                  className="w-full"
                >
                  Mark Video as Watched
                </Button>
              </div>
            )}
            <p className="text-sm text-gray-600 text-center max-w-4xl mx-auto">
              Watch this video about self-regulated learning strategies. Click "Mark Video as Watched" when you've finished watching to enable the Finish button.
            </p>
          </div>
        );
      } else if (taskType === 'write') {
        return (
          <div className="p-8 space-y-6 flex-1 flex flex-col overflow-y-auto">
            {/* Assignment Description */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-900 mb-3">Assignment 1: Data Cleaning Process</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium">Topic: Understanding and Applying Data Cleaning Techniques</p>
                <div className="mt-4">
                  <p className="font-medium mb-2">Assignment Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Minimum word count: 100 words</li>
                    <li>Explain the importance of data cleaning in the data analysis workflow</li>
                    <li>Describe at least 2-3 common data quality issues (e.g., missing values, duplicates, inconsistencies)</li>
                    <li>Discuss practical strategies for handling each type of issue</li>
                    <li>Provide examples from real-world datasets when possible</li>
                    <li>Reflect on how data cleaning impacts the reliability of analysis results</li>
                  </ul>
                </div>
                <div className="mt-4 bg-white/60 rounded p-3">
                  <p className="text-xs font-medium text-gray-600">💡 Tip: Use concrete examples and explain your reasoning step-by-step. Quality matters more than quantity!</p>
                </div>
              </div>
            </div>

            {/* Previous Work Display (if exists) */}
            {savedWritingContent[currentTask.id] && (
              <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-400">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Your Previous Work</h4>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {savedWritingContent[currentTask.id]}
                </p>
                <p className="text-xs text-blue-600 mt-3 italic">
                  ↓ Continue writing below to add to your work
                </p>
              </div>
            )}

            {/* Writing Area */}
            <div className="flex-1 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {savedWritingContent[currentTask.id] ? 'Continue Writing' : 'Start Writing'}
                </label>
                <span className={`text-sm ${wordCount >= 100 ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  {wordCount} / 100 words
                </span>
              </div>
              <Textarea
                value={writingContent}
                onChange={(e) => setWritingContent(e.target.value)}
                placeholder={savedWritingContent[currentTask.id] 
                  ? "Continue adding your thoughts and analysis here..." 
                  : "Start writing here..."}
                className="min-h-[300px] flex-1 resize-none"
              />
            </div>

            {/* AI Motivational Tip */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-900 mb-1">AI Writing Tip</p>
                  <p className="text-sm text-gray-700">
                    Great start, Marta! Your explanation of missing values is clear. Try adding a specific example from a dataset you've worked with — it will make your analysis more concrete and memorable. Remember, you're not just describing techniques, you're building your data thinking skills! 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    if (currentSRLTask) {
      // Mid-Week Check-In specific content
      if (currentSRLTask.title === 'Mid-Week Check-In') {
        // Calculate progress
        const answeredCount = Object.values(midWeekReflections).filter(answer => answer.trim().length > 0).length;
        const totalQuestions = 6;

        return (
          <div 
            className="overflow-y-auto flex-1 p-8 space-y-6"
          >
            {/* Greeting */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border-l-4 border-purple-400">
              <h2 className="font-semibold text-lg text-gray-900 mb-3">
                Mid-Week Check-In
              </h2>
              <p className="text-gray-700">
                Hi Marta 👋
              </p>
              <p className="text-gray-700 mt-2">
                You've reached the middle of Week 3 — a perfect moment to pause and reflect on how your study week is going so far.
              </p>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-purple-600">{answeredCount} of {totalQuestions} reflections completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Section 1 - Progress Reflection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4">1️⃣ Progress Reflection</h3>
                  
                  {/* Question 1 */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      Which tasks have you completed so far?
                    </label>
                    <Textarea
                      value={midWeekReflections.tasksCompleted}
                      onChange={(e) => setMidWeekReflections(prev => ({ ...prev, tasksCompleted: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-blue-100 focus:border-blue-400 transition-colors"
                    />
                  </div>

                  {/* Question 2 */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Were there any that took longer or shorter than expected?
                    </label>
                    <Textarea
                      value={midWeekReflections.taskTiming}
                      onChange={(e) => setMidWeekReflections(prev => ({ ...prev, taskTiming: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-blue-100 focus:border-blue-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 - Motivation & Focus */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4">2️⃣ Motivation & Focus</h3>
                  
                  {/* Question 3 */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      How has your focus level been this week?
                    </label>
                    <Textarea
                      value={midWeekReflections.focusLevel}
                      onChange={(e) => setMidWeekReflections(prev => ({ ...prev, focusLevel: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-purple-100 focus:border-purple-400 transition-colors"
                    />
                  </div>

                  {/* Question 4 */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      What helped you stay on track (or distracted you)?
                    </label>
                    <Textarea
                      value={midWeekReflections.distractions}
                      onChange={(e) => setMidWeekReflections(prev => ({ ...prev, distractions: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-purple-100 focus:border-purple-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 - Strategy Adjustment */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-pink-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4">3️⃣ Strategy Adjustment</h3>
                  
                  {/* Question 5 */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      What's one small thing you can change to finish the week smoothly?
                    </label>
                    <Textarea
                      value={midWeekReflections.strategyChange}
                      onChange={(e) => setMidWeekReflections(prev => ({ ...prev, strategyChange: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-pink-100 focus:border-pink-400 transition-colors"
                    />
                  </div>

                  {/* Question 6 */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Would you like an AI tip based on your reflection?
                    </label>
                    <Textarea
                      value={midWeekReflections.wantAITip}
                      onChange={(e) => setMidWeekReflections(prev => ({ ...prev, wantAITip: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-pink-100 focus:border-pink-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Success Card - Only show when all questions answered */}
            {canFinishTask && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500 animate-in fade-in duration-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium mb-2">
                      ✅ Great job reflecting, Marta!
                    </p>
                    <p className="text-gray-700">
                      Your consistency this week is 72%. AI will adjust your next week's plan to match your energy and pace.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pb-8"></div>
          </div>
        );
      }

      // Weekly Reflection specific content
      if (currentSRLTask.title === 'Weekly Reflection') {
        // Calculate progress
        const answeredCount = Object.values(weeklyReflections).filter(answer => answer.trim().length > 0).length;
        const totalQuestions = 6;

        return (
          <div 
            className="overflow-y-auto flex-1 p-8 space-y-6"
          >
            {/* Greeting */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-400">
              <h2 className="font-semibold text-lg text-gray-900 mb-3">
                Weekly Reflection
              </h2>
              <p className="text-gray-700">
                Well done, Marta 🌿
              </p>
              <p className="text-gray-700 mt-2">
                You've completed Week 3. Let's reflect on what worked and what to improve for next week.
              </p>
            </div>

            {/* Progress Tracker */}
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Progress</span>
                <span className="text-sm font-medium text-green-600">{answeredCount} of {totalQuestions} reflections completed</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Section 1 - Learning Highlights */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-green-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4">1️⃣ Learning Highlights</h3>
                  
                  {/* Question 1 */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      What are you most proud of achieving this week?
                    </label>
                    <Textarea
                      value={weeklyReflections.proudAchievement}
                      onChange={(e) => setWeeklyReflections(prev => ({ ...prev, proudAchievement: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-green-100 focus:border-green-400 transition-colors"
                    />
                  </div>

                  {/* Question 2 */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Which task or activity helped you learn the most?
                    </label>
                    <Textarea
                      value={weeklyReflections.mostHelpfulTask}
                      onChange={(e) => setWeeklyReflections(prev => ({ ...prev, mostHelpfulTask: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-green-100 focus:border-green-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 - Challenges & Emotions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-amber-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4">2️⃣ Challenges & Emotions</h3>
                  
                  {/* Question 3 */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      What challenges or distractions did you face this week?
                    </label>
                    <Textarea
                      value={weeklyReflections.challenges}
                      onChange={(e) => setWeeklyReflections(prev => ({ ...prev, challenges: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-amber-100 focus:border-amber-400 transition-colors"
                    />
                  </div>

                  {/* Question 4 */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      How did you feel about your motivation and focus overall?
                    </label>
                    <Textarea
                      value={weeklyReflections.motivationLevel}
                      onChange={(e) => setWeeklyReflections(prev => ({ ...prev, motivationLevel: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-amber-100 focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 - Adjustment for Next Week */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-emerald-200 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-4">3️⃣ Adjustment for Next Week</h3>
                  
                  {/* Question 5 */}
                  <div className="mb-4">
                    <label className="block text-sm text-gray-700 mb-2">
                      What would you like to change or improve next week?
                    </label>
                    <Textarea
                      value={weeklyReflections.changeForNextWeek}
                      onChange={(e) => setWeeklyReflections(prev => ({ ...prev, changeForNextWeek: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-emerald-100 focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Question 6 */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">
                      Would you like AI to adjust your roadmap based on this reflection?
                    </label>
                    <Textarea
                      value={weeklyReflections.wantAIAdjustment}
                      onChange={(e) => setWeeklyReflections(prev => ({ ...prev, wantAIAdjustment: e.target.value }))}
                      placeholder="Type your reflection here..."
                      className="w-full min-h-[80px] resize-none rounded-lg border-2 border-emerald-100 focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Success Card - Only show when all questions answered */}
            {canFinishTask && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-500 animate-in fade-in duration-500">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 font-medium mb-2">
                      ✅ Great job reflecting, Marta!
                    </p>
                    <p className="text-gray-700">
                      Your consistency this week is 85%. AI will fine-tune your next week's plan to match your focus and energy.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="pb-8"></div>
          </div>
        );
      }
      
      // Generic SRL task content for other types
      return (
        <div 
          ref={contentScrollRef}
          onScroll={handleContentScroll}
          className="overflow-y-auto flex-1 p-8 space-y-4"
        >
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is a {currentSRLTask.type === 'monitor' ? 'monitoring' : 'reflection'} task to help you assess your progress.
          </p>
          <p className="text-gray-700">
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-700">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="text-gray-700 mb-8">
            {!canFinishTask && "Scroll to the bottom to enable the Finish button."}
          </p>
        </div>
      );
    }

    return null;
  };

  // Monthly View: Generate month data
  const generateMonthData = () => {
    const weeks = [];
    for (let week = 1; week <= 4; week++) {
      const weekData = {
        weekNumber: week,
        dateRange: `Nov ${(week - 1) * 7 + 1} - Nov ${week * 7}`,
        totalTasks: 12 + (week * 2),
        completedTasks: week === 1 ? 10 : 0,
        courses: ['User Research Methods', 'Machine Learning', 'Python', 'Digital Design'],
        keyMilestones: week === 2 ? ['Python Assignment Due'] : week === 3 ? ['Mid-Week Check-in'] : week === 4 ? ['Weekly Reflection'] : []
      };
      weeks.push(weekData);
    }
    return weeks;
  };

  // Semester View: Generate semester data
  const generateSemesterData = () => {
    return [
      { month: 'September', weeks: 4, completionRate: 95, status: 'completed', milestones: ['Semester Start', 'Course Selection'] },
      { month: 'October', weeks: 4, completionRate: 88, status: 'completed', milestones: ['Mid-term Prep', 'Project 1 Due'] },
      { month: 'November', weeks: 4, completionRate: 45, status: 'in-progress', milestones: ['Python Assignment', 'Design Project'] },
      { month: 'December', weeks: 3, completionRate: 0, status: 'upcoming', milestones: ['Final Exams', 'Semester End'] }
    ];
  };

  // Draggable Task Component
  const DraggableTask = ({ task, dayIndex, taskIndex }: { task: DailyTask; dayIndex: number; taskIndex: number }) => {
    const [{ isDragging }, drag, preview] = useDrag({
      type: 'TASK',
      item: { taskId: task.id, sourceDayIndex: dayIndex, taskIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    return (
      <div 
        ref={preview}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div 
          className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
            task.completed 
              ? 'bg-[#1a1a1a] border-[#262626] opacity-60' 
              : 'bg-[#1a1a1a] border-[#262626] hover:border-purple-500/50 hover:shadow-sm'
          }`}
        >
          {isEditMode && (
            <div 
              ref={drag}
              className="cursor-move flex-shrink-0 mt-1 text-gray-500 hover:text-gray-400"
            >
              <Menu className="w-5 h-5" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <Badge className="bg-[#0a0a0a] text-gray-400 border border-[#262626] text-xs">
                    {task.courseCode}
                  </Badge>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${getTaskTypeColor(task.taskType)}`}>
                    {getTaskIcon(task.taskType)}
                    {task.taskType.charAt(0).toUpperCase() + task.taskType.slice(1)}
                  </span>
                </div>
                <h4 className={`text-sm font-medium mb-1 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                  {task.course}
                </h4>
                <p className={`text-sm ${task.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                  {task.description}
                </p>
              </div>
              <div className="flex flex-col gap-4 items-end flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {task.estimatedTime}
                </div>
                <Button
                  onClick={() => handleStartTask(task.id)}
                  disabled={task.completed}
                  className={task.completed ? 'bg-green-500 hover:bg-green-500 text-white' : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white'}
                >
                  {getTaskButtonLabel(task.id, task.completed)}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* AI Hint */}
        {task.aiHint && !task.completed && (
          <div className={`mt-2 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-l-4 border-purple-500 rounded-r-lg p-3 ${isEditMode ? 'ml-8' : 'ml-0'}`}>
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-white mb-1">AI Hint</p>
                <p className="text-xs text-gray-300">{task.aiHint}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Droppable Task List Component
  const DroppableTaskList = ({ dayIndex, tasks }: { dayIndex: number; tasks: DailyTask[] }) => {
    const [{ isOver }, drop] = useDrop({
      accept: 'TASK',
      drop: (item: { taskId: string; sourceDayIndex: number; taskIndex: number }, monitor) => {
        if (!monitor.didDrop()) {
          moveTask(item.taskId, item.sourceDayIndex, dayIndex);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
      }),
    });

    return (
      <div 
        ref={drop}
        className={`space-y-3 min-h-[100px] ${isOver ? 'bg-purple-50 rounded-lg p-2 border-2 border-dashed border-purple-300' : ''}`}
      >
        {tasks.map((task, index) => (
          <DraggableTask key={task.id} task={task} dayIndex={dayIndex} taskIndex={index} />
        ))}
        {tasks.length === 0 && isEditMode && (
          <div className="text-center py-8 text-gray-400 text-sm">
            Drop tasks here
          </div>
        )}
      </div>
    );
  };

  // Render Monthly View
  const renderMonthlyView = () => {
    const monthData = generateMonthData();
    
    return (
      <div className="space-y-4">
        {monthData.map((week) => (
          <Card key={week.weekNumber} className="border-2 border-gray-200 hover:border-purple-300 transition-all">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Week {week.weekNumber}</h3>
                  <p className="text-sm text-gray-600">{week.dateRange}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600 mb-1">
                    {week.completedTasks}/{week.totalTasks} tasks
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-full rounded-full transition-all"
                      style={{ width: `${Math.round((week.completedTasks / week.totalTasks) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {week.courses.map((course) => (
                    <Badge key={course} variant="outline" className="text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>
                
                {week.keyMilestones.length > 0 && (
                  <div className="bg-purple-50 border-l-4 border-purple-400 rounded-r p-3 mt-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-xs font-medium text-purple-900">Key Milestones</p>
                        <p className="text-xs text-purple-800">{week.keyMilestones.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentWeek(week.weekNumber - currentWeekNumber);
                    setViewMode('weekly');
                  }}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  // Render Semester View
  const renderSemesterView = () => {
    const semesterData = generateSemesterData();
    
    return (
      <div className="space-y-6">
        {/* Semester Progress Card */}
        <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-none shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl">Fall Semester 2025</h3>
                <p className="text-purple-100 text-sm mt-1">September - December</p>
              </div>
              <div className="text-right">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl">57%</span>
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-purple-100 text-sm">Overall Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Month Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {semesterData.map((month) => (
            <Card 
              key={month.month}
              className={`border-2 transition-all ${
                month.status === 'completed' ? 'border-green-200 bg-green-50/30' :
                month.status === 'in-progress' ? 'border-purple-300 bg-purple-50/30 shadow-md' :
                'border-gray-200'
              }`}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      {month.month}
                      {month.status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {month.status === 'in-progress' && <CircleDot className="w-5 h-5 text-purple-600" />}
                    </h3>
                    <p className="text-sm text-gray-600">{month.weeks} weeks</p>
                  </div>
                  <Badge 
                    className={
                      month.status === 'completed' ? 'bg-green-100 text-green-700' :
                      month.status === 'in-progress' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }
                  >
                    {month.status === 'completed' ? 'Completed' :
                     month.status === 'in-progress' ? 'In Progress' :
                     'Upcoming'}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{month.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          month.status === 'completed' ? 'bg-green-500' :
                          month.status === 'in-progress' ? 'bg-purple-600' :
                          'bg-gray-400'
                        }`}
                        style={{ width: `${month.completionRate}%` }}
                      />
                    </div>
                  </div>
                  
                  {month.milestones.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-1">Key Milestones</p>
                      <div className="flex flex-wrap gap-1">
                        {month.milestones.map((milestone) => (
                          <Badge key={milestone} variant="outline" className="text-xs">
                            {milestone}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {month.status === 'in-progress' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => setViewMode('monthly')}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    View Month
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Overview */}
        <Card>
          <CardContent className="p-5">
            <h3 className="font-semibold mb-4">Active Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { code: 'IX1305', name: 'User Research Methods', progress: 65 },
                { code: 'CS2401', name: 'Intro to Machine Learning', progress: 58 },
                { code: 'DS1502', name: 'Python for Data Analysis', progress: 52 },
                { code: 'DM1203', name: 'Digital Design', progress: 61 }
              ].map((course) => (
                <div key={course.code} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-gray-100 text-gray-700">{course.code}</Badge>
                    <span className="text-sm font-medium">{course.progress}%</span>
                  </div>
                  <p className="text-sm text-gray-700">{course.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white font-semibold">AI Learning Roadmap</h1>
        <p className="text-gray-400 mt-1">Your personalized daily study guide with SRL support</p>
      </div>

      {/* Today's Tip and Week Progress - Only show in weekly view */}
      {viewMode === 'weekly' && (
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-6">
          {/* Today's Tip Card */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">Today's Tip</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                      onClick={() => {
                        setCurrentTipIndex((prev) => (prev + 1) % dailyTips.length);
                        toast.success('New tip loaded!');
                      }}
                      title="Generate new daily tip"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="ml-1 text-xs">New Tip</span>
                    </Button>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">
                    {dailyTips[currentTipIndex]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Week Progress Bar Card */}
          <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-semibold">Week {currentWeekNumber}</h3>
                    <p className="text-purple-100 text-sm">November 4 - November 10, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-semibold">
                      {weeklyCompletionRate}%
                    </span>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <p className="text-purple-100 text-sm">Week Completion</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${weeklyCompletionRate}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SRL Explanation Card - Only show in weekly view */}
      {viewMode === 'weekly' && (
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              About Self-Regulated Learning (SRL)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
              <div>
                <div className="font-semibold mb-1 flex items-center gap-1 text-blue-400">
                  <Target className="w-4 h-4" />
                  Planning
                </div>
                <p>Your AI Roadmap helps you plan daily tasks based on your goals and deadlines.</p>
              </div>
              <div>
                <div className="font-semibold mb-1 flex items-center gap-1 text-blue-400">
                  <CircleDot className="w-4 h-4" />
                  Monitoring
                </div>
                <p>Mid-week check-ins help you track progress and adjust your study approach.</p>
              </div>
              <div>
                <div className="font-semibold mb-1 flex items-center gap-1 text-blue-400">
                  <PenTool className="w-4 h-4" />
                  Reflection
                </div>
                <p>Weekly reflections help you learn from your experience and improve over time.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(currentWeek - 1)}
            disabled={currentWeek <= -2 || viewMode !== 'weekly'}
            className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(currentWeek + 1)}
            disabled={currentWeek >= 2 || viewMode !== 'weekly'}
            className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Week
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
          {viewMode === 'weekly' && (
            <Button
              variant={isEditMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setIsEditMode(!isEditMode);
                toast.success(isEditMode ? 'Edit mode disabled' : 'Edit mode enabled - drag tasks to rearrange');
              }}
              className={isEditMode ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0' : 'bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white'}
            >
              <Edit className="w-4 h-4 mr-1" />
              {isEditMode ? 'Done' : 'Edit'}
            </Button>
          )}
          <span className="text-sm font-medium text-gray-400 ml-2">
            {viewMode === 'weekly' ? (
              currentWeek === 0 ? 'Current Week' : 
              currentWeek > 0 ? `${currentWeek} Week${currentWeek > 1 ? 's' : ''} Ahead` :
              `${Math.abs(currentWeek)} Week${Math.abs(currentWeek) > 1 ? 's' : ''} Ago`
            ) : viewMode === 'monthly' ? 'November 2025' : 'Fall Semester 2025'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {viewMode !== 'weekly' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('weekly')}
              className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Weekly
            </Button>
          )}
          <Button
            variant={viewMode === 'monthly' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('monthly')}
            className={viewMode === 'monthly' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0' : 'bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white'}
          >
            <Calendar className="w-4 h-4 mr-1" />
            Monthly View
          </Button>
          <Button
            variant={viewMode === 'semester' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('semester')}
            className={viewMode === 'semester' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0' : 'bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white'}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Semester View
          </Button>
        </div>
      </div>

      {/* Conditional View Rendering */}
      {viewMode === 'monthly' ? (
        renderMonthlyView()
      ) : viewMode === 'semester' ? (
        renderSemesterView()
      ) : (
        <>
          {/* Weekly Schedule Grid */}
          <div className="grid grid-cols-1 gap-4">
            {weekSchedule.map((daySchedule, dayIndex) => (
          <Card 
            key={daySchedule.day}
            className={`border-2 transition-all ${
              daySchedule.isToday 
                ? 'border-purple-500/50 shadow-lg bg-gradient-to-br from-purple-500/5 to-indigo-500/5' 
                : 'border-[#262626] hover:border-[#333] bg-[#141414]'
            }`}
          >
            <CardContent className="p-5">
              {/* Day Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#262626]">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    daySchedule.isToday 
                      ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white' 
                      : 'bg-[#1a1a1a] text-gray-400 border border-[#262626]'
                  }`}>
                    <div className="text-center">
                      <div className="text-xs font-medium">{daySchedule.day.slice(0, 3)}</div>
                      <div className="text-xs opacity-80">{daySchedule.date.split(' ')[1]}</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{daySchedule.day}</h3>
                    <p className="text-sm text-gray-400">{daySchedule.date}</p>
                  </div>
                  {daySchedule.isToday && (
                    <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 ml-2">Today</Badge>
                  )}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-400">
                      {daySchedule.tasks.filter(t => t.completed).length + (daySchedule.srlTask?.completed ? 1 : 0)}/
                      {daySchedule.tasks.length + (daySchedule.srlTask ? 1 : 0)} tasks
                    </div>
                    {daySchedule.completionRate === 100 && (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                  <div className="w-24 bg-[#1a1a1a] border border-[#262626] rounded-full h-1.5 mt-1">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        daySchedule.completionRate === 100 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-purple-500 to-indigo-500'
                      }`}
                      style={{ width: `${daySchedule.completionRate}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Course Tasks */}
              <DroppableTaskList dayIndex={dayIndex} tasks={daySchedule.tasks} />

              {/* SRL Task (Monitor/Reflection) */}
              {daySchedule.srlTask && (
                <div 
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-all mt-3 ${
                    daySchedule.srlTask.completed
                      ? 'bg-[#1a1a1a] border-[#262626] opacity-60'
                      : daySchedule.srlTask.type === 'monitor'
                        ? 'bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-500/30 shadow-md'
                        : 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30 shadow-md'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {daySchedule.srlTask.type === 'monitor' ? (
                          <CircleDot className="w-5 h-5 text-orange-400" />
                        ) : (
                          <Sparkles className="w-5 h-5 text-green-400" />
                        )}
                        <div>
                          <Badge className={`text-xs mb-1 ${
                            daySchedule.srlTask.type === 'monitor' 
                              ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' 
                              : 'bg-green-500/10 text-green-400 border-green-500/20'
                          }`}>
                            LearnBoost {daySchedule.srlTask.type === 'monitor' ? 'Monitoring' : 'Reflection'}
                          </Badge>
                          <h4 className={`font-semibold ${
                            daySchedule.srlTask.completed ? 'line-through text-gray-500' : 'text-white'
                          }`}>
                            {daySchedule.srlTask.title}
                          </h4>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          {daySchedule.srlTask.estimatedTime}
                        </div>
                        <Button 
                          size="sm" 
                          className={`${
                            daySchedule.srlTask.completed
                              ? 'bg-green-500 hover:bg-green-500'
                              : daySchedule.srlTask.type === 'monitor'
                                ? 'bg-orange-500 hover:bg-orange-600'
                                : 'bg-green-500 hover:bg-green-600'
                          } text-white`}
                          onClick={() => handleStartTask(daySchedule.srlTask!.id, true)}
                          disabled={daySchedule.srlTask.completed}
                        >
                          {getTaskButtonLabel(daySchedule.srlTask.id, daySchedule.srlTask.completed)}
                        </Button>
                      </div>
                    </div>
                    <p className={`text-sm ${
                      daySchedule.srlTask.completed ? 'text-gray-500' : 'text-gray-300'
                    }`}>
                      {daySchedule.srlTask.description}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
            ))}
          </div>

          {/* End of Day Reflection */}
          {!isTodayReflectionDay() && (
        <Card className="bg-gradient-to-br from-[#1E1E2A] to-[#2D2244] border-purple-400 shadow-xl overflow-hidden">
          <CardContent className="p-5">
            {/* Header with toggle */}
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setIsReflectionExpanded(!isReflectionExpanded)}
            >
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-purple-300" />
                <div>
                  <h4 className="font-medium text-white flex items-center gap-2">
                    End of Day Reflection
                    {isReflectionExpanded ? (
                      <ChevronUp className="w-4 h-4 text-purple-300" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-purple-300" />
                    )}
                  </h4>
                  <p className="text-xs text-purple-200 mt-0.5">Optional – for your eyes only 💭</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-purple-300">
                  {completedReflections.length}/5 daily reflections this week
                </p>
              </div>
            </div>

            {/* Expanded form */}
            {isReflectionExpanded && (
              <div className="mt-5 space-y-4 animate-in fade-in duration-300">
                {/* AI Encouragement */}
                <div className="bg-white/5 backdrop-blur-sm border border-purple-400/30 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-purple-300 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-purple-100 italic">
                        {encouragementMessages[encouragementIndex]}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 mt-2 text-xs text-purple-300 hover:text-white hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          setEncouragementIndex((prev) => (prev + 1) % encouragementMessages.length);
                        }}
                      >
                        <RefreshCw className="w-3 h-3 mr-1" />
                        New message
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-purple-100 block mb-2">
                      What went well today?
                    </label>
                    <Textarea
                      placeholder="Write one thing you're proud of, even if it's small."
                      value={reflectionData.whatWentWell}
                      onChange={(e) => setReflectionData(prev => ({ ...prev, whatWentWell: e.target.value }))}
                      className="bg-white/10 border-purple-400/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-purple-100 block mb-2">
                      What will you improve tomorrow?
                    </label>
                    <Textarea
                      placeholder="Think of one tiny adjustment that could help tomorrow feel smoother."
                      value={reflectionData.whatToImprove}
                      onChange={(e) => setReflectionData(prev => ({ ...prev, whatToImprove: e.target.value }))}
                      className="bg-white/10 border-purple-400/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-purple-100 block mb-2">
                      How do you feel about your progress?
                    </label>
                    <Textarea
                      placeholder="Reflect on your motivation or mood after today's study sessions."
                      value={reflectionData.howDoYouFeel}
                      onChange={(e) => setReflectionData(prev => ({ ...prev, howDoYouFeel: e.target.value }))}
                      className="bg-white/10 border-purple-400/30 text-white placeholder:text-purple-300/50 focus:border-purple-400 focus:ring-purple-400/20 min-h-[80px]"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end pt-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveReflection();
                    }}
                    className="bg-gradient-to-r from-[#A020F0] to-[#FF0080] hover:from-[#8F1CD6] hover:to-[#E6006F] text-white shadow-lg"
                    disabled={!reflectionData.whatWentWell && !reflectionData.whatToImprove && !reflectionData.howDoYouFeel}
                  >
                    Save Reflection
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          </Card>
          )}
        </>
      )}

      {/* Task Modal */}
      <Dialog open={openTaskId !== null || openSRLTaskId !== null} onOpenChange={(open) => {
        if (!open) {
          handleCloseTask();
        }
      }}>
        <DialogContent className="!max-w-[90vw] !w-[90vw] max-h-[85vh] p-0 gap-0 rounded-xl [&>button]:hidden flex flex-col">
          <DialogTitle className="sr-only">
            {getCurrentTask()?.course || getCurrentSRLTask()?.title || 'Task Details'}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {getCurrentTask()?.description || 'View and complete task details'}
          </DialogDescription>
          {/* Custom header with close button on top-left */}
          <div className="flex items-center justify-between p-6 border-b">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCloseTask}
              className="h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center pr-8">
              <h3 className="font-semibold">
                {getCurrentTask()?.course || getCurrentSRLTask()?.title || 'Task'}
              </h3>
              {getCurrentTask() && (
                <p className="text-sm text-gray-600">
                  {getCurrentTask()?.description}
                </p>
              )}
            </div>
          </div>

          {/* Task content */}
          {renderTaskModalContent()}

          {/* Footer with Finish button */}
          <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
            {/* Skip button - show for Mid-Week Check-In and Weekly Reflection */}
            {(getCurrentSRLTask()?.title === 'Mid-Week Check-In' || getCurrentSRLTask()?.title === 'Weekly Reflection') && (
              <Button
                onClick={handleSkipTask}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Skip
              </Button>
            )}
            <Button
              onClick={handleFinishTask}
              disabled={!canFinishTask}
              className={`${
                getCurrentSRLTask()?.title === 'Weekly Reflection'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Finish
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </DndProvider>
  );
}
