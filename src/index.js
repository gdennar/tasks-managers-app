import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { TaskContextProvider } from "./store/task-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TaskContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</TaskContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
);
