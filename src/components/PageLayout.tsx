import { ReactNode } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { motion } from "framer-motion";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <AppSidebar />
        <SidebarInset className="flex-1 relative">
          {/* Main content container with responsive design */}
          <div className="absolute inset-0 bg-white rounded-none md:rounded-l-lg shadow-none md:shadow-2xl border-none md:border-l md:border-gray-200 ml-0 md:ml-2 mt-0 md:mt-2 mb-0 md:mb-2 flex flex-col">
            <header className="flex h-12 sm:h-14 md:h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-3 sm:px-4 md:px-6 rounded-none md:rounded-tl-lg">
              <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900" />
              <div className="flex-1" />
            </header>

            <div className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-auto">
              <motion.main
                className="bg-gray-50 rounded-lg border border-gray-100 shadow-sm min-h-full flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-3 sm:p-4 md:p-6 lg:p-8 flex-1">
                  {(title || subtitle) && (
                    <motion.div
                      className="mb-4 sm:mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      {title && (
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
                          {title}
                        </h1>
                      )}
                      {subtitle && (
                        <p className="mt-1 text-xs sm:text-sm text-gray-600">
                          {subtitle}
                        </p>
                      )}
                    </motion.div>
                  )}

                  <div className="flex-1">{children}</div>
                </div>
              </motion.main>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default PageLayout;
