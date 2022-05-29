import React from 'react'
import { MetaTags } from 'react-meta-tags' 
import { NavLink } from 'react-router-dom';
import "./charity.scss";
import { Navbar, Nav } from 'react-bootstrap';
import { Row, Container } from "react-bootstrap";
import { Button, Col, Form, Row1 } from "react-bootstrap";
import DatePicker from "react-datepicker";

export default class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            response: []
        }
    }
    componentDidMount() {
        this.loadCategory()
    }

    loadCategory = () => {
        var requestOptions = {
            method: 'GET',
            headers: {
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'
            }
        }
        fetch('https://bookhotel-backend.herokuapp.com/api/nologin/locations', requestOptions)
        .then(function(response) {
            return response.json()
        })
        .then((locations) => {
            this.setState({response: locations})
            console.log(locations);
        })
        .catch(function(err) {
            console.log(err)
        })
    }
    
    render() {
        return (
            <div className='container'>
                <MetaTags>
                    <title>Trang chủ</title>
                </MetaTags>
    <Navbar  style={{ position: "fixed" }} bg="light" expand="lg">
    <span className="logo" style={{ marginLeft: "2cm"}}>
        <span className="logo__name">CYF</span>
        <span className="logo-center" style={{ color: "#424252" }}>Center</span>
    </span>
  <Container  style={{ marginright: "0cm", marginLeft: "17cm"}} >
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Navbar style={{ position: "fixed" }}/>
      <Nav  className="me-auto">
        <NavLink activeClassName="active" className="aa" to="/">Trang chủ</NavLink>
        <NavLink activeClassName="active" className="aa" to="/news">Tin tức</NavLink>
        <NavLink activeClassName="active" className="aa" to="/make-charity">Làm từ thiện</NavLink>
        <NavLink activeClassName="active" className="aa" to="/ask">Hỏi đáp</NavLink>
        <NavLink activeClassName="active" className="aa" to="/login">Đăng nhập</NavLink>
      </Nav>
      <span className="logo">
        <span className="logo__name">CYF</span>
        <span className="logo-center" style={{ color: "#424252" }}>Center</span>
    </span>
    </Navbar.Collapse>
  </Container>
</Navbar>
<Row className="mb-3"  style={{ paddingTop: '3cm', paddingLeft:"2cm", color:'black' }}>

    <h5>Nếu bạn muốn làm từ thiện, vui lòng để lại thông tin cá nhân!</h5>
            </Row>
            <Form className="form" id="accountCreate">
                <Row className="mb-3">
                <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Họ và tên"
                            name="identification"
                            // value={identification}
                            // onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <select
                            defaultValue="Giới tính"
                            className="form-select"
                            name="roles"
                            // value={roles}
                            // onChange={(e) => {
                            //     onInputChange(e);
                            //     setNewAccount({
                            //         ...newAccount,
                            //         roles: [e.target.value],
                            //     });
                            // }}
                        >
                            <option value={"Giới tính"} hidden>
                                Giới tính
                            </option>
                            <option value={["ROLE_ADMIN"]}>
                                Nam
                            </option>
                            <option value={["ROLE_MANAGER_LOGISTIC"]}>
                                Nữ
                            </option>
                        </select>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Ngày sinh"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            // selected={pickerDate}
                            // onChange={(date) => {
                            //     const resultDate =
                            //         moment(date).format("DD/MM/YYYY");
                            //     setNewAccount({
                            //         ...newAccount,
                            //         date_of_birth: resultDate,
                            //     });
                            //     setPickerDate(date);
                            // }}
                            required
                        />
                    </Form.Group>
                    {/* <Form.Group as={Col} className="form-group">
                        <Form.Select
                            defaultValue="Giới tính"
                            className="form-select"
                            name="gender"
                            value={gender}
                            onChange={(e) => {
                                onInputChange(e);
                                setNewAccount({
                                    ...newAccount,
                                    gender:
                                        e.target.value === "true"
                                            ? true
                                            : false,
                                });
                            }}
                        >
                            <option value={"Giới tính"} hidden>
                                Giới tính
                            </option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                    </Form.Group> */}
                    <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Số CMND/CCCD"
                        name="address"
                        // value={address}
                        // onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Số điện thoại"
                            name="identification"
                            // value={identification}
                            // onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="text"
                            placeholder="Email"
                            name="phone"
                            // value={phone}
                            // onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>
                </Row>
            </Form>
            <Row className="mb-3">
                    <Form.Group as={Col} className="form-group" style={{ paddingTop: '1cm', paddingLeft:"8cm" }}>
            {/* <Button
                            variant="secondary"
                            // onClick={handleClose}
                            className="btn btn--secondary btn__close"
                        >
                            Đóng
                        </Button> */}
                        <Button 
                            variant="success"
                            form="accountCreate"
                            type="submit"
                            className="btn btn--primary btn__submit"
                        >
                           Gửi thông tin
                        </Button>
                        </Form.Group>
                        </Row>
        <section onLoad={() => {
                document.querySelector('.loading').classList.add('hidden-loading')
        }}>
            <br></br>
            <br></br>
          
        </section>
                <div className="footer-dark" style={{ marginTop: '3cm'}}>   
                <div class="row">
                <div class="col-sm-2 col-md-2 item"></div>
                    <div class="col-sm-5 col-md-2 item">
                        <h3>Services</h3>
                        <ul>
                            <li><a href="/#">Nuôi dạy trẻ</a></li>
                            <li><a href="/#">Từ thiện</a></li>
                            <li><a href="/#">Hoạt động</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="/#">Thông tin</a></li>
                            <li><a href="/#">Liên hệ</a></li>
                            <li><a href="/#">Quảng bá</a></li>
                        </ul>
                    </div>
                    <div class="col item social"><a href="/#"><i class="icon ion-social-facebook"></i></a><a href="/#"><i class="icon ion-social-twitter"></i></a><a href="/#"><i class="icon ion-social-snapchat"></i></a><a href="/#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright">CYF Center © 2022</p>
            </div>
        </div>
            
        )
    }
    
}



