"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, GraduationCap, Globe, Heart, Zap } from 'lucide-react';

const jobListings = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build the next generation of our learning platform.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong understanding of modern web technologies',
      'Experience with Next.js and server-side rendering',
      'Excellent problem-solving skills',
    ],
  },
  {
    id: 2,
    title: 'Content Creator',
    department: 'Education',
    location: 'Remote',
    type: 'Full-time',
    description: 'Join our education team to create engaging and informative content for our courses and learning materials.',
    requirements: [
      '3+ years of experience in content creation',
      'Strong writing and communication skills',
      'Experience with educational content',
      'Knowledge of instructional design principles',
    ],
  },
  {
    id: 3,
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Help shape the user experience and interface of our learning platform with your creative vision.',
    requirements: [
      '4+ years of UX/UI design experience',
      'Strong portfolio showcasing web and mobile designs',
      'Experience with Figma and design systems',
      'Understanding of user-centered design principles',
    ],
  },
];

const benefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Collaborative Environment',
    description: 'Work with talented individuals in a supportive and inclusive environment.',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Learning & Development',
    description: 'Access to all our courses and continuous learning opportunities.',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Remote Work',
    description: 'Flexible work arrangements with remote options available.',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Health & Wellness',
    description: 'Comprehensive health coverage and wellness programs.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Growth Opportunities',
    description: 'Clear career paths and opportunities for advancement.',
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground">
              Be part of our mission to transform education and empower learners worldwide.
              We're always looking for talented individuals to join our growing team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold">{benefit.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="secondary">{job.location}</Badge>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                      </div>
                      <Button className="md:ml-4">Apply Now</Button>
                    </div>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
                <p className="text-lg mb-8">
                  We're always looking for talented individuals to join our team.
                  Send us your resume and we'll keep you in mind for future opportunities.
                </p>
                <Button variant="secondary" size="lg">
                  Submit Your Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 