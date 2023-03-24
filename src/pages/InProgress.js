import React, { useState, useContext, useEffect } from "react";
import { useResolvedPath } from "react-router-dom";
import Content from "../components/ContentPage";
import { Alert } from "@mui/material";
import LoadingSpinner from "../UI/LoadingSpinner";
import Grid from "@mui/material/Grid";
import TaskContext from "../store/task-context";
import Notes from "../components/Notes";
import EditTask from "../components/EditTask";
import AuthContext from "../store/auth-context";

const InProgress = () => {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [modalIsShown, setModalIsShown] = useState(false);
	const [taskId, setTaskId] = useState("");

	const taskCtx = useContext(TaskContext);
	const getTasks = taskCtx.getInProgressTaskHandler;
	const deleteTasks = taskCtx.deleteTask;
	const { currentUser } = useContext(AuthContext);

	const url = useResolvedPath("").pathname;

	const usersFilteredTask = tasks.filter(
		(task) => task.uid === currentUser.uid
	);

	const getAllTask = async (uid) => {
		try {
			setLoading(true);
			const docsSnap = await getTasks();
			setTasks(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			if (docsSnap.empty) {
				setMessage("You have no task in progress");
			}
			setLoading(false);
		} catch (err) {
			setError(err.message);
		}
		setError("");
	};

	useEffect(() => {
		getAllTask();
	}, []);

	const deleteHandler = async (id) => {
		try {
			await deleteTasks(id);
			getAllTask();
		} catch (err) {
			console.log(err.message);
		}
	};

	const showModalHandler = (id) => {
		setTaskId(id);
		setModalIsShown(true);
	};
	return (
		<section className="main-content">
			{loading ? (
				<div className="centered">
					<LoadingSpinner />
				</div>
			) : (
				<div>
					{error ? (
						<Alert severity="error" className="centered" sx={{ mt: "1rem" }}>
							{error}
						</Alert>
					) : (
						<p className="url-path">{url}</p>
					)}
					{message && (
						<Alert severity="warning" className="centered" sx={{ mt: "1rem" }}>
							{message}
						</Alert>
					)}
					{usersFilteredTask.length === 0 ? (
						<Alert severity="info" className="centered" sx={{ mt: "1rem" }}>
							You have no task in progress...
						</Alert>
					) : (
						<Grid container spacing={2} p={2} className="task-content">
							{usersFilteredTask.map((task) => {
								return (
									<Grid item xs={12} sm={6} md={3} key={task.id}>
										<Notes
											id={task.id}
											title={task.title}
											description={task.description}
											label={task.status === "in progress" ? "completed" : ""}
											secondLabel={task.status === "in progress" && ""}
											createdAt={new Date(
												task.createdAt.seconds * 1000
											).toLocaleDateString("en-US")}
											onDelete={deleteHandler.bind(null, task.id)}
											onShowModal={showModalHandler.bind(null, task.id)}
											setTaskId={setTaskId}
										></Notes>
									</Grid>
								);
							})}
						</Grid>
					)}

					<EditTask
						open={modalIsShown}
						close={() => setModalIsShown(false)}
						id={taskId}
						setTaskId={setTaskId}
					/>
				</div>
			)}
		</section>
	);
};

export default InProgress;
