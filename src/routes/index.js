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
// import Settings from "../pages/pages/Settings";
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
import Teachers from "../pages/pages/Teachers";
import Mentors from "../pages/pages/Mentors";
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
  name: "T??i Kho???n",
  header: " ",
  badgeColor: "primary",
  icon: UsersIcon,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Th??ng Tin C?? Nh??n",
      component: withAuth(Profile,["ADMIN","MENTOR","TEACHER","STUDENT","MANAGER"]),
    },
  ]
};
const studentProfileRouter = {
  path: "/profile",
  name: "T??i Kho???n",
  header: " ",
  badgeColor: "primary",
  icon: UsersIcon,
  containsHome: true,
  children: [
    {
      path: "/profile/info",
      name: "T??nh tr???ng h???c t???p",
      component: withAuth(ClientProfile,["ADMIN","MENTOR","TEACHER","STUDENT","MANAGER"]),
    },
  ]
};
const studentRoutes = {
  
  path: "/student/clients",
  name: "H???c Sinh",
  icon: UsersIcon,
  component: Clients
  
}
const MentorRoutes = {
  path: "/attendance",
  name: "??i???m danh",
  icon: LayoutIcon,
  component: withAuth(ListClass,["ADMIN","MENTOR","TEACHER","MANAGER"])
 
};
const ManagerRoutes = {
  path: "/manager",
  name: "Qu???n L??",
  icon: LayoutIcon,
  children: [
    {
      path: "/managers/students/absent",
      name: "H???c Sinh Ngh??? H???c",
      component: withAuth(AbsentStudent,["ADMIN","MENTOR","TEACHER","MANAGER"]) 
    },
    {
      path: "/managers/students/homework",
      name: "H???c Sinh & BTVN",
      component: withAuth(StudentHomeWork,["ADMIN","MENTOR","TEACHER","MANAGER"])
    },
    {
      path: "/managers/students/scores",
      name: "??i???m TB",
      component: withAuth(StudentScorce,["ADMIN","MENTOR","TEACHER","MANAGER"])
    },
    {
      path: "/managers/students/exams",
      name: "??i???m Ki???m Tra",
      component: withAuth(StudentExamResult,["ADMIN","MENTOR","TEACHER","MANAGER"])
    },
    {
      path: "/managers/students/cost",
      name: "H???c Ph??",
      component: withAuth(StudentCostInfo,["ADMIN","MANAGER"])
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
      path: "/attend/info/:id",
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
  name: "L???p H???c",
  icon: UsersIcon,
  children: [
    {
      path: "/class/",
      name: "Danh S??ch L???p H???c",
      component: withAuth(Classroom,["ADMIN","MENTOR","TEACHER","MANAGER"])
    },
    {
      path: "/create/",
      name: "T???o L???p H???c",
      component: withAuth(CreateClass,["ADMIN","MANAGER"])
    },
    {
      path: "/create/results",
      name: "Nh???p ??i???m",
      component: withAuth(CreateResult,["ADMIN","MENTOR","TEACHER","MANAGER"])
    },
  ]
 
}

const adminRouters ={
  path: "/admin",
  name: "Qu???n tr??? vi??n",
  icon: UsersIcon,
  children: [
    {
      path: "/admin/teachers/",
      name: "Gi??o vi??n",
      component: withAuth(Teachers,["ADMIN","MANAGER"])
    },
    {
      path: "/admin/mentors/",
      name: "Tr??? gi???ng",
      component: withAuth(Mentors,["ADMIN","MANAGER"])
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
  name: "B??i T???p V??? Nh??",
  icon:HomeIcon,
  component: HomeWork
};
const CourseStudentRoutes = {
  path: "/course",
  name: "Kh??a H???c C???a T??i",
  icon:BookIcon,
  children:[
    {
      path: "/course/subject",
      name: "Danh S??ch L???p H???c",
      component: StudentCourse
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
      name: "??i???m Danh",
      component: Attendance
    },
    {
      path: "/student/info",
      name: "Th??ng Tin H???c Sinh",
      component: StudentProfile
    },
    {
      path: "/course/lesson",
      name: "Danh S??ch B??i H???c",
      component: CourseView
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
  classRoutes,
  adminRouters
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];
export const studentDashboard = [ studentProfileRouter,dashboardStudentRoutes, CourseStudentRoutes ];
export const student = [studentProfileRouter,dashboardStudentRoutes, CourseStudentRoutes, privateRoutes]
// All routes
export default [
  dashboardRoutes,
  MentorRoutes,
  ManagerRoutes,
  studentRoutes,
  classRoutes,
  adminRouters
];
