import { Route, Routes } from "react-router-dom";
import React, { useContext, useState } from "react";
import AuthContext from "./store/auth-context";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Completed from "./pages/Completed";
import Progress from "./pages/InProgress";
import Pending from "./pages/Pending";
import Report from "./pages/Report";
import AddTask from "./pages/AddTask";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
	const [showSideBar, setShowSideBar] = useState(true);

	const { isLoggedIn } = useContext(AuthContext);

	const handleSideBar = () => {
		setShowSideBar(!showSideBar);
	};

	// const OptimizeTasks = React.lazy(() => import("./pages/Dashboard"));

	return (
		<>
			<Header onMenuClick={handleSideBar} showSideBar={showSideBar} />
			{isLoggedIn ? (
				<SideBar open={showSideBar} onMenuClicks={handleSideBar} />
			) : (
				""
			)}
			<main>
				<Routes>
					{!isLoggedIn && <Route path="/" element={<Login />} />}
					<Route path="/sign-up" element={<SignUp />} />
					<Route
						path="/add-task"
						element={
							<ProtectedRoute>
								<AddTask />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
					<Route path="/forgot-password" element={<ForgotPassword />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/pending"
						element={
							<ProtectedRoute>
								<Pending />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/progress"
						element={
							<ProtectedRoute>
								<Progress />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/completed"
						element={
							<ProtectedRoute>
								<Completed />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/report"
						element={
							<ProtectedRoute>
								<Report />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</main>
			{!isLoggedIn && <Footer />}
		</>
	);
}

export default App;
