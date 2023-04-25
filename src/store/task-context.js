import { createContext, useState, useContext } from "react";
import AuthContext from "./auth-context";
import {
	collection,
	addDoc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
	doc,
	where,
	query,
} from "firebase/firestore";
import { db } from "../firebase-config";

const TaskContext = createContext({
	title: "",
	description: "",
	status: "",
	addTask: () => {},
	updateTask: () => {},
	deleteTask: () => {},
	deleteAllTask: () => {},
	editTask: () => {},
});

export const TaskContextProvider = ({ children }) => {
	const [countCompleted, setCountCompleted] = useState([]);
	const [countPending, setCountPending] = useState([]);
	const [countProgress, setCountProgress] = useState([]);
	const { currentUser } = useContext(AuthContext);

	const taskCollectionRef = collection(db, "tasks");

	const completed = query(
		taskCollectionRef,
		where("status", "==", "completed")
	);

	const pending = query(taskCollectionRef, where("status", "==", "pending"));

	const inProgress = query(
		taskCollectionRef,
		where("status", "==", "in progress")
	);

	const addTaskHandler = (taskInput) => {
		return addDoc(taskCollectionRef, taskInput);
	};

	const updateTaskHandler = (id, taskInput) => {
		const taskDoc = doc(db, "tasks", id);
		return updateDoc(taskDoc, taskInput);
	};

	const deleteTaskHandler = async (id) => {
		const taskDoc = doc(db, "tasks", id);
		return deleteDoc(taskDoc);
	};

	const deleteAllTaskHandler = (taskInput) => {
		return db.remove();
	};

	const getAllTaskHandler = (id) => {
		const taskDoc = doc(db, "tasks", id);
		return getDoc(taskDoc);
	};

	const getCompletedTaskHandler = async () => {
		const onSnapdoc = await getDocs(completed);
		const docs = onSnapdoc.docs;
		setCountCompleted(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		// return onSnapdoc;
	};
	const getPendingTaskHandler = async () => {
		const onSnapdoc = await getDocs(pending);
		const docs = onSnapdoc.docs;
		setCountPending(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		// return onSnapdoc;
	};
	const getInProgressTaskHandler = async () => {
		const onSnapdoc = await getDocs(inProgress);
		const docs = onSnapdoc.docs;
		setCountProgress(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		// return onSnapdoc;
	};

	const editTaskHandler = (id) => {
		const taskDoc = doc(db, "tasks", id);
		return getDoc(taskDoc);
	};

	const filteredPendingTask = countPending.filter(
		(task) => task.uid === currentUser.uid
	);
	const filteredProgressTask = countProgress.filter(
		(task) => task.uid === currentUser.uid
	);
	const filteredCompletedTask = countCompleted.filter(
		(task) => task.uid === currentUser.uid
	);

	const contextValue = {
		addTask: addTaskHandler,
		updateTask: updateTaskHandler,
		deleteTask: deleteTaskHandler,
		deleteAllTask: deleteAllTaskHandler,
		getCompletedTaskHandler,
		getInProgressTaskHandler,
		getPendingTaskHandler,
		getAllTaskHandler,
		editTask: editTaskHandler,
		taskCollectionRef,
		filteredPendingTask,
		filteredProgressTask,
		filteredCompletedTask,
	};

	return (
		<TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
	);
};

export default TaskContext;
