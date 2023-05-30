import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import About from "../../pages/About/About.js";
import HomeDash from "../../pages/Dashboard/HomeDash/HomeDash.js";
import CategoriesDash from "../../pages/Dashboard/CategoriesDash/CategoriesDash.js";
import AdminsDash from "../../pages/Dashboard/AdminsDash/AdminsDash.js";
import LocationsDash from "../../pages/Dashboard/LocationsDash/LocationsDash.js";
import ErrorPage from "../../pages/ErrorPage/ErrorPage.js";
import Signup from "../../pages/Signup/Signup.js";
import Login from "../../pages/Login/Login";
import Unauthorized from "../../pages/Unauthorized/Unauthorized.js";
import AddListItems from "../../pages/AddListItems/AddListItem.js";
import PrivateRoutes from "./privateRoute";
import PrivateDashboard from "./PrivateDashboard.js";
export default function AllRoutes() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />} />

            <Route path="*" element={<ErrorPage />} />
            <Route path="/profile" element={<AddListItems />} />
            <Route path="/about" element={<About /> } />

            <Route element={<PrivateDashboard />}>
              <Route path="/dashboard" element={<HomeDash />} />
              <Route path="/dashboard/categories"  element={<CategoriesDash />}/>
              <Route path="/dashboard/locations" element={<LocationsDash />} />
              <Route path="/dashboard/admins" element={<AdminsDash />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
