
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, X, Clock, DollarSign, Camera } from "lucide-react";

interface OnboardingServicesProps {
  onComplete: () => void;
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

const OnboardingServices = ({ onComplete }: OnboardingServicesProps) => {
  const { services, updateServices } = useAppContext();
  const [activeServices, setActiveServices] = useState<ServiceType[]>(services.slice(0, 2));
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState<ServiceType & {isPopular?: boolean}>({
    id: "",
    title: "",
    description: "",
    price: 0,
    duration: 60,
    isPopular: false,
  });

  const handleAddService = () => {
    if (newService.title && newService.price > 0) {
      const service: ServiceType = {
        id: Date.now().toString(),
        title: newService.title,
        description: newService.description,
        price: newService.price,
        duration: newService.duration,
      };
      setActiveServices([...activeServices, service]);
      setNewService({
        id: "",
        title: "",
        description: "",
        price: 0,
        duration: 60,
        isPopular: false,
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveService = (id: string) => {
    setActiveServices(activeServices.filter(service => service.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setNewService({
      ...newService,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNewService({
      ...newService,
      isPopular: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateServices(activeServices);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add your services</h2>
        <p className="text-gray-500 mt-1">
          Define what photography services you offer to your clients
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Services list */}
        <div className="space-y-4">
          {activeServices.map((service) => (
            <div 
              key={service.id} 
              className="relative group rounded-lg overflow-hidden bg-white p-4 border border-gray-200 hover:border-boothly-purple transition-colors"
            >
              <button
                type="button"
                onClick={() => handleRemoveService(service.id)}
                className="absolute top-3 right-3"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
              
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                  <Camera className="h-5 w-5 text-boothly-purple" />
                </div>
                <div className="flex-1 pr-8">
                  <div className="flex items-center mb-1">
                    <h3 className="font-medium">{service.title}</h3>
                    {(service as any).isPopular && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center font-medium">
                      <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
                      <span>${service.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add service button */}
          {activeServices.length < 5 && !showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg transition-colors hover:border-boothly-purple hover:bg-purple-50"
            >
              <PlusCircle className="h-5 w-5 mr-2 text-gray-400" />
              <span className="text-gray-500">Add Service</span>
            </button>
          )}
        </div>

        {/* Add service form */}
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <h3 className="font-medium mb-4">Add a new service</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Service Name</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Portrait Session"
                  value={newService.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="150"
                  value={newService.price || ""}
                  onChange={handleChange}
                  min={0}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="60"
                  value={newService.duration || ""}
                  onChange={handleChange}
                  min={15}
                  step={15}
                  required
                />
              </div>

              <div className="space-y-2 flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isPopular" 
                    checked={newService.isPopular}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="isPopular" className="cursor-pointer">Mark as popular service</Label>
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe what's included in this service..."
                  value={newService.description}
                  onChange={handleChange}
                  rows={2}
                />
              </div>

              <div className="sm:col-span-2 flex justify-end space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  onClick={handleAddService}
                >
                  Add Service
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500">
            {activeServices.length} of 5 services added
          </p>
          <Button type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default OnboardingServices;
