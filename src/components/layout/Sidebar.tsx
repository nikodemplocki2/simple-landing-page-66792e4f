import { 
  LayoutDashboard, 
  BookOpen,
  FileText, 
  Calendar,
  Map, 
  TrendingUp, 
  Library,
  MessageSquare,
  Settings,
  Zap,
  Trophy,
  Flame
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  xp: number;
  level: number;
  streak: number;
}

export function Sidebar({ currentPage, onNavigate, xp, level, streak }: SidebarProps) {
  const navigation = [
    // Dashboard
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, badge: null, group: 'main' },
    
    // University Related
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: null, group: 'university' },
    { id: 'assignments', label: 'Assignments', icon: FileText, badge: 3, group: 'university' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null, group: 'university' },
    
    // Learning & Progress
    { id: 'roadmap', label: 'AI Roadmap', icon: Map, badge: null, group: 'learning' },
    { id: 'progress', label: 'Progress', icon: TrendingUp, badge: null, group: 'learning' },
    
    // Community & Resources
    { id: 'resources', label: 'Resources', icon: Library, badge: null, group: 'social' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 2, group: 'social' },
  ];

  const xpToNextLevel = 1000;
  const currentXP = xp % xpToNextLevel;
  const xpProgress = (currentXP / xpToNextLevel) * 100;

  return (
    <div className="w-[240px] bg-[#0a0a0a] border-r border-[#1a1a1a] h-screen flex flex-col">
      {/* Logo */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <Zap className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-[15px] font-semibold text-white">LearnBoost</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            const prevItem = navigation[index - 1];
            const needsSpacing = prevItem && prevItem.group !== item.group;
            
            return (
              <li key={item.id} className={needsSpacing ? 'pt-3' : ''}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-[13px] group ${
                    isActive
                      ? 'bg-[#1f1f1f] text-white'
                      : 'text-[#a1a1aa] hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 text-[11px] font-medium">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Gamification Stats - Subtle */}
      <div className="px-3 pb-3">
        <div className="px-3 py-3 rounded-xl bg-[#141414] border border-[#1f1f1f]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                <Trophy className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <p className="text-[11px] text-[#71717a]">Level {level}</p>
                <p className="text-[13px] font-medium text-white">{currentXP} XP</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-[12px] font-medium text-orange-400">{streak}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#71717a]">
              <span>{currentXP} XP</span>
              <span>{xpToNextLevel} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-3 pb-4 border-t border-[#1a1a1a] pt-3">
        <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-[13px] font-medium">
            M
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] font-medium text-white">Marta</p>
            <p className="text-[11px] text-[#71717a]">Student</p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onNavigate('settings');
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#262626] transition-all"
          >
            <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}