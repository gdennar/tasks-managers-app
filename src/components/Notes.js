import React, { useContext, useState } from "react";
import { Checkbox, Tooltip } from "@mui/material";
import { Typography, IconButton } from "@mui/material";
import { Menu, MenuItem, ListItemIcon, FormControlLabel } from "@mui/material";
import TaskContext from "../store/task-context";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Card,
	CardHeader,
	CardActions,
	CardContent,
	Divider,
} from "@mui/material";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

export default function Notes(props) {
	const { label, secondLabel } = props;
	const [progress, setProgress] = useState(label);
	const [secondProgress, setSecondProgress] = useState(secondLabel);

	const [anchorEl, setAnchorEl] = useState(null);

	const taskCtx = useContext(TaskContext);
	const getTasks = taskCtx.getAllTaskHandler;
	const updateTask = taskCtx.updateTask;

	const navigate = useNavigate();

	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlefirstLabel = (e) => {
		setProgress(e.target.value);
		if (props.id !== undefined && props.id !== "") {
			updateHandler();
		}
	};

	const handleSecondLabel = (e) => {
		setSecondProgress(e.target.value);
		if (props.id !== undefined && props.id !== "") {
			updateHandler();
		}
	};

	const updateHandler = async (e) => {
		let taskInput = {
			status: progress || secondProgress,
			createdAt: serverTimestamp(),
		};

		try {
			await getTasks(props.id);
			await updateTask(props.id, taskInput);
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
			console.log(err.message);
		}
	};

	return (
		<Card
			sx={{
				maxWidth: 270,
				minHeight: 300,
				marginLeft: "20px",
				padding: "15px",
			}}
			className="note-card"
		>
			<div className="card-info">
				<CardHeader
					className="card-note-header"
					title={
						<Typography
							sx={{ fontSize: 17, textTransform: "upperCase" }}
							color="#fff"
							gutterBottom
						>
							{props.title}
						</Typography>
					}
					subheader={
						<Typography sx={{ fontSize: 14 }} color="#fff" gutterBottom>
							{props.createdAt}
						</Typography>
					}
				></CardHeader>

				<Divider />

				<CardContent sx={{ marginBottom: "25px" }}>
					<Typography variant="body2" sx={{ fontSize: 18 }}>
						{props.description}
					</Typography>
				</CardContent>
			</div>

			<Divider />
			<CardActions className="card-actions">
				<div>
					<form>
						<FormControlLabel
							className="note-form"
							sx={{ "& .MuiSvgIcon-root": { fontSize: 13 } }}
							control={<Checkbox />}
							label={label}
							name="status"
							value={label}
							onChange={handlefirstLabel}
						/>
						{secondLabel !== "" ? (
							<FormControlLabel
								className="note-form"
								sx={{ "& .MuiSvgIcon-root": { fontSize: 13 } }}
								control={<Checkbox />}
								label={secondLabel}
								name="status2"
								value={secondLabel}
								onChange={handleSecondLabel}
							/>
						) : (
							""
						)}
					</form>
				</div>

				<div>
					<Tooltip title="more">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							<MoreVertIcon sx={{ width: 32, height: 32 }} />
						</IconButton>
					</Tooltip>
					<Menu
						anchorEl={anchorEl}
						id="account-menu"
						open={open}
						onClose={handleClose}
						onClick={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								"& .MuiAvatar-root": {
									width: 32,
									height: 32,
									ml: -0.5,
									mr: 1,
								},
								"&:before": {
									content: '""',
									display: "block",
									position: "absolute",
									top: 0,
									right: 14,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								},
							},
						}}
						transformOrigin={{ horizontal: "right", vertical: "top" }}
						anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
					>
						<MenuItem onClick={props.onShowModal}>
							<ListItemIcon>
								<EditIcon fontSize="small" />
							</ListItemIcon>
							Edit
						</MenuItem>

						<MenuItem onClick={props.onDelete}>
							<ListItemIcon>
								<DeleteIcon fontSize="small" />
							</ListItemIcon>
							Delete
						</MenuItem>
					</Menu>
				</div>
			</CardActions>
		</Card>
	);
}
