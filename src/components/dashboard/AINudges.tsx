import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { 
  Sparkles,
  Lightbulb,
  TrendingUp,
  AlertCircle,
  Heart,
  Bell,
  Settings,
  Info,
  ThumbsUp,
  ThumbsDown,
  Target,
  Clock,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Nudge {
  id: number;
  type: 'motivation' | 'suggestion' | 'reminder' | 'insight' | 'encouragement';
  title: string;
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  helpful?: boolean;
}

export function AINudges() {
  const [nudges, setNudges] = useState<Nudge[]>([
    {
      id: 1,
      type: 'motivation',
      title: 'Great Progress!',
      message: "You're 85% done with your UX assignment! Just one more focused session and you'll be finished. Your consistency this week has been amazing! 🎯",
      time: '2 hours ago',
      priority: 'high',
      read: false
    },
    {
      id: 2,
      type: 'suggestion',
      title: 'Optimize Your Study Time',
      message: "Based on your activity patterns, you're most productive between 9-11 AM. Consider scheduling your Machine Learning study session during this time tomorrow for better results.",
      time: '5 hours ago',
      priority: 'medium',
      read: false
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Psychology Exam Approaching',
      message: "Your Psychology exam is in 12 days and you're currently at 40% preparation. Let's break this into manageable daily tasks? I suggest 1-2 hours per day reviewing one chapter.",
      time: '1 day ago',
      priority: 'high',
      read: false
    },
    {
      id: 4,
      type: 'insight',
      title: 'Weekly Performance Insight',
      message: "You've completed 4 goals this week - that's 33% above your average! Your study streak of 12 days is also your second-longest ever. Keep this momentum going! 🔥",
      time: '1 day ago',
      priority: 'medium',
      read: true,
      helpful: true
    },
    {
      id: 5,
      type: 'encouragement',
      title: 'Small Steps Matter',
      message: "Feeling overwhelmed? Remember: you don't have to do everything at once. You've successfully broken down tasks before. Start with just 25 minutes on your Data Science module today.",
      time: '2 days ago',
      priority: 'low',
      read: true,
      helpful: true
    },
    {
      id: 6,
      type: 'suggestion',
      title: 'Try a Study Technique',
      message: "You've been working on the same goal for 3 hours. Research suggests taking a 15-minute break now could improve retention. How about a short walk or stretch?",
      time: '3 days ago',
      priority: 'medium',
      read: true
    }
  ]);

  const [settings, setSettings] = useState({
    motivationalNudges: true,
    studySuggestions: true,
    examReminders: true,
    insightReports: true,
    dailyFrequency: 3,
    quietHours: false
  });

  const handleMarkAsRead = (id: number) => {
    setNudges(nudges.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleFeedback = (id: number, helpful: boolean) => {
    setNudges(nudges.map(n => n.id === id ? { ...n, helpful } : n));
    toast.success(helpful ? 'Thanks for your feedback!' : 'We\'ll improve our recommendations');
  };

  const getNudgeIcon = (type: string) => {
    switch (type) {
      case 'motivation': return <Heart className="w-5 h-5 text-pink-500" />;
      case 'suggestion': return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case 'reminder': return <Bell className="w-5 h-5 text-blue-500" />;
      case 'insight': return <TrendingUp className="w-5 h-5 text-purple-500" />;
      case 'encouragement': return <Sparkles className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNudgeBgColor = (type: string) => {
    switch (type) {
      case 'motivation': return 'bg-pink-50 border-pink-200';
      case 'suggestion': return 'bg-yellow-50 border-yellow-200';
      case 'reminder': return 'bg-blue-50 border-blue-200';
      case 'insight': return 'bg-purple-50 border-purple-200';
      case 'encouragement': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const unreadCount = nudges.filter(n => !n.read).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>AI Insights & Nudges</h1>
          <p className="text-gray-600 mt-1">Personalized recommendations to support your learning</p>
        </div>
        {unreadCount > 0 && (
          <Badge className="bg-purple-500 text-white">
            {unreadCount} New
          </Badge>
        )}
      </div>

      {/* Info Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">How AI Insights Work</h3>
              <p className="text-sm text-purple-100">
                Our AI analyzes your study patterns, goals, and progress to provide timely, personalized nudges. 
                You have full control over what types of insights you receive and when. All recommendations are 
                based on proven learning science and your unique study habits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nudges List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Nudges
              </CardTitle>
              <p className="text-sm text-gray-600">AI-generated insights and recommendations</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {nudges.map((nudge) => (
                <div 
                  key={nudge.id} 
                  className={`p-4 border rounded-lg ${getNudgeBgColor(nudge.type)} ${
                    !nudge.read ? 'border-l-4' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNudgeIcon(nudge.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{nudge.title}</h4>
                          <Badge variant="outline" className="text-xs mt-1">
                            {nudge.type}
                          </Badge>
                        </div>
                        {!nudge.read && (
                          <Badge className="bg-purple-500 text-white text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm">{nudge.message}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500">{nudge.time}</span>
                        <div className="flex gap-2">
                          {nudge.helpful === undefined ? (
                            <>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 gap-1"
                                onClick={() => handleFeedback(nudge.id, true)}
                              >
                                <ThumbsUp className="w-3 h-3" />
                                Helpful
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="h-8 gap-1"
                                onClick={() => handleFeedback(nudge.id, false)}
                              >
                                <ThumbsDown className="w-3 h-3" />
                                Not helpful
                              </Button>
                            </>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              {nudge.helpful ? '✓ Marked helpful' : 'Feedback received'}
                            </Badge>
                          )}
                          {!nudge.read && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8"
                              onClick={() => handleMarkAsRead(nudge.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Nudge Settings
              </CardTitle>
              <p className="text-sm text-gray-600">Customize your AI insights</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="motivation" className="text-sm">
                    Motivational Nudges
                  </Label>
                  <Switch 
                    id="motivation"
                    checked={settings.motivationalNudges}
                    onCheckedChange={(checked) => setSettings({ ...settings, motivationalNudges: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="suggestions" className="text-sm">
                    Study Suggestions
                  </Label>
                  <Switch 
                    id="suggestions"
                    checked={settings.studySuggestions}
                    onCheckedChange={(checked) => setSettings({ ...settings, studySuggestions: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reminders" className="text-sm">
                    Exam Reminders
                  </Label>
                  <Switch 
                    id="reminders"
                    checked={settings.examReminders}
                    onCheckedChange={(checked) => setSettings({ ...settings, examReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="insights" className="text-sm">
                    Weekly Insights
                  </Label>
                  <Switch 
                    id="insights"
                    checked={settings.insightReports}
                    onCheckedChange={(checked) => setSettings({ ...settings, insightReports: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="quiet" className="text-sm">
                    Quiet Hours (10 PM - 8 AM)
                  </Label>
                  <Switch 
                    id="quiet"
                    checked={settings.quietHours}
                    onCheckedChange={(checked) => setSettings({ ...settings, quietHours: checked })}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <Label className="text-sm">Daily Nudge Frequency</Label>
                <div className="space-y-2 mt-2">
                  <Slider
                    value={[settings.dailyFrequency]}
                    onValueChange={(value) => setSettings({ ...settings, dailyFrequency: value[0] })}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-600 text-center">
                    {settings.dailyFrequency} nudges per day
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Transparency
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="data">
                  <AccordionTrigger>What data is used?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      We analyze your goal completion rates, study times, subject preferences, 
                      and engagement patterns. No personal data is shared with third parties.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="recommendations">
                  <AccordionTrigger>How are recommendations made?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      Our AI uses evidence-based learning science principles and your historical 
                      patterns to suggest optimal study times, break intervals, and task prioritization.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="control">
                  <AccordionTrigger>Can I control what I see?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600">
                      Absolutely! You can customize nudge types, frequency, and timing. Your 
                      feedback helps improve recommendations. You can pause or disable nudges anytime.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 text-sm">Your Privacy Matters</h4>
                  <p className="text-xs text-blue-800 mt-1">
                    All AI processing happens securely. You control your data and can export or delete it anytime.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
