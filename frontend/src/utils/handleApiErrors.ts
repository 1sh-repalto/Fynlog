// utils/apiErrorHandler.ts
import { toast } from 'react-toastify';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const handleApiErrors = (
  error: unknown,
  fallbackMessage = 'Something went wrong',
  options: { showToast?: boolean } = { showToast: true },
): string => {
  let message = fallbackMessage;

  if ((error as ApiError)?.response?.data?.message) {
    message = (error as ApiError).response!.data!.message!;
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  if (options.showToast) {
    toast.error(message);
  }

  return message;
};


export const toastApiCall = async <T>(
  promise: Promise<T>,
  fallbackMessage = 'Something went wrong'
): Promise<T | null> => {
  try {
    return await promise;
  } catch (error: unknown) {
    let message = fallbackMessage;

    if ((error as ApiError)?.response?.data?.message) {
      message = (error as ApiError).response!.data!.message!;
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
    return null;
  }
};
