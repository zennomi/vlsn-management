import React from "react";

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  Input,
  Button,
  Label
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';

import { MoreHorizontal } from "react-feather";

import avatar1 from "../../assets/img/avatars/avatar.jpg";
import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

const ClientsList = () => (
  <Card>
    <CardHeader>
      <div className="card-actions float-right">
        <UncontrolledDropdown>
          <DropdownToggle tag="a">
            <MoreHorizontal />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Action</DropdownItem>
            <DropdownItem>Another Action</DropdownItem>
            <DropdownItem>Something else here</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardTitle tag="h5" className="mb-0">
        Học sinh
      </CardTitle>
    </CardHeader>
    <CardBody>
      <Table className="mb-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img
                src={avatar3}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Angelica Ramos</td>
            <td>The Wiz</td>
            <td>angelica@ramos.com</td>
            <td>
              <Badge color="success">Active</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar1}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Ashton Cox</td>
            <td>Levitz Furniture</td>
            <td>ashton@cox.com</td>
            <td>
              <Badge color="success">Active</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar4}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Brenden Wagner</td>
            <td>The Wiz</td>
            <td>brenden@wagner.com</td>
            <td>
              <Badge color="warning">Inactive</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar2}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Charde Marshall</td>
            <td>Price Savers</td>
            <td>charde@marshall.com</td>
            <td>
              <Badge color="success">Active</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar3}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Doris Wilder</td>
            <td>Red Robin Stores</td>
            <td>doris@wilder.com</td>
            <td>
              <Badge color="warning">Inactive</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar4}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Fiona Green</td>
            <td>The Sample</td>
            <td>fiona@green.com</td>
            <td>
              <Badge color="warning">Inactive</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar1}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Garrett Winters</td>
            <td>Good Guys</td>
            <td>garrett@winters.com</td>
            <td>
              <Badge color="success">Active</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar5}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Gavin Cortez</td>
            <td>Red Robin Stores</td>
            <td>gavin@cortez.com</td>
            <td>
              <Badge color="success">Active</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar2}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Haley Kennedy</td>
            <td>Helping Hand</td>
            <td>haley@kennedy.com</td>
            <td>
              <Badge color="danger">Deleted</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar5}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Howard Hatfield</td>
            <td>Price Savers</td>
            <td>howard@hatfield.com</td>
            <td>
              <Badge color="warning">Inactive</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar1}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Jena Gaines</td>
            <td>Helping Hand</td>
            <td>jena@gaines.com</td>
            <td>
              <Badge color="success">Active</Badge>
            </td>
          </tr>
          <tr>
            <td>
              <img
                src={avatar4}
                width="32"
                height="32"
                className="rounded-circle my-n1"
                alt="Avatar"
              />
            </td>
            <td>Jennifer Chang</td>
            <td>Helping Hand</td>
            <td>jennifer@chang.com</td>
            <td>
              <Badge color="warning">Inactive</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </CardBody>
  </Card>
);

const Single = () => (
  <Card>
    <CardHeader>
        <CardTitle>Thêm học sinh mới</CardTitle>
    </CardHeader>
    <CardBody>
      <div style={{margin:"10px"}}>
      <Formik
            initialValues={
              {
                date: '',
                subject: '',
                class: ''
              }
            }
            onSubmit={(values) => {
                
            }}
          >
            <Form>
              <Row >

                    <Label>Họ và Đệm</Label>
                    <FastField
                      bsSize="lg"
                      type="text"
                      name="date"
                      placeholder="Enter Date Attendance"
                      component={Input}
                    />
              </Row>
              <Row>
                    <Label>Tên</Label>
                    <FastField
                      bsSize="lg"
                      type="text"
                      name="subject"
                      placeholder="Enter Search subject"
                      component={Input}
                    />
              </Row> 
              <Row>
                    <Label>Lớp</Label>
                    <FastField
                      bsSize="lg"
                      type="text"
                      name="class"
                      placeholder="Enter Search Class"
                      component={Input}
                    />
              </Row>
              <Row>
                    <Label>Trường</Label>
                    <FastField
                      bsSize="lg"
                      type="text"
                      name="class"
                      placeholder="Enter Search Class"
                      component={Input}
                    />
              
                  
                   
              
              </Row>
              <Row>
                    <Label>Chọn lớp học</Label>
                    <FastField
                      bsSize="lg"
                      type="text"
                      name="class"
                      placeholder="Enter Search Class"
                      component={Input}
                    />
              
                    
                   
              
              </Row>
              <Row>
                    <Button  type="submit" >Thêm</Button>
              </Row>
            </Form>
          </Formik>
      
      </div>
    </CardBody>
  </Card>
);

const Clients = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Học Sinh</h1>

    <Row>
      <Col xl="8">
        <ClientsList />
      </Col>
      <Col xl="4">
        <Single />
      </Col>
    </Row>
  </Container>
);

export default Clients;
