import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { AccountContext } from "../../contexts/AccountContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const AccountCreate = () => {
    const { addAccount } = useContext(AccountContext);
    const [newAccount, setNewAccount] = useState({
        image: "",
        fullName: "",
        date_of_birth: "",
        gender: "",
        roles: [],
        address: "",
        identification: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [imageSuccess, setImageSuccess] = useState("");

    const onInputChange = (e) => {
        setNewAccount({
            ...newAccount,
            [e.target.name]: e.target.value,
        });
        console.log(newAccount);
    };
    const {
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
    } = newAccount;
    const handleSubmit = (e) => {
        e.preventDefault();
        addAccount(
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
            confirmPassword
        );
    };

    // IMAGE UPLOAD
    // generate random string for filename
    function generateString(length) {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = " ";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        }
        return result;
    }
    const [file, setFile] = useState("");
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUploadImage() {
        if (!file) return;
        const storageRef = ref(storage, `accounts/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewAccount({
                        ...newAccount,
                        image: url,
                    });
                    console.log(url);
                    setImageSuccess("Tải ảnh lên thành công");
                })
                .catch((err) => console.log("err", err));
        });
    }

    return (
        <>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="accountImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="accountImageFile"
                        className="form-label btn__image btn btn--secondary"
                    >
                        <i className="bi bi-image icon icon__image"></i>
                        Chọn ảnh
                    </Form.Label>
                    <Form.Control
                        className="form-control form-control__file"
                        type="file"
                        accept="image/*"
                        name="image"
                        id="accountImageFile"
                        onChange={onFileChange}
                        required
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUploadImage}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="accountCreate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Họ và tên"
                        name="fullName"
                        value={fullName}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Ngày sinh"
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            value={date_of_birth}
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY");
                                setNewAccount({
                                    ...newAccount,
                                    date_of_birth: resultDate,
                                });
                            }}
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
                    <Form.Group as={Col} className="form-group">
                        <select
                            defaultValue="Phân quyền"
                            className="form-select"
                            name="roles"
                            value={roles}
                            onChange={(e) => {
                                onInputChange(e);
                                setNewAccount({
                                    ...newAccount,
                                    roles: [e.target.value],
                                });
                            }}
                        >
                            <option value={"Phân quyền"} hidden>
                                Phân quyền
                            </option>
                            <option value={["ROLE_ADMIN"]}>
                                Quản trị viên
                            </option>
                            <option value={["ROLE_EMPLOYEE"]}>Nhân viên</option>
                            <option value={["ROLE_MANAGER_LOGISTIC"]}>
                                Quản lý trung tâm
                            </option>
                            <option value={["ROLE_MANAGER_HR"]}>
                                Quản lý nhân sự
                            </option>
                            <option value={["ROLE_MANAGER_CHILDREN"]}>
                                Quản lý trẻ em
                            </option>
                        </select>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Địa chỉ"
                        name="address"
                        value={address}
                        onChange={(e) => onInputChange(e)}
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
                            onChange={(e) => onInputChange(e)}
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
                            onChange={(e) => onInputChange(e)}
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
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={password}
                            onChange={(e) => onInputChange(e)}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Control
                            className="form-control"
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => onInputChange(e)}
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
        </>
    );
};

export default AccountCreate;
