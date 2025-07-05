// import libraries
import { Suspense } from 'react';
import { RouterProvider } from "react-router-dom";

// import components
import { router } from "@/routes/Route";
function App() {
  return (
    <Suspense>
        <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;