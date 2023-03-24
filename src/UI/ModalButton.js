import React, { useState } from "react";
import { Button } from "@mui/material";

const ModalButton = (props) => {
	return (
		<>
			<Button
				type={props.type}
				onClick={props.onClicks}
				className={props.className}
				variant="contained"
				sx={{
					color: "#fff",
					backgroundColor: "#06283d",
					marginRight: "20px",
					":hover": {
						backgroundColor: "rgba(193, 208, 219, 0.288)",
						color: "#06283d",
						border: "2px solid #06283d",
					},
				}}
			>
				{props.name}
			</Button>
		</>
	);
};

export default ModalButton;
