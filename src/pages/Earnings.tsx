
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
  DollarSign, 
  TrendingUp, 
  Calendar as CalendarIcon,
  Download,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Generate some dummy chart data
const chartData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 5000 },
  { name: "Apr", amount: 8000 },
  { name: "May", amount: 6000 },
  { name: "Jun", amount: 9500 },
  { name: "Jul", amount: 11000 },
  { name: "Aug", amount: 9000 },
  { name: "Sep", amount: 12500 },
  { name: "Oct", amount: 15000 },
  { name: "Nov", amount: 16000 },
  { name: "Dec", amount: 18000 },
];

const Earnings = () => {
  const { earnings } = useAppContext();
  const [period, setPeriod] = useState("year");
  
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

  return (
    <PageLayout 
      title="Earnings" 
      subtitle="Track your income and financial growth"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Top stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="mr-2 p-2 rounded-full bg-boothly-purple/10">
                    <DollarSign className="h-5 w-5 text-boothly-purple" />
                  </div>
                  Total Earnings
                </CardTitle>
                <CardDescription>Current month revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-3xl font-bold bg-gradient-to-r from-boothly-purple to-boothly-purple-dark bg-clip-text text-transparent">
                    ₹{earnings.currentMonth.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">
                      {Math.round((earnings.currentMonth - earnings.lastMonth) / earnings.lastMonth * 100)}%
                    </span>
                    <span className="text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="mr-2 p-2 rounded-full bg-blue-500/10">
                    <CalendarIcon className="h-5 w-5 text-blue-500" />
                  </div>
                  Weekly Earnings
                </CardTitle>
                <CardDescription>Current week revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                    ₹{earnings.thisWeek.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-green-500 font-medium">
                      12%
                    </span>
                    <span className="text-gray-500 ml-1">vs last week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <div className="mr-2 p-2 rounded-full bg-amber-500/10">
                    <DollarSign className="h-5 w-5 text-amber-500" />
                  </div>
                  Pending Payout
                </CardTitle>
                <CardDescription>Awaiting transfer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    ₹{earnings.pendingPayouts.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2 text-sm">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-gray-500">Expected by May 10</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Chart and Transactions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-none shadow-md bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Earnings Overview</CardTitle>
                <CardDescription>Your revenue over time</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#888', fontSize: 12 }}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value}`, "Revenue"]}
                      contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8B5CF6" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </Button>
              </div>
              <CardDescription>Latest successful payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earnings.recentTransactions.map((transaction) => (
                  <motion.div 
                    key={transaction.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 2, backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                  >
                    <div>
                      <p className="font-medium text-sm">{transaction.clientName}</p>
                      <div className="flex items-center mt-1">
                        <CalendarIcon className="h-3 w-3 text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500">
                          {format(new Date(transaction.date), "MMM d, yyyy")}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{transaction.service}</p>
                    </div>
                    <p className="font-semibold">₹{transaction.amount.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Analysis Tabs */}
        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-md bg-gradient-to-br from-white to-gray-50">
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Breakdown of your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="services">
                <TabsList className="mb-4">
                  <TabsTrigger value="services">By Service</TabsTrigger>
                  <TabsTrigger value="clients">By Client</TabsTrigger>
                  <TabsTrigger value="timeOfDay">By Time</TabsTrigger>
                </TabsList>
                <TabsContent value="services" className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 p-3 border-b">
                      <div className="font-medium text-sm">Service</div>
                      <div className="font-medium text-sm text-center">Count</div>
                      <div className="font-medium text-sm text-right">Revenue</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-3 p-3">
                        <div>Minimalist Tattoo</div>
                        <div className="text-center">12</div>
                        <div className="text-right">₹14,400</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Medium Design</div>
                        <div className="text-center">7</div>
                        <div className="text-right">₹17,500</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Custom Script</div>
                        <div className="text-center">5</div>
                        <div className="text-right">₹4,000</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 font-medium bg-gray-50">
                        <div>Total</div>
                        <div className="text-center">24</div>
                        <div className="text-right">₹35,900</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="clients" className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 p-3 border-b">
                      <div className="font-medium text-sm">Client</div>
                      <div className="font-medium text-sm text-center">Bookings</div>
                      <div className="font-medium text-sm text-right">Revenue</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-3 p-3">
                        <div>Priya Sharma</div>
                        <div className="text-center">3</div>
                        <div className="text-right">₹7,200</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Vikram Singh</div>
                        <div className="text-center">2</div>
                        <div className="text-right">₹5,000</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Rohit Patel</div>
                        <div className="text-center">1</div>
                        <div className="text-right">₹5,000</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Others</div>
                        <div className="text-center">18</div>
                        <div className="text-right">₹18,700</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 font-medium bg-gray-50">
                        <div>Total</div>
                        <div className="text-center">24</div>
                        <div className="text-right">₹35,900</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="timeOfDay" className="space-y-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="grid grid-cols-3 bg-gray-50 p-3 border-b">
                      <div className="font-medium text-sm">Time</div>
                      <div className="font-medium text-sm text-center">Bookings</div>
                      <div className="font-medium text-sm text-right">Revenue</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-3 p-3">
                        <div>Morning (9AM-12PM)</div>
                        <div className="text-center">10</div>
                        <div className="text-right">₹15,200</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Afternoon (12PM-5PM)</div>
                        <div className="text-center">9</div>
                        <div className="text-right">₹12,700</div>
                      </div>
                      <div className="grid grid-cols-3 p-3">
                        <div>Evening (5PM-9PM)</div>
                        <div className="text-center">5</div>
                        <div className="text-right">₹8,000</div>
                      </div>
                      <div className="grid grid-cols-3 p-3 font-medium bg-gray-50">
                        <div>Total</div>
                        <div className="text-center">24</div>
                        <div className="text-right">₹35,900</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </PageLayout>
  );
};

export default Earnings;
