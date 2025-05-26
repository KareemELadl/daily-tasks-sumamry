import React from "react";
import { useDailySummary } from "../hooks/useTasks";

interface Props {
  employeeId: string;
}

const DailySummary: React.FC<Props> = ({ employeeId }) => {
  const { data, isLoading } = useDailySummary(employeeId);

  if (isLoading) return <p>Loading summary...</p>;

  return (
    <div className="p-4 border rounded bg-gray-50">
      <p><strong>Total Hours:</strong> {data.totalHours}h</p>
      <p><strong>Remaining:</strong> {8 - data.totalHours}h</p>
    </div>
  );
};

export default DailySummary;
