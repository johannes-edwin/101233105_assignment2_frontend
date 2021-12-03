import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      const { data } = await axios.get(
        `http://localhost:9090/api/v1/employees`
      );
      setEmployees(data["data"]);
    };

    getEmployees();
  }, []);

  const handleDeleteEmployee = (employeeId) => async () => {
    try {
      await axios.delete(
        `http://localhost:9090/api/v1/employees/${employeeId}`
      );
      setEmployees((prevState) =>
        prevState.filter((employee) => employee._id !== employeeId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col w-screen items-center">
      <div className="w-2/3 sm:px-6 lg:px-8">
        <Link
          className="px-3 py-2 bg-blue-600 text-white rounded-md self-start"
          to="/add-employee"
        >
          Add Employee
        </Link>
      </div>
      <div className="w-2/3 overflow-x-auto sm:-mx-6 lg:-mx-8 my-4">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-medium text-gray-500 tracking-wider"
                  >
                    Employee First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-medium text-gray-500 tracking-wider"
                  >
                    Employee Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-medium text-gray-500 tracking-wider"
                  >
                    Employee Email ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-base font-medium text-gray-500 tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.firstName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.lastName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {employee.emailId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-3">
                      <Link
                        className="px-3 py-2 bg-blue-600 text-white rounded-md"
                        to={`/update-employee/${employee._id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="px-3 py-2 bg-red-600 text-white rounded-md"
                        onClick={handleDeleteEmployee(employee._id)}
                      >
                        Delete
                      </button>
                      <Link
                        className="px-3 py-2 bg-gray-600 text-white rounded-md"
                        to={`/view-employee/${employee._id}`}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
