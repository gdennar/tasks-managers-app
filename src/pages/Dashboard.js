import React, { useEffect, useContext } from "react";
import { useResolvedPath } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TaskContext from "../store/task-context";
import StartIcon from "@mui/icons-material/Start";
import PendingIcon from "@mui/icons-material/Pending";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Paper } from "@mui/material";

export default function Dashboard(props) {
	const taskCtx = useContext(TaskContext);
	const url = useResolvedPath("").pathname;

	const getComplete = taskCtx.getCompletedTaskHandler;
	const getPending = taskCtx.getPendingTaskHandler;
	const getProgress = taskCtx.getInProgressTaskHandler;

	useEffect(() => {
		getComplete();
		getPending();
		getProgress();
	}, []);

	return (
		<section className="main-content" close={props.close}>
			<p className="url-path">{url}</p>

			<Grid container spacing={2} p={2}>
				<Grid item xs={12} sm={6} md={3}>
					<Paper className="dashboard-paper">
						<div className="dashboard-items">
							<div className="dashboard-status">Pending</div>
							<div className="dashboard-icon">
								<PendingIcon />
							</div>
						</div>

						<div className="dashboard-item">
							{taskCtx.filteredPendingTask.length}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper className="dashboard-paper">
						<div className="dashboard-items">
							<div className="dashboard-status">In progress</div>
							<div className="dashboard-icon">
								<StartIcon />
							</div>
						</div>

						<div className="dashboard-item one">
							{taskCtx.filteredProgressTask.length}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper className="dashboard-paper">
						<div className="dashboard-items">
							<div className="dashboard-status">Completed</div>
							<div className="dashboard-icon">
								<LibraryAddCheckIcon />
							</div>
						</div>

						<div className="dashboard-item two">
							{taskCtx.filteredCompletedTask.length}
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Paper className="dashboard-paper">
						<div className="dashboard-items">
							<div className="dashboard-status">Total Tasks</div>
							<div className="dashboard-icon">
								<PendingIcon />
							</div>
						</div>

						<div className="dashboard-item three">
							{taskCtx.filteredProgressTask.length +
								taskCtx.filteredCompletedTask.length +
								taskCtx.filteredPendingTask.length}
						</div>
					</Paper>
				</Grid>
			</Grid>
		</section>
	);
}
