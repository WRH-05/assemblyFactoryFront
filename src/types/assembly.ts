export type StageStatus = 'pending' | 'in-progress' | 'completed' | 'error';

export interface AssemblyStage {
  id: string;
  name: string;
  endpoint: string;
  status: StageStatus;
  message: string | null;
}

export interface AssemblyState {
  productName: string;
  stages: AssemblyStage[];
  isProcessing: boolean;
  isComplete: boolean;
}

export interface StageResponse {
  success: boolean;
  message: string;
}
