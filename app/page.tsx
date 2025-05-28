"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookOpen, Video, Users, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TestimonialCard from '@/components/home/testimonial-card';
import { FeatureCard } from '@/components/home/feature-card';
import CourseCard from '@/components/courses/course-card';
import FacultySlider from '@/components/home/faculty-slider';
import CertificateCourses from '@/components/home/certificate-courses';
import { getOngoingCourses, getUpcomingCourses } from '@/data/courses';
import CountUp from 'react-countup';
import { StatsSection } from '@/components/sections/stats-section';

export default function Home() {
  const ongoingCourses = getOngoingCourses();
  const upcomingCourses = getUpcomingCourses();

  // Initialize slider functionality
  const initializeSlider = () => {
    if (typeof window !== 'undefined') {
      const sliders = ['ongoing', 'upcoming'].map(type => ({
        container: document.getElementById(`${type}-slider`),
        prevBtn: document.getElementById(`${type}-prev`),
        nextBtn: document.getElementById(`${type}-next`),
        position: 0,
        itemWidth: 0,
      }));

      sliders.forEach(slider => {
        if (slider.container && slider.prevBtn && slider.nextBtn) {
          const itemWidth = slider.container.firstElementChild?.clientWidth || 0;
          slider.itemWidth = itemWidth + 24; // Including gap

          slider.prevBtn.addEventListener('click', () => {
            if (slider.position > 0) {
              slider.position--;
              slider.container.style.transform = `translateX(-${slider.position * slider.itemWidth}px)`;
            }
          });

          slider.nextBtn.addEventListener('click', () => {
            const maxPosition = Math.ceil(slider.container.children.length / 3) - 1;
            if (slider.position < maxPosition) {
              slider.position++;
              slider.container.style.transform = `translateX(-${slider.position * slider.itemWidth}px)`;
            }
          });
        }
      });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transform Your Career with Expert-Led Courses
              </motion.h1>
              <motion.p 
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join industry-leading professionals and master the skills that define the future of technology and business.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button size="lg" asChild>
                  <Link href="/courses">Browse Courses</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
              <motion.div 
                className="flex items-center gap-6 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">
                    <CountUp end={15} duration={2} />+
                  </span>
                  <span className="text-muted-foreground">Expert Instructors</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">
                    <CountUp end={50} duration={2} />+
                  </span>
                  <span className="text-muted-foreground">Professional Courses</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold">
                    <CountUp end={5000} duration={2.5} separator="," />+
                  </span>
                  <span className="text-muted-foreground">Successful Alumni</span>
                </div>
              </motion.div>
            </div>
            <div className="relative">
              <motion.div 
                className="relative z-10 rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
              >
                <img 
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Professional training" 
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 w-full h-full bg-primary/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <FacultySlider />

      {/* Certificate Courses */}
      <CertificateCourses />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Our Courses?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience world-class education designed to accelerate your professional growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={BookOpen}
              title="Industry-Led Curriculum"
              description="Courses designed and taught by experienced professionals"
            />
            <FeatureCard 
              icon={Video}
              title="Live Interactive Sessions"
              description="Real-time learning with industry experts"
            />
            <FeatureCard 
              icon={Users}
              title="Networking Opportunities"
              description="Connect with industry leaders and peers"
            />
            <FeatureCard 
              icon={Award}
              title="Professional Certification"
              description="Industry-recognized certificates upon completion"
            />
          </div>
        </div>
      </section>

      {/* Ongoing Courses Section */}
      <section className="py-20 bg-muted/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Ongoing Courses</h2>
              <p className="text-muted-foreground mt-2">Currently running courses</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Button variant="outline" size="icon" id="ongoing-prev" className="shrink-0">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="overflow-hidden">
              <div className="flex gap-6 transition-transform duration-300 ease-in-out" id="ongoing-slider">
                {ongoingCourses.map((course, index) => (
                  <div key={course.id} className="w-[calc(33.333%-1rem)] flex-none">
                    <CourseCard course={course} index={index} />
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="icon" id="ongoing-next" className="shrink-0">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Courses Section */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Upcoming Courses</h2>
              <p className="text-muted-foreground mt-2">Register for our next batch of courses</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Button variant="outline" size="icon" id="upcoming-prev" className="shrink-0">
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <div className="overflow-hidden">
              <div className="flex gap-6 transition-transform duration-300 ease-in-out" id="upcoming-slider">
                {upcomingCourses.map((course, index) => (
                  <div key={course.id} className="w-[calc(33.333%-1rem)] flex-none">
                    <CourseCard course={course} showRegistration index={index} />
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="icon" id="upcoming-next" className="shrink-0">
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our alumni about their transformative learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rajesh Kumar"
              role="Senior Software Engineer at Google"
              image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              testimonial="The advanced programming course helped me transition from a junior developer to a senior role at Google. The practical projects and mentorship were invaluable."
              rating={5}
            />
            <TestimonialCard 
              name="Priya Sharma"
              role="Data Science Lead at Microsoft"
              image="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              testimonial="The data science program provided me with cutting-edge skills and real-world experience. The instructors' industry expertise made all the difference."
              rating={5}
            />
            <TestimonialCard 
              name="Amit Patel"
              role="Product Manager at Amazon"
              image="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              testimonial="The product management course gave me the strategic and technical knowledge needed to lead successful product teams at Amazon."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Advance Your Career?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join our upcoming courses and learn from industry experts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/courses">View Courses</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}