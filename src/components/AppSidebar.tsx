import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Calendar,
  Image,
  DollarSign,
  BarChart3,
  Globe,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Portfolio", url: "/portfolio", icon: Image },
  { title: "Availability", url: "/availability", icon: Calendar },
  { title: "Pricing", url: "/pricing", icon: DollarSign },
  { title: "Earnings", url: "/earnings", icon: BarChart3 },
  { title: "Preview", url: "/preview", icon: Globe },
];

export function AppSidebar() {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className=" bg-black" collapsible="icon">
      <SidebarHeader
        className={`border-b border-gray-800/20 ${
          isCollapsed ? "px-0 py-3" : "p-4"
        }`}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center w-full" : "gap-2"
          }`}
        >
          <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-black font-bold text-sm">B</span>
          </div>
          {!isCollapsed && (
            <span className="font-semibold text-lg text-white">Boothly</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className={`${isCollapsed ? "px-0" : "px-3"} py-4`}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    className={`w-full rounded-lg transition-colors ${
                      isActive(item.url)
                        ? "bg-gray-800 text-white border border-gray-700"
                        : "text-gray-400 hover:bg-gray-900 hover:text-white"
                    } ${isCollapsed ? "justify-center mx-0" : "justify-start"}`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <Link
                      to={item.url}
                      className={`flex items-center ${
                        isCollapsed
                          ? "justify-center w-full h-10"
                          : "gap-3 px-3 py-2.5"
                      }`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isCollapsed && (
        <SidebarFooter className="p-4 border-t border-gray-800/20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-800 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Florence Shaw
              </p>
              <p className="text-xs text-gray-400 truncate">
                florence@untitledui.com
              </p>
            </div>
          </div>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
