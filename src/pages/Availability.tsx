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

type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
type TimeBlock = "morning" | "afternoon" | "evening";

const Availability = () => {
  const { availability, updateAvailability } = useAppContext();
  const [weeklySchedule, setWeeklySchedule] = useState(
    availability.weeklySchedule
  );
  const [availableTimeSlots, setAvailableTimeSlots] = useState(
    availability.timeSlots
  );

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
    <PageLayout
      title="Availability"
      subtitle="Set your working hours and manage time slots"
    >
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Weekly Schedule */}
        <Card className="overflow-hidden">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">
              Weekly Availability
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
            {Object.entries(weeklySchedule).map(([day, timeBlocks]) => (
              <div key={day} className="space-y-3 sm:space-y-4">
                <h3 className="font-medium text-sm sm:text-base text-gray-900">
                  {formatDay(day)}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                  {Object.entries(timeBlocks).map(([block, isAvailable]) => (
                    <div
                      key={`${day}-${block}`}
                      className={`p-2 sm:p-3 rounded-lg border flex items-center justify-between ${
                        isAvailable
                          ? "border-boothly-purple/30 bg-boothly-purple/5"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center flex-1 min-w-0">
                        <Clock
                          className={`h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0 ${
                            isAvailable
                              ? "text-boothly-purple"
                              : "text-gray-400"
                          }`}
                        />
                        <Label
                          htmlFor={`${day}-${block}`}
                          className="text-xs sm:text-sm cursor-pointer truncate"
                        >
                          {timeBlockLabels[block as TimeBlock]}
                        </Label>
                      </div>
                      <Switch
                        id={`${day}-${block}`}
                        checked={isAvailable}
                        onCheckedChange={() =>
                          handleToggleChange(day as Day, block as TimeBlock)
                        }
                        className="ml-2 flex-shrink-0"
                      />
                    </div>
                  ))}
                </div>
                {day !== "sunday" && <Separator className="mt-4 sm:mt-6" />}
              </div>
            ))}

            <Button
              onClick={handleSaveAvailability}
              className="mt-4 text-xs sm:text-sm w-full sm:w-auto"
            >
              Save Availability
            </Button>
          </CardContent>
        </Card>

        {/* Available Time Slots */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold">Available Time Slots</h2>
          <div className="space-y-4 sm:space-y-6">
            {Object.entries(timeSlotsByDay).map(([day, slots]) => (
              <Card key={day} className="overflow-hidden">
                <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2">
                  <CardTitle className="text-base sm:text-lg flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span>{day}</span>
                    <span className="text-xs sm:text-sm font-normal text-gray-500">
                      ({slots[0].date})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                    {slots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-2 sm:p-3 text-center rounded-lg border text-xs sm:text-sm ${
                          slot.available
                            ? "border-boothly-purple/30 bg-boothly-purple/5 text-boothly-purple"
                            : "border-gray-200 bg-gray-50 text-gray-400"
                        }`}
                      >
                        <div className="truncate">{slot.time}</div>
                        {!slot.available && (
                          <Badge variant="outline" className="mt-1 text-xs">
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
        </div>
      </div>
    </PageLayout>
  );
};

export default Availability;
