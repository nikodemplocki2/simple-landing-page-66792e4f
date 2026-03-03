import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { AIWidget } from './components/layout/AIWidget';
import { Dashboard } from './components/dashboard/Dashboard';
import { AIRoadmap } from './components/dashboard/AIRoadmap';
import { Assignments } from './components/assignments/Assignments';
import { ProgressAnalytics } from './components/progress/ProgressAnalytics';
import { Resources } from './components/resources/Resources';
import { UniversityHub } from './components/university/UniversityHub';
import { Settings } from './components/settings/Settings';
import { MyCourses } from './components/courses/MyCourses';
import { CalendarTimetable } from './components/calendar/CalendarTimetable';
import { MessagesInbox } from './components/messages/MessagesInbox';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userXP] = useState(750);
  const [userLevel] = useState(3);
  const [userStreak] = useState(7);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <MyCourses />;
      case 'assignments':
        return <Assignments />;
      case 'calendar':
        return <CalendarTimetable />;
      case 'roadmap':
        return <AIRoadmap />;
      case 'progress':
        return <ProgressAnalytics />;
      case 'resources':
        return <Resources />;
      case 'university':
        return <UniversityHub />;
      case 'messages':
        return <MessagesInbox />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        xp={userXP}
        level={userLevel}
        streak={userStreak}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="w-full p-6 md:p-8 max-w-[1800px]">
          {renderPage()}
        </div>
      </main>
      <AIWidget />
      <Toaster position="top-right" />
    </div>
  );
}