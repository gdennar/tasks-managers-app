import React, { useRef, useState, useContext } from "react";
import Input from "../UI/Input";
import "./TaskForm.css";
import TaskContext from "../store/task-context";
import ModalButton from "../UI/ModalButton";
import { Card, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import { serverTimestamp } from "firebase/firestore";

const TaskForm = (props) => {
	const [options, setOptions] = useState("");
	const [message, setMessage] = useState({ error: false, msg: "" });

	const taskCtx = useContext(TaskContext);
	const addTask = taskCtx.addTask;

	const authCtx = useContext(AuthContext);
	const user = authCtx.currentUser;

	const navigate = useNavigate();

	const titleInputRef = useRef();
	const descriptionInputRef = useRef();

	const handleClose = () => {
		navigate("/dashboard");
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		const enteredTitleInputRef = titleInputRef.current.value;
		const enteredDescriptionInputRef = descriptionInputRef.current.value;

		let taskInput = {
			uid: user.uid,
			title: enteredTitleInputRef,
			description: enteredDescriptionInputRef,
			status: options,
			createdAt: serverTimestamp(),
		};

		if (taskInput.title === "" || taskInput.description === "") {
			setMessage({ error: true, msg: "Please fill all fields" });
			return;
		}

		console.log(taskInput);

		try {
			await addTask(taskInput);
			console.log(taskInput);
			setMessage({ error: false, msg: "New task added" });
			if (taskInput.status === "pending" || taskInput.status === "none") {
				navigate("/pending");
			} else if (taskInput.status === "in progress") {
				navigate("/progress");
			} else if (taskInput.status === "completed") {
				navigate("/completed");
			} else {
				navigate("/dashboard");
			}
		} catch (err) {
			setMessage({ error: true, msg: err.message });
		}
	};

	return (
		<Card className="task-form-card">
			{message?.msg && (
				<Alert
					severity={message?.error ? "error" : "success"}
					className="centered"
					sx={{ mb: "1rem" }}
					onClose={() => setMessage("")}
				>
					{message?.msg}
				</Alert>
			)}
			<form onSubmit={onSubmit}>
				<div className="task-input">
					<Input
						className="form-input"
						ref={titleInputRef}
						label="Title"
						input={{
							id: "title",
							type: "text",
						}}
					/>
				</div>

				<div className="task-input">
					<label htmlFor="Description">Description</label>
					<textarea
						className="form-input"
						type="text"
						name="description"
						rows="10"
						cols="50"
						id="description"
						ref={descriptionInputRef}
					/>
				</div>
				<div className="task-input">
					<label for="status">Status</label>

					<select
						name="status"
						id="status"
						onChange={(e) => setOptions(e.target.value)}
						value={options}
					>
						<option value="none">none</option>
						<option value="pending">pending</option>
						<option value="in progress">in progress</option>
						<option value="completed">completed</option>
					</select>
				</div>
				<div className="task-btns">
					<ModalButton name="Add Task" type="submit" className="task-btn" />
					<ModalButton
						name="Cancel"
						type="submit"
						className="task-btn"
						onClicks={handleClose}
					/>
				</div>
			</form>
		</Card>
	);
};

export default TaskForm;
