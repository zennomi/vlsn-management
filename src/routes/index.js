import async from "../components/Async";

import {
 
  Layout as LayoutIcon,

  Monitor as MonitorIcon,
  Sliders as SlidersIcon,
  Users as UsersIcon
} from "react-feather";

// Landing


// Auth
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import ResetPassword from "../pages/auth/ResetPassword";
import Page404 from "../pages/auth/Page404";
import Page500 from "../pages/auth/Page500";

// Layouts
import Boxed from "../pages/layouts/Boxed";
import SidebarCollapsed from "../pages/layouts/SidebarCollapsed";
import SidebarSticky from "../pages/layouts/SidebarSticky";
import ThemeClassic from "../pages/layouts/ThemeClassic";
import ThemeCorporate from "../pages/layouts/ThemeCorporate";
import ThemeModern from "../pages/layouts/ThemeModern";

// Misc
import Blank from "../pages/misc/Blank";
import Blank2 from "../pages/misc/Blank2";
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
// Dashboards
const Default = async(() => import("../pages/dashboards/Default"));
const Analytics = async(() => import("../pages/dashboards/Analytics"));
const Ecommerce = async(() => import("../pages/dashboards/Ecommerce"));
const Classroom = async(() => import("../pages/dashboards/Classroom"));
const Crypto = async(() => import("../pages/dashboards/Crypto"));
const Social = async(() => import("../pages/dashboards/Social"));


// Attendance


// Routes
const landingRoutes = {
  path: "/",
  name: "Landing Page",
  component: SignIn,
  children: null
};

const dashboardRoutes = {
  path: "/dashboard",
  name: "Dashboards",
  header: "Pages",
  badgeColor: "primary",
  badgeText: "5",
  icon: SlidersIcon,
  containsHome: true,
  children: [
    {
      path: "/dashboard/default",
      name: "Default",
      component: Default
    },
    {
      path: "/dashboard/analytics",
      name: "Analytics",
      component: Analytics
    },
    {
      path: "/dashboard/e-commerce",
      name: "E-commerce",
      component: Ecommerce
    },
    {
      path: "/dashboard/social",
      name: "Social",
      component: Social
    },
    {
      path: "/dashboard/crypto",
      name: "Crypto",
      component: Crypto,
      badgeColor: "primary",
      badgeText: "New"
    }
  ]
};
const studentRoutes = {
  
  path: "/student/clients",
  name: "Học Sinh",
  icon: UsersIcon,
  component: Clients
  
}
const pageRoutes = {
  path: "/pages",
  name: "Trợ Giảng",
  icon: LayoutIcon,
  children: [
    {
      path: "/pages/profile",
      name: "Thông Tin Cá Nhân",
      component: Profile
    },
    {
      path: "/pages/settings",
      name: "Cài Đặt",
      component: Settings
    },
    // {
    //   path: "/pages/projects",
    //   name: "Projects",
    //   component: Projects
    // },
    // {
    //   path: "/pages/invoice",
    //   name: "Invoice",
    //   component: Invoice
    // },
    // {
    //   path: "/pages/pricing",
    //   name: "Pricing",
    //   component: Pricing
    // },
    // {
    //   path: "/pages/tasks",
    //   name: "Tasks",
    //   component: Tasks
    // },
    // {
    //   path: "/pages/chat",
    //   name: "Chat",
    //   component: Chat,
    //   badgeColor: "primary",
    //   badgeText: "New"
    // },
    // {
    //   path: "/pages/blank",
    //   name: "Blank Page",
    //   component: Blank
    // },
    {
      path: "/pages/listClass",
      name: "Điểm Danh",
      component: ListClass
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
      component: Blank2
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
  pageRoutes,
  layoutRoutes,
  studentRoutes,
  privateRoutes,
  classRoutes
];

// Landing specific routes
export const landing = [landingRoutes];

// Auth specific routes
export const page = [authRoutes];

// All routes
export default [
  dashboardRoutes,
  pageRoutes,
  authRoutes,
  studentRoutes,
  classRoutes
];
