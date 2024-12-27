import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CafeSettings {
  name: string;
  currency: string;
}

const currencies = [
  { code: "KSH", name: "Kenyan Shilling" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "AUD", name: "Australian Dollar" },
];

const CafeSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<CafeSettings>({
    name: "Cafe POS",
    currency: "KSH",
  });

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your cafe settings have been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cafe Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="cafeName" className="text-sm font-medium">
            Cafe Name
          </label>
          <Input
            id="cafeName"
            value={settings.name}
            onChange={(e) =>
              setSettings({ ...settings, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Currency</label>
          <Select
            value={settings.currency}
            onValueChange={(value) =>
              setSettings({ ...settings, currency: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default CafeSettings;