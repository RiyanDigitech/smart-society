import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "@/pages/Home";

// import AddressAutocomplete from "@/pages/location";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    // element: <ProtectedRoute roleAllowed={["Admin", "Franchise"]} />,
    // children: [
      
     
     
    // ],
  },


  // Catch-all for 404 errors
  
]);

export default router;
