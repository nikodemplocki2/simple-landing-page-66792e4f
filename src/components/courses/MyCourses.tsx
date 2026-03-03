import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  BookOpen, 
  ArrowRight,
  Clock,
  Award,
  TrendingUp
} from 'lucide-react';

export function MyCourses() {
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'AI & Design', 'Career', 'Design Engineering', 'Design Systems'];

  const courses = [
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      code: 'CS101',
      instructor: 'Prof. Anderson',
      progress: 68,
      xp: 280,
      assignments: 3,
      grade: 'A-',
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      category: 'AI & Design'
    },
    {
      id: 2,
      title: 'Algorithm Analysis',
      code: 'CS201',
      instructor: 'Prof. Martinez',
      progress: 55,
      xp: 220,
      assignments: 2,
      grade: 'B+',
      gradient: 'from-purple-500 via-pink-500 to-red-500',
      category: 'Design Engineering'
    },
    {
      id: 3,
      title: 'Database Systems',
      code: 'CS102',
      instructor: 'Prof. Chen',
      progress: 72,
      xp: 310,
      assignments: 1,
      grade: 'A',
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      category: 'Career'
    },
    {
      id: 4,
      title: 'Web Development',
      code: 'CS103',
      instructor: 'Prof. Johnson',
      progress: 80,
      xp: 180,
      assignments: 0,
      grade: 'A-',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      category: 'Design Systems'
    },
    {
      id: 5,
      title: 'Machine Learning Basics',
      code: 'CS301',
      instructor: 'Prof. Williams',
      progress: 45,
      xp: 150,
      assignments: 4,
      grade: 'B',
      gradient: 'from-indigo-500 via-purple-500 to-pink-500',
      category: 'AI & Design'
    },
    {
      id: 6,
      title: 'UX Design Principles',
      code: 'DES201',
      instructor: 'Prof. Garcia',
      progress: 90,
      xp: 420,
      assignments: 0,
      grade: 'A',
      gradient: 'from-pink-500 via-rose-500 to-orange-500',
      category: 'Design Systems'
    },
  ];

  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-[32px] font-semibold text-white tracking-tight">Courses</h1>
        <p className="text-[15px] text-[#a1a1aa]">
          {courses.length} active courses • {courses.reduce((acc, c) => acc + c.xp, 0)} total XP earned
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
            className={`h-8 text-[13px] whitespace-nowrap ${
              filter === f
                ? 'bg-white text-black hover:bg-white/90'
                : 'border-[#262626] text-[#a1a1aa] hover:bg-[#1f1f1f] hover:text-white hover:border-[#3f3f46]'
            }`}
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#71717a] uppercase tracking-wider">Active Courses</span>
              <BookOpen className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-[28px] font-semibold text-white">{courses.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#71717a] uppercase tracking-wider">Total XP</span>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-[28px] font-semibold text-white">{courses.reduce((acc, c) => acc + c.xp, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#71717a] uppercase tracking-wider">Avg Progress</span>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-[28px] font-semibold text-white">
              {Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)}%
            </p>
          </CardContent>
        </Card>
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[12px] text-[#71717a] uppercase tracking-wider">Pending</span>
              <Clock className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-[28px] font-semibold text-white">
              {courses.reduce((acc, c) => acc + c.assignments, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id}
            className="bg-[#141414] border-[#262626] hover:border-[#3f3f46] transition-all cursor-pointer group overflow-hidden"
          >
            <CardContent className="p-0">
              {/* Gradient Header */}
              <div className={`h-32 bg-gradient-to-br ${course.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-3 left-4 right-4">
                  <Badge className="bg-black/40 text-white border-0 text-[11px] backdrop-blur-sm">
                    {course.code}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-white mb-1 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-[12px] text-[#71717a]">{course.instructor}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#71717a] group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[12px] mb-1.5">
                    <span className="text-[#71717a]">Progress</span>
                    <span className="text-white font-medium">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-[#1a1a1a] rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full bg-gradient-to-r ${course.gradient}`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-[12px] pt-3 border-t border-[#1f1f1f]">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-md bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
                        <span className="text-[10px] text-white font-medium">{course.xp}</span>
                      </div>
                      <span className="text-[#71717a]">XP</span>
                    </div>
                    <span className={course.assignments > 0 ? 'text-orange-400' : 'text-green-400'}>
                      {course.assignments > 0 ? `${course.assignments} pending` : 'All done'}
                    </span>
                  </div>
                  <span className="text-green-400 font-medium">{course.grade}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <Card className="bg-[#141414] border-[#262626]">
          <CardContent className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-[#3f3f46] mx-auto mb-3" />
            <p className="text-[14px] text-[#a1a1aa]">No courses found in this category</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
