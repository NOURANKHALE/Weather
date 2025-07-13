import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/Store';

// Enhanced typed hooks with better error handling
export const useAppDispatch = (): AppDispatch => {
  try {
    return useDispatch<AppDispatch>();
  } catch (error) {
    console.error('Failed to get dispatch:', error);
    throw new Error('Redux store not available');
  }
};

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
