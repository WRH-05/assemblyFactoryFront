import { cn } from '@/lib/utils';
import { AssemblyStage } from '@/types/assembly';
import { StageIndicator } from './StageIndicator';
import { Badge } from '@/components/ui/badge';
import { Palette, Wrench, ClipboardCheck, Package } from 'lucide-react';

const stageIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  design: Palette,
  assemble: Wrench,
  quality: ClipboardCheck,
  package: Package,
};

interface AssemblyStageCardProps {
  stage: AssemblyStage;
  isLast: boolean;
}

export function AssemblyStageCard({ stage, isLast }: AssemblyStageCardProps) {
  const Icon = stageIcons[stage.id] || Wrench;

  const statusLabels = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
    error: 'Error',
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <StageIndicator status={stage.status} />
        {!isLast && (
          <div
            className={cn(
              'w-0.5 flex-1 min-h-[60px] transition-all duration-500',
              {
                'bg-muted-foreground/20': stage.status === 'pending',
                'bg-gradient-to-b from-primary to-muted-foreground/20':
                  stage.status === 'in-progress',
                'bg-primary': stage.status === 'completed',
                'bg-destructive/50': stage.status === 'error',
              }
            )}
          />
        )}
      </div>

      <div
        className={cn(
          'flex-1 rounded-lg border p-4 transition-all duration-300 mb-4',
          {
            'border-border/50 bg-card/50': stage.status === 'pending',
            'border-primary/50 bg-card shadow-lg shadow-primary/10':
              stage.status === 'in-progress',
            'border-primary/30 bg-card': stage.status === 'completed',
            'border-destructive/50 bg-destructive/10': stage.status === 'error',
          }
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon
              className={cn('h-5 w-5', {
                'text-muted-foreground': stage.status === 'pending',
                'text-primary': stage.status === 'in-progress' || stage.status === 'completed',
                'text-destructive': stage.status === 'error',
              })}
            />
            <h3 className="font-semibold text-foreground">{stage.name}</h3>
          </div>
          <Badge
            variant={
              stage.status === 'completed'
                ? 'default'
                : stage.status === 'error'
                ? 'destructive'
                : 'secondary'
            }
            className={cn({
              'animate-pulse': stage.status === 'in-progress',
            })}
          >
            {statusLabels[stage.status]}
          </Badge>
        </div>

        <div
          className={cn('text-sm min-h-[24px]', {
            'text-muted-foreground': stage.status === 'pending',
            'text-foreground': stage.status !== 'pending',
          })}
        >
          {stage.message || (stage.status === 'pending' ? 'Waiting to start...' : '')}
        </div>
      </div>
    </div>
  );
}
