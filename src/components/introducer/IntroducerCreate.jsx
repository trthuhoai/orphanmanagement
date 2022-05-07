import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { IntroducerContext } from "../../contexts/IntroducerContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const IntroducerCreate = () => {
    const { addIntroducer } = useContext(IntroducerContext);
    const [newIntroducer, setNewIntroducer] = useState({
        image: "",
        fullName: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        identification: "",
        phone: "",
        email: "",
    });
    const [imageSuccess, setImageSuccess] = useState("");

    const onInputChange = (e) => {
        setNewIntroducer({
            ...newIntroducer,
            [e.target.name]: e.target.value,
        });
        console.log(newIntroducer);
    };
    const {
        image,
        fullName,
        dateOfBirth,
        gender,
        address,
        identification,
        phone,
        email,
    } = newIntroducer;
    const handleSubmit = (e) => {
        e.preventDefault();
        addIntroducer(
            image,
            fullName,
            dateOfBirth,
            gender,
            address,
            identification,
            phone,
            email
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
        const storageRef = ref(storage, `introducers/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewIntroducer({
                        ...newIntroducer,
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
                    id="introducerImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        "https://shahpourpouyan.com/wp-content/uploads/2018/10/orionthemes-placeholder-image-1.png"
                    }
                />
                <Row>
                    <Form.Label
                        htmlFor="introducerImageFile"
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
                        id="introducerImageFile"
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
            <Form
                onSubmit={handleSubmit}
                className="form"
                id="introducerCreate"
            >
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
                                setNewIntroducer({
                                    ...newIntroducer,
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
            </Form>
        </>
    );
};

export default IntroducerCreate;
