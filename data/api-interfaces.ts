// API Interface Types for the Vaikuntha Institute Backend

// User Related Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'teacher' | 'admin';
}

export interface UserUpdateDTO {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Course Related Types
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  instructorId: string;
  instructor: User;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lectures: number;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  enrollments: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface CourseCreateDTO {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  featured?: boolean;
}

export interface CourseUpdateDTO extends Partial<CourseCreateDTO> {
  status?: 'draft' | 'published' | 'archived';
}

// Section and Lecture Types
export interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lectures: Lecture[];
}

export interface Lecture {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  type: 'video' | 'quiz' | 'assignment' | 'text';
  content: string; // URL for video, text content, or quiz/assignment ID
  duration?: string; // for videos
  preview: boolean;
  order: number;
}

export interface SectionCreateDTO {
  courseId: string;
  title: string;
  order?: number;
}

export interface LectureCreateDTO {
  sectionId: string;
  title: string;
  description?: string;
  type: 'video' | 'quiz' | 'assignment' | 'text';
  content: string;
  duration?: string;
  preview?: boolean;
  order?: number;
}

// Enrollment Related Types
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  completionDate?: string;
  progress: number; // percentage
  status: 'active' | 'completed' | 'refunded';
}

export interface EnrollmentCreateDTO {
  userId: string;
  courseId: string;
}

// Quiz Related Types
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  lectureId?: string;
  timeLimit?: number; // in minutes
  passScore: number; // percentage
  attempts: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'matching';
  options: QuizOption[];
  correctOptionId: string;
  points: number;
}

export interface QuizOption {
  id: string;
  questionId: string;
  text: string;
}

export interface QuizSubmission {
  id: string;
  quizId: string;
  userId: string;
  answers: {
    questionId: string;
    selectedOptionId: string;
  }[];
  score: number;
  passed: boolean;
  timeSpent: number; // in seconds
  submittedAt: string;
}

// Assignment Related Types
export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  lectureId?: string;
  dueDate?: string;
  points: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  userId: string;
  content: string;
  fileUrl?: string;
  grade?: number;
  feedback?: string;
  submittedAt: string;
  gradedAt?: string;
}

// Review Related Types
export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewCreateDTO {
  courseId: string;
  rating: number;
  comment?: string;
}

// Payment Related Types
export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

// Live Session Related Types
export interface LiveSession {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  instructorId: string;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  maxParticipants?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LiveSessionCreateDTO {
  title: string;
  description?: string;
  courseId: string;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  maxParticipants?: number;
}

// Notification Related Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  link?: string;
  createdAt: string;
}

// Support Ticket Related Types
export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'content' | 'account' | 'other';
  assignedToId?: string;
  createdAt: string;
  updatedAt: string;
  responses: TicketResponse[];
}

export interface TicketResponse {
  id: string;
  ticketId: string;
  userId: string;
  message: string;
  createdAt: string;
}

export interface SupportTicketCreateDTO {
  subject: string;
  message: string;
  category: 'technical' | 'billing' | 'content' | 'account' | 'other';
  priority?: 'low' | 'medium' | 'high';
}

// Certificate Related Types
export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issueDate: string;
  certificateUrl: string;
  verificationCode: string;
}

// API Pagination Response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}