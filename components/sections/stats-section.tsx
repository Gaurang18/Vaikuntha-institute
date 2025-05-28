import { motion } from 'framer-motion';
import { AnimatedCard } from '@/components/ui/animated-card';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';

const stats = [
  {
    title: 'Total Students',
    value: 5000,
    icon: <Users className="h-8 w-8 text-primary" />,
    trend: { value: 12, label: 'from last month' },
    description: 'Learners who have joined our platform',
  },
  {
    title: 'Courses',
    value: 50,
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    trend: { value: 8, label: 'new this month' },
    description: 'Expert-led professional courses',
  },
  {
    title: 'Success Rate',
    value: 98,
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    trend: { value: 2, label: 'from last month' },
    description: 'Course completion & placement rate (%)',
    suffix: '%',
  },
  {
    title: 'Certifications',
    value: 2500,
    icon: <Award className="h-8 w-8 text-primary" />,
    trend: { value: 15, label: 'from last month' },
    description: 'Industry-recognized certificates awarded',
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are proud to have made a difference in the lives of thousands of learners and professionals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {stats.map((stat, i) => (
            <AnimatedCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
              description={stat.description}
              suffix={stat.suffix}
              delay={i * 0.15}
              className="items-center text-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
} 