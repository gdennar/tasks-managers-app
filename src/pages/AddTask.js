import React from "react";
import TaskForm from "../components/TaskForm";
import { TaskContextProvider } from "../store/task-context";

const AddTask = () => {
	return (
		<section className="main-content">
			<div className="add-task-form">
				<TaskContextProvider>
					<TaskForm />
				</TaskContextProvider>
			</div>
		</section>
	);
};

export default AddTask;
