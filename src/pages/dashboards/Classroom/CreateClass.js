import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Input,
  Label,
  Button
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';
const CreateClass = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Tạo Lớp học mới</h1>

    <Row>
      <Col>
        <Card>
          <CardHeader>
            <CardTitle tag="h5" className="mb-0">Empty card</CardTitle>
          </CardHeader>
          <CardBody>
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
                  <Col>
                    <Label>Khối</Label>
                    <FastField
                            bsSize="lg"
                            type="select"
                            name="subject"
                            placeholder="Nhập môn "
                            component={Input}
                            
                          >
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                       </FastField>
                  </Col>
                  <Col>
                          <Label >
                            Chọn Môn Học
                          </Label>
                          <FastField
                            bsSize="lg"
                            type="select"
                            name="subject"
                            placeholder="Nhập môn "
                            component={Input}
                            
                          >
                            <option>Toán Đại</option>
                            <option>Toán Hình</option>
                            <option>Tiếng Anh</option>
                            <option>Hóa</option>
                            <option>Văn</option>
                            <option>Lý</option>
                          </FastField>
                  </Col>
              </Row>
              <Row>
                  <Col>
                    <Label>Tên lớp học</Label>
                      <FastField
                        bsSize="lg"
                        type="text"
                        name="date"
                        placeholder="Enter Date Attendance"
                        component={Input}
                      />
                  </Col>
                  <Col>
                          <Label >
                          Giáo Viên
                          </Label>
                          <FastField
                            bsSize="lg"
                            type="select"
                            name="subject"
                            placeholder="Nhập môn "
                            component={Input}
                            
                          >
                            <option>Thầy Dương Xuân Tuyền</option>
                            <option>Thầy Nguyễn Chí Chung</option>
                            <option>Thầy Nguyễn Công Nguyên</option>
                          </FastField>
                  </Col>
                    
              </Row> 
              <Row>
                  <Col>
                          <Label >
                          Chọn thời khóa biểu
                          </Label>
                          <FastField
                            bsSize="lg"
                            type="select"
                            name="subject"
                            placeholder="Nhập môn "
                            component={Input}
                            
                          >
                            <option>Thứ 2</option>
                            <option>Thứ 3</option>
                            <option>Thứ 4</option>
                            <option>Thứ 5</option>
                            <option>Thứ 6</option>
                            <option>Thứ 7</option>
                            <option>Chủ Nhật</option>
                          </FastField>
                  </Col>
                  <Col>
                        <Label>Thời gian bắt đầu</Label>
                          <FastField
                            bsSize="lg"
                            type="time"
                            name="class"
                            placeholder="Enter Search Class"
                            component={Input}
                          />
                  </Col>
                  <Col>
                        <Label>Thời gian kết thúc</Label>
                          <FastField
                            bsSize="lg"
                            type="time"
                            name="class"
                            placeholder="Enter Search Class"
                            component={Input}
                          />
                  </Col>
              </Row>
              <Row>
                    <Col>
                        <Row>
                            <Col>
                                <Label>Thêm trợ giảng</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FastField
                                bsSize="lg"
                                type="text"
                                name="class"
                                placeholder="Enter Search Class"
                                component={Input}
                              />
                            </Col>
                            <Col>
                                <Button>Add</Button>
                            </Col>
                        </Row>
                    </Col>
              </Row>
              <Row>
                    <Col>
                      <Button  type="submit" >Thêm</Button>
                    </Col>
              </Row>
            </Form>
          </Formik>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default CreateClass;
