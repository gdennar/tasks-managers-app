import React, { useContext, useState } from "react";
import { Button, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const mystyle = {
	color: "#06283d",
	backgroundColor: "#fff",
	padding: "0.3rem 1rem",
	fontWeight: "600",
	boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.25)",
	borderRadius: "25px",
};

export default function HeaderProfile() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [error, setError] = useState("");
	const open = Boolean(anchorEl);

	const { logout, currentUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		try {
			await logout();
			navigate("/");
		} catch {
			setError("Failed to log out");
		}
	};

	const profileHandler = () => {
		handleClose();
		navigate("/profile");
	};

	return (
		<div className="profile-container">
			<Tooltip title="Profile">
				{error ? (
					<p>{error}</p>
				) : (
					<Button
						style={mystyle}
						id="demo-positioned-button"
						aria-controls={open ? "demo-positioned-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
						sx={{
							":hover": {
								border: "2px solid #06283d",
							},
						}}
					>
						<span className="icon" style={{ marginRight: "5px" }}>
							<PersonIcon />
						</span>
						<span className="name-icon">{currentUser.email.slice(0, 1)}</span>
					</Button>
				)}
			</Tooltip>
			<Menu
				id="demo-positioned-menu"
				className="profile-button"
				aria-labelledby="demo-positioned-button"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
				sx={{
					zIndex: "99",
				}}
			>
				<MenuItem onClick={profileHandler}>Profile</MenuItem>
				<MenuItem onClick={handleLogout}>Logout</MenuItem>
			</Menu>
		</div>
	);
}
