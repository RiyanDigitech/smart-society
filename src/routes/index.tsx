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

import RegisterUnitDetailPage from "@/pages/RegisterUnitPages/RegisterUnitDetailPage";
import ComplaintTable from "@/pages/ComplaintPages/ComplaintTable";
import ComplaintDetailPage from "@/pages/ComplaintPages/ComplaintDetailPage";
import Expense from "@/pages/expense/Expense";

import VehicleTable from "@/pages/Vehicle/VehicleTable";
import AnnoucementTable from "@/pages/Annoucement/AnnoucementTable";
import Community from "@/pages/community/Community";



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
          { path: "/vehicle", element: <VehicleTable /> },
          { path: "/annoucement", element: <AnnoucementTable /> },


          { path: "/register-unit-detail/:id", element: <RegisterUnitDetailPage /> },
          { path: "/complaint-details/:id", element: <ComplaintDetailPage /> },
          { path: "/complaint", element: <ComplaintTable /> },
          { path: "/expenses", element: <Expense /> },
          { path: "/community", element: <Community /> },

        ],
      },
    ],
}
  // Catch-all for 404 errors
  
]);

export default router;
