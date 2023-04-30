import React from "react";
import { createBrowserRouter,  createRoutesFromElements,  Route,  RouterProvider,} from "react-router-dom";
import Home from "./pages/Admissions";
import About from "./pages/About";
import RootLayout from "./layouts/RootLayout";
import CreateAdmission from "./pages/CreateAdmission";
import Admissions from "./pages/Admissions";
import EditAdmission from "./pages/EditAdmission";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<About />} />
      <Route path="admissions" element={<Admissions />} />
      <Route exact path="admissions/create-admission" element={<CreateAdmission />} /> 
      <Route exact path="admissions/edit-admission" element={<EditAdmission />} />
      
     </Route>
  )
);



function App() {
  return (
 
    <RouterProvider router={router} />
 
  );
}

export default App;
