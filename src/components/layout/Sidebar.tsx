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
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
      roles: ["cashier", "admin", "owner", "waiter"],
    },
    {
      title: "Orders",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/orders",
      roles: ["cashier", "admin", "owner", "waiter"],
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
    <div className="flex h-screen flex-col border-r bg-card px-4">
      <div className="flex h-16 items-center justify-between">
        <h2 className="text-lg font-semibold">Cafe POS</h2>
      </div>
      <div className="mb-4 flex items-center gap-2 px-2">
        <User className="h-5 w-5" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user?.name}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {user?.role}
          </span>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-2 px-2">
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
              {item.title}
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
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;