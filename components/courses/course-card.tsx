"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Calendar, Clock, BookOpen, Star, User, Users, GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Course } from '@/data/courses';
import Image from 'next/image';
import { RegisterDialog } from '@/components/auth/register-dialog';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: Course;
  showRegistration?: boolean;
  index?: number;
  className?: string;
  variant?: 'default' | 'compact';
}

const CourseCard = ({ course, showRegistration, index = 0, className, variant = 'default' }: CourseCardProps) => {
  const { 
    title, 
    slug, 
    instructor, 
    category, 
    level, 
    thumbnail, 
    price, 
    discountPrice, 
    duration,
    startDate,
    status,
    lectures, 
    rating,
    enrollments,
    registrationOpen
  } = course;

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [showRegisterDialog, setShowRegisterDialog] = useState(false);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      }
    }
  };

  // Calculate discounted price (50% off)
  const finalPrice = Math.round(price * 0.5);

  return (
    <>
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={cn("h-full", className)}
      >
        <Card className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-xl h-full flex flex-col group",
          "border border-border/50 bg-gradient-to-b from-background to-background/95",
          "backdrop-blur-sm",
          {
            "hover:shadow-primary/10": variant === 'default',
            "hover:shadow-none": variant === 'compact'
          }
        )}>
          {/* Image Container with Overlay */}
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 backdrop-blur-sm text-white border-none">
                {category}
              </Badge>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-black border-none">
                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                {rating.toFixed(1)}
              </Badge>
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="flex-grow p-6 space-y-6">
            {/* Title and Instructor */}
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold line-clamp-2 min-h-[3.5rem] tracking-tight">
                {title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground/90">
                {instructor.name} at {instructor.company}
              </CardDescription>
            </div>

            {/* Course Stats */}
            <div className="grid grid-cols-3 gap-4 py-2">
              <div className="flex flex-col items-center space-y-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-center">{duration}</span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-center">
                  {(enrollments ?? 0).toLocaleString()}+
                </span>
              </div>
              <div className="flex flex-col items-center space-y-1.5">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-center">{level}</span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  {level}
                </Badge>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">₹{finalPrice.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground line-through">₹{price.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Card Footer with CTA */}
          <CardFooter className="p-6 pt-0 border-t border-border/50 mt-auto">
            <Button 
              className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-colors"
              disabled={!registrationOpen}
              asChild
            >
              <Link href={`/courses/${slug}/register`}>
                {registrationOpen ? (
                  <>
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                ) : 'Registration Closed'}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <RegisterDialog 
        open={showRegisterDialog} 
        onOpenChange={setShowRegisterDialog} 
      />
    </>
  );
};

export default CourseCard;