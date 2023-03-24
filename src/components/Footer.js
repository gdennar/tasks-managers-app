import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<>
			<div className="footer-nav">
				<div className="footer-info">
					Copyright © {new Date().getFullYear()} 💛 Golden Tanimowo
				</div>
			</div>
		</>
	);
};

export default Footer;
