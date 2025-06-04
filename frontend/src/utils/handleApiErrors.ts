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
  fallBackMessage = 'Something went wrong',
  options: { showToast?: boolean } = { showToast: true },
) => {
  let message = fallBackMessage;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  } else if ((error as ApiError)?.response?.data?.message) {
    message = (error as ApiError)?.response?.data?.message ?? fallBackMessage;
  }

  if (options.showToast) {
    toast.error(message);
  }

  return message;
};
