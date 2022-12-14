import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";

import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  
} from "reactstrap";

import {
  AlertCircle,
  Bell,
  BellOff,
  Home,
  MessageCircle,

  Settings,

  UserPlus
} from "react-feather";
import { selectFullName, selectRole, selectAvatarUrl, selectFacebookAvatarUrl } from "../redux/selectors/userLoginInfoSelector";


import avatar1 from "../assets/img/avatars/avatar.jpg";


import {  withRouter } from "react-router-dom";
const notifications = [
  // {
  //   type: "important",
  //   title: "Update completed",
  //   description: "Restart server 12 to complete the update.",
  //   time: "2h ago"
  // },
  // {
  //   type: "default",
  //   title: "Lorem ipsum",
  //   description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
  //   time: "6h ago"
  // },
  // {
  //   type: "login",
  //   title: "Login from 192.186.1.1",
  //   description: "",
  //   time: "6h ago"
  // },
  // {
  //   type: "request",
  //   title: "New connection",
  //   description: "Anna accepted your request.",
  //   time: "12h ago"
  // }
];

const messages = [
  // {
  //   name: "Ashley Briggs",
  //   avatar: avatar5,
  //   description: "Nam pretium turpis et arcu. Duis arcu tortor.",
  //   time: "15m ago"
  // },
  // {
  //   name: "Chris Wood",
  //   avatar: avatar1,
  //   description: "Curabitur ligula sapien euismod vitae.",
  //   time: "2h ago"
  // },
  // {
  //   name: "Stacie Hall",
  //   avatar: avatar4,
  //   description: "Pellentesque auctor neque nec urna.",
  //   time: "4h ago"
  // },
  // {
  //   name: "Bertha Martin",
  //   avatar: avatar3,
  //   description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
  //   time: "5h ago"
  // }
];

const NavbarDropdown = ({
  children,
  count,
  showBadge,
  header,
  footer,
  icon: Icon
}) => (
  <UncontrolledDropdown nav inNavbar className="mr-2">
    <DropdownToggle nav className="nav-icon dropdown-toggle">
      <div className="position-relative">
        <Icon className="align-middle" size={18} />
        {showBadge ? <span className="indicator">{count}</span> : null}
      </div>
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarComponent = ({ dispatch,fullName,history,avatarUrl,facebookUrl }) => {

  const signOut = async () => {
    await localStorage.clear();
    history.push("/auth/sign-in");
  }

  return (
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavbarDropdown
            header="New Messages"
            footer="Show all messages"
            icon={MessageCircle}
            count={messages.length}
            showBadge
          >
            {messages.map((item, key) => {
              return (
                <NavbarDropdownItem
                  key={key}
                  icon={
                    <img
                      className="avatar img-fluid rounded-circle"
                      src={item.avatar}
                      alt={item.name}
                    />
                  }
                  title={item.name}
                  description={item.description}
                  time={item.time}
                  spacing
                />
              );
            })}
          </NavbarDropdown>

          <NavbarDropdown
            header="New Notifications"
            footer="Show all notifications"
            icon={BellOff}
            count={notifications.length}
          >
            {notifications.map((item, key) => {
              let icon = <Bell size={18} className="text-warning" />;

              if (item.type === "important") {
                icon = <AlertCircle size={18} className="text-danger" />;
              }

              if (item.type === "login") {
                icon = <Home size={18} className="text-primary" />;
              }

              if (item.type === "request") {
                icon = <UserPlus size={18} className="text-success" />;
              }

              return (
                <NavbarDropdownItem
                  key={key}
                  icon={icon}
                  title={item.title}
                  description={item.description}
                  time={item.time}
                />
              );
            })}
          </NavbarDropdown>


          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={
                  (avatarUrl !== null && avatarUrl !== "null") ? (`${process.env.REACT_APP_AVATAR_URL}/${avatarUrl}`) : 
                  (facebookUrl !== null && facebookUrl !== "null") ? facebookUrl :
                  avatar1 }
                  alt={fullName}
                  className="avatar img-fluid rounded-circle mr-1"
                  
                />
                <span className="text-dark">{fullName}</span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem divider />
              <DropdownItem onClick={() => signOut()}>????ng xu???t</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};
const mapGlobalStateToProps = state => {
  return {
    app: state.app,
    sidebar: state.sidebar,
    layout: state.layout,
    fullName: selectFullName(state),
    role: selectRole(state),
    avatarUrl :selectAvatarUrl(state),
    facebookUrl : selectFacebookAvatarUrl(state)
  };
};
export default withRouter(connect(mapGlobalStateToProps)(NavbarComponent));

