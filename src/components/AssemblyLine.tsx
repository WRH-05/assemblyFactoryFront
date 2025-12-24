import { AssemblyStage } from '@/types/assembly';
import { AssemblyStageCard } from './AssemblyStageCard';

interface AssemblyLineProps {
  stages: AssemblyStage[];
}

export function AssemblyLine({ stages }: AssemblyLineProps) {
  return (
    <div className="w-full max-w-md">
      {stages.map((stage, index) => (
        <AssemblyStageCard
          key={stage.id}
          stage={stage}
          isLast={index === stages.length - 1}
        />
      ))}
    </div>
  );
}
