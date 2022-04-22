import { useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { AccountContext } from "../../contexts/AccountContext";
import "../../scss/abstracts/_form.scss";

const AccountUpdate = ({ theAccount }) => {
    const id = theAccount.id;

    useEffect(() => {
        getDetailAccount();
    }, []);

    const [image, setImage] = useState("");
    const [fullName, setFullName] = useState("");
    const [date_of_birth, setDate_of_birth] = useState("");
    const [gender, setGender] = useState("");
    const [roles, setRoles] = useState("");
    const [address, setAddress] = useState("");
    const [identification, setIdentification] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function getDetailAccount() {
        const token = JSON.parse(localStorage.getItem("token"));
        let requestOptions = {
            method: "GET",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            redirect: "follow",
        };

        await fetch(
            `https://orphanmanagement.herokuapp.com/api/v1/admin/${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result).data;
                setImage(result.image);
                setFullName(result.fullName);
                setDate_of_birth(result.date_of_birth);
                setGender(result.gender);
                setRoles(
                    result.roles.includes("ROLE_ADMIN")
                        ? ["admin"]
                        : ["manager"]
                );
                setAddress(result.address);
                setIdentification(result.identification);
                setPhone(result.phone);
                setEmail(result.email);
                setPassword(result.password);
                setConfirmPassword(result.confirmPassword);
                console.log(
                    result.image,
                    result.fullName,
                    result.date_of_birth,
                    result.gender,
                    result.roles,
                    result.address,
                    result.identification,
                    result.phone,
                    result.email,
                    result.password,
                    result.confirmPassword
                );
            })
            .catch((error) => console.log("error", error));
    }

    const { updateAccount } = useContext(AccountContext);

    const updatedAccount = {
        image,
        fullName,
        date_of_birth,
        gender,
        roles,
        address,
        identification,
        phone,
        email,
        password,
        confirmPassword,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateAccount(id, updatedAccount);
    };

    return (
        <Form onSubmit={handleSubmit} className="form" id="accountUpdate">
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="accountImage"
                    alt=""
                    src={
                        image ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Form.Label
                    htmlFor="accountImageFile"
                    className="form-label form-label__image"
                >
                    <i className="bi bi-image icon icon__image"></i>
                    Ảnh đại diện
                </Form.Label>
                <Form.Control
                    className="form-control form-control__file"
                    type="file"
                    accept="image/*"
                    name="image"
                    id="accountImageFile"
                    // value={url}
                    // onChange={onFileChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Họ và tên"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Ngày sinh"
                        name="date_of_birth"
                        value={date_of_birth}
                        onChange={(e) => setDate_of_birth(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} className="form-group">
                    <Form.Select
                        defaultValue="Giới tính"
                        className="form-select"
                        name="gender"
                        value={gender}
                        onChange={(e) =>
                            setGender(e.target.value === "true" ? true : false)
                        }
                    >
                        <option selected hidden>
                            Giới tính
                        </option>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className="form-group">
                    <Form.Select
                        defaultValue="Phân quyền"
                        className="form-select"
                        name="roles"
                        value={roles}
                        onChange={(e) => setRoles([e.target.value])}
                    >
                        <option selected hidden>
                            Phân quyền
                        </option>
                        <option value={["admin"]}>Admin</option>
                        <option value={["manager"]}>Manager</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="text"
                    placeholder="Địa chỉ"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="CMND/CCCD"
                        name="identification"
                        value={identification}
                        onChange={(e) => setIdentification(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} className="form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Số điện thoại"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3 form-group">
                <Form.Control
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group as={Col} className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="password"
                        placeholder="Xác nhận mật khẩu"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                {password !== confirmPassword && (
                    <p className="password__match">
                        Mật khẩu không trùng khớp.
                    </p>
                )}
            </Row>
        </Form>
    );
};

export default AccountUpdate;
