
import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { Clock } from "lucide-react";

const timeBlockLabels = {
  morning: "Morning (9am-12pm)",
  afternoon: "Afternoon (1pm-5pm)",
  evening: "Evening (6pm-9pm)",
};

type Day = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
type TimeBlock = "morning" | "afternoon" | "evening";

const Availability = () => {
  const { availability, updateAvailability } = useAppContext();
  const [weeklySchedule, setWeeklySchedule] = useState(availability.weeklySchedule);
  const [availableTimeSlots, setAvailableTimeSlots] = useState(availability.timeSlots);
  
  // Format day names
  const formatDay = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };
  
  // Handle toggle change for availability
  const handleToggleChange = (day: Day, timeBlock: TimeBlock) => {
    const updatedSchedule = {
      ...weeklySchedule,
      [day]: {
        ...weeklySchedule[day],
        [timeBlock]: !weeklySchedule[day][timeBlock],
      },
    };
    
    setWeeklySchedule(updatedSchedule);
  };
  
  // Save availability changes
  const handleSaveAvailability = () => {
    updateAvailability({ weeklySchedule });
    
    toast({
      title: "Availability updated",
      description: "Your weekly schedule has been updated successfully.",
    });
  };
  
  // Group time slots by day
  const timeSlotsByDay = availableTimeSlots.reduce((acc, slot) => {
    if (!acc[slot.day]) {
      acc[slot.day] = [];
    }
    acc[slot.day].push(slot);
    return acc;
  }, {} as Record<string, typeof availableTimeSlots>);
  
  return (
    <PageLayout title="Availability" subtitle="Set your working hours and manage time slots">
      {/* Weekly Schedule */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Weekly Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(weeklySchedule).map(([day, timeBlocks]) => (
              <div key={day}>
                <h3 className="font-medium text-gray-900 mb-3">{formatDay(day)}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(timeBlocks).map(([block, isAvailable]) => (
                    <div 
                      key={`${day}-${block}`} 
                      className={`p-3 rounded-lg border flex items-center justify-between ${
                        isAvailable ? "border-boothly-purple/30 bg-boothly-purple/5" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center">
                        <Clock className={`h-4 w-4 mr-2 ${isAvailable ? "text-boothly-purple" : "text-gray-400"}`} />
                        <Label htmlFor={`${day}-${block}`} className="text-sm cursor-pointer">
                          {timeBlockLabels[block as TimeBlock]}
                        </Label>
                      </div>
                      <Switch
                        id={`${day}-${block}`}
                        checked={isAvailable}
                        onCheckedChange={() => handleToggleChange(day as Day, block as TimeBlock)}
                      />
                    </div>
                  ))}
                </div>
                {day !== "sunday" && <Separator className="mt-6" />}
              </div>
            ))}
            
            <Button onClick={handleSaveAvailability} className="mt-4">
              Save Availability
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Available Time Slots */}
      <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
      <div className="space-y-6">
        {Object.entries(timeSlotsByDay).map(([day, slots]) => (
          <Card key={day}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                {day} <span className="text-sm font-normal text-gray-500 ml-2">({slots[0].date})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot) => (
                  <div 
                    key={slot.id}
                    className={`p-3 text-center rounded-lg border ${
                      slot.available 
                        ? "border-boothly-purple/30 bg-boothly-purple/5 text-boothly-purple" 
                        : "border-gray-200 bg-gray-50 text-gray-400"
                    }`}
                  >
                    {slot.time}
                    {!slot.available && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Booked
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default Availability;
