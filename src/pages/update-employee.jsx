import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EmployeeForm from "../components/employee-form";

const UpdateEmployeePage = () => {
  const [employeeDetails, setEmployeeDetails] = useState({});
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const getEmployeeDetails = async () => {
      const { data } = await axios.get(
        `http://localhost:9090/api/v1/employees/${id}`
      );
      setEmployeeDetails(data["data"]);
    };

    getEmployeeDetails();
  }, [id]);

  return (
    <div className="flex flex-col w-screen items-center">
      <EmployeeForm previousEmployeeDetails={employeeDetails} />
    </div>
  );
};

export default UpdateEmployeePage;
