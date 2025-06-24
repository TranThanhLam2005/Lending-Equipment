// import libraries
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// Pages
const Account = lazy(() => import('../pages/Account'));
const StudentDashBoard = lazy(() => import('../pages/student/StudentDashBoard'));
const StudentEquipment = lazy(() => import('../pages/student/StudentEquipment'));
const StudentRecord = lazy(() => import('../pages/student/StudentRecord'));
const MyCourse = lazy(() => import('../pages/student/MyCourse'));
const MyCourseDetail = lazy(() => import('../pages/student/MyCourseDetail'));
const BrowseCourse = lazy(() => import('../pages/student/BrowseCourse'));
const EquipmentDetail = lazy(() => import('../pages/student/EquipmentDetail'));

const Visitor = lazy(() => import('../pages/visitor/Visitor'));
const Login = lazy(() => import('../pages/auth/Login'));
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'));

// Layouts
const DefaultLayout = lazy(() => import('../layouts/DefaultLayout'));


// import loaders
import {myStudentCourseDetailLoader, loadEquipment, studentDashboardLoader,
     myStudentCourseLoader,myStudentEquipmentParticipant} from '../utils/loaders';

// Error Page
const ErrorPage = lazy(() => import('../pages/other/ErrorPage'));


// Router
export const router = createBrowserRouter([
    // Public Route
    {
        path: '/visitor',
        element: <Visitor />,
        loader: loadEquipment, 
        errorElement: <ErrorPage />,
    },
    {
        path:'/login',
        element: <Login />, 
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },

    // Private Routes with Default Layout
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <StudentDashBoard />,
                loader: studentDashboardLoader,
            },
            {
                path: '/course/my_course',
                element: <MyCourse />,
                loader: myStudentCourseLoader,
            },
            {
                path: '/course/my_course/:id',
                element: <MyCourseDetail />,
                loader: myStudentCourseDetailLoader,
            },
            {
                path: '/course/browse_course',
                element: <BrowseCourse />,
            },
            {
                path: '/student_equipment',
                element: <StudentEquipment />,
                loader: myStudentEquipmentParticipant,
            },
            {
                path: '/student_equipment/:id',
                element: <EquipmentDetail />,
                // loader: async () => {
                //     const res = await fetch('/api/equipment');
                //     return res.json();
                // },
            },
            {
                path: '/student_record',
                element: <StudentRecord />,
                // loader: async () => {
                //     const res = await fetch('/api/record');
                //     return res.json();
                // },
            },
            {
                path: '/account',
                element: <Account />,
                // loader: async () => {
                //     const res = await fetch('/api/record');
                //     return res.json();
                // },
            },
        ],
    }
]);
