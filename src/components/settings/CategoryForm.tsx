import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Category {
  id: string;
  name: string;
}

interface CategoryFormProps {
  onSubmit: (data: Partial<Category>) => void;
  initialData?: Category;
  onCancel?: () => void;
}

const CategoryForm = ({ onSubmit, initialData, onCancel }: CategoryFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
    toast({
      title: initialData ? "Category updated" : "Category created",
      description: `Successfully ${initialData ? "updated" : "created"} ${name}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">
          {initialData ? "Update Category" : "Add Category"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;