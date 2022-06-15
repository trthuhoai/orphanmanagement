import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Header = () => {
    return (
        <div>
            <Navbar style={{ position: "fixed", top: 0, left: 0}} bg="light" expand="lg">
                <span className="logo" style={{ marginLeft: "2cm" }}>
                    <span className="logo__name">CYF</span>
                    <span className="logo-center" style={{ color: "#424252" }}>
                        Center
                    </span>
                </span>
                <Container style={{ marginright: "0cm", marginLeft: "17cm" }}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Navbar style={{ position: "fixed" }} />
                        <Nav className="me-auto">
                            <NavLink
                                activeClassName="active"
                                className="aa"
                                to="/"
                            >
                                Trang chủ
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                className="aa"
                                to="/news"
                            >
                                Tin tức
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                className="aa"
                                to="/sendfeedback"
                            >
                                Đánh giá
                            </NavLink>
                            <NavLink
                                activeClassName="active"
                                className="aa"
                                to={`/${
                                    localStorage.getItem("token")
                                        ? "account "
                                        : "login"
                                }`}
                            >
                                Đăng nhập
                            </NavLink>
                        </Nav>
                        <span className="logo">
                            <span className="logo__name">CYF</span>
                            <span
                                className="logo-center"
                                style={{ color: "#424252" }}
                            >
                                Center
                            </span>
                        </span>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
