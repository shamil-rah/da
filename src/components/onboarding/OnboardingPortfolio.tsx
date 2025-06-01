
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X, Image as ImageIcon } from "lucide-react";

interface OnboardingPortfolioProps {
  onComplete: () => void;
}

const OnboardingPortfolio = ({ onComplete }: OnboardingPortfolioProps) => {
  const { portfolio, updatePortfolio } = useAppContext();
  const [newImages, setNewImages] = useState(portfolio.slice(0, 3));
  const [showAddForm, setShowAddForm] = useState(false);
  const [newImage, setNewImage] = useState({
    id: "",
    url: "",
    title: "",
    description: "",
  });

  const handleAddImage = () => {
    if (newImage.url) {
      const image = {
        ...newImage,
        id: Date.now().toString(),
      };
      setNewImages([...newImages, image]);
      setNewImage({
        id: "",
        url: "",
        title: "",
        description: "",
      });
      setShowAddForm(false);
    }
  };

  const handleRemoveImage = (id: string) => {
    setNewImages(newImages.filter(image => image.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewImage({
      ...newImage,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePortfolio(newImages);
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Add your best work</h2>
        <p className="text-gray-500 mt-1">
          Upload images to showcase your photography style to potential clients
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Portfolio grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {newImages.map((image) => (
            <div 
              key={image.id} 
              className="relative group rounded-lg overflow-hidden bg-gray-100 h-48 border border-gray-200"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.id)}
                  className="self-end"
                >
                  <X className="h-6 w-6 text-white bg-black bg-opacity-50 rounded-full p-1" />
                </button>
                <div className="text-white bg-black bg-opacity-50 p-2 rounded">
                  <p className="font-medium text-sm truncate">{image.title}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Add image button */}
          {newImages.length < 6 && !showAddForm && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg transition-colors hover:border-boothly-purple hover:bg-purple-50"
            >
              <PlusCircle className="h-8 w-8 mb-2 text-gray-400" />
              <span className="text-sm text-gray-500">Add Image</span>
            </button>
          )}
        </div>

        {/* Add image form */}
        {showAddForm && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-4 rounded-lg border border-gray-200"
          >
            <h3 className="font-medium mb-4">Add a new portfolio image</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="url">Image URL</Label>
                <Input
                  id="url"
                  name="url"
                  placeholder="https://example.com/image.jpg"
                  value={newImage.url}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Beach Photoshoot"
                  value={newImage.title}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Short description of the photoshoot..."
                  value={newImage.description}
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
                  onClick={handleAddImage}
                >
                  Add Image
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-gray-500">
            {newImages.length} of 6 images added
          </p>
          <Button type="submit">
            Save & Continue
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default OnboardingPortfolio;
