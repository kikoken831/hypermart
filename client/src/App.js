import React from "react";
import './App.scss';
import { Route, Routes } from "react-router-dom";
import {Login} from "./admin/Login";
import {AdminView} from "./admin/AdminView";
import {RequireAuth} from "react-auth-kit";
import {CustomerView} from "./customer/CustomerView";

function App() {

  return (
      <>
        <Routes>
            <Route path="/admin" element={<Login/>}></Route>
            <Route path="/admin/*" element={
                <RequireAuth
                    loginPath={"/admin"}
                    authType={"cookie"}
                    authName={"_auth"}
                    cookieDomain={window.location.hostname}
                    cookieSecure={false}
                    redirectPath={"/admin"}>
                    <AdminView/>
                </RequireAuth>}></Route>
            <Route path="/" element={<CustomerView/>}></Route>
            <Route path="*" element={<>
            <div className="container">
                <h1>404 or user view</h1>
            </div>
            </>}>
            </Route>
        </Routes>
      </>
  );
}

export default App;