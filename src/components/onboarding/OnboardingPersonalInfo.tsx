
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";

interface OnboardingPersonalInfoProps {
  onComplete: () => void;
}

const OnboardingPersonalInfo = ({ onComplete }: OnboardingPersonalInfoProps) => {
  const { user, updateUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: user.name || "",
    username: user.username || "",
    bio: user.bio || "",
    email: user.email || "",
    phone: user.phone || "",
    profileImage: user.profileImage || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tell us about yourself</h2>
        <p className="text-gray-500 mt-1">
          This information will be displayed on your public profile
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gray-200 border-2 border-gray-300 flex items-center justify-center overflow-hidden">
              {formData.profileImage ? (
                <img 
                  src={formData.profileImage} 
                  alt="Profile" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <Camera className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <div className="absolute bottom-0 right-0">
              <div className="h-8 w-8 rounded-full bg-boothly-purple flex items-center justify-center cursor-pointer">
                <Upload className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">Upload a profile picture</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="your-username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500">
              Your profile will be available at boothly.com/{formData.username || "username"}
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Bio */}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell clients a bit about yourself and your photography style..."
              value={formData.bio}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default OnboardingPersonalInfo;
