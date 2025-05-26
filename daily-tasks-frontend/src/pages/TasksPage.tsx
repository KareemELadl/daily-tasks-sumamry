import React, { useState } from "react";
import EmployeeSelector from "../components/EmployeeSelector";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import DailySummary from "../components/DailySummary";
import EmployeeForm from "../components/EmployeeForm";

const TasksPage: React.FC = () => {
  const [employeeId, setEmployeeId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 Daily Tasks Report</h1>
      <EmployeeForm />
      <EmployeeSelector onSelect={setEmployeeId} />      {employeeId && (
        <>
          <DailySummary employeeId={employeeId} />
          <TaskForm employeeId={employeeId} />
          <TaskList employeeId={employeeId} />
        </>
      )}
    </div>
  );
};

export default TasksPage;
