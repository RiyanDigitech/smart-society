import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import LoginPage from "@/pages/Auth/LoginPage";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import RegisterUnitTable from "@/pages/RegisterUnitPages/RegisterUnitTable";
import RegisterUnitDetailPage from "@/pages/RegisterUnitPages/RegisterUnitDetailPage";
import ComplaintTable from "@/pages/ComplaintPages/ComplaintTable";
import ComplaintDetailPage from "@/pages/ComplaintPages/ComplaintDetailPage";


const router = createBrowserRouter([

  {
    path:"/login",
    element:(<PublicRoute><LoginPage /></PublicRoute>)
  },
  
  {
children: [
      {
        element: (<ProtectedRoute><DashboardLayout /></ProtectedRoute>),
        children: [
          { path: "/", element: <Home /> },
          { path: "/register-unit", element: <RegisterUnitTable /> },
          { path: "/register-unit-detail/:id", element: <RegisterUnitDetailPage /> },
          { path: "/complaint-details/:id", element: <ComplaintDetailPage /> },
          { path: "/complaint", element: <ComplaintTable /> },
        ],
      },
    ],
}
  // Catch-all for 404 errors
  
]);

export default router;
