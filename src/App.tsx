import { Suspense } from 'react';
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/Route";
import LandingPage from "@/pages/other/LandingPage";

function App() {
  return (
    <Suspense fallback={<LandingPage />}>
        <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;