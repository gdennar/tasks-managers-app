import React, { useState, useContext, useRef } from "react";
import AuthContext from "../store/auth-context";
import { Button, Card, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

const ForgotPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState("");
	const emailInputRef = useRef();

	const { reset, isError, setIsError } = useContext(AuthContext);

	const resetHandler = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		const enteredEmailInputRef = emailInputRef.current.value;

		await reset(enteredEmailInputRef);
		setMessage("Check your inbox for reset info");
		setIsError("Failed to reset password");
		setIsLoading(false);
	};
	return (
		<div className="wrapper">
			<Card>
				{!isLoading && (
					<div className="form-container">
						<h1 className="header-text">Password Reset</h1>

						{isError && (
							<Alert
								severity="error"
								className="centered"
								sx={{ mb: "1rem" }}
								onClose={() => setIsError("")}
							>
								{isError}
							</Alert>
						)}
						{message && (
							<Alert
								severity="success"
								className="centered"
								sx={{ mb: "1rem" }}
								onClose={() => setMessage("")}
							>
								{message}
							</Alert>
						)}
						<form className="form profile" onSubmit={resetHandler}>
							<div className="control profile">
								<TextField id="filled-basic" label="email" variant="filled" />
							</div>

							<div className="auth-btn">
								<Button
									type="submit"
									disabled={isLoading}
									variant="contained"
									sx={{
										color: "",
										backgroundColor: "#06283d",
										":hover": {
											backgroundColor: "#06283d",
											color: "#fff",
										},
									}}
								>
									Reset Password
								</Button>
							</div>
							<div className="auth-text">
								<span>
									<Link
										to="/"
										style={{
											color: "#06283d",
											fontSize: "1.2rem",
											textDecoration: "none",
										}}
									>
										Cancel
									</Link>
								</span>
							</div>
						</form>
					</div>
				)}
			</Card>
		</div>
	);
};

export default ForgotPassword;
