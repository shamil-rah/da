import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between h-12 sm:h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="h-6 w-6 sm:h-8 sm:w-8 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm sm:text-lg">
                  B
                </span>
              </span>
              <span className="ml-2 text-lg sm:text-xl font-bold">Boothly</span>
            </Link>
          </div>

          <div className="flex items-center">
            <Link to="/">
              <Button
                variant="ghost"
                className="text-sm sm:text-base px-3 sm:px-4"
              >
                Sign out
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
