export const API_URL = "http://localhost:8080/api/v2.0";

// logout function
export const logout = (e: any) => {
  e.preventDefault();
  localStorage.removeItem("user");
  window.location.href = "/login?logout=true";
};
