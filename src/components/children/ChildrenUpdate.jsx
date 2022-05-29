import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes
} from "firebase/storage";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { ChildrenContext } from "../../contexts/ChildrenContext";
import { storage } from "../../firebase";
import "../../scss/abstracts/_form.scss";
import { SearchBar } from "../search/SearchBar";

const ChildrenUpdate = ({ theChildren }) => {
    const id = theChildren.id;
    const { introducers } = useContext(ChildrenContext);
    const { nurturers } = useContext(ChildrenContext);

    const [image, setImage] = useState("");

    const [imageSuccess, setImageSuccess] = useState("");
    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [introductoryDate, setIntroductoryDate] = useState("");
    const [adoptiveDate, setAdoptiveDate] = useState("");
    const [introducerId, setIntroducerId] = useState(0);
    const [nurturerId, setNurturerId] = useState(0);

    const [introducer, setIntroducer] = useState({});
    const [nurturer, setNurturer] = useState({});

    const { viewChildren } = useContext(ChildrenContext);
    useEffect(() => {
        viewChildren(id).then((result) => {
            setImage(result.image);
            setFullName(result.fullName);
            setDateOfBirth(result.dateOfBirth);
            setGender(result.gender);
            setIntroductoryDate(result.introductoryDate || "");
            setAdoptiveDate(result.adoptiveDate || "");
            setIntroducerId(result.introducerId || 0);
            setIntroducer(
                introducers.find(
                    (introducer) => introducer.id === result.introducerId
                )
            );
            setNurturerId(result.nurturerId || 0);
            setNurturer(
                nurturers.find((nurturer) => nurturer.id === result.nurturerId)
            );
        });
    }, []);

    const getIntroducerId = (valueId) => {
        setIntroducerId(valueId);
        setIntroducer(
            introducers.find((introducer) => introducer.id === valueId)
        );
    };
    const getNurturerId = (valueId) => {
        setNurturerId(valueId);
        setNurturer(nurturers.find((nurturer) => nurturer.id === valueId));
    };

    const { updateChildren } = useContext(ChildrenContext);
    const updatedChildren = {
        image,
        fullName,
        gender,
        dateOfBirth,
        introductoryDate,
        adoptiveDate,
        introducerId,
        nurturerId,
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(updatedChildren);
        updateChildren(id, updatedChildren);
    };

    // IMAGE UPDATE
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
    async function handleUpdateImage() {
        if (!file) return;
        if (image && image.includes("firebasestorage")) {
            const pathFromURL = ref(storage, image)._location.path_;
            const desertRef = ref(storage, pathFromURL);
            await deleteObject(desertRef)
                .then(() => {
                    console.log("File deleted successfully");
                })
                .catch((error) => {
                    console.log("Uh-oh, an error occurred!", error);
                });
        }
        const storageRef = ref(storage, `children/${generateString(100)}`);
        await uploadBytes(storageRef, file).then(() => {
            getDownloadURL(storageRef)
                .then((url) => {
                    console.log(url);
                    setImage(url);
                    setImageSuccess("Tải ảnh lên thành công");
                })
                .catch((err) => console.log(err));
        });
    }
    return (
        <>
            <Form.Group className="mb-3 form-group">
                <img
                    className="image"
                    id="childrenImage"
                    alt=""
                    src={
                        (file && URL.createObjectURL(file)) ||
                        image ||
                        "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
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
                    />
                    <Button
                        className="form-label btn__image btn btn--secondary"
                        onClick={handleUpdateImage}
                    >
                        <i className="bi bi-file-earmark-arrow-up-fill"></i> Lưu
                        ảnh
                    </Button>
                </Row>
                {imageSuccess && (
                    <p className="image__success">{imageSuccess}</p>
                )}
            </Form.Group>
            <Form onSubmit={handleSubmit} className="form" id="childrenUpdate">
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
                        <DatePicker
                            className="form-control"
                            placeholderText="Ngày sinh"
                            selected={
                                new Date(
                                    dateOfBirth.substring(6, 11),
                                    dateOfBirth.substring(3, 5) - 1,
                                    dateOfBirth.substring(0, 2)
                                )
                            }
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                console.log(date);
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY");
                                setDateOfBirth(resultDate);
                            }}
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col} className="form-group">
                        <Form.Select
                            className="form-select"
                            name="gender"
                            value={gender}
                            onChange={(e) =>
                                setGender(
                                    e.target.value === "true" ? true : false
                                )
                            }
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
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Ngày vào trung tâm"
                            selected={
                                new Date(
                                    introductoryDate.substring(6, 11),
                                    introductoryDate.substring(3, 5) - 1,
                                    introductoryDate.substring(0, 2)
                                )
                            }
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY");
                                setIntroductoryDate(resultDate);
                            }}
                            required
                        />
                    </Form.Group>
                    <Form.Group as={Col} className="form-group">
                        <DatePicker
                            className="form-control"
                            placeholderText="Ngày nhận nuôi"
                            selected={
                                adoptiveDate &&
                                new Date(
                                    adoptiveDate.substring(6, 11),
                                    adoptiveDate.substring(3, 5) - 1,
                                    adoptiveDate.substring(0, 2)
                                )
                            }
                            showYearDropdown
                            scrollableYearDropdown
                            yearDropdownItemNumber={100}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                const resultDate =
                                    moment(date).format("DD/MM/YYYY");
                                setAdoptiveDate(resultDate);
                            }}
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
                {introducer && Object.keys(introducer).length !== 0 && (
                    <Form.Group className="mb-3 form-group search-item">
                        <img
                            src={
                                introducer.image ||
                                "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                            }
                            alt=""
                            className="search-item__image"
                        />
                        <div className="search-item__content">
                            <p>{introducer.fullName}</p>
                            <i
                                className="bi bi-trash3 icon icon__delete"
                                onClick={() => {
                                    setIntroducerId(0);
                                    setIntroducer({});
                                }}
                            ></i>
                        </div>
                    </Form.Group>
                )}
                <Form.Group as={Col} className="mb-3 form-group">
                    <SearchBar
                        placeholder={"Nhập tên người nhận nuôi"}
                        data={nurturers}
                        getValueId={getNurturerId}
                    />
                </Form.Group>
                {nurturer && Object.keys(nurturer).length !== 0 && (
                    <Form.Group className="mb-3 form-group search-item">
                        <img
                            src={
                                nurturer.image ||
                                "https://firebasestorage.googleapis.com/v0/b/cyfcenter-323a8.appspot.com/o/placeholder-img.webp?alt=media&token=6f658374-20b2-4171-9ef2-32ad3f87fa57"
                            }
                            alt=""
                            className="search-item__image"
                        />
                        <div className="search-item__content">
                            <p>{nurturer.fullName}</p>
                            <i
                                className="bi bi-trash3 icon icon__delete"
                                onClick={() => {
                                    setNurturerId(0);
                                    setNurturer({});
                                    setAdoptiveDate("");
                                }}
                            ></i>
                        </div>
                    </Form.Group>
                )}
            </Form>
        </>
    );
};

export default ChildrenUpdate;
