"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { User } from '@/data/api-interfaces';

// Define user types
export type UserRole = 'student' | 'teacher' | 'admin';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from an API
const MOCK_USERS = [
  {
    id: '1',
    name: 'Student User',
    email: 'student@example.com',
    password: 'password123',
    role: 'student' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Student+User&background=random',
    bio: 'A passionate student learning new skills',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Teacher User',
    email: 'teacher@example.com',
    password: 'password123',
    role: 'teacher' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Teacher+User&background=random',
    bio: 'Experienced teacher with a passion for education',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=random',
    bio: 'System administrator',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('vaikuntha_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('vaikuntha_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (would be handled by backend in real app)
      const newUser = {
        id: `${MOCK_USERS.length + 1}`,
        name,
        email,
        role: 'student' as UserRole,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`,
        bio: 'New user bio',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('vaikuntha_user', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome to Vaikuntha Institute, ${name}!`,
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('vaikuntha_user');
    toast({
      title: "Logged out successfully",
    });
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, setIsLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};