import { Card, CardContent } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserManagement from "@/components/settings/UserManagement";
import MenuManagement from "@/components/settings/MenuManagement";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { user } = useAuth();
  const isOwner = user?.role === "owner";

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <SettingsIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <Card className="glass-card">
        <CardContent className="p-6">
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              {isOwner && <TabsTrigger value="system">System</TabsTrigger>}
            </TabsList>
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>
            <TabsContent value="menu">
              <MenuManagement />
            </TabsContent>
            {isOwner && (
              <TabsContent value="system">
                <div className="text-muted-foreground">
                  System settings will be implemented in a future update.
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;