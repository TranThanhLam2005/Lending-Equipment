import { Suspense } from 'react';
import { RouterProvider } from "react-router-dom";
import Loading from '@/components/ui/Loading';
import { router } from "@/routes/Route";

function App() {
  return (
    <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;