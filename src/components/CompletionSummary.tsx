import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, RotateCcw } from 'lucide-react';

interface CompletionSummaryProps {
  productName: string;
  onReset: () => void;
}

export function CompletionSummary({ productName, onReset }: CompletionSummaryProps) {
  return (
    <Card className="w-full max-w-md border-primary/30 bg-card shadow-lg shadow-primary/10">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <CheckCircle2 className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-xl text-foreground">Assembly Complete!</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          <span className="font-semibold text-foreground">{productName}</span> has
          successfully completed all assembly stages.
        </p>
        <Button onClick={onReset} variant="outline" className="w-full">
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Assembly
        </Button>
      </CardContent>
    </Card>
  );
}
