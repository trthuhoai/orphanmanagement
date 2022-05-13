import React from 'react'
import {Link} from 'react-router-dom'
import { MetaTags } from 'react-meta-tags' 
import { NavLink } from 'react-router-dom';
import "./news.scss";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Row, Container } from "react-bootstrap";

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
    {/* <header>
        <nav className='nav-link'>
            <ul className='main-nav'>
                <li className='nav'><Link className='button btnLogin' to="/Login">Đăng nhập</Link></li>
            </ul>
        </nav>
        <div className="hero-text-box row">
            <form className='search-form'>
            </form>
        </div>
    </header> */}
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
							
									<a href="http://localhost:8080/2021/09/06/%e2%98%85%e5%b2%a1%e5%b4%8e%e6%94%af%e5%ba%97%e3%82%aa%e3%83%bc%e3%83%97%e3%83%b3%ef%bc%81%e2%98%85/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-information">      TIN TỨC  </span>										2021/09/06									</dt>
									<dd>
										<h5>Hoàn cảnh đáng thương của hai cháu bị bệnh bại não xã Quang Sơn</h5>
									Nghẹn ngào lau giọt nước mắt chảy dài trên đôi má gầy gò, người mẹ trẻ kêu lên như gào thét: “Các con ơi, thương các con lắm, nhưng giờ mẹ biết làm gì để có tiền mà chữa bệnh cho các con đây, xin các con hãy tha thứ cho mẹ”. Đó là lời khóc van trong tuyệt vọng của chị Lê Thị Na ở xóm 4, xã Quang Sơn, huyện Đô Lương, tỉnh Nghệ An kêu lên khi có 2 đứa con đều bị bệnh bại não
									</dd>
								</dl>
							</a>
														<a href="http://localhost:8080/2021/09/01/%e3%80%90%e9%87%8d%e8%a6%81%e3%80%91%e7%99%bb%e9%8c%b2%e6%83%85%e5%a0%b1%e5%a4%89%e6%9b%b4%e7%94%b3%e8%ab%8b%e3%81%ab%e3%81%a4%e3%81%84%e3%81%a6%e3%81%ae%e3%81%8a%e7%9f%a5%e3%82%89%e3%81%9b/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-release">HỖ TRỢ</span>										2021/09/01									</dt>
									<dd><h5>Một đứa trẻ bị bệnh ung thư cần được giúp đỡ</h5>
									Đó là bé Lê Thị Nơi ở khu phố Bà Triệu, phường 7, TP Tuy Hòa. Hiện tế bào ung thư từ vú phải đã di căn khắp nơi nên bà chỉ có thể nằm một chỗ. Không có tiền đến bệnh viện chữa trị, bà Nơi đành nằm nhà để chồng con chăm sóc.</dd>
								</dl>
							</a>
														<a href="http://localhost:8080/2021/08/25/%e2%98%85%e9%ab%98%e5%b4%8e%e6%94%af%e5%ba%97%e3%82%aa%e3%83%bc%e3%83%97%e3%83%b3%ef%bc%81%e2%98%85/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-information">TIN TỨC</span>										2021/08/25									</dt>
									<dd><h5>Chồng chết, vợ phụ hồ nuôi con ung thư</h5>
									Đó là bà Lê Thị Nơi ở khu phố Bà Triệu, phường 7, TP Tuy Hòa. Hiện tế bào ung thư từ vú phải đã di căn khắp nơi nên bà chỉ có thể nằm một chỗ. Không có tiền đến bệnh viện chữa trị, bà Nơi đành nằm nhà để chồng con chăm sóc</dd>
								</dl>
							</a>
														<a href="http://localhost:8080/2021/08/23/%e2%98%85%e7%b5%8c%e7%90%86%e9%83%a8%e2%98%859%e6%9c%88%e3%81%ae%e3%81%8a%e6%8c%af%e8%be%bc%e3%82%b9%e3%82%b1%e3%82%b8%e3%83%a5%e3%83%bc%e3%83%ab-3/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-information">TIN TỨC</span>										2021/08/23									</dt>
									<dd><h5>Ám ảnh ánh mắt thơ dại của ba đứa bé mồ côi cả cha lẫn mẹ</h5>
									Cha mất chưa được bao lâu thì một vụ tai nạn giao thông đã cướp đi người mẹ. Giờ đây, ba chị em Trang chỉ biết bấu víu, nương tựa vào nhau sống lay lắt qua ngày.</dd>
								</dl>
							</a>
														<a href="http://localhost:8080/2021/07/26/%e2%98%85%e7%b5%8c%e7%90%86%e9%83%a8%e2%98%858%e6%9c%88%e3%81%ae%e3%81%8a%e6%8c%af%e8%be%bc%e3%82%b9%e3%82%b1%e3%82%b8%e3%83%a5%e3%83%bc%e3%83%ab-3/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-information">TIN TỨC</span>										2021/07/26									</dt>
									<dd><h5>Cháu bé 3 tuổi bị 2 bệnh hiểm nghèo</h5>
									Cách đây 5 tháng, hai chân cháu Trịnh Trương Cẩm Hân (2013), con anh Trịnh Ngọc Hòa (1973, trú tổ 88, Phú Lộc 14, P.Hòa Minh, Q.Liên Chiểu, Đà Nẵng) bị gãy 3 đoạn (xương tự hủy), sưng phù, vô cùng đau đớn. Khi đưa con đi bệnh viện khám, các bác sĩ cho biết cháu Hân bị bệnh xương thủy tinh. Sau 1 tháng điều trị, Bệnh viện Phụ sản-Nhi Đà Nẵng chuyển cháu vào Bệnh viện Truyền máu huyết học TPHCM, tại đây, sau khi làm các xét nghiệm, bác sĩ chẩn đoán cháu bị bệnh ung thư máu (bệnh bạch cầu cấp dòng Lympho). Khó khăn chồng chất khó khăn, anh Hòa làm thợ mộc thu nhập hằng tháng ít ỏi, lại bị bệnh hen suyễn phải nhập viện thường xuyên, còn vợ thì không có việc làm...</dd>
								</dl>
							</a>
														<a href="http://localhost:8080/2021/07/26/%e2%98%85%e7%86%8a%e6%9c%ac%e6%94%af%e5%ba%97%e3%82%aa%e3%83%bc%e3%83%97%e3%83%b3%ef%bc%81%e2%98%85/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-information">TIN TỨC</span>										2021/07/26									</dt>
									<dd><h5>Thương cho số phận cả gia đình đều là trẻ mồ côi</h5>
									Ôm đứa cháu đáng thương trong tay, bà Khăm Pa Văn nghẹn ngào không nói nên lời: “Tội nghiệp con bé, mới sinh được 3 tiếng thì mẹ mất, 13 tháng tuổi thì mồ côi cha. Nhà thì nghèo không có tiền mua sữa cho cháu tôi phải chắt lấy nước cơm rồi hòa với đường thay sữa mẹ cho cháu ăn...”. có bốn người, ba thế hệ bị bại liệt, thần kinh
									Xót xa người bán hủ tiếu bị nước lèo đổ bỏng toàn thân
									Chồng chết, vợ bệnh tật nuôi 3 con thơ
									Nỗi đau đằng sau căn bệnh không tên</dd>
								</dl>
							</a>
														<a href="http://localhost:8080/2021/07/05/%e3%80%8c%e5%88%9d%e9%99%a3%ef%bc%81%e9%98%aa%e7%a5%9e%e3%82%bf%e3%82%a4%e3%82%ac%e3%83%bc%e3%82%b9women%e3%80%8d%e7%95%aa%e7%b5%84%e5%86%85%e3%82%a4%e3%83%b3%e3%82%bf%e3%83%93%e3%83%a5%e3%83%bc/">
								<dl class="dl-horizontal">
									<dt>
										<span class="label label-release">HỖ TRỢ</span>										2021/07/05									</dt>
									<dd><h5>Hãy giúp cháu Ksor Y Lam vượt qua bệnh tật</h5>
									Cháu Ksor Y Lam, SN 2008 ở buôn Lê Diêm, thị trấn Hai Riêng, huyện Sông Hinh (con của anh Nay Y Kép) đang sống trong cảnh bệnh tật triền miên, rất cần sự chia sẻ và giúp đỡ của cộng đồng.</dd>
								</dl>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
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
            
        )
    }
    
}



