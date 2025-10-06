import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import LoginPage from "@/pages/Auth/LoginPage";
import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import RegisterUnitTable from "@/pages/RegisterUnitPages/RegisterUnitTable";
import VisitorTable from "@/pages/Visitors/VisitorTable";
import StaffTable from "@/pages/Staff/StaffTable";
import EmergencyTable from "@/pages/Emergency/EmergencyTable";


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
          { path: "/visitors", element: <VisitorTable /> },
          { path: "/staff", element: <StaffTable /> },
          { path: "/emergency", element: <EmergencyTable /> },

        ],
      },
    ],
}
  // Catch-all for 404 errors
  
]);

export default router;
