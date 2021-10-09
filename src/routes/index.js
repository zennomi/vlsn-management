import async from "../components/Async";

import {
 
  Layout as LayoutIcon,
  Home as HomeIcon,
  Monitor as MonitorIcon,
  Users as UsersIcon,
  Book as BookIcon
} from "react-feather";

// Landing


// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";
import withAuth from "../hoc/withAuth";

// Layouts
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";

// Misc
import Blank from "../pages/misc/Blank";
import Atten from "../pages/misc/Atten";
// Pages
import Profile from "../pages/pages/Profile";
import Settings from "../pages/pages/Settings";
import Clients from "../pages/pages/Clients";
// import Projects from "../pages/pages/Projects";
// import Invoice from "../pages/pages/Invoice";
// import Pricing from "../pages/pages/Pricing";
// import Tasks from "../pages/pages/Tasks";
// import Chat from "../pages/pages/Chat";
import ListClass from "../pages/pages/ListClass";
import Attendance from "../pages/pages/Attendance";
import CreateClass from "../pages/dashboards/Classroom/CreateClass";
import StudentProfile from "../pages/pages/StudentProfile";
import AbsentStudent from "../pages/pages/AbsentStudent";
import StudentHomeWork from "../pages/pages/StudentHomeWork";
import StudentCostInfo from "../pages/pages/StudentCostInfo";
import StudentScorce from "../pages/pages/StudentScorce";
import StudentExamResult from "../pages/pages/StudentExamResult";
import CreateResult from "../pages/dashboards/Classroom/CreateResult";
import HomeWork from "../pages/pages/HomeWork";
import StudentCourse from "../pages/pages/StudentCourse";
import CourseView from "../pages/pages/CourseView";
import ClientProfile from "../pages/pages/ClientProfile";
// Dashboards



const Classroom = async(() => import("../pages/dashboards/Classroom"));



// Attendance


// Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: withAuth(Profile,["MENTOR","STUDENT","ADMIN","TEACHER","MANAGER"]),
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Tài Khoản",
  header: " ",
  badgeColor: "primary",
  icon: UsersIcon,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Thông Tin Cá Nhân",
      component: withAuth(Profile,["ADMIN","MENTOR","TEACHER","STUDENT","MANAGER"]),
    },
  ]
};
const studentProfileRouter = {
  path: "/profile",
  name: "Tài Khoản",
  header: " ",
  badgeColor: "primary",
  icon: UsersIcon,
  containsHome: true,
  children: [
    {
      path: "/profile/info",
      name: "Thông Tin Cá Nhân",
      component: withAuth(ClientProfile,["ADMIN","MENTOR","TEACHER","STUDENT","MANAGER"]),
    },
  ]
};
const studentRoutes = {
  
  path: "/student/clients",
  name: "Học Sinh",
  icon: UsersIcon,
  component: Clients
  
}
const MentorRoutes = {
  path: "/mentors",
  name: "Trợ Giảng",
  icon: LayoutIcon,
  children: [
    {
      path: "/mentors/profile",
      name: "Thông Tin Cá Nhân",
      component: Profile
    },
    {
      path: "/mentors/settings",
      name: "Cài Đặt",
      component: Settings
    },
    {
      path: "/mentors/listClass",
      name: "Điểm Danh",
      component: ListClass
    },
  ]
};
const ManagerRoutes = {
  path: "/manager",
  name: "Quản Lý",
  icon: LayoutIcon,
  children: [
    {
      path: "/managers/students/absent",
      name: "Học Sinh Nghỉ Học",
      component: AbsentStudent
    },
    {
      path: "/managers/students/homework",
      name: "Học Sinh & BTVN",
      component: StudentHomeWork
    },
    {
      path: "/managers/students/scores",
      name: "Điểm TB",
      component: StudentScorce
    },
    {
      path: "/managers/students/exams",
      name: "Điểm Kiểm Tra",
      component: StudentExamResult
    },
    {
      path: "/managers/students/cost",
      name: "Học Phí",
      component: StudentCostInfo
    },
  ]
};
const authRoutes = {
  path: "/auth",
  name: "Auth",
  icon: UsersIcon,
  badgeColor: "secondary",
  badgeText: "Special",
  children: [
    {
      path: "/auth/sign-in",
      name: "Sign In",
      component: SignIn
    },
    {
      path: "/auth/404",
      name: "404 Page",
      component: Page404
    },
    {
      path: "/auth/500",
      name: "500 Page",
      component: Page500
    },
    {
      path: "/auth/sign-up",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/atten/info/:id",
      name: "Blank Page",
      component:withAuth(Atten,["MENTOR","ADMIN","TEACHER","MANAGER"]),
    },
    {
      path: "/auth/reset-password",
      name: "Reset Password",
      component: ResetPassword
    },
  ]
};



const classRoutes = {
  
  path: "/class",
  name: "Lớp Học",
  icon: UsersIcon,
  children: [
    {
      path: "/class/",
      name: "Danh Sách Lớp Học",
      component: Classroom
    },
    {
      path: "/create/",
      name: "Tạo Lớp Học",
      component: CreateClass
    },
    {
      path: "/create/results",
      name: "Nhập Điểm",
      component: CreateResult
    },
  ]
 
}
const layoutRoutes = {
  path: "/layouts",
  name: "Layouts",
  icon: MonitorIcon,
  children: [
    {
      path: "/layouts/sidebar-sticky",
      name: "Sticky Sidebar",
      component: SidebarSticky
    },
    {
      path: "/layouts/sidebar-collapsed",
      name: "Sidebar Collapsed",
      component: SidebarCollapsed
    },
    {
      path: "/layouts/boxed",
      name: "Boxed Layout",
      component: Boxed
    },
    {
      path: "/layouts/theme-classic",
      name: "Classic Theme",
      component: ThemeClassic
    },
    {
      path: "/layouts/theme-corporate",
      name: "Corporate Theme",
      component: ThemeCorporate,
      badgeColor: "primary",
      badgeText: "New"
    },
    {
      path: "/layouts/theme-modern",
      name: "Modern Theme",
      component: ThemeModern,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};

const dashboardStudentRoutes = {
  path: "/home-work/",
  name: "Bài Tập Về Nhà",
  icon:HomeIcon,
  component: HomeWork
};
const CourseStudentRoutes = {
  path: "/course",
  name: "Khóa Học Của Tôi",
  icon:BookIcon,
  children:[
    {
      path: "/course/subject",
      name: "Danh Sách Lớp Học",
      component: StudentCourse
    },
    {
      path: "/course/lesson",
      name: "Danh Sách Bài Học",
      component: CourseView
    },
  ]
  
};

// This route is not visisble in the sidebar
const privateRoutes = {
  path: "/private",
  name: "Private",
  children: [
    {
      path: "/private/blank",
      name: "Blank Page",
      component: Blank
    },
    {
      path: "/pages/attendance",
      name: "Điểm Danh",
      component: Attendance
    },
    {
      path: "/student/info",
      name: "Thông Tin Học Sinh",
      component: StudentProfile
    },
  ]
};

// Dashboard specific routes
export const dashboard = [
  dashboardRoutes,
  MentorRoutes,
  ManagerRoutes,
  layoutRoutes,
  studentRoutes,
  privateRoutes,
  classRoutes
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];
export const studentDashboard = [ studentProfileRouter,dashboardStudentRoutes, CourseStudentRoutes];
// All routes
export default [
  dashboardRoutes,
  MentorRoutes,
  ManagerRoutes,
  studentRoutes,
  classRoutes
];
