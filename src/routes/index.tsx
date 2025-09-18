import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import DashboardPage from "@/pages/Home";

// import AddressAutocomplete from "@/pages/location";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />,
  //   index: true,
  // },
  // {
    // element: <ProtectedRoute roleAllowed={["Admin", "Franchise"]} />,
    // children: [
      
     
     
    // ],
  // },
  {
children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: "/", element: <Home /> },

          // { path: "/franchise-list", element: <FranchiseList /> },
          // { path: "/lead-list", element: <LeadList /> },
        ],
      },
    ],
}
  // Catch-all for 404 errors
  
]);

export default router;
