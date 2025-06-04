export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: 'include', // Make sure cookies are sent
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (response.status === 401 || response.status === 403) {
    alert('Session expired. Please log in again.');
    setTimeout(() => {
      window.location.href = '/auth'; // or your login page
    }, 100);
    throw new Error('Unauthorized');
  }

  return response;
};
