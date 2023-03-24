import React, { useContext } from "react";
import AuthContext from "../store/auth-context";
import { Link } from "react-router-dom";
import HeaderProfile from "./HeaderProfile";
import ModalButton from "../UI/ModalButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "./Header.css";

const Header = ({ onMenuClick, showSideBar }) => {
	const { isLoggedIn } = useContext(AuthContext);

	const classes = `${isLoggedIn ? "header-login" : "header-logout"}`;
	const menu = `${isLoggedIn ? "menu" : "menu-out"}`;

	return (
		<>
			<header className={classes}>
				<div className="logo">
					<span className={menu} onClick={onMenuClick}>
						{showSideBar ? <CloseIcon /> : <MenuIcon />}
					</span>
					Tasks Manager
				</div>
				<nav>
					<ul className="navItems">
						{isLoggedIn && (
							<li>
								<Link to="/add-task" className="nav-btn">
									<ModalButton className="navv-btn" name="New Task" />
								</Link>
							</li>
						)}
						{isLoggedIn && (
							<li>
								<HeaderProfile className="profile" />
							</li>
						)}
					</ul>
				</nav>
			</header>
		</>
	);
};

export default Header;
