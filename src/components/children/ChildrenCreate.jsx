import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";
import { SearchBar } from "../searchBar/SearchBar";
import "./_children.scss";
const FormCreate = () => {
    const { addChildren } = useContext(ChildrenContext);
    const { introducers } = useContext(ChildrenContext);
    const { nurturers } = useContext(ChildrenContext);
    
    const [newChildren, setNewChildren] = useState({
        image: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        introductoryDate: "",
        adoptiveDate: "",
        introducerId: 0,
        nurturerId: 0,
    });
    const [introducerId, setIntroducerId] = useState(0);
    const [introducer, setIntroducer] = useState({});
    const getIntroducerId = (valueId) => {
        setIntroducerId(valueId);
        setIntroducer(
            introducers.find((introducer) => introducer.id === valueId)
        );
    };
    const [nurturerId, setNurturerId] = useState(0);
    // const [nurturer, setNurturer] = useState(0);
    // const getNurturerId = (valueId) => {
    //     setNurturerId(valueId);
    //     setNurturerId(nurturers.find((nurturer) => nurturer.id === valueId));
    // };
    const onInputChange = (e) => {
        setNewChildren({
            ...newChildren,
            [e.target.name]: e.target.value,
        });
        console.log(newChildren);
    };
    const {
        image,
        fullName,
        gender,
        dateOfBirth,
        introductoryDate,
        adoptiveDate,
    } = newChildren;
    const handleSubmit = (e) => {
        e.preventDefault();
        addChildren(
            image,
            fullName,
            gender,
            dateOfBirth,
            introductoryDate,
            adoptiveDate,
            introducerId,
            nurturerId
        );
    };

    //Image Upload
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
    async function handleUpload() {
        if (!file) return;
        const storageRef = ref(storage, `children/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewChildren({
                        ...newChildren,
                        image: url,
                    });
                    console.log(url);
                })
                .catch((err) => console.log("err", err));
        });
    }
    return (
        <Form onSubmit={handleSubmit} className="form" id="childrenCreate">
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="childrenImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="childrenImageFile"
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
                        id="childrenImageFile"
                        onChange={onFileChange}
                        required
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUpload}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
            </Form.Group>

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
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Ngày sinh"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className="form-group">
                    <Form.Select
                        defaultValue="Giới tính"
                        className="form-select"
                        name="gender"
                        value={gender}
                        onChange={(e) => {
                            onInputChange(e);
                            setNewChildren({
                                ...newChildren,
                                gender:
                                    e.target.value === "true" ? true : false,
                            });
                        }}
                    >
                        <option value={"Giới tính"} hidden>
                            Giới tính
                        </option>
                        <option value={true}>Nam</option>
                        <option value={false}>Nữ</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className=" form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Ngày vào trung tâm"
                        name="introductoryDate"
                        value={introductoryDate}
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className=" form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Ngày nhận nuôi"
                        name="adoptiveDate"
                        value={adoptiveDate}
                        onChange={(e) => onInputChange(e)}
                        // required
                    />
                </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3 form-group">
                <SearchBar
                    placeholder={"Nhập tên người giới thiệu"}
                    data={introducers}
                    getValueId={getIntroducerId}
                />
            </Form.Group>
            {Object.keys(introducer).length !== 0 && (
                <Form.Group className="mb-3 form-group search-item">
                    <img
                        src={
                            introducer.image ||
                            "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                        }
                        alt=""
                        className="search-item__image"
                    />
                    <div className="search-item__content">
                        <p>{introducer.fullName || "Tên người giới thiệu"}</p>
                        <span> {introducer.phone || "Số điện thoại"}</span>
                    </div>
                </Form.Group>
            )}
            {/* <Form.Group as={Col} className="mb-3 form-group">
                <SearchBar
                    placeholder={"Nhập tên người giới thiệu"}
                    data={introducers}
                    getValueId={getIntroducerId}
                />
            </Form.Group> */}
        </Form>
    );
};

export default FormCreate;
