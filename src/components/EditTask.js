import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TaskContext from "../store/task-context";
import AuthContext from "../store/auth-context";
import { serverTimestamp } from "firebase/firestore";
import { Alert } from "@mui/material";

function EditTask({ id, open, close, setTaskId }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");

	const authCtx = useContext(AuthContext);
	const user = authCtx.currentUser;

	const taskCtx = useContext(TaskContext);
	const getTasks = taskCtx.getAllTaskHandler;
	const updateTask = taskCtx.updateTask;

	const editHandler = async () => {
		try {
			const docSnap = await getTasks(id);
			// Ask
			setTitle(docSnap.data().title);
			setDescription(docSnap.data().description);
		} catch (err) {
			setError(err.message);
		}
	};

	useEffect(() => {
		if (id !== undefined && id !== "") {
			editHandler();
		}
	}, [id]);

	const updateHandler = async (e) => {
		e.preventDefault();
		setMessage("Updating Task...");

		let taskInput = {
			uid: user.uid,
			title: title,
			description: description,
			createdAt: serverTimestamp(),
		};
		try {
			await updateTask(id, taskInput);
			setMessage("Task Updated successfully");
			close();
			setMessage("");
			setTaskId("");
		} catch (err) {
			setError(err.message);
			setError("");
		}
	};

	return (
		<div>
			{/* <Button variant="outlined" onClick={handleClickOpen}>
				Open form dialog
			</Button> */}
			<Dialog open={open}>
				<DialogTitle>Update Task</DialogTitle>
				{error ? (
					<Alert severity="error" className="centered" sx={{ mt: "1rem" }}>
						{error}
					</Alert>
				) : (
					""
				)}
				{message ? (
					<Alert severity="success" className="centered" sx={{ mt: "1rem" }}>
						{message}
					</Alert>
				) : (
					""
				)}
				<DialogContent>
					<DialogContentText>Enter your update</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Title"
						type="text"
						fullWidth
						variant="standard"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<TextField
						autoFocus
						margin="dense"
						id="description"
						label="Description"
						type="text"
						fullWidth
						variant="standard"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={close}>Cancel</Button>
					<Button onClick={updateHandler}>Update</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditTask;
