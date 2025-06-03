import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import PageLayout from "@/components/PageLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Edit2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Portfolio = () => {
  const { user, updateUser, portfolio, addPortfolioImage } = useAppContext();

  // State for editing user profile
  const [editProfile, setEditProfile] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);

  // State for add new image dialog
  const [isAddImageOpen, setIsAddImageOpen] = useState(false);
  const [newImageTitle, setNewImageTitle] = useState("");
  const [newImageDescription, setNewImageDescription] = useState("");

  // Handle saving profile changes
  const handleSaveProfile = () => {
    updateUser({ name, bio });
    setEditProfile(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  // Handle adding a new portfolio image
  const handleAddImage = () => {
    // Generate a placeholder image URL
    const placeholderUrl =
      "https://images.unsplash.com/photo-1561328399-f94d2ce78679?q=80&w=400&auto=format&fit=crop";

    addPortfolioImage({
      id: `p${portfolio.length + 1}`,
      url: placeholderUrl,
      title: newImageTitle,
      description: newImageDescription,
    });

    setIsAddImageOpen(false);
    setNewImageTitle("");
    setNewImageDescription("");

    toast({
      title: "Image added",
      description: "Your portfolio image has been added successfully.",
    });
  };

  return (
    <PageLayout
      title="Portfolio"
      subtitle="Manage your profile and work samples"
    >
      {/* User Profile Section - Responsive */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="pt-4 sm:pt-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
            <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto lg:mx-0 flex-shrink-0">
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1 w-full text-center lg:text-left">
              {editProfile ? (
                // Edit mode - Responsive
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio" className="text-sm">
                      Bio
                    </Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="mt-1 text-sm"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleSaveProfile} className="text-sm">
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setName(user.name);
                        setBio(user.bio);
                        setEditProfile(false);
                      }}
                      className="text-sm"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // View mode - Responsive
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {user.name}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditProfile(true)}
                      className="text-gray-500 hover:text-boothly-purple text-xs sm:text-sm self-center sm:self-auto"
                    >
                      <Edit2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Edit Profile
                    </Button>
                  </div>
                  <p className="mt-2 text-sm sm:text-base text-gray-600">
                    {user.bio}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Images Section - Responsive Header */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-lg sm:text-xl font-bold">Portfolio Images</h2>
        <Dialog open={isAddImageOpen} onOpenChange={setIsAddImageOpen}>
          <DialogTrigger asChild>
            <Button className="text-sm w-full sm:w-auto">
              <ImagePlus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
              Add New Image
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[95vw] max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-lg">
                Add New Portfolio Image
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="h-36 sm:h-48 rounded-md bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <ImagePlus className="h-6 w-6 sm:h-8 sm:w-8 mx-auto text-gray-400" />
                  <p className="mt-2 text-xs sm:text-sm text-gray-500">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-400">
                    (Simulated - no actual upload)
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="imageTitle" className="text-sm">
                  Title
                </Label>
                <Input
                  id="imageTitle"
                  value={newImageTitle}
                  onChange={(e) => setNewImageTitle(e.target.value)}
                  placeholder="e.g., Minimalist Lotus Design"
                  className="mt-1 text-sm"
                />
              </div>

              <div>
                <Label htmlFor="imageDescription" className="text-sm">
                  Description
                </Label>
                <Textarea
                  id="imageDescription"
                  value={newImageDescription}
                  onChange={(e) => setNewImageDescription(e.target.value)}
                  placeholder="Describe your work..."
                  rows={2}
                  className="mt-1 text-sm"
                />
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setIsAddImageOpen(false)}
                className="text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddImage}
                disabled={!newImageTitle}
                className="text-sm"
              >
                Add to Portfolio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Portfolio Grid - Fully Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {portfolio.map((image) => (
          <div key={image.id} className="group relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                src={image.url}
                alt={image.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                {image.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                {image.description}
              </p>
            </div>
            <button className="absolute top-2 right-2 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default Portfolio;
