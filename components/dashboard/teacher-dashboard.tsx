"use client";

import Link from 'next/link';
import { User } from '@/contexts/auth-context';
import { 
  Users,
  BookOpen,
  MessageSquare,
  Clock,
  BarChart,
  Video,
  Plus,
  FileText,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { popularCourses } from '@/data/courses';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard = ({ user }: TeacherDashboardProps) => {
  // Mock data for teacher's courses
  const teacherCourses = popularCourses.slice(0, 4);
  
  // Mock enrollment data for chart
  const enrollmentData = [
    { month: 'Jan', students: 45 },
    { month: 'Feb', students: 52 },
    { month: 'Mar', students: 78 },
    { month: 'Apr', students: 110 },
    { month: 'May', students: 95 },
    { month: 'Jun', students: 120 },
  ];
  
  // Mock engagement data for chart
  const engagementData = [
    { name: 'Web Dev', value: 65 },
    { name: 'Data Science', value: 25 },
    { name: 'JavaScript', value: 10 },
  ];
  
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];
  
  // Mock recent messages
  const recentMessages = [
    {
      id: '1',
      student: {
        name: 'Rahul Sharma',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      course: 'Introduction to Web Development',
      message: 'I have a question about the CSS flexbox exercise in lecture 12. Could you provide more examples?',
      timestamp: '2025-04-14T10:30:00',
      read: false,
    },
    {
      id: '2',
      student: {
        name: 'Priya Patel',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      course: 'Data Science Masterclass',
      message: 'Thank you for the detailed feedback on my project. I\'ve implemented your suggestions.',
      timestamp: '2025-04-13T16:45:00',
      read: true,
    },
    {
      id: '3',
      student: {
        name: 'Vikram Singh',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      course: 'Advanced JavaScript Programming',
      message: 'When will the additional resources for async programming be available?',
      timestamp: '2025-04-12T14:20:00',
      read: true,
    },
  ];
  
  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: '1',
      title: 'Web Development Q&A',
      date: '2025-04-15T10:00:00',
      duration: '60 min',
      enrolledStudents: 28,
      courseName: 'Introduction to Web Development',
    },
    {
      id: '2',
      title: 'Data Science Project Review',
      date: '2025-04-17T14:30:00',
      duration: '90 min',
      enrolledStudents: 15,
      courseName: 'Data Science Masterclass',
    },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Mock pending assignments
  const pendingReviews = [
    {
      id: '1',
      title: 'Web Development Project',
      course: 'Introduction to Web Development',
      submittedBy: 'Rahul Sharma',
      submittedDate: '2025-04-12T16:30:00',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Data Analysis Exercise',
      course: 'Data Science Masterclass',
      submittedBy: 'Priya Patel',
      submittedDate: '2025-04-11T14:20:00',
      status: 'pending',
    },
    {
      id: '3',
      title: 'JavaScript Challenge',
      course: 'Advanced JavaScript Programming',
      submittedBy: 'Vikram Singh',
      submittedDate: '2025-04-10T09:45:00',
      status: 'in-progress',
    },
  ];
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link href="/dashboard/messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/courses/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">
                  +25 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{teacherCourses.length}</div>
                <p className="text-xs text-muted-foreground">
                  Across multiple categories
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviews to Grade</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingReviews.length}</div>
                <p className="text-xs text-muted-foreground">
                  Pending review
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{upcomingSessions.length}</div>
                <p className="text-xs text-muted-foreground">
                  Scheduled this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment</CardTitle>
                <CardDescription>Monthly enrollment over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={enrollmentData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="students" fill="hsl(var(--chart-1))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Course Engagement</CardTitle>
                <CardDescription>Student activity across your courses</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={engagementData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {engagementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest communications from your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 p-3 rounded-lg border border-border">
                    <img 
                      src={message.student.avatar} 
                      alt={message.student.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{message.student.name}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(message.timestamp)}</div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1">{message.course}</div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                    {!message.read && (
                      <Badge className="ml-2 mt-1">New</Badge>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/messages">View All Messages</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Live Sessions</CardTitle>
              <CardDescription>Your scheduled sessions with students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-border rounded-lg">
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
                      <div className="text-sm text-muted-foreground">{session.courseName}</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{session.duration}</Badge>
                        <Badge variant="secondary">{session.enrolledStudents} Students</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end md:w-2/6 gap-2">
                      <Button variant="outline">Prepare</Button>
                      <Button>
                        <Video className="h-4 w-4 mr-2" />
                        Start Session
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/dashboard/sessions">View All Sessions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Courses</h2>
            <Button asChild>
              <Link href="/dashboard/courses/create">
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-44">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title} 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                    <div className="flex justify-between text-white text-sm">
                      <span>{course.enrollments} Students</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{course.category}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{course.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="secondary" asChild>
                      <Link href={`/dashboard/courses/${course.id}`}>
                        Manage Course
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/courses/${course.slug}`}>
                        Preview
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Create new course card */}
            <Card className="border-dashed border-2 h-full flex flex-col items-center justify-center p-6">
              <div className="text-center">
                <div className="bg-muted w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-2">Create New Course</h3>
                <p className="text-muted-foreground mb-4">
                  Share your knowledge and expertise with students around the world.
                </p>
                <Button asChild>
                  <Link href="/dashboard/courses/create">
                    Get Started
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Student assignments waiting for your feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{review.title}</h3>
                        <Badge className="ml-2" variant={
                          review.status === 'pending' ? 'default' : 'secondary'
                        }>
                          {review.status === 'pending' ? 'Pending' : 'In Progress'}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{review.course}</div>
                      <div className="flex items-center text-sm mt-1">
                        <span>Submitted by: {review.submittedBy}</span>
                        <span className="mx-2">•</span>
                        <span>{formatDate(review.submittedDate)}</span>
                      </div>
                    </div>
                    <Button>Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Student Directory</CardTitle>
              <CardDescription>Manage and view all students enrolled in your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Student</th>
                      <th className="py-3 px-4 text-left font-medium">Email</th>
                      <th className="py-3 px-4 text-left font-medium">Courses</th>
                      <th className="py-3 px-4 text-left font-medium">Last Activity</th>
                      <th className="py-3 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(5)].map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <img 
                              src={`https://i.pravatar.cc/150?img=${20 + i}`} 
                              alt="Student" 
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>
                              {i === 0 ? 'Rahul Sharma' : 
                              i === 1 ? 'Priya Patel' : 
                              i === 2 ? 'Vikram Singh' :
                              i === 3 ? 'Ananya Gupta' :
                              'Arjun Mehta'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {i === 0 ? 'rahul.s@example.com' : 
                          i === 1 ? 'priya.p@example.com' : 
                          i === 2 ? 'vikram.s@example.com' :
                          i === 3 ? 'ananya.g@example.com' :
                          'arjun.m@example.com'}
                        </td>
                        <td className="py-3 px-4">
                          <Badge>{i === 4 ? 1 : i + 2}</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {i === 0 ? '2 hours ago' : 
                          i === 1 ? 'Yesterday' : 
                          i === 2 ? '3 days ago' :
                          i === 3 ? 'Last week' :
                          '2 weeks ago'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Message</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 432 students
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Activity</CardTitle>
                <CardDescription>Recent student engagement with your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 rounded-lg border border-border">
                      <img 
                        src={`https://i.pravatar.cc/150?img=${25 + i}`} 
                        alt="Student" 
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">
                            {i === 0 ? 'Rahul Sharma' : 
                            i === 1 ? 'Priya Patel' : 
                            i === 2 ? 'Vikram Singh' :
                            'Ananya Gupta'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i === 0 ? 'Completed Module 3 in Web Development' : 
                          i === 1 ? 'Submitted assignment in Data Science' : 
                          i === 2 ? 'Asked a question in JavaScript course' :
                          'Joined Advanced JavaScript Programming'}
                        </p>
                        <div className="text-xs text-muted-foreground mt-1">
                          {i === 0 ? '2 hours ago' : 
                          i === 1 ? 'Yesterday' : 
                          i === 2 ? '3 days ago' :
                          'Last week'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Average scores across your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { course: 'Web Dev', score: 85 },
                        { course: 'JavaScript', score: 78 },
                        { course: 'Data Science', score: 92 },
                        { course: 'Business', score: 88 },
                      ]}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="course" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="hsl(var(--chart-1))" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Live Sessions</h2>
            <Button asChild>
              <Link href="/dashboard/sessions/create">
                <Plus className="h-4 w-4 mr-2" />
                Schedule New Session
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled live classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {upcomingSessions.map((session) => (
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
                      <div className="text-sm text-muted-foreground">{session.courseName}</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">{session.duration}</Badge>
                        <Badge variant="secondary">{session.enrolledStudents} Students</Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end md:w-2/6 gap-2">
                      <Button variant="outline">Edit</Button>
                      <Button>
                        <Video className="h-4 w-4 mr-2" />
                        Host Session
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
              <CardDescription>Review your previous live classes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-border rounded-lg bg-muted/30">
                    <div className="bg-muted p-4 rounded-md text-center md:w-1/6">
                      <div className="text-2xl font-bold">
                        {10 - i}
                      </div>
                      <div className="text-muted-foreground">
                        Apr
                      </div>
                      <div className="text-sm mt-1">
                        {i === 0 ? '10:00 AM' : i === 1 ? '2:30 PM' : '4:00 PM'}
                      </div>
                    </div>
                    
                    <div className="md:w-3/6">
                      <h3 className="font-bold text-lg">
                        {i === 0 ? 'JavaScript Fundamentals' : 
                        i === 1 ? 'Python for Data Science' : 
                        'CSS Layouts Workshop'}
                      </h3>
                      <div className="text-sm text-muted-foreground">
                        {i === 0 ? 'Advanced JavaScript Programming' : 
                        i === 1 ? 'Data Science Masterclass' : 
                        'Introduction to Web Development'}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline">
                          {i === 0 ? '60 min' : i === 1 ? '90 min' : '45 min'}
                        </Badge>
                        <Badge variant="secondary">
                          {i === 0 ? '24' : i === 1 ? '18' : '32'} Attendees
                        </Badge>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                          Completed
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end md:w-2/6 gap-2">
                      <Button variant="outline">View Recording</Button>
                      <Button variant="secondary">
                        Analytics
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Session Templates</CardTitle>
              <CardDescription>Create reusable templates for your live sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Q&A Session</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Interactive session to answer student questions
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">60 min</Badge>
                    <Badge variant="secondary">All Courses</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Use Template</Button>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Project Review</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Review and provide feedback on student projects
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">90 min</Badge>
                    <Badge variant="secondary">Technical Courses</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Use Template</Button>
                </div>
                
                <div className="border border-dashed border-border rounded-lg p-4 flex items-center justify-center">
                  <div className="text-center">
                    <Plus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">Create Template</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Add a new session template
                    </p>
                    <Button variant="outline" size="sm">Create New</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Course Completion</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">72%</div>
                <p className="text-xs text-muted-foreground">
                  +4% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">
                  Based on 246 reviews
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,546</div>
                <p className="text-xs text-muted-foreground">
                  +$2,380 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quiz Performance</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">84%</div>
                <p className="text-xs text-muted-foreground">
                  Average success rate
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue from your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { month: 'Jan', revenue: 2100 },
                      { month: 'Feb', revenue: 1800 },
                      { month: 'Mar', revenue: 2400 },
                      { month: 'Apr', revenue: 2800 },
                      { month: 'May', revenue: 1900 },
                      { month: 'Jun', revenue: 2200 },
                      { month: 'Jul', revenue: 2600 },
                      { month: 'Aug', revenue: 2900 },
                      { month: 'Sep', revenue: 3100 },
                      { month: 'Oct', revenue: 2700 },
                      { month: 'Nov', revenue: 3300 },
                      { month: 'Dec', revenue: 3600 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Bar dataKey="revenue" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Popularity</CardTitle>
                <CardDescription>Student enrollment by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={teacherCourses.map(course => ({
                        name: course.title.length > 25 ? course.title.substring(0, 25) + '...' : course.title,
                        students: course.enrollments
                      }))}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={150} />
                      <Tooltip />
                      <Bar dataKey="students" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Student Feedback</CardTitle>
                <CardDescription>Recent reviews from your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <img 
                            src={`https://i.pravatar.cc/150?img=${30 + i}`}
                            alt="Student" 
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <div className="font-medium">
                              {i === 0 ? 'Rahul Sharma' : i === 1 ? 'Priya Patel' : 'Vikram Singh'}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {i === 0 ? 'Web Development' : i === 1 ? 'Data Science' : 'JavaScript'}
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j} 
                              className={`h-4 w-4 ${j < (i === 1 ? 4 : 5) ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        {i === 0 ? 
                          "Great course! The instructor explains complex concepts in a way that's easy to understand. I've learned so much and feel confident applying these skills." :
                        i === 1 ? 
                          "Very informative content, though some sections could be more in-depth. Overall I'm satisfied with what I learned and would recommend it." :
                          "This course exceeded my expectations. The practical examples were incredibly helpful, and the instructor was responsive to questions."
                        }
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Issue Reports</CardTitle>
              <CardDescription>Problems reported by students that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-full">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">
                          {i === 0 ? 'Video Playback Issue' : 'Missing Assignment Files'}
                        </h3>
                        <Badge variant="outline" className="text-destructive border-destructive/50">
                          {i === 0 ? 'High Priority' : 'Medium Priority'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground my-1">
                        {i === 0 ? 'Web Development' : 'Data Science'} • Reported by {i === 0 ? 'Rahul Sharma' : 'Priya Patel'}
                      </p>
                      <p className="text-sm">
                        {i === 0 ? 
                          'Videos in module 3, lecture 5 buffer continuously and won\'t play completely.' : 
                          'Assignment 2 files are missing from the resources section.'}
                      </p>
                    </div>
                    <Button>Resolve</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;