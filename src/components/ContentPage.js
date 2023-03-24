import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./ContentPage.css";
import { NavLink, Outlet } from "react-router-dom";
import { Card } from "@mui/material";
import Dashboard from "../pages/Dashboard";
import Completed from "../pages/Completed";
import Progress from "../pages/InProgress";
import Pending from "../pages/Pending";
import Report from "../pages/Report";
import AddTask from "../pages/AddTask";
import SignUp from "../pages/SignUp";

const Content = (props) => {
	return (
		<section className="main-content">
			<p>Hello</p>
		</section>
	);
};

export default Content;
