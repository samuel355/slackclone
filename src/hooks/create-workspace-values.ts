import { create } from "zustand";

type CreateWorkspaceValues = {
  name: string;
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<CreateWorkspaceValues>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}
export const useCreateWorkspaceValues = create<CreateWorkspaceValues>(set => ({
  name: '',
  imageUrl: '',
  updateImageUrl: (url) => set({ imageUrl: url }),
  updateValues: (values) => set(values),
  currentStep: 1,
  setCurrentStep: (step) => set({ currentStep: step }),
  reset: () => set({ name: '', imageUrl: '', currentStep: 0 }),
}))