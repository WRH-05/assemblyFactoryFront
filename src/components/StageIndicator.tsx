import { cn } from '@/lib/utils';
import { StageStatus } from '@/types/assembly';
import { Check, Loader2, Circle, AlertCircle } from 'lucide-react';

interface StageIndicatorProps {
  status: StageStatus;
}

export function StageIndicator({ status }: StageIndicatorProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300',
        {
          'border-muted-foreground/30 bg-muted/50': status === 'pending',
          'border-primary bg-primary/20 animate-pulse': status === 'in-progress',
          'border-primary bg-primary': status === 'completed',
          'border-destructive bg-destructive/20': status === 'error',
        }
      )}
    >
      {status === 'pending' && (
        <Circle className="h-5 w-5 text-muted-foreground/50" />
      )}
      {status === 'in-progress' && (
        <Loader2 className="h-5 w-5 text-primary animate-spin" />
      )}
      {status === 'completed' && (
        <Check className="h-5 w-5 text-primary-foreground" />
      )}
      {status === 'error' && (
        <AlertCircle className="h-5 w-5 text-destructive" />
      )}
    </div>
  );
}
