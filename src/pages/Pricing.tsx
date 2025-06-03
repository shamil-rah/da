import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import PageLayout from "@/components/PageLayout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { DollarSign, Clock, Plus, Trash2, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const Pricing = () => {
  const { services, updateServices, addService } = useAppContext();
  const [servicesList, setServicesList] = useState(services);

  // State for add/edit service dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState<string | null>(null);
  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceDuration, setServiceDuration] = useState("");

  // Open dialog to add new service
  const handleAddNewService = () => {
    setIsEditing(false);
    setCurrentServiceId(null);
    setServiceTitle("");
    setServiceDescription("");
    setServicePrice("");
    setServiceDuration("");
    setIsDialogOpen(true);
  };

  // Open dialog to edit existing service
  const handleEditService = (service: (typeof services)[0]) => {
    setIsEditing(true);
    setCurrentServiceId(service.id);
    setServiceTitle(service.title);
    setServiceDescription(service.description);
    setServicePrice(service.price.toString());
    setServiceDuration(service.duration.toString());
    setIsDialogOpen(true);
  };

  // Save service (add new or update existing)
  const handleSaveService = () => {
    if (isEditing && currentServiceId) {
      // Update existing service
      const updatedServices = servicesList.map((service) =>
        service.id === currentServiceId
          ? {
              ...service,
              title: serviceTitle,
              description: serviceDescription,
              price: parseInt(servicePrice),
              duration: parseInt(serviceDuration),
            }
          : service
      );

      setServicesList(updatedServices);
      updateServices(updatedServices);

      toast({
        title: "Service updated",
        description: "Your service has been updated successfully.",
      });
    } else {
      // Add new service
      const newService = {
        id: `s${servicesList.length + 1}`,
        title: serviceTitle,
        description: serviceDescription,
        price: parseInt(servicePrice),
        duration: parseInt(serviceDuration),
      };

      const updatedServices = [...servicesList, newService];
      setServicesList(updatedServices);
      addService(newService);

      toast({
        title: "Service added",
        description: "Your new service has been added successfully.",
      });
    }

    setIsDialogOpen(false);
  };

  // Delete a service
  const handleDeleteService = (id: string) => {
    const updatedServices = servicesList.filter((service) => service.id !== id);
    setServicesList(updatedServices);
    updateServices(updatedServices);

    toast({
      title: "Service deleted",
      description: "Your service has been removed successfully.",
    });
  };

  return (
    <PageLayout title="Pricing" subtitle="Manage your services and pricing">
      <div className="space-y-4 sm:space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <h2 className="text-lg sm:text-xl font-bold">Your Services</h2>
          <Button
            onClick={handleAddNewService}
            className="text-xs sm:text-sm w-full sm:w-auto"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Add New Service
          </Button>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {servicesList.map((service) => (
            <Card key={service.id} className="overflow-hidden flex flex-col">
              <CardContent className="pt-4 sm:pt-6 flex-1 p-3 sm:p-4 lg:p-6">
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <h3 className="font-bold text-sm sm:text-base lg:text-lg leading-tight flex-1 min-w-0 pr-2">
                    {service.title}
                  </h3>
                  <div className="text-lg sm:text-xl font-bold text-boothly-purple flex-shrink-0">
                    ₹{service.price}
                  </div>
                </div>
                <p className="mt-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-3 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{service.duration} minutes</span>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 py-2 sm:py-3 px-3 sm:px-4 lg:px-6 flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditService(service)}
                  className="text-gray-500 hover:text-boothly-purple text-xs sm:text-sm p-1 sm:p-2"
                >
                  <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteService(service.id)}
                  className="text-gray-500 hover:text-red-500 text-xs sm:text-sm p-1 sm:p-2"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Add/Edit Service Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="w-[95vw] max-w-md sm:max-w-lg mx-auto">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">
                {isEditing ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-3 sm:space-y-4 py-4">
              <div>
                <Label htmlFor="serviceTitle" className="text-xs sm:text-sm">
                  Service Title
                </Label>
                <Input
                  id="serviceTitle"
                  value={serviceTitle}
                  onChange={(e) => setServiceTitle(e.target.value)}
                  placeholder="e.g., Bridal Makeup"
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>

              <div>
                <Label
                  htmlFor="serviceDescription"
                  className="text-xs sm:text-sm"
                >
                  Description
                </Label>
                <Textarea
                  id="serviceDescription"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Describe what's included in this service..."
                  rows={2}
                  className="mt-1 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Label htmlFor="servicePrice" className="text-xs sm:text-sm">
                    Price (₹)
                  </Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <Input
                      id="servicePrice"
                      type="number"
                      value={servicePrice}
                      onChange={(e) => setServicePrice(e.target.value)}
                      placeholder="500"
                      className="pl-8 sm:pl-9 text-xs sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="serviceDuration"
                    className="text-xs sm:text-sm"
                  >
                    Duration (min)
                  </Label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-2.5 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <Input
                      id="serviceDuration"
                      type="number"
                      value={serviceDuration}
                      onChange={(e) => setServiceDuration(e.target.value)}
                      placeholder="60"
                      className="pl-8 sm:pl-9 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="text-xs sm:text-sm w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveService}
                disabled={!serviceTitle || !servicePrice || !serviceDuration}
                className="text-xs sm:text-sm w-full sm:w-auto"
              >
                {isEditing ? "Save Changes" : "Add Service"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Pricing;
