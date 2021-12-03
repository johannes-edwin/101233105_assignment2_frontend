import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewEmployeePage = () => {
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
    <div className="flex w-screen justify-center">
      <div className="flex flex-col space-y-4 w-1/3 py-8 px-6 border-2 border-gray-200 rounded-xl">
        <div>First Name: {employeeDetails.firstName}</div>
        <div>Last Name: {employeeDetails.lastName}</div>
        <div>Email Id: {employeeDetails.emailId}</div>
      </div>
    </div>
  );
};

export default ViewEmployeePage;
