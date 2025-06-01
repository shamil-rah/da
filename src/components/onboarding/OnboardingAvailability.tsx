import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface OnboardingAvailabilityProps {
  onComplete: () => void;
}

// Days of the week
const days = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const OnboardingAvailability = ({ onComplete }: OnboardingAvailabilityProps) => {
  const { availability, updateAvailability } = useAppContext();
  
  // Convert from context structure to our simpler form structure
  const [availabilitySettings, setAvailabilitySettings] = useState({
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
    bufferTime: 30,
    advanceBookingDays: 60,
    acceptsLastMinute: false,
  });

  const toggleDay = (day: string) => {
    if (availabilitySettings.workingDays.includes(day)) {
      setAvailabilitySettings({
        ...availabilitySettings,
        workingDays: availabilitySettings.workingDays.filter(d => d !== day),
      });
    } else {
      setAvailabilitySettings({
        ...availabilitySettings,
        workingDays: [...availabilitySettings.workingDays, day],
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith("workingHours.")) {
      const hoursPart = name.split(".")[1]; // 'start' or 'end'
      setAvailabilitySettings({
        ...availabilitySettings,
        workingHours: {
          ...availabilitySettings.workingHours,
          [hoursPart]: value,
        },
      });
    } else {
      setAvailabilitySettings({
        ...availabilitySettings,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setAvailabilitySettings({
      ...availabilitySettings,
      acceptsLastMinute: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert our simple structure back to what the context expects
    // Instead of using reduce to create a generic Record type,
    // explicitly create an object with the expected day properties
    const weeklySchedule = {
      monday: {
        morning: availabilitySettings.workingDays.includes("monday"),
        afternoon: availabilitySettings.workingDays.includes("monday"),
        evening: availabilitySettings.workingDays.includes("monday"),
      },
      tuesday: {
        morning: availabilitySettings.workingDays.includes("tuesday"),
        afternoon: availabilitySettings.workingDays.includes("tuesday"),
        evening: availabilitySettings.workingDays.includes("tuesday"),
      },
      wednesday: {
        morning: availabilitySettings.workingDays.includes("wednesday"),
        afternoon: availabilitySettings.workingDays.includes("wednesday"),
        evening: availabilitySettings.workingDays.includes("wednesday"),
      },
      thursday: {
        morning: availabilitySettings.workingDays.includes("thursday"),
        afternoon: availabilitySettings.workingDays.includes("thursday"),
        evening: availabilitySettings.workingDays.includes("thursday"),
      },
      friday: {
        morning: availabilitySettings.workingDays.includes("friday"),
        afternoon: availabilitySettings.workingDays.includes("friday"),
        evening: availabilitySettings.workingDays.includes("friday"),
      },
      saturday: {
        morning: availabilitySettings.workingDays.includes("saturday"),
        afternoon: availabilitySettings.workingDays.includes("saturday"),
        evening: availabilitySettings.workingDays.includes("saturday"),
      },
      sunday: {
        morning: availabilitySettings.workingDays.includes("sunday"),
        afternoon: availabilitySettings.workingDays.includes("sunday"),
        evening: availabilitySettings.workingDays.includes("sunday"),
      },
    };
    
    // Generate some example time slots for the next week
    // This matches the structure expected by the context
    const today = new Date();
    const timeSlots = [];
    
    // Create time slots for the selected working days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Get the day of week as lowercase string (monday, tuesday, etc.)
      const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      const dayOfWeek = dayNames[date.getDay()];
      const dateStr = date.toISOString().split('T')[0];
      
      // Only add slots for working days
      if (availabilitySettings.workingDays.includes(dayOfWeek)) {
        // Morning slot
        timeSlots.push({
          id: `ts-${dateStr}-morning`,
          day: dayOfWeek,
          date: dateStr,
          time: availabilitySettings.workingHours.start,
          available: true
        });
        
        // Afternoon slot
        timeSlots.push({
          id: `ts-${dateStr}-afternoon`,
          day: dayOfWeek,
          date: dateStr,
          time: "12:00",
          available: true
        });
        
        // Evening slot (if end time is after 17:00)
        if (availabilitySettings.workingHours.end > "17:00") {
          timeSlots.push({
            id: `ts-${dateStr}-evening`,
            day: dayOfWeek,
            date: dateStr,
            time: "17:00",
            available: true
          });
        }
      }
    }
    
    // This follows the real structure from the context
    const contextAvailability = {
      weeklySchedule,
      timeSlots, // Now it's an array of time slot objects
      settings: {
        bufferMinutes: availabilitySettings.bufferTime,
        maxAdvanceBookingDays: availabilitySettings.advanceBookingDays,
        allowSameDay: availabilitySettings.acceptsLastMinute
      }
    };
    
    updateAvailability(contextAvailability);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Set your availability</h2>
        <p className="text-gray-500 mt-1">
          Define when you're available for bookings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Working days */}
        <div className="space-y-3">
          <Label>Working days</Label>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
            {days.map((day) => (
              <div key={day.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={day.id}
                  checked={availabilitySettings.workingDays.includes(day.id)}
                  onCheckedChange={() => toggleDay(day.id)}
                />
                <Label htmlFor={day.id} className="cursor-pointer">{day.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Working hours */}
        <div className="space-y-3">
          <Label>Working hours</Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="workingHours.start" className="text-sm text-gray-500">Start time</Label>
              <Input
                id="workingHours.start"
                name="workingHours.start"
                type="time"
                value={availabilitySettings.workingHours.start}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHours.end" className="text-sm text-gray-500">End time</Label>
              <Input
                id="workingHours.end"
                name="workingHours.end"
                type="time"
                value={availabilitySettings.workingHours.end}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Buffer time */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="bufferTime">Buffer time between bookings</Label>
            <span className="text-sm text-gray-500">{availabilitySettings.bufferTime} minutes</span>
          </div>
          <Input
            id="bufferTime"
            name="bufferTime"
            type="range"
            min={0}
            max={60}
            step={15}
            value={availabilitySettings.bufferTime}
            onChange={handleChange}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>No buffer</span>
            <span>15 min</span>
            <span>30 min</span>
            <span>45 min</span>
            <span>60 min</span>
          </div>
        </div>

        {/* Advance booking days */}
        <div className="space-y-3">
          <Label htmlFor="advanceBookingDays">How far in advance can clients book?</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="advanceBookingDays"
              name="advanceBookingDays"
              type="number"
              min={1}
              max={365}
              value={availabilitySettings.advanceBookingDays}
              onChange={handleChange}
              className="w-20"
              required
            />
            <span className="text-gray-700">days</span>
          </div>
        </div>

        {/* Last minute bookings */}
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="acceptsLastMinute" className="block">Accept last-minute bookings</Label>
            <p className="text-xs text-gray-500">Allow clients to book sessions for today or tomorrow</p>
          </div>
          <Switch 
            id="acceptsLastMinute"
            checked={availabilitySettings.acceptsLastMinute}
            onCheckedChange={handleSwitchChange}
          />
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Save & Continue
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default OnboardingAvailability;
