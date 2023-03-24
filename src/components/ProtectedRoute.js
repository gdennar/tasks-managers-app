import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const authCtx = useContext(AuthContext);
	const user = authCtx.currentUser;

	if (!user) {
		return <Navigate to="/" />;
	}
	return <div>{children}</div>;
};

export default ProtectedRoute;
