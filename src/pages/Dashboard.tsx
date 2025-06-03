import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import PageLayout from "@/components/PageLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Image,
  DollarSign,
  Clock,
  User,
  TrendingUp,
  MoreHorizontal,
  Search,
  Filter,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const { bookings } = useAppContext();

  const upcomingBookings = bookings
    .filter((booking) => booking.status === "confirmed")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 10);

  return (
    <PageLayout
      title="Dashboard"
      subtitle="Manage your team members and their account permissions here."
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 sm:space-y-6 lg:space-y-8"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <Card className="p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                {bookings.length}
              </div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Confirmed
              </CardTitle>
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                {bookings.filter((b) => b.status === "confirmed").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Active appointments
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Pending
              </CardTitle>
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                {bookings.filter((b) => b.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>

          <Card className="p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium">
                Revenue
              </CardTitle>
              <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                $2,450
              </div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Table */}
        <Card className="overflow-hidden ">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
              <div className="space-y-1 sm:space-y-2">
                <CardTitle className="text-base sm:text-lg lg:text-xl">
                  All bookings {bookings.length}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Manage your upcoming appointments and client information.
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-2 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 text-xs sm:text-sm w-full sm:w-[200px]"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Filters
                  </Button>
                  <Button size="sm" className="text-xs sm:text-sm">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Add booking
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Mobile view - cards */}
            <div className="block sm:hidden space-y-3 p-3">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id} className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {booking.clientName.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">
                          {booking.clientName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {booking.clientEmail}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {booking.serviceName}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge
                        variant={
                          booking.status === "confirmed"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {booking.status}
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(booking.date), "MMM d")}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Desktop view - table */}
            <div className="hidden sm:block overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs sm:text-sm">
                      Client name
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Service
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">Status</TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Last active
                    </TableHead>
                    <TableHead className="text-xs sm:text-sm">
                      Date added
                    </TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="py-2 sm:py-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs sm:text-sm font-medium">
                              {booking.clientName.charAt(0)}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-medium truncate">
                              {booking.clientName}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {booking.clientEmail}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm">
                        {booking.serviceName}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs capitalize"
                        >
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-muted-foreground">
                        {format(new Date(booking.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-xs sm:text-sm text-muted-foreground">
                        {format(new Date(booking.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </PageLayout>
  );
};

export default Dashboard;
