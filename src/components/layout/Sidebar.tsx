import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  BarChart,
  LogOut,
  User,
  Store,
  List,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
      roles: ["admin", "owner", "waiter"],
    },
    {
      title: "POS",
      icon: <Store className="h-5 w-5" />,
      href: "/orders",
      roles: ["cashier"],
    },
    {
      title: "Uncompleted Orders",
      icon: <List className="h-5 w-5" />,
      href: "/orders/uncompleted",
      roles: ["cashier"],
    },
    {
      title: "All Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/orders/all",
      roles: ["admin", "owner"],
    },
    {
      title: "Inventory",
      icon: <Package className="h-5 w-5" />,
      href: "/inventory",
      roles: ["admin", "owner"],
    },
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      href: "/analytics",
      roles: ["owner"],
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      roles: ["admin", "owner"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <div 
      className={cn(
        "flex h-screen flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isExpanded ? "w-64" : "w-20",
        "group hover:w-64"
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <h2 className={cn(
          "text-lg font-semibold transition-opacity duration-300",
          !isExpanded && "group-hover:opacity-100 opacity-0"
        )}>
          Cafe POS
        </h2>
      </div>
      <div className="mb-4 flex items-center gap-2 px-4">
        <User className="h-5 w-5 shrink-0" />
        <div className={cn(
          "flex flex-col transition-opacity duration-300",
          !isExpanded && "group-hover:opacity-100 opacity-0"
        )}>
          <span className="text-sm font-medium">{user?.name}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {user?.role}
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1 px-2">
        <nav className="grid gap-2">
          {filteredMenuItems.map((item, index) => (
            <Button
              key={index}
              variant={location.pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-2",
                location.pathname === item.href && "bg-muted"
              )}
              onClick={() => navigate(item.href)}
            >
              {item.icon}
              <span className={cn(
                "transition-opacity duration-300",
                !isExpanded && "group-hover:opacity-100 opacity-0"
              )}>
                {item.title}
              </span>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          <span className={cn(
            "transition-opacity duration-300",
            !isExpanded && "group-hover:opacity-100 opacity-0"
          )}>
            Logout
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
