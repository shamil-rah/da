
import { useState } from "react";
import { Calendar, Clock, MapPin, Star, DollarSign, Camera, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";

const ClientView = () => {
  const [selectedService, setSelectedService] = useState("portrait");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services = [
    {
      id: "portrait",
      name: "Portrait Photography",
      price: 150,
      duration: "1 hour",
      description: "Professional headshots and portrait sessions",
      image: "/placeholder.svg"
    },
    {
      id: "event",
      name: "Event Photography",
      price: 300,
      duration: "3 hours",
      description: "Capture your special moments and celebrations",
      image: "/placeholder.svg"
    },
    {
      id: "product",
      name: "Product Photography",
      price: 200,
      duration: "2 hours",
      description: "High-quality product shots for your business",
      image: "/placeholder.svg"
    }
  ];

  const availableTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  const portfolioImages = [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg"
  ];

  return (
    <PageLayout title="Book Florence Shaw" subtitle="Professional photographer specializing in portraits and events">
      <div className="space-y-8">
        {/* Photographer Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">Florence Shaw</h2>
                  <p className="text-gray-600 mt-1">Professional Photographer</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.9) • 127 reviews</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      San Francisco, CA
                    </div>
                    <div className="flex items-center gap-1">
                      <Camera className="h-4 w-4" />
                      5+ years experience
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Choose from our photography packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedService === service.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3" />
                    <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-600" />
                        <span className="font-semibold">${service.price}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Booking */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Book Your Session</CardTitle>
              <CardDescription>Select your preferred date and time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Available Times
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === time
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold">
                    ${services.find(s => s.id === selectedService)?.price}
                  </span>
                </div>
                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                  disabled={!selectedDate || !selectedTime}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Portfolio Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Portfolio</CardTitle>
              <CardDescription>Recent work and client favorites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioImages.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100 rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default ClientView;
