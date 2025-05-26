import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:4000";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/employees`);
      if (!res.ok) throw new Error("Failed to fetch employees");
      return res.json();
    }
  });
}