import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/header";
import AddEmployeePage from "./pages/add-employee";
import EmployeePage from "./pages/employee";
import UpdateEmployeePage from "./pages/update-employee";
import ViewEmployeePage from "./pages/view-employee";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<EmployeePage />} />
        <Route path="/add-employee" element={<AddEmployeePage />} />
        <Route path="/view-employee/:id" element={<ViewEmployeePage />} />
        <Route path="/update-employee/:id" element={<UpdateEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
