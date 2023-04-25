import React, { useState, useContext } from "react";
import { Button, Card, Alert } from "@mui/material";
import Input from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import "../components/AuthForm.css";
import AuthContext from "../store/auth-context";
import { useRef } from "react";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const navigate = useNavigate();

	const { currentUser, login, isError, setIsError } = useContext(AuthContext);

	const loginHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		const enteredEmailInputRef = emailInputRef.current.value;
		const enteredPasswordInputRef = passwordInputRef.current.value;

		await login(enteredEmailInputRef, enteredPasswordInputRef);
		if (currentUser) {
			setIsLoading(false);
			navigate("/dashboard");
		} else {
			setIsLoading(false);
		}
	};

	return (
		<section className="wrapper">
			{/* <div className="centered">{isLoading && <LoadingSpinner />}</div> */}

			<div className="form-container">
				<h1 className="header-text">Login</h1>
				{isError && (
					<Alert
						severity="error"
						sx={{ mb: "0.5rem" }}
						onClose={() => setIsError("")}
					>
						{isError}
					</Alert>
				)}
				<Card className="form-group">
					<form className="form" onSubmit={loginHandler}>
						<div className="control">
							<Input
								ref={emailInputRef}
								label="Email"
								input={{
									id: "email",
									type: "email",
								}}
							/>
						</div>
						<div className="control">
							<Input
								ref={passwordInputRef}
								label="Password"
								input={{
									id: "password",
									type: "password",
								}}
							/>
						</div>
						<div className="auth-btn">
							<Button
								onClick={loginHandler}
								disabled={isLoading}
								type="submit"
								variant="contained"
								sx={{
									color: "#06283d",
									backgroundColor: "#fff",
									":hover": {
										backgroundColor: "#06283d",
										color: "#fff",
									},
								}}
							>
								{isLoading ? "Loggin in..." : "LOGIN"}
							</Button>
						</div>

						<div className="auth-text">
							Do not have an account?
							<span>
								<Link to="/sign-up" style={{ color: "#fff" }}>
									SIGN UP
								</Link>
							</span>
						</div>
						<div className="auth-text">
							<span>
								<Link to="/forgot-password" style={{ color: "#fff" }}>
									Forgot Password?
								</Link>
							</span>
						</div>
					</form>
				</Card>
			</div>
		</section>
	);
};

export default Login;
