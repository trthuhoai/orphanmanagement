import React from 'react'
import {Link} from 'react-router-dom'
// import { useState } from 'react'
import { MetaTags } from 'react-meta-tags' 
// import NavLink from "./nav_link";
import { NavLink } from 'react-router-dom';
// import { Component } from 'react/cjs/react.production.min'
import "./home.scss";
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Row, Container } from "reactstrap";

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
        // Promise.all([
        //     fetch(
        //         'https://bookhotel-backend.herokuapp.com/api/nologin/locations'
        //     ).then(res => res.json()),
        //     fetch(
        //         'https://bookhotel-backend.herokuapp.com/api/nologin/locations/2/hotels'
        //     ).then(res2 => res2.json())
        // ]).then(([result1, result2]) => {
        //     locations = result1
        //     hotels = result2
        // }).catch(err => {
        //     console.log(err);
        // })
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
                {/* <div class="navbar" >

	</div> */}
{/* <br/> */}
{/* <div class="header">
		<h1 class="logo"><Link to="#">Flexbox</Link></h1>
      {/* <ul class="main-nav">
          <li><Link >Home</Link></li>
          <li><Link to="#">About</Link></li>
          <li><Link to="#">Portfolio</Link></li>
          <li><Link to="#">Contact</Link></li>
      </ul> 
	</div>  margin-right: 39cm
    */}
    <Navbar  style={{ position: "fixed" }} bg="light" expand="lg">
    <span className="logo" style={{ marginLeft: "2cm"}}>
                        <span className="logo__name">CYF</span>
                        <span className="logo-center" style={{ color: "#424252" }}>Center</span>
                    </span>
  <Container  style={{ marginright: "5cm", marginLeft: "13cm"}} >
    {/* <Navbar.Brand href="#home">Logo</Navbar.Brand> */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Navbar style={{ position: "fixed" }}/>
      <Nav  className="me-auto">
        <NavLink activeClassName="active" className="aa" to="/">Trang chủ</NavLink>
        <NavLink activeClassName="active" className="aa" to="/info">Tin tức</NavLink>
        <NavLink activeClassName="active" className="aa" to="/tuthien">Làm từ thiện</NavLink>
        <NavLink activeClassName="active" className="aa" to="/ask">Hỏi đáp</NavLink>
        <NavLink activeClassName="active" className="aa" to="/login">Đăng nhập</NavLink>
        {/* <Nav.Link href="#link">Giới thiệu</Nav.Link>
        <Nav.Link href="/">Tin tức</Nav.Link>
        <Nav.Link href="#link">Làm từ thiện</Nav.Link>
        <Nav.Link href="/">Hỏi và đáp</Nav.Link>
        <Nav.Link href="#link">Đánh giá</Nav.Link>
        <Nav.Link href="/">Trang chủ</Nav.Link> */}
        {/* <Nav.Link href="#link">Giới thiệu</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown> */}
        <Link className="aa" to="/login">Đăng nhập</Link>
      </Nav>
      {/* <h6 > Trung tâm bảo trợ trẻ em CYF</h6> */}
      <span className="logo">
                        <span className="logo__name">CYF</span>
                        <span className="logo-center" style={{ color: "#424252" }}>Center</span>
                    </span>
    </Navbar.Collapse>
  </Container>
</Navbar>
                <header>
               
                    {/* <img className='logo' src='./img/logo.png' /> */}
                    <nav className='nav-link'>
                        <ul className='main-nav'>
                            <li className='nav'><Link className='button btnLogin' to="/Login">Đăng nhập</Link></li>
                            {/* <li className='nav'><Link className='button btnSignup' to="/Register">Đăng ký</Link></li> */}
                        </ul>
                    </nav>
                    <div className="hero-text-box row">
                        {/* <h1 className='h1-subhome'>
                            Trung tâm bảo trợ trẻ em CYF
                        </h1> */}
                        <form className='search-form'>
                            {/* <p>Hỗ trợ (24/7) : 0800 1234 678</p> */}
                            {/* <input className='txbPlace' type="text" placeholder="Nhập tên địa điểm cần đặt khách sạn" />
                            <button className='button btnSearch'>Tìm kiếm</button> */}
                        </form>
                    </div>
                </header>
                <section onLoad={() => {
                        document.querySelector('.loading').classList.add('hidden-loading')
                }}>
                    {/* <p className='row loading'>Loading...</p> */}
                    {/* <Places data={this.state.response} /> */}
                    <br></br>
                    <br></br>
<p className='p-info'>
                    Thông tin chung về Trung tâm Bảo trợ trẻ em CYF
<p>
1. Thông tin chung:
</p>
- Tên đơn vị: Trung tâm Bảo trợ trẻ em CYF
- Địa chỉ Trung tâm có 2 trụ sở:

+ Trụ sở chính: Số 45 Bà Triệu, phường Hòa Khánh Bắc, quận Liên Chiểu, Đà Nẵng

Điện thoại: 02433.5525651

+ Cơ sở 2: Thôn Đồng Dầu, xã Dục Tú, huyện Đông Anh, Hà Nội

Điện thoại: 0243. 9613113

- Web: ctxhvaqbtte.hanoi.gov.vn

- Email: ttctxhqbtte_soldtbxh@hanoi.gov.vn

Trung tâm Công tác xã hội và Quỹ Bảo trợ trẻ em Hà Nội được thành lập trên cơ sở hợp nhất 3 đơn vị đó là: Trung tâm Bảo trợ xã hội I Hà Nội, Trung tâm Cung cấp dịch vụ công tác xã hội Hà Nội và Quỹ Bảo trợ trẻ em Hà Nội theo Quyết định số 5326/QĐ-UBND ngày 22/12/2021 của UBND thành phố Hà Nội.
<p >
2. Chức năng, nhiệm vụ
</p>
Trung tâm Công tác xã hội và Quỹ Bảo trợ trẻ em Hà Nội có chức năng cung cấp các dịch vụ công tác xã hội; tập trung, tiếp nhận, quản lý, nuôi dưỡng người lang thang; đối tượng cần sự bảo vệ khẩn cấp; trẻ bị bỏ rơi; người cao tuổi, trẻ em bị đi lạc gia đình và các đối tượng khác nhau theo quy định; tiếp nhận các nguồn lực hỗ trợ của các tổ chức, cá nhân trong nước và nước ngoài; vận động, tiếp nhận, quản lý, sử dụng Quỹ Bảo trợ trẻ em Hà Nội để thực hiện mục đích bảo vệ chăm sóc và giáo dục trẻ em theo quy định của pháp luật. 
<p >
 3. Tổ chức:
 </p>
-  Ban Giám đốc:
<p className='p-info'>
1. Đ/c Kiều Thị Hương - Giám đốc.
</p>
<p className='p-info'>
2. Đ/c Nguyễn Tiến Trung - Phó giám đốc.
</p>
<p className='p-info'>
3. Đ/c Vũ Thị Minh Tuyết - Phó giám đốc.
</p>
<p className='p-info'>
4. Đ/c Nguyễn Văn Quảng - Phó giám đốc.
</p>
 -  Các phòng:
 <p className='p-info'>
1. Phòng Tổ chức Hành chính.
</p>
<p className='p-info'>
2. Phòng Tư vấn và Trợ giúp.
</p>
<p className='p-info'>
3. Phòng Tiếp nhận, quản lý và chăm sóc đối tượng.
</p>
<p className='p-info'>
4. Phòng Y tế nuôi dưỡng.
</p>
<p className='p-info'>
5. Phòng Quản lý Quỹ BTTE và Phát triển cộng đồng.
</p>
<p className='p-info'>
6. Đội trật tự xã hội lưu động.
</p>
</p>
                </section>
                
                <Navbar  style={{ position: "fixed" }} bg="dark" expand="lg">
                <Container  style={{ marginright: "20cm" }} >
                    <div className='row'>
                        <p>
                            ssssssssss
                            {/* Copyright &copy; 2021 by Khoa Nguyen. All rights reserved */}
                        </p>
                    </div>
                    </Container>
                    </Navbar>
                <footer bg="dark">
                <Container  style={{ marginright: "20cm" }} bg="dark">
                    <div className='row'>
                        <ul className="social-links">
                            <li><a href="#"><ion-icon name="logo-facebook" class="fb"></ion-icon></a></li>
                            <li><a href="#"><ion-icon name="logo-twitter" class="twt"></ion-icon></a></li>
                            <li><a href="#"><ion-icon name="logo-google" class="gg"></ion-icon></a></li>
                            <li><a href="#"><ion-icon name="logo-instagram" class="ins"></ion-icon></a></li>
                        </ul>
                    </div>
                    <div className='row'>
                        <p>
                            ssssssssss
                            {/* Copyright &copy; 2021 by Khoa Nguyen. All rights reserved */}
                        </p>
                    </div>
                    </Container>
                </footer>
                <div className="footer-dark">   
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
                    {/* <div class="col-md-6 item text">
                        <h3>Company Name</h3>
                        <p>Praesent sed lobortis mi. Suspendisse vel placerat ligula. Vivamus ac sem lacus. Ut vehicula rhoncus elementum. Etiam quis tristique lectus. Aliquam in arcu eget velit pulvinar dictum vel in justo.</p>
                    </div> */}
                    <div class="col item social"><a href="/#"><i class="icon ion-social-facebook"></i></a><a href="/#"><i class="icon ion-social-twitter"></i></a><a href="/#"><i class="icon ion-social-snapchat"></i></a><a href="/#"><i class="icon ion-social-instagram"></i></a></div>
                </div>
                <p class="copyright">CYF Center © 2022</p>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
            </div>
            
        )
    }
    
}



