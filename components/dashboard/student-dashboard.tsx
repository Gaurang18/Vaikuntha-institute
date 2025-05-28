"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Calendar, 
  PlayCircle, 
  BarChart3, 
  ChevronRight,
  ArrowUpRight,
  CheckCircle,
  User as UserIcon
} from 'lucide-react';
import { User } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { popularCourses } from '@/data/courses';
import CourseCard from '@/components/courses/course-card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StudentDashboardProps {
  user: User;
}

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock enrolled courses (in a real app, this would come from API)
  const enrolledCourses = popularCourses.slice(0, 3);
  
  // Mock upcoming classes
  const upcomingClasses = [
    {
      id: '1',
      title: 'Advanced JavaScript Concepts',
      date: '2025-04-15T10:00:00',
      instructor: 'Aditya Kumar',
      duration: '60 min',
      courseId: '1',
    },
    {
      id: '2',
      title: 'Data Science Project Review',
      date: '2025-04-17T14:30:00',
      instructor: 'Neha Sharma',
      duration: '45 min',
      courseId: '2',
    },
    {
      id: '3',
      title: 'Business Strategy Workshop',
      date: '2025-04-20T16:00:00',
      instructor: 'Vijay Mehta',
      duration: '90 min',
      courseId: '3',
    },
  ];
  
  // Mock assignments
  const assignments = [
    {
      id: '1',
      title: 'Web Development Project',
      course: 'Introduction to Web Development',
      dueDate: '2025-04-22T23:59:59',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Data Analysis Exercise',
      course: 'Data Science Masterclass',
      dueDate: '2025-04-18T23:59:59',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Business Case Study',
      course: 'Business Management Fundamentals',
      dueDate: '2025-04-10T23:59:59',
      status: 'completed',
    },
  ];
  
  // Mock activity data for chart
  const activityData = [
    { day: 'Mon', hours: 1.5 },
    { day: 'Tue', hours: 2.3 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 2.7 },
    { day: 'Fri', hours: 1.2 },
    { day: 'Sat', hours: 0.8 },
    { day: 'Sun', hours: 1.5 },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Get time remaining for due dates
  const getTimeRemaining = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link href="/courses">Browse Courses</Link>
          </Button>
          <Button asChild>
            <Link href="/profile">My Profile</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <p className="text-xs text-muted-foreground">
                  {enrolledCourses.length > 0 ? '+1 course this month' : 'No new courses'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5</div>
                <p className="text-xs text-muted-foreground">
                  +2.3 hours from last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.filter(a => a.status === 'pending').length}</div>
                <p className="text-xs text-muted-foreground">
                  Pending completion
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  Across all completed courses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Learning Activity + Upcoming Classes */}
          <div className="grid gap-4 md:grid-cols-7">
            <Card className="md:col-span-4">
              <CardHeader>
                <CardTitle>Learning Activity</CardTitle>
                <CardDescription>Your learning hours for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={activityData}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="hours" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Your scheduled live sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.slice(0, 2).map((session) => (
                    <div key={session.id} className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-md text-primary flex flex-col items-center justify-center">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{session.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(session.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <div className="flex items-center">
                          <span className="text-xs mr-2">{session.instructor}</span>
                          <Badge variant="outline" className="text-xs">
                            {session.duration}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#schedule" onClick={() => setActiveTab('schedule')}>
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">In Progress Courses</h2>
              <Button variant="ghost" asChild>
                <Link href="#my-courses" onClick={() => setActiveTab('my-courses')}>
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course, index) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="relative h-36">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title} 
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={index === 0 ? 'default' : 'secondary'}>
                        {index === 0 ? 'Current' : 'In Progress'}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-1">{course.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <UserIcon className="h-3 w-3 mr-1" />
                      <span>{course.instructor.name}</span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">
                          {index === 0 ? '65%' : index === 1 ? '32%' : '15%'}
                        </span>
                      </div>
                      <Progress 
                        value={index === 0 ? 65 : index === 1 ? 32 : 15} 
                        className="h-2"
                      />
                    </div>
                    <Button variant="secondary" className="w-full" asChild>
                      <Link href={`/courses/${course.slug}`}>
                        Continue Learning
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="my-courses" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course, index) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-44">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>
                      {index === 0 ? 'Current' : 'In Progress'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <UserIcon className="h-4 w-4 mr-1" />
                    <span>{course.instructor.name}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">
                        {index === 0 ? '65%' : index === 1 ? '32%' : '15%'}
                      </span>
                    </div>
                    <Progress 
                      value={index === 0 ? 65 : index === 1 ? 32 : 15} 
                      className="h-2"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>
                        {index === 0 ? '6.5 hours left' : index === 1 ? '18 hours left' : '20 hours left'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>
                        {index === 0 ? '23/42 lectures' : index === 1 ? '12/65 lectures' : '8/38 lectures'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button asChild>
                      <Link href={`/courses/${course.slug}`}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue Learning
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/courses/${course.slug}`}>
                        Course Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCourses.slice(3, 6).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Live Classes</CardTitle>
              <CardDescription>Your scheduled interactive sessions with instructors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingClasses.map((session) => (
                  <div key={session.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="bg-muted p-4 rounded-md text-center md:w-1/6">
                      <div className="text-2xl font-bold">
                        {new Date(session.date).getDate()}
                      </div>
                      <div className="text-muted-foreground">
                        {new Date(session.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                      <div className="text-sm mt-1">
                        {new Date(session.date).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>
                    </div>
                    
                    <div className="md:w-3/6">
                      <h3 className="font-bold text-lg">{session.title}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span>{session.instructor}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{session.duration}</Badge>
                        <Badge variant="secondary">Live Session</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end md:w-2/6 gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/courses/${session.courseId}`}>
                          Course Details
                        </Link>
                      </Button>
                      <Button>
                        <Calendar className="h-4 w-4 mr-2" />
                        Join Class
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Class Calendar</CardTitle>
              <CardDescription>View your scheduled classes on a calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-border rounded-lg p-6 text-center">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're working on a comprehensive calendar view for your classes.
                </p>
                <Button variant="outline" disabled>View Calendar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Assignments</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.filter(a => a.status === 'pending').map((assignment) => (
                  <div key={assignment.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="flex-grow">
                      <h3 className="font-bold">{assignment.title}</h3>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <div className="flex items-center mt-2">
                        <Badge variant={
                          getTimeRemaining(assignment.dueDate) === 'Due today' ? 'destructive' : 
                          getTimeRemaining(assignment.dueDate) === 'Due tomorrow' ? 'default' : 
                          'outline'
                        }>
                          {getTimeRemaining(assignment.dueDate)}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-2">
                          Due: {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link href="#">View Details</Link>
                      </Button>
                      <Button>Submit Assignment</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Completed Assignments</CardTitle>
              <CardDescription>Tasks you have finished</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignments.filter(a => a.status === 'completed').map((assignment) => (
                  <div key={assignment.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-border rounded-lg bg-muted/30">
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className="font-bold">{assignment.title}</h3>
                        <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-600 border-green-200">
                          Completed
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      <span className="text-xs text-muted-foreground">
                        Submitted: {formatDate(assignment.dueDate)}
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" asChild>
                        <Link href="#">View Feedback</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Course Completion</CardTitle>
                <CardDescription>Complete your first course</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl font-bold">1/1</div>
                  <Progress value={100} className="h-2 mt-2" />
                </div>
                <Badge className="bg-green-600">Completed</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Learning Streak</CardTitle>
                <CardDescription>Learn for 7 consecutive days</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl font-bold">5/7</div>
                  <Progress value={71} className="h-2 mt-2" />
                </div>
                <Badge variant="outline">In Progress</Badge>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto bg-muted p-3 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
                <CardTitle>Quiz Master</CardTitle>
                <CardDescription>Score 90%+ on 5 quizzes</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className="text-2xl font-bold">2/5</div>
                  <Progress value={40} className="h-2 mt-2" />
                </div>
                <Badge variant="outline">In Progress</Badge>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Certificates</CardTitle>
              <CardDescription>Your earned certifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="border border-border rounded-lg p-4 flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/3">
                    <img 
                      src="https://images.pexels.com/photos/6256254/pexels-photo-6256254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Certificate" 
                      className="rounded-md h-32 w-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="font-bold mb-1">Web Development Foundations</h3>
                    <p className="text-sm text-muted-foreground mb-2">Issued on April 1, 2025</p>
                    <div className="flex items-center mb-3">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm">Verified Certificate</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button size="sm">Download</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border border-dashed border-border rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <ArrowUpRight className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">Earn more certificates</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete courses to earn certificates
                    </p>
                    <Button variant="outline" asChild>
                      <Link href="/courses">Browse Courses</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;