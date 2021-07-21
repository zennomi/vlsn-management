import React,{useState} from "react";

import {
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
  UncontrolledDropdown,
  // Input,
  Button,
  Label,
  Modal, 
} from "reactstrap";
import { Formik,FastField, Form  } from 'formik';
import { MDBDataTableV5 } from 'mdbreact';
import { MoreHorizontal } from "react-feather";
import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import { ReactstrapInput } from "reactstrap-formik";

// import avatar1 from "../../assets/img/avatars/avatar.jpg";
// import avatar2 from "../../assets/img/avatars/avatar-2.jpg";
// import avatar3 from "../../assets/img/avatars/avatar-3.jpg";
// import avatar4 from "../../assets/img/avatars/avatar-4.jpg";
// import avatar5 from "../../assets/img/avatars/avatar-5.jpg";

const datatable = {
  columns: [
    {
      label: 'Họ Tên',
      field: 'name',
      width: 200,
      attributes: {
        'aria-controls': 'DataTable',
        'aria-label': 'Name',
      },
    },
    {
      label: 'Trường học',
      field: 'position',
      width: 250,
    },
    {
      label: 'SĐT',
      field: 'office',
      width: 200,
    },
    {
      label: 'Lớp',
      field: 'age',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Ngày sinh',
      field: 'date',
      sort: 'disabled',
      width: 150,
    },
    {
      label: 'SĐT PH',
      field: 'salary',
      sort: 'disabled',
      width: 100,
    },
    {
      label: 'Action',
      field: 'action',
      width: 150,
    },
  ],
  rows: [
    {
      name: 'Nguyễn Đức Thắng',
      position: 'System Architect',
      office: 'Edinburgh',
      age: '61',
      date: '2011/04/25',
      salary: '$320',
      
    },
    {
      name: 'Nguyễn Hùng Giang',
      position: 'Accountant',
      office: 'Tokyo',
      age: '63',
      date: '2011/07/25',
      salary: '$170',
      
    },
    {
      name: 'Ashton Cox',
      position: 'Junior Technical Author',
      office: 'San Francisco',
      age: '66',
      date: '2009/01/12',
      salary: '$86',
    },
    {
      name: 'Cedric Kelly',
      position: 'Senior Javascript Developer',
      office: 'Edinburgh',
      age: '22',
      date: '2012/03/29',
      salary: '$433',
    },
    {
      name: 'Airi Satou',
      position: 'Accountant',
      office: 'Tokyo',
      age: '33',
      date: '2008/11/28',
      salary: '$162',
    },
    {
      name: 'Brielle Williamson',
      position: 'Integration Specialist',
      office: 'New York',
      age: '61',
      date: '2012/12/02',
      salary: '$372',
    },
    {
      name: 'Herrod Chandler',
      position: 'Sales Assistant',
      office: 'San Francisco',
      age: '59',
      date: '2012/08/06',
      salary: '$137',
    },
    {
      name: 'Rhona Davidson',
      position: 'Integration Specialist',
      office: 'Tokyo',
      age: '55',
      date: '2010/10/14',
      salary: '$327',
    },
    {
      name: 'Colleen Hurst',
      position: 'Javascript Developer',
      office: 'San Francisco',
      age: '39',
      date: '2009/09/15',
      salary: '$205',
    },
    {
      name: 'Sonya Frost',
      position: 'Software Engineer',
      office: 'Edinburgh',
      age: '23',
      date: '2008/12/13',
      salary: '$103',
    },
    {
      name: 'Jena Gaines',
      position: 'Office Manager',
      office: 'London',
      age: '30',
      date: '2008/12/19',
      salary: '$90',
    },
    {
      name: 'Quinn Flynn',
      position: 'Support Lead',
      office: 'Edinburgh',
      age: '22',
      date: '2013/03/03',
      salary: '$342',
    },
    {
      name: 'Charde Marshall',
      position: 'Regional Director',
      office: 'San Francisco',
      age: '36',
      date: '2008/10/16',
      salary: '$470',
    },
    {
      name: 'Haley Kennedy',
      position: 'Senior Marketing Designer',
      office: 'London',
      age: '43',
      date: '2012/12/18',
      salary: '$313',
    },
    {
      name: 'Tatyana Fitzpatrick',
      position: 'Regional Director',
      office: 'London',
      age: '19',
      date: '2010/03/17',
      salary: '$385',
    },
    {
      name: 'Michael Silva',
      position: 'Marketing Designer',
      office: 'London',
      age: '66',
      date: '2012/11/27',
      salary: '$198',
    },
    {
      name: 'Paul Byrd',
      position: 'Chief Financial Officer (CFO)',
      office: 'New York',
      age: '64',
      date: '2010/06/09',
      salary: '$725',
    },
    {
      name: 'Gloria Little',
      position: 'Systems Administrator',
      office: 'New York',
      age: '59',
      date: '2009/04/10',
      salary: '$237',
    },
    {
      name: 'Bradley Greer',
      position: 'Software Engineer',
      office: 'London',
      age: '41',
      date: '2012/10/13',
      salary: '$132',
    },
    {
      name: 'Dai Rios',
      position: 'Personnel Lead',
      office: 'Edinburgh',
      age: '35',
      date: '2012/09/26',
      salary: '$217',
    },
    {
      name: 'Jenette Caldwell',
      position: 'Development Lead',
      office: 'New York',
      age: '30',
      date: '2011/09/03',
      salary: '$345',
    },
    {
      name: 'Yuri Berry',
      position: 'Chief Marketing Officer (CMO)',
      office: 'New York',
      age: '40',
      date: '2009/06/25',
      salary: '$675',
    },
    {
      name: 'Caesar Vance',
      position: 'Pre-Sales Support',
      office: 'New York',
      age: '21',
      date: '2011/12/12',
      salary: '$106',
    },
    {
      name: 'Doris Wilder',
      position: 'Sales Assistant',
      office: 'Sidney',
      age: '23',
      date: '2010/09/20',
      salary: '$85',
    },
    {
      name: 'Angelica Ramos',
      position: 'Chief Executive Officer (CEO)',
      office: 'London',
      age: '47',
      date: '2009/10/09',
      salary: '$1',
    },
    {
      name: 'Gavin Joyce',
      position: 'Developer',
      office: 'Edinburgh',
      age: '42',
      date: '2010/12/22',
      salary: '$92',
    },
    {
      name: 'Jennifer Chang',
      position: 'Regional Director',
      office: 'Singapore',
      age: '28',
      date: '2010/11/14',
      salary: '$357',
    },
    {
      name: 'Brenden Wagner',
      position: 'Software Engineer',
      office: 'San Francisco',
      age: '28',
      date: '2011/06/07',
      salary: '$206',
    },
    {
      name: 'Fiona Green',
      position: 'Chief Operating Officer (COO)',
      office: 'San Francisco',
      age: '48',
      date: '2010/03/11',
      salary: '$850',
    },
    {
      name: 'Shou Itou',
      position: 'Regional Marketing',
      office: 'Tokyo',
      age: '20',
      date: '2011/08/14',
      salary: '$163',
    },
    {
      name: 'Michelle House',
      position: 'Integration Specialist',
      office: 'Sidney',
      age: '37',
      date: '2011/06/02',
      salary: '$95',
    },
    {
      name: 'Suki Burks',
      position: 'Developer',
      office: 'London',
      age: '53',
      date: '2009/10/22',
      salary: '$114',
    },
    {
      name: 'Prescott Bartlett',
      position: 'Technical Author',
      office: 'London',
      age: '27',
      date: '2011/05/07',
      salary: '$145',
    },
    {
      name: 'Gavin Cortez',
      position: 'Team Leader',
      office: 'San Francisco',
      age: '22',
      date: '2008/10/26',
      salary: '$235',
    },
    {
      name: 'Martena Mccray',
      position: 'Post-Sales support',
      office: 'Edinburgh',
      age: '46',
      date: '2011/03/09',
      salary: '$324',
    },
    {
      name: 'Unity Butler',
      position: 'Marketing Designer',
      office: 'San Francisco',
      age: '47',
      date: '2009/12/09',
      salary: '$85',
    },
    {
      name: 'Howard Hatfield',
      position: 'Office Manager',
      office: 'San Francisco',
      age: '51',
      date: '2008/12/16',
      salary: '$164',
    },
    {
      name: 'Hope Fuentes',
      position: 'Secretary',
      office: 'San Francisco',
      age: '41',
      date: '2010/02/12',
      salary: '$109',
    },
    {
      name: 'Vivian Harrell',
      position: 'Financial Controller',
      office: 'San Francisco',
      age: '62',
      date: '2009/02/14',
      salary: '$452',
    },
    {
      name: 'Timothy Mooney',
      position: 'Office Manager',
      office: 'London',
      age: '37',
      date: '2008/12/11',
      salary: '$136',
    },
    {
      name: 'Jackson Bradshaw',
      position: 'Director',
      office: 'New York',
      age: '65',
      date: '2008/09/26',
      salary: '$645',
    },
    {
      name: 'Olivia Liang',
      position: 'Support Engineer',
      office: 'Singapore',
      age: '64',
      date: '2011/02/03',
      salary: '$234',
    },
    {
      name: 'Bruno Nash',
      position: 'Software Engineer',
      office: 'London',
      age: '38',
      date: '2011/05/03',
      salary: '$163',
    },
    {
      name: 'Sakura Yamamoto',
      position: 'Support Engineer',
      office: 'Tokyo',
      age: '37',
      date: '2009/08/19',
      salary: '$139',
    },
    {
      name: 'Thor Walton',
      position: 'Developer',
      office: 'New York',
      age: '61',
      date: '2013/08/11',
      salary: '$98',
    },
    {
      name: 'Finn Camacho',
      position: 'Support Engineer',
      office: 'San Francisco',
      age: '47',
      date: '2009/07/07',
      salary: '$87',
    },
    {
      name: 'Serge Baldwin',
      position: 'Data Coordinator',
      office: 'Singapore',
      age: '64',
      date: '2012/04/09',
      salary: '$138',
    },
    {
      name: 'Zenaida Frank',
      position: 'Software Engineer',
      office: 'New York',
      age: '63',
      date: '2010/01/04',
      salary: '$125',
    },
    {
      name: 'Zorita Serrano',
      position: 'Software Engineer',
      office: 'San Francisco',
      age: '56',
      date: '2012/06/01',
      salary: '$115',
    },
    {
      name: 'Jennifer Acosta',
      position: 'Junior Javascript Developer',
      office: 'Edinburgh',
      age: '43',
      date: '2013/02/01',
      salary: '$75',
    },
    {
      name: 'Cara Stevens',
      position: 'Sales Assistant',
      office: 'New York',
      age: '46',
      date: '2011/12/06',
      salary: '$145',
    },
    {
      name: 'Hermione Butler',
      position: 'Regional Director',
      office: 'London',
      age: '47',
      date: '2011/03/21',
      salary: '$356',
    },
    {
      name: 'Lael Greer',
      position: 'Systems Administrator',
      office: 'London',
      age: '21',
      date: '2009/02/27',
      salary: '$103',
    },
    {
      name: 'Jonas Alexander',
      position: 'Developer',
      office: 'San Francisco',
      age: '30',
      date: '2010/07/14',
      salary: '$86',
    },
    {
      name: 'Shad Decker',
      position: 'Regional Director',
      office: 'Edinburgh',
      age: '51',
      date: '2008/11/13',
      salary: '$183',
    },
    {
      name: 'Michael Bruce',
      position: 'Javascript Developer',
      office: 'Singapore',
      age: '29',
      date: '2011/06/27',
      salary: '$183',
    },
    {
      name: 'Donna Snider',
      position: 'Customer Support',
      office: 'New York',
      age: '27',
      date: '2011/01/25',
      salary: '$112',
    },
  ],
}; 



