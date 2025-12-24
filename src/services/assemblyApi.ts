import { StageResponse } from '@/types/assembly';

// Base URL for your backend API - configure this when connecting to your backend
const API_BASE_URL = 'http://localhost:8080/api';

export async function processStage(endpoint: string, productName: string): Promise<StageResponse> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productName }),
  });

  if (!response.ok) {
    throw new Error(`Stage failed: ${response.statusText}`);
  }

  return response.json();
}
