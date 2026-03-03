import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { 
  User, 
  Bell, 
  Lock, 
  Palette, 
  HelpCircle,
  Sparkles,
  Shield,
  Award,
  Mail,
  Smartphone
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Settings() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [aiNudges, setAiNudges] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [peerSharing, setPeerSharing] = useState(true);
  const [performanceData, setPerformanceData] = useState(true);

  const badges = [
    { id: 1, name: 'First Steps', description: 'Created your first goal', earned: true, date: 'Oct 15, 2025' },
    { id: 2, name: 'Week Warrior', description: '7-day streak achieved', earned: true, date: 'Nov 1, 2025' },
    { id: 3, name: 'Helpful Peer', description: 'Provided 10 peer reviews', earned: true, date: 'Nov 5, 2025' },
    { id: 4, name: 'Level 3 Scholar', description: 'Reached Level 3', earned: true, date: 'Nov 8, 2025' },
    { id: 5, name: 'Perfect Week', description: 'Complete all tasks in a week', earned: false, date: null },
    { id: 6, name: 'Study Master', description: 'Study 40 hours in a month', earned: false, date: null },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2 text-white">Settings & Profile</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile */}
        <Card className="lg:col-span-1 bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="flex items-center gap-2 text-white">
              <User className="w-5 h-5 text-purple-400" />
              Profile
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-3xl mb-3">
                M
              </div>
              <Button variant="outline" size="sm" className="border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">Change Avatar</Button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                <Input defaultValue="Marta Andersson" className="bg-[#1a1a1a] border-[#262626] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Email</label>
                <Input defaultValue="marta.andersson@student.su.se" type="email" className="bg-[#1a1a1a] border-[#262626] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Study Program</label>
                <Input defaultValue="Computer Science, BSc" className="bg-[#1a1a1a] border-[#262626] text-white" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Student ID</label>
                <Input defaultValue="CS2023-1247" disabled className="bg-[#0a0a0a] border-[#262626] text-gray-500" />
              </div>
            </div>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="lg:col-span-2 bg-[#141414] border-[#262626]">
          <CardHeader>
            <h3 className="text-white">Preferences</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Notifications */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-blue-400" />
                <h4 className="text-white">Notifications</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">Email Notifications</p>
                    <p className="text-xs text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch 
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">Push Notifications</p>
                    <p className="text-xs text-gray-500">Get desktop/mobile alerts</p>
                  </div>
                  <Switch 
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">AI Nudges & Reminders</p>
                    <p className="text-xs text-gray-500">Personalized study reminders</p>
                  </div>
                  <Switch 
                    checked={aiNudges}
                    onCheckedChange={setAiNudges}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">Weekly Progress Reports</p>
                    <p className="text-xs text-gray-500">Summary every Sunday</p>
                  </div>
                  <Switch 
                    checked={weeklyReports}
                    onCheckedChange={setWeeklyReports}
                  />
                </div>
              </div>
            </div>

            {/* AI Transparency */}
            <div className="pt-4 border-t border-[#262626]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h4 className="text-white">AI Transparency</h4>
              </div>
              <div className="space-y-3">
                <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                  <p className="text-sm text-purple-200 mb-3">
                    LearnBoost uses AI to provide personalized recommendations and insights. You can always ask "Why this?" to understand how suggestions are generated.
                  </p>
                  <Button variant="outline" size="sm" className="text-purple-300 border-purple-500/30 hover:bg-purple-500/20">
                    Learn More About Our AI
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">Show AI Confidence Scores</p>
                    <p className="text-xs text-gray-500">Display how certain AI is about suggestions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="pt-4 border-t border-[#262626]">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-green-400" />
                <h4 className="text-white">Privacy</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">Share with Peers</p>
                    <p className="text-xs text-gray-500">Allow classmates to see your profile</p>
                  </div>
                  <Switch 
                    checked={peerSharing}
                    onCheckedChange={setPeerSharing}
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-white">Share Performance Data</p>
                    <p className="text-xs text-gray-500">Used for AI recommendations</p>
                  </div>
                  <Switch 
                    checked={performanceData}
                    onCheckedChange={setPerformanceData}
                  />
                </div>
                <Button variant="outline" size="sm" className="w-full border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
                  Download My Data
                </Button>
              </div>
            </div>

            {/* Appearance */}
            <div className="pt-4 border-t border-[#262626]">
              <div className="flex items-center gap-2 mb-4">
                <Palette className="w-5 h-5 text-orange-400" />
                <h4 className="text-white">Appearance</h4>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#1a1a1a] border border-[#262626] rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-white">Dark Mode</p>
                  <p className="text-xs text-gray-500">Switch to dark theme</p>
                </div>
                <Switch 
                  checked={darkMode}
                  onCheckedChange={(checked) => {
                    setDarkMode(checked);
                    toast.success(checked ? 'Dark mode enabled' : 'Light mode enabled');
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges & Achievements */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white">
            <Award className="w-5 h-5 text-purple-400" />
            Badges & Achievements
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => (
              <div 
                key={badge.id}
                className={`text-center p-4 rounded-lg border-2 ${
                  badge.earned
                    ? 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30'
                    : 'bg-[#0a0a0a] border-[#262626] opacity-60'
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  badge.earned
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                    : 'bg-gray-700'
                }`}>
                  <Award className="w-8 h-8 text-white" />
                </div>
                <p className={`text-sm mb-1 ${badge.earned ? 'text-white' : 'text-gray-500'}`}>{badge.name}</p>
                <p className="text-xs text-gray-500">{badge.description}</p>
                {badge.earned && badge.date && (
                  <p className="text-xs text-purple-400 mt-2">{badge.date}</p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            Help & Support
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <HelpCircle className="w-6 h-6 text-blue-400" />
              <span className="text-sm">FAQ & Guides</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <Mail className="w-6 h-6 text-purple-400" />
              <span className="text-sm">Contact Support</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2 border-[#262626] text-gray-300 hover:bg-[#1a1a1a] hover:text-white">
              <Smartphone className="w-6 h-6 text-green-400" />
              <span className="text-sm">Mobile App</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}