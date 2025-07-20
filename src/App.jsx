import React from "react";
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/login";
import Home from "./pages/Home";
import RootLayout from "./layout/RootLayout";
import Massage from "./pages/Massage";
import Notification from "./pages/Notification";
import Setting from "./pages/Setting";

// ============ React Router Dom ===========
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Registration />}></Route>
      <Route path="/login" element={<Login />}></Route>

      {/* ============== Root Layout Here ============ */}
      <Route path="/pages" element={<RootLayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="massage" element={<Massage />}></Route>
        <Route path="notification" element={<Notification />}></Route>
        <Route path="setting" element={<Setting />}></Route>
      </Route>
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
