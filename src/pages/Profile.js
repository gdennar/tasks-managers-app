import React, { useRef, useState, useContext } from "react";
import { useResolvedPath } from "react-router-dom";
import { Alert, Button, Card } from "@mui/material";
import Input from "../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import "../components/AuthForm.css";
import AuthContext from "../store/auth-context";
import LoadingSpinner from "../UI/LoadingSpinner";
import TextField from "@mui/material/TextField";

const Profile = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(false);
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const confirmPasswordRef = useRef();

	const url = useResolvedPath("").pathname;

	const navigate = useNavigate();

	const {
		updateEmailHandler,
		updatePasswordHandler,
		isError,
		currentUser,
		setIsError,
	} = useContext(AuthContext);

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (passwordRef.current.value !== confirmPasswordRef.current.value) {
			return setIsError("Paswords do not match");
		}

		const promises = [];
		setIsLoading(true);
		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmailHandler(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promises.push(updatePasswordHandler(passwordRef.current.value));
		}

		Promise.all(promises)
			.then(() => {
				navigate("/");
			})
			.catch(() => {
				setIsError("Failed to update account");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<section className="main-content">
			<p className="url-path">{url}</p>
			<Card>
				<div className="centered">{isLoading && <LoadingSpinner />}</div>
				{!isLoading && (
					<div className="form-container">
						<h1 className="header-text">Update Profile</h1>

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
						<form className="form profile" onSubmit={onSubmitHandler}>
							<div className="control profile">
								<TextField
									id="filled-basic"
									label="Email"
									variant="filled"
									required
								/>
							</div>
							<div className="control profile">
								<TextField
									id="filled-basic"
									label="Password"
									variant="filled"
								/>
							</div>
							<div className="control profile">
								<TextField
									id="filled-basic"
									label="Confirm Password"
									variant="filled"
								/>
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
									UPDATE
								</Button>
							</div>
							<div className="auth-text">
								<span>
									<Link
										to="/dashboard"
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
		</section>
	);
};

export default Profile;
