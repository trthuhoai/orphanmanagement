import React, { useContext } from 'react'
import { MetaTags } from 'react-meta-tags' 
import { NavLink } from 'react-router-dom';
import NewsList from "./NewsList";
import "./news.scss";
import { useEffect, useState } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { Row, Container } from "react-bootstrap";
import NewsPagination from "./NewsPagination";
import { NewsContext } from "../../contexts/NewsContext";
export default function News() {
    const {charity}=useContext(NewsContext);
    const [picnic, setPicnic]=useState([]);
    const [pagesPicnic, setPagesPicnic] = useState(0);
    async function getPicnicsList(newsPage) {
        let requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            redirect: "follow",
        };
        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/home/picnic?page=${newsPage}&limit=5`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                setPicnic(result.data.result);
                setPagesPicnic(result.data.pages);
            })
            .catch((error) => console.log("error", error));
    }
    return (
    <>
    <div className='container1'>
        <MetaTags>
            <title>Trang chủ</title>
        </MetaTags>
    <Navbar  className='prior' bg="light" expand="lg">
        <span className="logo" style={{ marginLeft: "2cm"}}>
            <span className="logo__name">CYF</span>
            <span className="logo-center" style={{ color: "#424252" }}>Center</span>
        </span>
        <Container  style={{ marginright: "0cm", marginLeft: "17.3cm"}} >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Navbar style={{ position: "fixed" }}/>
            <Nav  className="me-auto">
                <NavLink activeClassName="active" className="aa" to="/">Trang chủ</NavLink>
                <NavLink activeClassName="active" className="aa" to="/news">Tin tức</NavLink>
                <NavLink activeClassName="active" className="aa" to="/sendfeedback">Đánh giá</NavLink>
                <NavLink activeClassName="active" className="aa" to="/login">Đăng nhập</NavLink>
            </Nav>
            <span className="logo">
                <span className="logo__name">CYF</span>
                <span className="logo-center" style={{ color: "#424252" }}>Center</span>
            </span>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    <section class="section theme_third section-service section-auto" style={{ background: "#d2f0db" }}>
		<div class="section-contents">
			<div class="container1" >
				<div class="row">
					<div class="col-sm-12">
						<div class="section-headline">
							<h2 class="headline" style={{ color: "#424252" }}>TIN TỨC MỚI NHẤT</h2>
							<h3 class="headline-reduce" style={{ color: "#424252" }}> Chi tiết thông tin các hoạt động, kêu gọi hỗ trợ từ trung tâm</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="section theme_default_thin section-service section-auto">
		<div class="section-contents">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 fade_animation">
						<div class="container-news">
                        {charity.reverse().map((ch) => (
                            <NewsList charity={ch} />
                            ))}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    <div class="section-contents">
        <NewsPagination/> 
    </div>
    <div className="footer-dark" style={{ marginTop: '3cm', marginLeft: '-3cm'}}>   
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
    </>
    );
}
    




