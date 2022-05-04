import React from 'react'
import {Link} from 'react-router-dom'
// import { useState } from 'react'
import { MetaTags } from 'react-meta-tags' 
// import { Component } from 'react/cjs/react.production.min'
import "./home.scss";

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
                <div class="navbar" >
		<div class="navbar navbar-inverse navbar-fixed-top">
		<div class="topNav" >
			<div class="container">
				<div class="alignR">
					<div class="pull-left socialNw">
						<a href="/#"><span class="icon-twitter"></span></a> <a href="/#"><span
							class="icon-facebook"></span></a> <a href="/#"><span
							class="icon-youtube"></span></a> <a href="/#"><span
							class="icon-tumblr"></span></a>
					</div>
						<a href="/"><span class="icon-home"></span> Trang chủ</a> 
						<a href="/"><span class="icon-book"></span>Giới thiệu</a> 
						<a href="/"><span class="icon-edit"></span> Thông tin KTX</a> 
						
						<a href="/"> <span class=""></span> Bảng giá KTX</a> 
						{/* <a class="active" href="dangxuat"> <span class="icon-user"></span> Đăng xuất
						</a> &emsp; &emsp; &emsp; Chào ${sessionScope.tensv } - ${sessionScope.user } */}
				</div>
			</div>
		</div>
	</div> 
	</div>
<br/>
                <header>
                    {/* <img className='logo' src='./img/logo.png' /> */}
                    <nav className='nav-link'>
                        <ul className='main-nav'>
                            <li className='nav'><Link className='button btnLogin' to="/Login">Đăng nhập</Link></li>
                            {/* <li className='nav'><Link className='button btnSignup' to="/Register">Đăng ký</Link></li> */}
                        </ul>
                    </nav>
                    <div className="hero-text-box row">
                        <h1 className='h1-subhome'>
                            Trung tâm bảo trợ trẻ em CYF
                        </h1>
                        <form className='search-form'>
                            <p>Hỗ trợ (24/7) : 0800 1234 678</p>
                            {/* <input className='txbPlace' type="text" placeholder="Nhập tên địa điểm cần đặt khách sạn" />
                            <button className='button btnSearch'>Tìm kiếm</button> */}
                        </form>
                    </div>
                </header>
                <section onLoad={() => {
                        document.querySelector('.loading').classList.add('hidden-loading')
                }}>
                    <p className='row loading'>Loading...</p>
                    <Places data={this.state.response} />

                    
                    {/* <div className='row'>
                        <Images img="./img/Hanoi.jpg" name="Hà Nội" src="/hanoi"/>
                        <Images img="./img/Danang.jpg" name="Đà Nẵng" src="/danang"/>
                        <Images img="./img/Saigon.jpg" name="Sài Gòn" src="/saigon"/>
                    </div>
                    <div className='row'>
                        <Images img="./img/Hue.jpg" name="Huế" src="hue"/>
                        <Images img="./img/Sapa.jpg" name="Sapa" src="sapa"/>
                        <Images img="./img/NhaTrang.jpg" name="Nha Trang" src="nhatrang" />
                    </div> */}
                </section>
                <footer>
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
                            {/* Copyright &copy; 2021 by Khoa Nguyen. All rights reserved */}
                        </p>
                    </div>
                </footer>
            </div>
        )
    }
    
}

class Images extends React.Component {
    render() {
        return (
            <div className='col span-1-of-3'>
                <Link to={this.props.src}><img alt='' src={this.props.img} className='image-place' /></Link>
                <p style={{margin: "0"}}>{this.props.name}</p>
            </div>
        )
    }
}

class Places extends React.Component{
    
    render() {
        return (
            <div className='row'>
                {this.props.data.map((item, index) => {
                    let url = ''
                    switch(item.id) {
                        case 1: 
                            url = '/hanoi'
                            break
                        case 2:
                            url = '/saigon'
                            break
                        case 25:
                            url = '/dalat'
                            break
                        case 26:
                            url = '/hue'
                            break
                        case 47:
                            url = '/vungtau'
                            break
                        default: 
                            url = '/danang'
                    }
                    return <Images key={item.id} img={item.image} name={item.location} src={url}/>
                })}
                
            </div>
            
        )
    }
}

