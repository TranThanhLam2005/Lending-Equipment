// import libraries
import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";

// import components
import router from "@/routes/Route";
import LoadingPage from "@/components/ui/common/LoadingPage";
function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
