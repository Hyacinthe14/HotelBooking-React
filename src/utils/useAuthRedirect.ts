import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: { name: string }[];
  phoneNumber: string;
  dateOfBirth: string;
  profilePicture?: string;
}

const useAuthRedirect = (requireAuth?: boolean) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const localUser = localStorage.getItem("user");

  useEffect(() => {
    if (requireAuth && localUser) {
      setUser(JSON.parse(localUser));
    } else if (requireAuth && !localUser) {
      navigate("/login");
    } else if (!requireAuth && localUser) {
      navigate("/dashboard");
    }
  }, [navigate, localUser]);

  return { user };
};

export default useAuthRedirect;
