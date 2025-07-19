import React from "react";
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/Registration";

// ============ React Router Dom ===========
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
