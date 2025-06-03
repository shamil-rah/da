import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  title,
  description,
}: ConfirmationModalProps) => {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      // Auto close after 3 seconds
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-sm sm:max-w-md mx-auto">
        <DialogHeader>
          <div className="mx-auto flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-green-100 mb-3 sm:mb-4">
            <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
          <DialogTitle className="text-center text-base sm:text-lg font-semibold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center pt-2 text-sm">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
