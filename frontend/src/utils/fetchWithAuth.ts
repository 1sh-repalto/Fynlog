export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    // Let alert show for a moment before redirect
    alert("Session expired. Please log in again.");
    setTimeout(() => {
      window.location.href = "/auth";
    }, 100);
    throw new Error("Unauthorized");
  }

  return response;
};
