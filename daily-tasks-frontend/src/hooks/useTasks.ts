import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:4000";

export function useTasks(employeeId: string) {
  return useQuery({
    queryKey: ["tasks", employeeId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/tasks/${employeeId}`);
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    }
  });
}

export function useDailySummary(employeeId: string) {
  return useQuery({
    queryKey: ["summary", employeeId],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/tasks/summary/${employeeId}/today`);
      if (!res.ok) throw new Error("Failed to fetch summary");
      return res.json();
    }
  });
}