const ClientsList = (props) =>{ 
  const redriectToProfile = (id) => {
    props.history.push({
      pathname: '/student/info',
      state: { studentId: id }
    })
  }
  datatable.rows.map((row,i) => {
    row.action = <div style={{display:"flex"}}>
                <button  onClick={() => redriectToProfile(i)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>
                </button>
                <button onClick={() => redriectToProfile(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </button>
                <button onClick={() => redriectToProfile(i)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
                </div>
      return null;
  })

  return(
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
          <MDBDataTableV5 hover scrollX entriesOptions={[5,10, 20, 50,100]} entries={10} pagesAmount={10} data={datatable} />
      </CardBody>
    </Card>
    );
}
const Single = () => {
  

  return(
  
    <Card>
      <CardHeader>
          <CardTitle>Thêm học sinh mới</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{margin:"10px"}}>
        <Formik
              initialValues={
                {
                  lastName: '',
                  firstName: '',
                  grade: 12,
                  school: '',
                  listClass:[]
                }
              }
              onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
              }}
            >
             {({setFieldValue, values}) => <Form>
                <Row >
                    <Col>
                      <Label>Họ và Đệm</Label>
                      <FastField
                        bsSize="lg"
                        type="text"
                        name="lastName"
                        placeholder="nhập họ và đệm:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <Label>Tên</Label>
                      <FastField
                        bsSize="lg"
                        type="text"
                        name="firstName"
                        placeholder="nhập tên học sinh:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row> 
                <Row>
                    <Col>
                      <Label>Lớp</Label>
                      <FastField
                              bsSize="lg"
                              type="select"
                              name="grade"
                              placeholder="nhập lớp:.. "
                              component={ReactstrapInput}
                              
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
                </Row>
                <Row>
                    <Col>
                      <Label>Trường</Label>
                      <FastField
                        bsSize="lg"
                        type="text"
                        name="school"
                        placeholder="nhập trường học:.."
                        component={ReactstrapInput}
                      />
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <div >
                        <Label>Chọn lớp học</Label>
                        <Autocomplete
                          multiple
                          limitTags={2}
                          id="multiple-limit-tags"
                          name="listClass"
                          onChange={(e, value) => {
                            console.log(value)
                            setFieldValue("listClass", value)
                          }}
                          options={datatable.rows}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField {...params} name="listClass" variant="outlined" label="nhập lớp học đăng ký" placeholder="Tên lớp" />
                          )}
                        />
                      </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                      <Button  type="submit" >Thêm</Button>
                    </Col>
                </Row>
              </Form>
              }
            </Formik>
        
        </div>
      </CardBody>
    </Card>
  );
}
const Clients = (props) => {

  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return(
    
  <Container fluid className="p-0">
    <Row>
        <Col style={{display:"flex"}}>
            <h1 className="h3 mb-3">Học Sinh</h1>
            <Button style={{marginLeft:"auto",borderRadius:"15px"}} variant="primary" onClick={toggle}>
                Tạo học sinh
            </Button>
        </Col>
    </Row>
    <Row>
      <Col>
        <ClientsList {...props}/>
      </Col>
      <Modal isOpen={modal} toggle={toggle}>
            <Single />
      </Modal>
    </Row>
  </Container>
  );
}
export default Clients;
