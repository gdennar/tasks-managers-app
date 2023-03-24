import React, { useContext, useEffect, useState } from "react";
import { useResolvedPath } from "react-router-dom";
import Notes from "../components/Notes";
import TaskContext from "../store/task-context";
import { Alert, Grid } from "@mui/material";
import LoadingSpinner from "../UI/LoadingSpinner";
import EditTask from "../components/EditTask";
import AuthContext from "../store/auth-context";

export default function Pending(props) {
	const [tasks, setTasks] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	//const [message, setMessage] = useState("");
	const [modalIsShown, setModalIsShown] = useState(false);
	const [taskId, setTaskId] = useState("");

	const url = useResolvedPath("").pathname;

	const taskCtx = useContext(TaskContext);
	const getTasks = taskCtx.getPendingTaskHandler;
	const deleteTasks = taskCtx.deleteTask;

	const { currentUser } = useContext(AuthContext);

	const usersFilteredTask = tasks.filter(
		(task) => task.uid === currentUser.uid
	);

	const getAllTask = async (uid) => {
		try {
			setLoading(true);
			const docsSnap = await getTasks();
			setTasks(docsSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
			// if (docsSnap.empty) {
			// 	setMessage("You have no task pending");
			// }

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

					{usersFilteredTask.length === 0 ? (
						<Alert severity="info" className="centered" sx={{ mt: "1rem" }}>
							You have no pending task...
						</Alert>
					) : (
						<Grid container spacing={2} p={2} className="task-content">
							{usersFilteredTask.map((task) => {
								return (
									<Grid item xs={12} sm={6} md={4} lg={3} key={task.id}>
										<Notes
											id={task.id}
											title={task.title}
											description={task.description}
											label={task.status === "pending" && "in progress"}
											secondLabel={task.status === "pending" && "completed"}
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
}
