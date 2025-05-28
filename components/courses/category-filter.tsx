"use client";

import { CheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <ScrollArea className="h-40 rounded-md border p-2">
      <div className="space-y-2">
        {categories.map((category) => (
          <div
            key={category}
            className={`flex items-center justify-between px-2 py-1.5 rounded-md cursor-pointer hover:bg-secondary/50 ${
              selectedCategory === category ? 'bg-secondary' : ''
            }`}
            onClick={() => onCategoryChange(category)}
          >
            <span className="text-sm">{category}</span>
            {selectedCategory === category && <CheckIcon className="h-4 w-4" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryFilter;