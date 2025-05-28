import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  value?: number | string;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
  delay?: number;
  children?: React.ReactNode;
}

export function AnimatedCard({
  title,
  description,
  icon,
  value,
  trend,
  className,
  delay = 0,
  children,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn('h-full', className)}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
              className="text-muted-foreground"
            >
              {icon}
            </motion.div>
          )}
        </CardHeader>
        <CardContent>
          {value && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
              className="text-2xl font-bold"
            >
              {value}
            </motion.div>
          )}
          {trend && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2 }}
              className={cn(
                'text-xs mt-1',
                trend.value >= 0 ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </motion.p>
          )}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.3 }}
              className="text-xs text-muted-foreground mt-1"
            >
              {description}
            </motion.p>
          )}
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
} 