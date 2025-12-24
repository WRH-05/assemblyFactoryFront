import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play } from 'lucide-react';

interface ProductFormProps {
  onStart: (productName: string) => void;
  isProcessing: boolean;
}

export function ProductForm({ onStart, isProcessing }: ProductFormProps) {
  const [productName, setProductName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName.trim()) {
      onStart(productName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <Label htmlFor="productName" className="text-foreground">
          Product Name
        </Label>
        <Input
          id="productName"
          type="text"
          placeholder="Enter product name..."
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          disabled={isProcessing}
          className="bg-card border-border/50 focus:border-primary"
        />
      </div>
      <Button
        type="submit"
        disabled={!productName.trim() || isProcessing}
        className="w-full"
        size="lg"
      >
        <Play className="mr-2 h-4 w-4" />
        Start Assembly
      </Button>
    </form>
  );
}
