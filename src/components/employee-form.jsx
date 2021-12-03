import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const getDefaultItems = () => ({
  _id: "",
  firstName: "",
  lastName: "",
  emailId: "",
});

const EmployeeForm = ({ previousEmployeeDetails }) => {
  const navigate = useNavigate();
  const [employeeDetails, setEmployeeDetails] = useState(() =>
    getDefaultItems()
  );

  useEffect(() => {
    if (previousEmployeeDetails) {
      setEmployeeDetails(previousEmployeeDetails);
    }
  }, [previousEmployeeDetails]);

  const handleAddEmployee = async (inputEmployeeDetails) => {
    try {
      await axios.post(
        `http://localhost:9090/api/v1/employees`,
        inputEmployeeDetails
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateEmployee = async (inputEmployeeDetails) => {
    const updateEmployeeDetails = {
      id: employeeDetails._id,
      ...inputEmployeeDetails,
    };
    try {
      await axios.put(
        `http://localhost:9090/api/v1/employees/${employeeDetails._id}`,
        updateEmployeeDetails
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, emailId } = e.target;

    const inputEmployeeDetails = {
      firstName: firstName.value,
      lastName: lastName.value,
      emailId: emailId.value,
    };

    if (previousEmployeeDetails) {
      await handleUpdateEmployee(inputEmployeeDetails);
    } else {
      await handleAddEmployee(inputEmployeeDetails);
    }

    navigate(`/`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4 w-1/3 py-8 px-6 border-2 border-gray-200 rounded-xl"
    >
      <h3 class="block mb-1 font-medium self-center text-2xl text-gray-700">
        Add Employee
      </h3>
      <div class="text-gray-700">
        <label class="block mb-1 font-medium">First Name</label>
        <input
          class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          name="firstName"
          placeholder="First name"
          defaultValue={employeeDetails.firstName}
        />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1 font-medium">Last Name</label>
        <input
          class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          name="lastName"
          placeholder="Last name"
          defaultValue={employeeDetails.lastName}
        />
      </div>
      <div class="text-gray-700">
        <label class="block mb-1 font-medium">Email Id</label>
        <input
          class="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          name="emailId"
          placeholder="Email Id"
          defaultValue={employeeDetails.emailId}
        />
      </div>
      <div class="flex space-x-4">
        <button
          className="px-3 py-2 bg-green-600 text-white rounded-md"
          type="submit"
        >
          Save
        </button>
        <button className="px-3 py-2 bg-red-600 text-white rounded-md">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
