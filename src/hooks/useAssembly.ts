import { useState, useCallback } from 'react';
import { AssemblyStage, AssemblyState } from '@/types/assembly';
import { processStage } from '@/services/assemblyApi';

const initialStages: AssemblyStage[] = [
  { id: 'design', name: 'Design', endpoint: '/design', status: 'pending', message: null },
  { id: 'assemble', name: 'Assembly', endpoint: '/assemble', status: 'pending', message: null },
  { id: 'quality', name: 'Quality Check', endpoint: '/quality', status: 'pending', message: null },
  { id: 'package', name: 'Packaging', endpoint: '/package', status: 'pending', message: null },
];

export function useAssembly() {
  const [state, setState] = useState<AssemblyState>({
    productName: '',
    stages: initialStages,
    isProcessing: false,
    isComplete: false,
  });

  const updateStage = useCallback((stageId: string, updates: Partial<AssemblyStage>) => {
    setState((prev) => ({
      ...prev,
      stages: prev.stages.map((stage) =>
        stage.id === stageId ? { ...stage, ...updates } : stage
      ),
    }));
  }, []);

  const startAssembly = useCallback(async (productName: string) => {
    setState((prev) => ({
      ...prev,
      productName,
      isProcessing: true,
      isComplete: false,
      stages: initialStages,
    }));

    for (const stage of initialStages) {
      updateStage(stage.id, { status: 'in-progress' });

      try {
        const response = await processStage(stage.endpoint, productName);
        updateStage(stage.id, {
          status: 'completed',
          message: response.message,
        });
      } catch (error) {
        updateStage(stage.id, {
          status: 'error',
          message: error instanceof Error ? error.message : 'An error occurred',
        });
        setState((prev) => ({ ...prev, isProcessing: false }));
        return;
      }
    }

    setState((prev) => ({
      ...prev,
      isProcessing: false,
      isComplete: true,
    }));
  }, [updateStage]);

  const reset = useCallback(() => {
    setState({
      productName: '',
      stages: initialStages,
      isProcessing: false,
      isComplete: false,
    });
  }, []);

  return {
    ...state,
    startAssembly,
    reset,
  };
}
