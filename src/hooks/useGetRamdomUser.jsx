import { useState, useEffect } from "react";
import { useGetTenUsers } from "./useGetTenUsers";

export const useRandomUser = () => {
  const { users } = useGetTenUsers();
  const [randomUser, setRandomUser] = useState(null);

  useEffect(() => {
    if (users && users.length > 0) {
      const randomIndex = Math.floor(Math.random() * users.length);
      setRandomUser(users[randomIndex]);
    }
  }, [users]);

  return { randomUser };
};
