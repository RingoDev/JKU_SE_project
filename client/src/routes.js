import Dashboard from "./views/Dashboard.jsx";
import TableList from "./views/TableList.jsx";
import Maps from "./views/Maps.jsx";
import Create from "./views/Create";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Event List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/create",
    name: "Create",
    icon: "pe-7s-science",
    component: Create,
    layout: "/admin"
  },
];

export default dashboardRoutes;
