import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  MapPin,
  GraduationCap,
  FileText,
  BookOpen,
  Trophy,
  Sparkles
} from 'lucide-react';

export function CalendarTimetable() {
  const [currentView, setCurrentView] = useState<'week' | 'month' | 'day'>('week');
  const [currentDate] = useState(new Date(2025, 10, 10)); // Nov 10, 2025

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const events = [
    // Classes
    { id: 1, type: 'lecture', title: 'Data Structures', code: 'CS101', day: 0, time: '09:00 - 11:00', room: 'Hall A-204', color: 'purple' },
    { id: 2, type: 'lecture', title: 'Algorithm Analysis', code: 'CS201', day: 0, time: '13:00 - 15:00', room: 'Lab B-105', color: 'blue' },
    { id: 3, type: 'lecture', title: 'Database Systems', code: 'CS102', day: 1, time: '10:00 - 12:00', room: 'Hall C-301', color: 'green' },
    { id: 4, type: 'lab', title: 'Data Structures Lab', code: 'CS101', day: 2, time: '14:00 - 16:00', room: 'Lab A-102', color: 'purple' },
    { id: 5, type: 'lecture', title: 'Web Development', code: 'CS103', day: 3, time: '09:00 - 11:00', room: 'Lab D-210', color: 'orange' },
    
    // Study Sessions (AI-generated)
    { id: 6, type: 'study', title: 'Algorithm Analysis Review', day: 1, time: '15:00 - 17:00', room: 'Library', color: 'blue', aiGenerated: true },
    { id: 7, type: 'study', title: 'Binary Tree Practice', day: 2, time: '10:00 - 12:00', room: 'Study Room', color: 'purple', aiGenerated: true },
    
    // Assignments
    { id: 8, type: 'deadline', title: 'Data Structures Assignment 3', day: 1, time: '23:59', color: 'red' },
    { id: 9, type: 'deadline', title: 'Database Project Submission', day: 4, time: '23:59', color: 'red' },
    
    // Exams
    { id: 10, type: 'exam', title: 'Algorithm Midterm', day: 3, time: '09:00 - 11:00', room: 'Hall A-101', color: 'red' },
    
    // Challenges
    { id: 11, type: 'challenge', title: 'Weekly XP Challenge Ends', day: 6, time: '23:59', color: 'purple' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lecture':
      case 'lab':
        return GraduationCap;
      case 'study':
        return BookOpen;
      case 'deadline':
        return FileText;
      case 'exam':
        return Clock;
      case 'challenge':
        return Trophy;
      default:
        return CalendarIcon;
    }
  };

  const getEventsByDay = (dayIndex: number) => {
    return events.filter(e => e.day === dayIndex).sort((a, b) => {
      const timeA = a.time.split(' - ')[0] || a.time;
      const timeB = b.time.split(' - ')[0] || b.time;
      return timeA.localeCompare(timeB);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2 font-semibold">Calendar & Timetable</h1>
          <p className="text-gray-400">Your complete schedule with classes, study blocks, and deadlines</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCurrentView('day')} className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white">
            Day
          </Button>
          <Button 
            variant={currentView === 'week' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setCurrentView('week')}
            className={currentView === 'week' ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white border-0' : 'bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525]'}
          >
            Week
          </Button>
          <Button variant="outline" size="sm" onClick={() => setCurrentView('month')} className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white">
            Month
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous Week
            </Button>
            <div className="text-center">
              <p className="text-lg text-white">Week of November 10 - 16, 2025</p>
              <p className="text-sm text-gray-500">Fall Semester 2025</p>
            </div>
            <Button variant="outline" size="sm" className="bg-[#1a1a1a] border-[#262626] text-gray-300 hover:bg-[#252525] hover:text-white">
              Next Week
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardContent className="p-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400">Lecture/Class</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-400">Study Session</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-400" />
              <span className="text-sm text-gray-400">Assignment Due</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-gray-400">Exam</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-400">Challenge Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-400">AI-Generated</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Week View Calendar */}
      {currentView === 'week' && (
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[1200px]">
                {/* Header Row */}
                <div className="grid grid-cols-8 border-b border-[#262626]">
                  <div className="p-4 bg-[#1a1a1a] border-r border-[#262626]">
                    <span className="text-sm text-gray-400">Time</span>
                  </div>
                  {weekDays.map((day, idx) => (
                    <div key={day} className={`p-4 text-center border-r border-[#262626] ${idx === 0 ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10' : 'bg-[#1a1a1a]'}`}>
                      <p className="text-sm text-white">{day}</p>
                      <p className="text-xs text-gray-500">Nov {10 + idx}</p>
                    </div>
                  ))}
                </div>

                {/* Time Grid */}
                <div className="relative">
                  {timeSlots.map((time, timeIdx) => (
                    <div key={time} className="grid grid-cols-8 border-b border-[#262626]" style={{ minHeight: '80px' }}>
                      <div className="p-2 bg-[#1a1a1a] border-r border-[#262626] text-sm text-gray-400">
                        {time}
                      </div>
                      {weekDays.map((day, dayIdx) => (
                        <div key={`${day}-${time}`} className="border-r border-[#262626] p-2 relative bg-[#0a0a0a]">
                          {/* Render events for this time slot */}
                          {getEventsByDay(dayIdx)
                            .filter(event => {
                              const eventTime = event.time.split(' - ')[0] || event.time;
                              return eventTime.startsWith(time.slice(0, 2));
                            })
                            .map(event => {
                              const Icon = getEventIcon(event.type);
                              return (
                                <div 
                                  key={event.id}
                                  className={`p-2 rounded-lg border mb-2 ${
                                    event.type === 'deadline' ? 'bg-red-500/10 border-red-500/20' :
                                    event.type === 'exam' ? 'bg-orange-500/10 border-orange-500/20' :
                                    event.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20' :
                                    event.color === 'blue' ? 'bg-blue-500/10 border-blue-500/20' :
                                    event.color === 'green' ? 'bg-green-500/10 border-green-500/20' :
                                    event.color === 'orange' ? 'bg-orange-500/10 border-orange-500/20' :
                                    'bg-gray-500/10 border-gray-500/20'
                                  }`}
                                >
                                  <div className="flex items-start gap-1 mb-1">
                                    <Icon className={`w-3 h-3 flex-shrink-0 mt-0.5 ${
                                      event.type === 'deadline' ? 'text-red-400' :
                                      event.type === 'exam' ? 'text-orange-400' :
                                      event.color === 'purple' ? 'text-purple-400' :
                                      event.color === 'blue' ? 'text-blue-400' :
                                      event.color === 'green' ? 'text-green-400' :
                                      event.color === 'orange' ? 'text-orange-400' :
                                      'text-gray-400'
                                    }`} />
                                    {event.aiGenerated && (
                                      <Sparkles className="w-3 h-3 text-indigo-400 flex-shrink-0 mt-0.5" />
                                    )}
                                  </div>
                                  <p className="text-xs text-white mb-1">{event.title}</p>
                                  {event.code && (
                                    <p className="text-xs text-gray-500 mb-1">{event.code}</p>
                                  )}
                                  {event.room && (
                                    <p className="text-xs text-gray-400 flex items-center gap-1">
                                      <MapPin className="w-3 h-3" />
                                      {event.room}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events List */}
      <Card className="bg-[#141414] border-[#262626]">
        <CardHeader>
          <h3 className="flex items-center gap-2 text-white">
            <CalendarIcon className="w-5 h-5 text-blue-400" />
            Upcoming Events This Week
          </h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events.slice(0, 8).map(event => {
              const Icon = getEventIcon(event.type);
              return (
                <div 
                  key={event.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    event.type === 'deadline' || event.type === 'exam' 
                      ? 'bg-red-500/5 border-red-500/20' 
                      : event.color === 'purple' ? 'bg-purple-500/5 border-purple-500/20' :
                        event.color === 'blue' ? 'bg-blue-500/5 border-blue-500/20' :
                        event.color === 'green' ? 'bg-green-500/5 border-green-500/20' :
                        event.color === 'orange' ? 'bg-orange-500/5 border-orange-500/20' :
                        'bg-gray-500/5 border-gray-500/20'
                  }`}
                >
                  <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                    event.type === 'deadline' ? 'text-red-400' :
                    event.type === 'exam' ? 'text-orange-400' :
                    event.color === 'purple' ? 'text-purple-400' :
                    event.color === 'blue' ? 'text-blue-400' :
                    event.color === 'green' ? 'text-green-400' :
                    event.color === 'orange' ? 'text-orange-400' :
                    'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">{event.title}</p>
                      {event.aiGenerated && (
                        <Badge className="text-xs bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                          ✨ AI
                        </Badge>
                      )}
                    </div>
                    {event.code && <p className="text-xs text-gray-400 mb-1">{event.code}</p>}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {weekDays[event.day]}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      {event.room && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.room}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sync Options */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <CalendarIcon className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="text-white mb-2 font-medium">Calendar Sync</h4>
              <p className="text-sm text-gray-300 mb-4">
                Sync your LearnBoost calendar with external calendars for seamless integration
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10">
                  Google Calendar
                </Button>
                <Button variant="outline" size="sm" className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10">
                  Outlook
                </Button>
                <Button variant="outline" size="sm" className="text-blue-400 border-blue-500/30 hover:bg-blue-500/10">
                  Apple Calendar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}