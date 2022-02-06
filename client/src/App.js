import React from "react";
import { Route, Routes } from "react-router-dom"; // to define the application routes, changing which component is shown

import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

export default function App () {
    const baseURL = "http://employeedatabasegui.azurewebsites.net/api";

    // exact path means the url has to be an exact match to switch to the specified root - routes are default chosen with partial matches down the list
    return (
        <div>   
            <Navbar />
            <div className="container-fluid" style={ { backgroundColor: "#000000", height: "100vh" } }>
                <Routes>
                    <Route exact path="/" element={<RecordList baseURL={baseURL} />} />
                    <Route path="/edit/:id" element={<Edit baseURL={baseURL} />} />
                    <Route path="/create" element={<Create baseURL={baseURL} />} />
                </Routes>
            </div>
        </div>
    );
};