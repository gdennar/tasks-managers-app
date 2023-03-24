import DashboardIcon from "@mui/icons-material/Dashboard";
import StartIcon from "@mui/icons-material/Start";
import PendingIcon from "@mui/icons-material/Pending";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import BarChartIcon from "@mui/icons-material/BarChart";

export const sidebarData = [
	{
		id: 1,
		text: "Dashboard",
		path: "/dashboard",
		icon: <DashboardIcon />,
	},
	{
		id: 2,
		text: "Pending",
		path: "/pending",
		icon: <PendingIcon />,
	},
	{
		id: 3,
		text: "In progress",
		path: "/progress",
		icon: <StartIcon />,
	},
	{
		id: 4,
		text: "Completed",
		path: "/completed",
		icon: <LibraryAddCheckIcon />,
	},
	{
		id: 5,
		text: "Reports",
		path: "/report",
		icon: <BarChartIcon />,
	},
];
