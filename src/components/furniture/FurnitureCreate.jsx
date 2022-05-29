import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { FurnitureContext } from "../../contexts/FurnitureContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";

const FormCreate = () => {
    const { addResult, addFurniture } = useContext(FurnitureContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [newFurniture, setNewFurniture] = useState({
        image: "",
        nameFurniture: "",
        status: " ",
        goodQuantity: 0,
        brokenQuantity: 0,
    });
    const [imageSuccess, setImageSuccess] = useState("");
    const onInputChange = (e) => {
        setNewFurniture({
            ...newFurniture,
            [e.target.name]: e.target.value,
        });
        console.log(newFurniture);
    };
    const { image, nameFurniture, status, goodQuantity, brokenQuantity } =
        newFurniture;
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ok");
        addFurniture(
            image,
            nameFurniture,
            status,
            goodQuantity,
            brokenQuantity
        );
        if (addResult) {
            setErrorMessage("Thêm thông tin thiết bị thành công!");
        } else {
            setErrorMessage("Lỗi thêm thiết bị!");
        }
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
    const [file, setFile] = useState(null);
    const onFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    async function handleUploadImage() {
        if (!file) return;
        const storageRef = ref(storage, `furnitures/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    setNewFurniture({
                        ...newFurniture,
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
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
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
                        <i class="bi bi-file-earmark-arrow-up-fill"></i> Lưu ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="furnitureCreate">
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="text"
                        placeholder="Tên thiết bị"
                        name="nameFurniture"
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="number"
                        placeholder="Số lượng sử dụng tốt"
                        name="goodQuantity"
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="number"
                        placeholder="Số lượng hư hỏng"
                        name="brokenQuantity"
                        onChange={(e) => onInputChange(e)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3 form-group">
                    <Form.Control
                        className="form-control"
                        type="test"
                        placeholder="Ghi chú"
                        name="status"
                        onChange={(e) => onInputChange(e)}
                    />
                </Form.Group>
                <Row className="mb-6">
                    <p style={{ color: "red" }}>
                        {errorMessage && (
                            <div className="error"> {errorMessage} </div>
                        )}
                    </p>
                </Row>
            </Form>
        </>
    );
};

export default FormCreate;
