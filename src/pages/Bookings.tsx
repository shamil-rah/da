
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import PageLayout from "@/components/PageLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown,
  Check,
  X,
  Phone,
  Mail,
  MessageSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Bookings = () => {
  const { bookings } = useAppContext();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  
  // Filtered bookings based on status and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch = 
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  // Group bookings by status for the tabs
  const confirmedBookings = filteredBookings.filter(b => b.status === "confirmed");
  const pendingBookings = filteredBookings.filter(b => b.status === "pending");
  const completedBookings = filteredBookings.filter(b => b.status === "completed");
  const cancelledBookings = filteredBookings.filter(b => b.status === "cancelled");

  // Get upcoming bookings (confirmed only), sorted by date
  const upcomingBookings = [...confirmedBookings].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Helper function to get badge variant based on status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed": return "success";
      case "pending": return "warning";
      case "completed": return "secondary";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  // Format time to be more readable (e.g. convert "14:00" to "2:00 PM")
  const formatTimeString = (timeStr: string) => {
    // Check if already in AM/PM format
    if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
    
    try {
      const [hours, minutes] = timeStr.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    } catch (e) {
      return timeStr;
    }
  };

  return (
    <PageLayout 
      title="Bookings" 
      subtitle="Manage your upcoming appointments and booking history"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Filters and search section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
        >
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients or services..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Upcoming bookings (only shows the closest few) */}
        {upcomingBookings.length > 0 && (
          <motion.div variants={itemVariants}>
            <Card className="border-none shadow-md bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg">
                  <div className="mr-2 p-2 rounded-full bg-boothly-purple/10">
                    <CalendarIcon className="h-5 w-5 text-boothly-purple" />
                  </div>
                  Today's Upcoming Bookings
                </CardTitle>
                <CardDescription>Your next scheduled appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <motion.div 
                      key={booking.id}
                      className="p-4 rounded-lg border border-gray-100 hover:border-boothly-purple/30 hover:bg-boothly-purple/5 transition-all duration-200"
                      whileHover={{ x: 2, scale: 1.01 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 bg-boothly-purple/10">
                            <AvatarImage src={booking.clientAvatar} alt={booking.clientName} />
                            <AvatarFallback className="bg-boothly-purple/20 text-boothly-purple">
                              {booking.clientName.split(' ').map(name => name[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-3">
                            <h3 className="font-medium text-gray-900">{booking.clientName}</h3>
                            <p className="text-sm text-gray-500">{booking.serviceName}</p>
                          </div>
                        </div>
                        
                        <Badge variant={getBadgeVariant(booking.status) as any} className="capitalize">
                          {booking.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <div className="flex items-center text-sm">
                          <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{format(new Date(booking.date), "EEEE, MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{formatTimeString(booking.time)}</span>
                        </div>
                        <div className="flex items-center col-span-2 sm:col-span-1 justify-start sm:justify-end">
                          <Button variant="outline" size="sm" className="text-xs mr-2">
                            <X className="h-3 w-3 mr-1" /> Cancel
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs bg-boothly-purple/10 border-boothly-purple/20 text-boothly-purple hover:bg-boothly-purple/20">
                            <MessageSquare className="h-3 w-3 mr-1" /> Message
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Tabs for viewing bookings by status */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">All Bookings</CardTitle>
              <CardDescription>View and manage your appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-6 grid grid-cols-5">
                  <TabsTrigger value="all">All ({filteredBookings.length})</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  {filteredBookings.length > 0 ? (
                    filteredBookings.map((booking) => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        getBadgeVariant={getBadgeVariant}
                        formatTimeString={formatTimeString}
                      />
                    ))
                  ) : (
                    <EmptyState message="No bookings match your current filters" />
                  )}
                </TabsContent>
                
                <TabsContent value="confirmed" className="space-y-4">
                  {confirmedBookings.length > 0 ? (
                    confirmedBookings.map((booking) => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        getBadgeVariant={getBadgeVariant}
                        formatTimeString={formatTimeString}
                      />
                    ))
                  ) : (
                    <EmptyState message="No confirmed bookings" />
                  )}
                </TabsContent>
                
                <TabsContent value="pending" className="space-y-4">
                  {pendingBookings.length > 0 ? (
                    pendingBookings.map((booking) => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        getBadgeVariant={getBadgeVariant}
                        formatTimeString={formatTimeString}
                      />
                    ))
                  ) : (
                    <EmptyState message="No pending bookings" />
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {completedBookings.length > 0 ? (
                    completedBookings.map((booking) => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        getBadgeVariant={getBadgeVariant}
                        formatTimeString={formatTimeString}
                      />
                    ))
                  ) : (
                    <EmptyState message="No completed bookings" />
                  )}
                </TabsContent>
                
                <TabsContent value="cancelled" className="space-y-4">
                  {cancelledBookings.length > 0 ? (
                    cancelledBookings.map((booking) => (
                      <BookingCard 
                        key={booking.id} 
                        booking={booking} 
                        getBadgeVariant={getBadgeVariant}
                        formatTimeString={formatTimeString}
                      />
                    ))
                  ) : (
                    <EmptyState message="No cancelled bookings" />
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

// Booking card component for individual booking display
const BookingCard = ({ 
  booking, 
  getBadgeVariant,
  formatTimeString
}: { 
  booking: any; 
  getBadgeVariant: (status: string) => string;
  formatTimeString: (timeStr: string) => string;
}) => {
  return (
    <motion.div
      className="p-4 rounded-lg border border-gray-100 hover:border-boothly-purple/30 hover:bg-boothly-purple/5 transition-all duration-200"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 bg-boothly-purple/10">
            <AvatarImage src={booking.clientAvatar} alt={booking.clientName} />
            <AvatarFallback className="bg-boothly-purple/20 text-boothly-purple">
              {booking.clientName.split(' ').map((name: string) => name[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">{booking.clientName}</h3>
            <p className="text-sm text-gray-500">{booking.serviceName}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center text-sm mr-4">
            <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
            <span>{format(new Date(booking.date), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center text-sm mr-4">
            <Clock className="h-4 w-4 mr-1 text-gray-400" />
            <span>{formatTimeString(booking.time)}</span>
          </div>
          <Badge variant={getBadgeVariant(booking.status) as any} className="capitalize">
            {booking.status}
          </Badge>
        </div>
      </div>
      
      <div className="mt-4 border-t border-gray-100 pt-4 flex justify-between items-center">
        <div className="flex space-x-3">
          <Button variant="ghost" size="sm" className="text-xs">
            <Phone className="h-3 w-3 mr-1" /> Call
          </Button>
          <Button variant="ghost" size="sm" className="text-xs">
            <Mail className="h-3 w-3 mr-1" /> Email
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-boothly-purple">
            <MessageSquare className="h-3 w-3 mr-1" /> Message
          </Button>
        </div>
        
        <div className="flex space-x-2">
          {booking.status === "pending" && (
            <>
              <Button variant="outline" size="sm" className="text-xs">
                <X className="h-3 w-3 mr-1" /> Decline
              </Button>
              <Button variant="default" size="sm" className="text-xs bg-boothly-purple hover:bg-boothly-purple-dark">
                <Check className="h-3 w-3 mr-1" /> Accept
              </Button>
            </>
          )}
          {booking.status === "confirmed" && (
            <Button variant="outline" size="sm" className="text-xs">
              <X className="h-3 w-3 mr-1" /> Cancel
            </Button>
          )}
          {booking.status !== "pending" && booking.status !== "confirmed" && (
            <Button variant="ghost" size="sm" className="text-xs">
              <ChevronRight className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Empty state component when no bookings match filters
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="py-12 flex flex-col items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
      <CalendarIcon className="h-12 w-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-medium text-gray-500 mb-1">{message}</h3>
      <p className="text-sm text-gray-400">Try changing your filters or check back later</p>
    </div>
  );
};

export default Bookings;
