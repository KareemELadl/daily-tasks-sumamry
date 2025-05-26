import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  employeeId: string;
}

const TaskList: React.FC<Props> = ({ employeeId }) => {
  const { data, isLoading } = useTasks(employeeId);
  const queryClient = useQueryClient();
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [form, setForm] = useState({ description: "", fromTime: "", toTime: "" });

  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`http://localhost:4000/tasks/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", employeeId] });
      queryClient.invalidateQueries({ queryKey: ["summary", employeeId] });
    }
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, description, fromTime, toTime }: any) => {
      const now = new Date().toISOString().split("T")[0];
      const fullFrom = new Date(`${now}T${fromTime}`);
      const fullTo = new Date(`${now}T${toTime}`);

      const res = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, fromTime: fullFrom, toTime: fullTo })
      });
      if (!res.ok) throw new Error("Update failed");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", employeeId] });
      queryClient.invalidateQueries({ queryKey: ["summary", employeeId] });
      setEditTaskId(null);
    }
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading tasks...</p>;

  return (
    <ul className="space-y-4">
      {data?.map((task) => (
        <li
          key={task._id}
          className="bg-white rounded-lg shadow-md p-4 border hover:shadow-lg transition-all"
        >
          {editTaskId === task._id ? (
            <form
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                updateTask.mutate({ id: task._id, ...form });
              }}
            >
              <input
                className="w-full border rounded px-3 py-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <div className="flex gap-2">
                <input
                  type="time"
                  className="w-full border rounded px-3 py-2"
                  value={form.fromTime}
                  onChange={(e) => setForm({ ...form, fromTime: e.target.value })}
                />
                <input
                  type="time"
                  className="w-full border rounded px-3 py-2"
                  value={form.toTime}
                  onChange={(e) => setForm({ ...form, toTime: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Save
                </button>
                <button onClick={() => setEditTaskId(null)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{task.description}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(task.fromTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{" "}
                    {new Date(task.toTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditTaskId(task._id);
                      setForm({
                        description: task.description,
                        fromTime: new Date(task.fromTime).toTimeString().slice(0, 5),
                        toTime: new Date(task.toTime).toTimeString().slice(0, 5)
                      });
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask.mutate(task._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(TaskList);
