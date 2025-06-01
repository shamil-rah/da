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
          {/* Main content container with subtle curved overlay effect */}
          <div className="absolute inset-0 bg-white rounded-l-lg shadow-2xl border-l border-gray-200 ml-2 mt-2 mb-2">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b border-gray-200 bg-white px-6 rounded-tl-lg">
              <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900" />
              <div className="flex-1" />
            </header>

            <div className="p-8 h-[calc(100vh-5rem)] overflow-auto">
              <motion.main
                className="bg-gray-50 rounded-lg border border-gray-100 shadow-sm h-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-8 h-full">
                  {(title || subtitle) && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                    >
                      {title && (
                        <h1 className="text-2xl font-semibold text-gray-900">
                          {title}
                        </h1>
                      )}
                      {subtitle && (
                        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
                      )}
                    </motion.div>
                  )}

                  <div className="h-full">{children}</div>
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
