// import libraries
import {lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import {Suspense} from "react";

// import routes
import {ROUTES} from "../api/config";

// import services and auth
import {
  equipmentService,
  courseService,
  userService,
  lendingService,
} from "../api";
import type {LoaderFunctionArgs} from "react-router-dom";
import {authService} from "../api/auth.service";

// Pages
const Account = lazy(() => import("../pages/Account"));
const StudentDashBoard = lazy(
  () => import("../pages/student/StudentDashBoard")
);
const StudentEquipment = lazy(
  () => import("../pages/student/StudentEquipment")
);
const StudentRecord = lazy(() => import("../pages/student/StudentRecord"));
const MyCourse = lazy(() => import("../pages/student/MyCourse"));
const MyCourseDetail = lazy(() => import("../pages/student/MyCourseDetail"));
const BrowseCourse = lazy(() => import("../pages/student/BrowseCourse"));
const EquipmentDetail = lazy(() => import("../pages/student/EquipmentDetail"));

const Visitor = lazy(() => import("../pages/visitor/Visitor"));
const Login = lazy(() => import("../pages/auth/Login"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));

const LandingPage = lazy(() => import("../pages/other/LandingPage"));
import LoadingPage from "../components/ui/common/LoadingPage";
// Layouts
const DefaultLayout = lazy(() => import("../layouts/DefaultLayout"));

// Error Page
const ErrorPage = lazy(() => import("../pages/other/ErrorPage"));

// Router
const router = createBrowserRouter([
  // Public Route
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <LandingPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.VISITOR,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Visitor />
      </Suspense>
    ),
    loader: async () => {
      const res = await equipmentService.getAll();
      return res.data;
    },
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <ForgotPassword />
      </Suspense>
    ),
  },

  // Private Routes with Default Layout
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<LoadingPage />}>
        <DefaultLayout />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.STUDENT_DASHBOARD,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <StudentDashBoard />
          </Suspense>
        ),
        loader: async () => {
          await authService.verifySession();
          return null;
        },
      },
      {
        path: ROUTES.MY_COURSE,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MyCourse />
          </Suspense>
        ),
        loader: async () => {
          await authService.verifySession();
          const res = await courseService.getParticipantCourses();
          return res.data;
        },
      },
      {
        path: ROUTES.MY_COURSE_DETAIL(":id"),
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MyCourseDetail />
          </Suspense>
        ),
        loader: async ({params}: LoaderFunctionArgs) => {
          const {id} = params!;
          await authService.verifySession();
          const res = await courseService.getCourseDetail(id!);
          return res.data;
        },
      },
      {
        path: ROUTES.BROWSE_COURSE,
        element: <BrowseCourse />,
      },
      {
        path: ROUTES.STUDENT_EQUIPMENT,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <StudentEquipment />
          </Suspense>
        ),
        loader: async () => {
          await authService.verifySession();
          const res = await equipmentService.getParticipantEquipment();
          return res.data;
        },
      },
      {
        path: ROUTES.STUDENT_EQUIPMENT_DETAIL(":id"),
        element: (
          <Suspense fallback={<LoadingPage />}>
            <EquipmentDetail />
          </Suspense>
        ),
        loader: async ({params}: LoaderFunctionArgs) => {
          const {id} = params!;
          await authService.verifySession();
          const [equipmentRes, userRes] = await Promise.all([
            equipmentService.getEquipmentDetail(id!),
            userService.getUserBySession(),
          ]);
          return {equipment: equipmentRes.data, user: userRes.data};
        },
      },
      {
        path: ROUTES.STUDENT_RECORD,
        element: (
          <Suspense fallback={<LoadingPage />}>
            <StudentRecord />
          </Suspense>
        ),
        loader: async () => {
          await authService.verifySession();
          const res = await lendingService.getUserLendingRecords();
          return res.data;
        },
      },
      {
        path: ROUTES.ACCOUNT,
        element: <Account />,
        // loader: async () => {
        //     const res = await fetch('/api/record');
        //     return res.json();
        // },
      },
    ],
  },
]);
export default router;
