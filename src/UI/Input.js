import React from "react";
import "./Input.css";

const Input = React.forwardRef((props, ref) => {
	// const classes = "input " + props.className;
	return (
		<div className="input">
			<label htmlFor={props.input.id}>{props.label}</label>
			<input ref={ref} {...props.input} />
		</div>
	);
});

export default Input;
