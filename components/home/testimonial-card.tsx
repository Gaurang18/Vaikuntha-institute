"use client";

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  testimonial: string;
  rating: number;
}

const TestimonialCard = ({ name, role, image, testimonial, rating }: TestimonialCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4 gap-4">
          <img 
            src={image} 
            alt={name} 
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted'}`}
            />
          ))}
        </div>
        
        <blockquote className="text-muted-foreground italic flex-grow">
          "{testimonial}"
        </blockquote>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;