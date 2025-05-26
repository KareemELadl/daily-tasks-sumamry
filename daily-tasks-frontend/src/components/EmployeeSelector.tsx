import React from "react";
import { useEmployees } from "../hooks/useEmployees";

interface Props {
  onSelect: (id: string) => void;
}

const EmployeeSelector: React.FC<Props> = ({ onSelect }) => {
  const { data, isLoading } = useEmployees();

  if (isLoading) return <p>Loading employees...</p>;

  return (
    <select onChange={(e) => onSelect(e.target.value)} className="p-2 border rounded">
      <option value="">Select an Employee</option>
      {data?.map((emp) => (
        <option key={emp._id} value={emp._id}>{emp.name}</option>
      ))}
    </select>
  );
};

export default React.memo(EmployeeSelector);