"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import DashboardLoading from '@/components/dashboard/dashboard-loading';
import StudentDashboard from '@/components/dashboard/student-dashboard';
import TeacherDashboard from '@/components/dashboard/teacher-dashboard';
import AdminDashboard from '@/components/dashboard/admin-dashboard';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (!user) {
    return null; // Will redirect due to the useEffect
  }

  // Render different dashboards based on user role
  switch (user.role) {
    case 'student':
      return <StudentDashboard user={user} />;
    case 'teacher':
      return <TeacherDashboard user={user} />;
    case 'admin':
      return <AdminDashboard user={user} />;
    default:
      return <StudentDashboard user={user} />;
  }
}