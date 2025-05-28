'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer, hoverScale } from '@/lib/animations';

interface Faculty {
  name: string;
  position: string;
  institution: {
    name: string;
    logo: string;
  };
}

const faculty: Faculty[] = [
  {
    name: "Dr. Sarah Chen",
    position: "Associate Professor",
    institution: {
      name: "National University of Singapore",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/NUS_coat_of_arms.svg/1200px-NUS_coat_of_arms.svg.png"
    }
  },
  {
    name: "Prof. James Wilson",
    position: "Professor",
    institution: {
      name: "Carnegie Mellon University",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Carnegie_Mellon_University_seal.svg/1200px-Carnegie_Mellon_University_seal.svg.png"
    }
  },
  {
    name: "Dr. Rajesh Kumar",
    position: "Professor",
    institution: {
      name: "BITS Pilani",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png"
    }
  },
  {
    name: "Dr. Lisa Thompson",
    position: "Associate Professor",
    institution: {
      name: "University of Minnesota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/University_of_Minnesota_Logo.svg/2560px-University_of_Minnesota_Logo.svg.png"
    }
  },
  {
    name: "Prof. Michael Chang",
    position: "Professor",
    institution: {
      name: "MIT",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/2560px-MIT_logo.svg.png"
    }
  },
  {
    name: "Dr. Priya Sharma",
    position: "Associate Professor",
    institution: {
      name: "IIT Jodhpur",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/IIT_Jodhpur_Logo.svg/1200px-IIT_Jodhpur_Logo.svg.png"
    }
  },
  {
    name: "Prof. David Lee",
    position: "Professor",
    institution: {
      name: "University of Chicago",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/University_of_Chicago_shield.svg/1200px-University_of_Chicago_shield.svg.png"
    }
  },
  {
    name: "Dr. Tan Wei Ming",
    position: "Associate Professor",
    institution: {
      name: "Nanyang Technological University",
      logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Nanyang_Technological_University_coat_of_arms_vector.svg/1200px-Nanyang_Technological_University_coat_of_arms_vector.svg.png"
    }
  }
];

const FacultySlider = () => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();

  // Create a duplicated array for seamless infinite scroll
  const duplicatedFaculty = [...faculty, ...faculty];

  useEffect(() => {
    let animationFrameId: number;
    let lastTimestamp: number;
    const scrollSpeed = 0.5; // pixels per millisecond

    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const elapsed = timestamp - lastTimestamp;

      if (!isHovered && scrollRef.current) {
        setScrollPosition(prev => {
          const newPosition = prev + scrollSpeed * elapsed;
          // Reset position when we've scrolled the width of one set of cards
          if (newPosition >= scrollRef.current!.scrollWidth / 2) {
            return 0;
          }
          return newPosition;
        });
      }

      lastTimestamp = timestamp;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <motion.section 
      className="py-20 bg-gradient-to-b from-muted/30 to-background overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            World-Class Faculty
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from distinguished professors and industry experts from top institutions worldwide
          </p>
        </motion.div>

        <div 
          ref={scrollRef}
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className="flex gap-8 transition-transform duration-1000 ease-linear"
            style={{ transform: `translateX(-${scrollPosition}px)` }}
          >
            {duplicatedFaculty.map((member, index) => (
              <motion.div
                key={`${member.name}-${index}`}
                variants={fadeInUp}
                whileHover="hover"
                initial="initial"
                animate="animate"
                className="w-[250px] flex-shrink-0"
              >
                <motion.div
                  variants={hoverScale}
                  className="h-full"
                >
                  <Card className="overflow-hidden h-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <motion.div 
                        className="w-24 h-24 mb-4 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img 
                          src={member.institution.logo} 
                          alt={member.institution.name} 
                          className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                        />
                      </motion.div>
                      <motion.h3 
                        className="font-bold text-lg mb-1"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        {member.name}
                      </motion.h3>
                      <p className="text-sm text-muted-foreground">
                        {member.position}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {member.institution.name}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default FacultySlider;