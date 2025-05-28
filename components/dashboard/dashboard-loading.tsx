import { Loader2 } from 'lucide-react';

const DashboardLoading = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <h3 className="text-xl font-medium">Loading your dashboard...</h3>
        <p className="text-muted-foreground">Please wait a moment</p>
      </div>
    </div>
  );
};

export default DashboardLoading;