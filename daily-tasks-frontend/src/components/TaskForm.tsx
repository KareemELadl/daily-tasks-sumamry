import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  employeeId: string;
}

const TaskForm: React.FC<Props> = ({ employeeId }) => {
  const [description, setDescription] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    
    mutationFn: async () => {
      const now = new Date().toISOString().split("T")[0]; // Get today's date string like '2025-05-24'
const fullFrom = new Date(`${now}T${fromTime}`);
const fullTo = new Date(`${now}T${toTime}`);

const res = await fetch("http://localhost:4000/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    description,
    fromTime: fullFrom,
    toTime: fullTo,
    employeeId
  })
}); 

    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", employeeId] });
      queryClient.invalidateQueries({ queryKey: ["summary", employeeId] });
      setDescription("");
      setFromTime("");
      setToTime("");
    }
  });

  return (
    <form onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }} className="space-y-2">
      <input className="p-2 border w-full" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="p-2 border w-full" type="time" value={fromTime} onChange={(e) => setFromTime(e.target.value)} />
      <input className="p-2 border w-full" type="time" value={toTime} onChange={(e) => setToTime(e.target.value)} />
      <button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
