export interface Course {
  id: string;
  title: string;
  slug: string;
  instructor: {
    name: string;
    avatar: string;
    designation: string;
    company: string;
  };
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'ongoing' | 'upcoming' | 'past';
  lectures: number;
  rating: number;
  enrollments: number;
  featured?: boolean;
  registrationOpen: boolean;
  nextBatchDate?: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced Full Stack Development',
    slug: 'advanced-full-stack-development',
    instructor: {
      name: 'Aditya Kumar',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Principal Engineer',
      company: 'Microsoft',
    },
    category: 'Technology',
    level: 'Advanced',
    description: 'Master modern full-stack development with React, Node.js, and cloud technologies. Build scalable applications using industry best practices.',
    thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1499,
    discountPrice: 1299,
    duration: '12 weeks',
    startDate: '2024-05-15',
    endDate: '2024-08-07',
    status: 'upcoming',
    lectures: 48,
    rating: 4.9,
    enrollments: 0,
    featured: true,
    registrationOpen: true,
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning',
    slug: 'data-science-machine-learning',
    instructor: {
      name: 'Neha Sharma',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Lead Data Scientist',
      company: 'Google',
    },
    category: 'Technology',
    level: 'Intermediate',
    description: 'Comprehensive program covering statistical analysis, machine learning algorithms, and deep learning with practical industry projects.',
    thumbnail: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1799,
    duration: '16 weeks',
    startDate: '2024-04-01',
    endDate: '2024-07-20',
    status: 'ongoing',
    lectures: 64,
    rating: 4.9,
    enrollments: 45,
    featured: true,
    registrationOpen: false,
  },
  {
    id: '3',
    title: 'Business Analytics & Strategy',
    slug: 'business-analytics-strategy',
    instructor: {
      name: 'Rajesh Verma',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Strategy Director',
      company: 'McKinsey',
    },
    category: 'Business',
    level: 'Advanced',
    description: 'Learn advanced business analytics techniques and develop strategic thinking skills with real-world case studies.',
    thumbnail: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 2199,
    discountPrice: 1899,
    duration: '10 weeks',
    startDate: '2024-06-01',
    endDate: '2024-08-10',
    status: 'upcoming',
    lectures: 40,
    rating: 4.8,
    enrollments: 0,
    registrationOpen: true,
  },
  {
    id: '4',
    title: 'Digital Marketing Mastery',
    slug: 'digital-marketing-mastery',
    instructor: {
      name: 'Priya Patel',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Marketing Director',
      company: 'Meta',
    },
    category: 'Marketing',
    level: 'Intermediate',
    description: 'Master digital marketing strategies, social media management, and analytics tools for business growth.',
    thumbnail: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1299,
    duration: '8 weeks',
    startDate: '2024-03-15',
    endDate: '2024-05-10',
    status: 'ongoing',
    lectures: 32,
    rating: 4.7,
    enrollments: 78,
    registrationOpen: false,
  },
  {
    id: '5',
    title: 'Cloud Architecture & DevOps',
    slug: 'cloud-architecture-devops',
    instructor: {
      name: 'Vikram Singh',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Cloud Architect',
      company: 'Amazon Web Services',
    },
    category: 'Technology',
    level: 'Advanced',
    description: 'Learn cloud architecture principles and DevOps practices using AWS, Azure, and Google Cloud Platform.',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1699,
    discountPrice: 1499,
    duration: '14 weeks',
    startDate: '2024-07-01',
    endDate: '2024-10-07',
    status: 'upcoming',
    lectures: 56,
    rating: 4.9,
    enrollments: 0,
    registrationOpen: true,
  },
  {
    id: '6',
    title: 'UI/UX Design Professional',
    slug: 'ui-ux-design-professional',
    instructor: {
      name: 'Ananya Gupta',
      avatar: 'https://images.pexels.com/photos/1181695/pexels-photo-1181695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Design Lead',
      company: 'Apple',
    },
    category: 'Design',
    level: 'Intermediate',
    description: 'Master the principles of user interface and experience design with industry-standard tools and methodologies.',
    thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1599,
    duration: '12 weeks',
    startDate: '2024-03-01',
    endDate: '2024-05-24',
    status: 'ongoing',
    lectures: 48,
    rating: 4.8,
    enrollments: 62,
    registrationOpen: false,
  },
  {
    id: '7',
    title: 'Blockchain Development',
    slug: 'blockchain-development',
    instructor: {
      name: 'Arjun Mehta',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Blockchain Engineer',
      company: 'Ethereum Foundation',
    },
    category: 'Technology',
    level: 'Advanced',
    description: 'Learn blockchain development, smart contracts, and decentralized application development.',
    thumbnail: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1899,
    discountPrice: 1699,
    duration: '16 weeks',
    startDate: '2024-08-01',
    endDate: '2024-11-23',
    status: 'upcoming',
    lectures: 64,
    rating: 4.7,
    enrollments: 0,
    registrationOpen: true,
  },
  {
    id: '8',
    title: 'Product Management Essentials',
    slug: 'product-management-essentials',
    instructor: {
      name: 'Kiran Shah',
      avatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      designation: 'Senior Product Manager',
      company: 'Spotify',
    },
    category: 'Business',
    level: 'Intermediate',
    description: 'Learn end-to-end product management, from ideation to launch and beyond.',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 1499,
    duration: '10 weeks',
    startDate: '2024-02-15',
    endDate: '2024-04-26',
    status: 'ongoing',
    lectures: 40,
    rating: 4.8,
    enrollments: 85,
    registrationOpen: false,
  },
];

export const getOngoingCourses = () => courses.filter(course => course.status === 'ongoing');
export const getUpcomingCourses = () => courses.filter(course => course.status === 'upcoming');
export const getPastCourses = () => courses.filter(course => course.status === 'past');
export const getCourseBySlug = (slug: string) => courses.find(course => course.slug === slug);
export const popularCourses = courses;