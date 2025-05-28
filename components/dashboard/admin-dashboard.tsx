"use client";

import Link from 'next/link';
import { User } from '@/contexts/auth-context';
import { 
  Users,
  BookOpen,
  DollarSign,
  BarChart,
  Plus,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Trash,
  Edit,
  ArrowUpRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Legend
} from 'recharts';
import { popularCourses } from '@/data/courses';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard = ({ user }: AdminDashboardProps) => {
  // Mock platform stats
  const platformStats = {
    totalUsers: 5482,
    totalCourses: 145,
    totalRevenue: 245780,
    activeEnrollments: 12456,
  };
  
  // Mock course approval requests
  const pendingApprovals = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      instructor: {
        name: 'Dr. Rajesh Iyer',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Technology',
      lectures: 42,
      duration: '35 hours',
      submittedDate: '2025-04-12T10:30:00',
      status: 'pending',
    },
    {
      id: '2',
      title: 'Advanced Digital Marketing',
      instructor: {
        name: 'Priya Singh',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Marketing',
      lectures: 38,
      duration: '28 hours',
      submittedDate: '2025-04-10T14:15:00',
      status: 'pending',
    },
    {
      id: '3',
      title: 'Financial Planning & Analysis',
      instructor: {
        name: 'Vikram Mehta',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Business',
      lectures: 45,
      duration: '32 hours',
      submittedDate: '2025-04-08T09:45:00',
      status: 'in-review',
    },
  ];
  
  // Mock revenue data for chart
  const revenueData = [
    { month: 'Jan', revenue: 18500 },
    { month: 'Feb', revenue: 16800 },
    { month: 'Mar', revenue: 21400 },
    { month: 'Apr', revenue: 24800 },
    { month: 'May', revenue: 19900 },
    { month: 'Jun', revenue: 22200 },
    { month: 'Jul', revenue: 26000 },
    { month: 'Aug', revenue: 29900 },
    { month: 'Sep', revenue: 31000 },
    { month: 'Oct', revenue: 27000 },
    { month: 'Nov', revenue: 33000 },
    { month: 'Dec', revenue: 36000 },
  ];
  
  // Mock enrollment data for chart
  const enrollmentData = [
    { month: 'Jan', count: 450 },
    { month: 'Feb', count: 520 },
    { month: 'Mar', count: 780 },
    { month: 'Apr', count: 1100 },
    { month: 'May', count: 950 },
    { month: 'Jun', count: 1200 },
  ];
  
  // Mock support tickets
  const supportTickets = [
    {
      id: '1',
      subject: 'Payment Failed',
      user: {
        name: 'Rahul Sharma',
        email: 'rahul.s@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Billing',
      priority: 'high',
      status: 'open',
      createdAt: '2025-04-13T09:15:00',
    },
    {
      id: '2',
      subject: 'Course Access Issue',
      user: {
        name: 'Priya Patel',
        email: 'priya.p@example.com',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Technical',
      priority: 'medium',
      status: 'open',
      createdAt: '2025-04-12T14:30:00',
    },
    {
      id: '3',
      subject: 'Refund Request',
      user: {
        name: 'Vikram Singh',
        email: 'vikram.s@example.com',
        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Billing',
      priority: 'high',
      status: 'in-progress',
      createdAt: '2025-04-11T11:45:00',
    },
    {
      id: '4',
      subject: 'Video Playback Error',
      user: {
        name: 'Ananya Gupta',
        email: 'ananya.g@example.com',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      category: 'Technical',
      priority: 'medium',
      status: 'open',
      createdAt: '2025-04-10T16:20:00',
    },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${formatNumber(amount)}`;
  };
  
  // Get priority badge for support tickets
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  // Get status badge for support tickets
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 border-orange-200 dark:border-orange-800">Open</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">Resolved</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>
        <div className="mt-4 md:mt-0 space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/settings">
              Platform Settings
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/users/create">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Platform Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(platformStats.totalUsers)}</div>
                <p className="text-xs text-muted-foreground">
                  +120 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(platformStats.totalCourses)}</div>
                <p className="text-xs text-muted-foreground">
                  +8 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(platformStats.totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  +$12,546 from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatNumber(platformStats.activeEnrollments)}</div>
                <p className="text-xs text-muted-foreground">
                  +342 from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the current year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
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

          {/* Course Approvals + Enrollment Trend */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Course Approval Requests</CardTitle>
                <CardDescription>Pending course submissions that need review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((course) => (
                    <div key={course.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold">{course.title}</h3>
                          <Badge variant={
                            course.status === 'pending' ? 'secondary' : 'outline'
                          }>
                            {course.status === 'pending' ? 'Pending' : 'In Review'}
                          </Badge>
                        </div>
                        <div className="flex items-center text-sm mt-1">
                          <img 
                            src={course.instructor.avatar} 
                            alt={course.instructor.name} 
                            className="w-5 h-5 rounded-full mr-2"
                          />
                          <span>{course.instructor.name}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                          <div>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span>{course.lectures} lectures</span>
                            <span>•</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/admin/courses/approvals">
                      View All Approval Requests
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Trend</CardTitle>
                <CardDescription>Course enrollments over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
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
                      <Line 
                        type="monotone" 
                        dataKey="count" 
                        stroke="hsl(var(--chart-2))" 
                        strokeWidth={2} 
                        activeDot={{ r: 8 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Support Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Support Tickets</CardTitle>
              <CardDescription>Latest user inquiries that need attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTickets.slice(0, 3).map((ticket) => (
                  <div key={ticket.id} className="flex items-start space-x-4 p-4 border border-border rounded-lg">
                    <img 
                      src={ticket.user.avatar} 
                      alt={ticket.user.name} 
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{ticket.subject}</h3>
                        <div className="flex space-x-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {ticket.user.name} • {ticket.user.email}
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <Badge variant="outline">{ticket.category}</Badge>
                        <div className="text-muted-foreground">
                          {formatDate(ticket.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#support" onClick={() => document.querySelector('[data-value="support"]')?.click()}>
                    View All Support Tickets
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-8">
          {/* Course Management Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 w-full md:w-80"
                  placeholder="Search courses..." 
                  type="search"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                  <SelectItem value="health">Health & Wellness</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              
              <Button asChild>
                <Link href="/admin/courses/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Course Table */}
          <Card>
            <CardHeader>
              <CardTitle>Course Management</CardTitle>
              <CardDescription>Manage all courses on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <img 
                              src={course.instructor.avatar} 
                              alt={course.instructor.name} 
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{course.instructor.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{course.category}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                            Published
                          </Badge>
                        </TableCell>
                        <TableCell>{formatNumber(course.enrollments)}</TableCell>
                        <TableCell>
                          {course.discountPrice ? (
                            <div className="flex flex-col">
                              <span className="font-medium">${course.discountPrice}</span>
                              <span className="text-xs text-muted-foreground line-through">${course.price}</span>
                            </div>
                          ) : (
                            <span className="font-medium">${course.price}</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <span className="sr-only">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal">
                                  <circle cx="12" cy="12" r="1"/>
                                  <circle cx="19" cy="12" r="1"/>
                                  <circle cx="5" cy="12" r="1"/>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ArrowUpRight className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 9 of 145 courses
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Course Approval Management */}
          <Card>
            <CardHeader>
              <CardTitle>Course Approval Queue</CardTitle>
              <CardDescription>Review and approve new course submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((course) => (
                  <div key={course.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 border border-border rounded-lg">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{course.title}</h3>
                        <Badge variant={
                          course.status === 'pending' ? 'secondary' : 'outline'
                        }>
                          {course.status === 'pending' ? 'Pending Review' : 'In Review'}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm mt-1">
                        <img 
                          src={course.instructor.avatar} 
                          alt={course.instructor.name} 
                          className="w-5 h-5 rounded-full mr-2"
                        />
                        <span>{course.instructor.name}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">{course.category}</Badge>
                          <span>{course.lectures} lectures</span>
                          <span>{course.duration}</span>
                        </div>
                        <div>
                          Submitted: {formatDate(course.submittedDate)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline">Preview</Button>
                      <Button variant="destructive">Reject</Button>
                      <Button>Approve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Course Categories Management */}
          <Card>
            <CardHeader>
              <CardTitle>Course Categories</CardTitle>
              <CardDescription>Manage course categories and subcategories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Subcategories</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Technology', courses: 45, subcategories: 8, status: 'active' },
                      { name: 'Business', courses: 32, subcategories: 6, status: 'active' },
                      { name: 'Marketing', courses: 28, subcategories: 5, status: 'active' },
                      { name: 'Science', courses: 20, subcategories: 7, status: 'active' },
                      { name: 'Arts & Humanities', courses: 15, subcategories: 4, status: 'active' },
                      { name: 'Health & Wellness', courses: 12, subcategories: 3, status: 'active' },
                    ].map((category, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.courses}</TableCell>
                        <TableCell>{category.subcategories}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800">
                            Active
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-8">
          {/* User Management Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 w-full md:w-80"
                  placeholder="Search users..." 
                  type="search"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="student">Students</SelectItem>
                  <SelectItem value="teacher">Teachers</SelectItem>
                  <SelectItem value="admin">Admins</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              
              <Button asChild>
                <Link href="/admin/users/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Link>
              </Button>
            </div>
          </div>
          
          {/* User Table */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all users on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { 
                        name: 'Rahul Sharma', 
                        email: 'rahul.s@example.com', 
                        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        role: 'student',
                        status: 'active',
                        joinedDate: '2024-12-10',
                      },
                      { 
                        name: 'Priya Patel', 
                        email: 'priya.p@example.com',
                        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        role: 'student',
                        status: 'active',
                        joinedDate: '2025-01-15',
                      },
                      { 
                        name: 'Aditya Kumar', 
                        email: 'aditya.k@example.com',
                        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        role: 'teacher',
                        status: 'active',
                        joinedDate: '2024-10-05',
                      },
                      { 
                        name: 'Neha Sharma', 
                        email: 'neha.s@example.com',
                        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        role: 'teacher',
                        status: 'active',
                        joinedDate: '2024-11-20',
                      },
                      { 
                        name: 'Vikram Singh', 
                        email: 'vikram.s@example.com',
                        avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        role: 'student',
                        status: 'suspended',
                        joinedDate: '2025-02-08',
                      },
                      { 
                        name: 'Sanjay Mehta', 
                        email: 'sanjay.m@example.com',
                        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                        role: 'admin',
                        status: 'active',
                        joinedDate: '2024-09-15',
                      },
                    ].map((user, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <div className="flex items-center">
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={
                            user.role === 'admin' ? 'default' : 
                            user.role === 'teacher' ? 'secondary' : 
                            'outline'
                          }>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            user.status === 'active' ? 
                            'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800' : 
                            'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800'
                          }>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {new Date(user.joinedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <span className="sr-only">Open menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-more-horizontal">
                                  <circle cx="12" cy="12" r="1"/>
                                  <circle cx="19" cy="12" r="1"/>
                                  <circle cx="5" cy="12" r="1"/>
                                </svg>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ArrowUpRight className="h-4 w-4 mr-2" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === 'active' ? (
                                <DropdownMenuItem>
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Reactivate
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 6 of 5,482 users
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* User Registration Stats */}
          <Card>
            <CardHeader>
              <CardTitle>User Registration Trend</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', students: 120, teachers: 15 },
                      { month: 'Feb', students: 145, teachers: 12 },
                      { month: 'Mar', students: 168, teachers: 18 },
                      { month: 'Apr', students: 210, teachers: 22 },
                      { month: 'May', students: 185, teachers: 16 },
                      { month: 'Jun', students: 195, teachers: 20 },
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
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="students" 
                      name="Students"
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="teachers" 
                      name="Teachers"
                      stroke="hsl(var(--chart-2))" 
                      strokeWidth={2} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Role Management */}
          <Card>
            <CardHeader>
              <CardTitle>Role Management</CardTitle>
              <CardDescription>Manage user roles and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { 
                        name: 'Admin', 
                        users: 8, 
                        description: 'Full system access and management',
                        permissions: 'All permissions',
                      },
                      { 
                        name: 'Teacher', 
                        users: 120, 
                        description: 'Course creation and student management',
                        permissions: '18 permissions',
                      },
                      { 
                        name: 'Student', 
                        users: 5354, 
                        description: 'Course enrollment and learning',
                        permissions: '8 permissions',
                      },
                    ].map((role, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{role.name}</TableCell>
                        <TableCell>{role.users}</TableCell>
                        <TableCell>{role.description}</TableCell>
                        <TableCell>{role.permissions}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-8">
          {/* Revenue Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Report</CardTitle>
              <CardDescription>Financial performance of the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Total Revenue</div>
                  <div className="text-3xl font-bold mt-1">{formatCurrency(platformStats.totalRevenue)}</div>
                  <div className="text-sm text-green-600 mt-1">+15.8% from last year</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Monthly Revenue</div>
                  <div className="text-3xl font-bold mt-1">{formatCurrency(36000)}</div>
                  <div className="text-sm text-green-600 mt-1">+8.4% from last month</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Average Course Price</div>
                  <div className="text-3xl font-bold mt-1">{formatCurrency(59.99)}</div>
                  <div className="text-sm text-red-600 mt-1">-2.1% from last month</div>
                </div>
              </div>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
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
              
              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Course Performance Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Course Performance</CardTitle>
              <CardDescription>Enrollment and completion metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Total Enrollments</div>
                  <div className="text-3xl font-bold mt-1">{formatNumber(platformStats.activeEnrollments)}</div>
                  <div className="text-sm text-green-600 mt-1">+342 from last month</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Completion Rate</div>
                  <div className="text-3xl font-bold mt-1">68%</div>
                  <div className="text-sm text-green-600 mt-1">+3% from last month</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Average Rating</div>
                  <div className="text-3xl font-bold mt-1">4.7</div>
                  <div className="text-sm text-green-600 mt-1">+0.2 from last month</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Active Students</div>
                  <div className="text-3xl font-bold mt-1">{formatNumber(3245)}</div>
                  <div className="text-sm text-green-600 mt-1">+125 from last month</div>
                </div>
              </div>
              
              <div className="rounded-md border mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Average Rating</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularCourses.slice(0, 5).map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{formatNumber(course.enrollments)}</TableCell>
                        <TableCell>
                          {Math.round(Math.random() * 30 + 50)}%
                        </TableCell>
                        <TableCell>{course.rating.toFixed(1)}</TableCell>
                        <TableCell>
                          {formatCurrency(course.enrollments * (course.discountPrice || course.price))}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" className="mr-2">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* User Activity Reports */}
          <Card>
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Platform usage and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Activity by Role</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Students', value: 82 },
                            { name: 'Teachers', value: 15 },
                            { name: 'Admins', value: 3 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            'hsl(var(--chart-1))',
                            'hsl(var(--chart-2))',
                            'hsl(var(--chart-3))',
                          ].map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Daily Active Users</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { day: 'Mon', users: 1245 },
                          { day: 'Tue', users: 1345 },
                          { day: 'Wed', users: 1432 },
                          { day: 'Thu', users: 1521 },
                          { day: 'Fri', users: 1345 },
                          { day: 'Sat', users: 980 },
                          { day: 'Sun', users: 875 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="users" 
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-3 mt-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Avg. Session Duration</div>
                  <div className="text-3xl font-bold mt-1">24m 32s</div>
                  <div className="text-sm text-green-600 mt-1">+1m 15s from last month</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Video Watch Time</div>
                  <div className="text-3xl font-bold mt-1">186,432 hrs</div>
                  <div className="text-sm text-green-600 mt-1">+12% from last month</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Quiz Completion</div>
                  <div className="text-3xl font-bold mt-1">78%</div>
                  <div className="text-sm text-green-600 mt-1">+4% from last month</div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2">
                  <FileCheck className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
                <Button>
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Detailed Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-8">
          {/* Support Ticket Management */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 w-full md:w-80"
                  placeholder="Search tickets..." 
                  type="search"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Manage and respond to user inquiries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {supportTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">#{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <img 
                              src={ticket.user.avatar} 
                              alt={ticket.user.name} 
                              className="w-6 h-6 rounded-full mr-2"
                            />
                            <span>{ticket.user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(ticket.status)}
                        </TableCell>
                        <TableCell>
                          {getPriorityBadge(ticket.priority)}
                        </TableCell>
                        <TableCell>
                          {formatDate(ticket.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-muted-foreground">
                  Showing 4 of 128 tickets
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Support Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Support Analytics</CardTitle>
              <CardDescription>Key metrics for the support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Open Tickets</div>
                  <div className="text-3xl font-bold mt-1">28</div>
                  <div className="text-sm text-red-600 mt-1">+5 from last week</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Average Response Time</div>
                  <div className="text-3xl font-bold mt-1">4.2h</div>
                  <div className="text-sm text-green-600 mt-1">-0.8h from last week</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">Resolution Rate</div>
                  <div className="text-3xl font-bold mt-1">92%</div>
                  <div className="text-sm text-green-600 mt-1">+3% from last week</div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-muted-foreground text-sm">User Satisfaction</div>
                  <div className="text-3xl font-bold mt-1">4.8/5</div>
                  <div className="text-sm text-green-600 mt-1">+0.2 from last week</div>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-4">Tickets by Category</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Technical', value: 45 },
                            { name: 'Billing', value: 30 },
                            { name: 'Content', value: 15 },
                            { name: 'Account', value: 10 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[
                            'hsl(var(--chart-1))',
                            'hsl(var(--chart-2))',
                            'hsl(var(--chart-3))',
                            'hsl(var(--chart-4))',
                          ].map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Tickets Over Time</h3>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { week: 'Week 1', tickets: 42 },
                          { week: 'Week 2', tickets: 38 },
                          { week: 'Week 3', tickets: 45 },
                          { week: 'Week 4', tickets: 32 },
                          { week: 'Week 5', tickets: 28 },
                          { week: 'Week 6', tickets: 35 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="tickets" 
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Common Issues & FAQs */}
          <Card>
            <CardHeader>
              <CardTitle>Common Issues & Knowledge Base</CardTitle>
              <CardDescription>Frequently reported issues and their solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Top Issues This Week</h3>
                  <ul className="space-y-3">
                    {[
                      "Payment processing failures during checkout",
                      "Video streaming buffering on specific courses",
                      "Certificate generation delays after course completion",
                      "Mobile app login issues after recent update",
                      "Quiz submission errors in certain browsers",
                    ].map((issue, i) => (
                      <li key={i} className="flex items-start space-x-2 p-3 border border-border rounded-md">
                        <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                        <div>
                          <div className="font-medium">{issue}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {Math.round(Math.random() * 10 + 5)} reports this week
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Knowledge Base Updates</h3>
                  <ul className="space-y-3">
                    {[
                      {
                        title: "How to troubleshoot video playback issues",
                        date: "Updated 2 days ago",
                      },
                      {
                        title: "Guide to course completion certificates",
                        date: "Updated 1 week ago",
                      },
                      {
                        title: "Payment methods and billing FAQ",
                        date: "Updated 2 weeks ago",
                      },
                      {
                        title: "Mobile app troubleshooting guide",
                        date: "Updated 3 weeks ago",
                      },
                      {
                        title: "Browser compatibility requirements",
                        date: "Updated 1 month ago",
                      },
                    ].map((article, i) => (
                      <li key={i} className="flex items-start space-x-2 p-3 border border-border rounded-md">
                        <FileCheck className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">{article.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {article.date}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button variant="outline" className="mr-2">
                  Create FAQ Article
                </Button>
                <Button>
                  Update Knowledge Base
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;