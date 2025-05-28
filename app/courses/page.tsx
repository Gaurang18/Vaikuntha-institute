"use client";

import { useState, useMemo } from 'react';
import { Filter, Search } from 'lucide-react';
import { popularCourses } from '@/data/courses';
import CourseCard from '@/components/courses/course-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import CategoryFilter from '@/components/courses/category-filter';

// Move the component definition outside of the default export
const CoursesPage = () => {
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState('any');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Available options
  const categories = ['All Categories', 'Technology', 'Business', 'Marketing', 'Science', 'Arts', 'Health'];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    return popularCourses
      .filter(course => {
        // Category filter
        if (selectedCategory !== 'All Categories' && course.category !== selectedCategory) {
          return false;
        }

        // Level filter
        if (selectedLevel !== 'All Levels' && course.level !== selectedLevel) {
          return false;
        }

        // Price range filter
        const price = course.discountPrice || course.price;
        if (minPrice && price < Number(minPrice)) {
          return false;
        }
        if (maxPrice && price > Number(maxPrice)) {
          return false;
        }

        // Rating filter
        if (minRating !== 'any' && course.rating < Number(minRating)) {
          return false;
        }

        // Search filter
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          return (
            course.title.toLowerCase().includes(query) ||
            course.description.toLowerCase().includes(query) ||
            course.instructor.name.toLowerCase().includes(query)
          );
        }

        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
          case 'popular':
            return b.enrollments - a.enrollments;
          case 'price-low':
            return (a.discountPrice || a.price) - (b.discountPrice || b.price);
          case 'price-high':
            return (b.discountPrice || b.price) - (a.discountPrice || a.price);
          case 'recommended':
          default:
            return b.rating - a.rating;
        }
      });
  }, [selectedCategory, selectedLevel, minPrice, maxPrice, minRating, searchQuery, sortBy]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedLevel('All Levels');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('any');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Courses</h1>
          <p className="text-muted-foreground">Discover our wide range of courses taught by expert instructors</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Input 
            className="pl-10 w-full md:w-80"
            placeholder="Search courses..." 
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        {/* Filters sidebar */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 text-xs"
                onClick={resetFilters}
              >
                Reset All
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <CategoryFilter 
                  categories={categories} 
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Level</label>
                <Select 
                  value={selectedLevel.toLowerCase().replace(' ', '-')}
                  onValueChange={(value) => setSelectedLevel(value.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase().replace(' ', '-')}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <Select 
                  value={minRating}
                  onValueChange={setMinRating}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="4.5">4.5 & Up</SelectItem>
                    <SelectItem value="4.0">4.0 & Up</SelectItem>
                    <SelectItem value="3.5">3.5 & Up</SelectItem>
                    <SelectItem value="3.0">3.0 & Up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Course listings */}
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-muted-foreground">
                Showing <span className="font-medium">{filteredCourses.length}</span> courses
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Select 
                value={sortBy}
                onValueChange={setSortBy}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No courses found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Button variant="outline" className="mr-2">Previous</Button>
            <Button variant="outline" className="mr-2">1</Button>
            <Button variant="default" className="mr-2">2</Button>
            <Button variant="outline" className="mr-2">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the component as default
export default CoursesPage;