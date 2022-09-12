import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { __getMyPage, __patchProfileImage } from '../../redux/modules/MyPageSlice';
import MyPageLogoutModal from "./MyPageLogoutModal"
import profiletest from "../../assets/profiletest.jpg"
import axios from 'axios';

const MyPageUserTest = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mypages = useSelector((state) => state.mypages.mypages);
    console.log(mypages);

    useEffect(() => {
        dispatch(__getMyPage())
    }, [dispatch])

    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    //이미지 업로드

    // const [imageUrl, setImageUrl] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const imgRef = useRef();

    // const onChangeImage = () => {
    //     const reader = new FileReader();
    //     const file = imgRef.current.files[0];
    //     console.log(file);

    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //         setImageUrl(reader.result);
    //         console.log("이미지주소", reader.result);
    //     };
    // }

    const onChangeImage = (e) => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        console.log(file);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
            console.log("이미지주소", reader.result);
        };
        if (e.target.files[0]) {
            const userImage = new FormData();
            userImage.append("imgFile", e.target.files[0]);
            // axios
            //     .post("http://localhost:3001/helps", img)
            //     .then((res) => {
            //         setImageUrl(res.data);
            //     })

            //     .catch((err) => {
            //         console.error(err);
            //     })
            dispatch(__patchProfileImage(userImage))
        }
    }

    const onClickFileBtn = (e) => {
        imgRef.current.click();
    }

    const onErrorImg = (e) => {
        e.target.src = profiletest
    }

    return (
        <StLoginContainer>
            {modalOpen && <MyPageLogoutModal setModalOpen={setModalOpen} />}
            <UserContainer>
                <UserImgWrap>
                    {/* <UserImg>
                    <UserImgUpload>
                        <AiOutlineCamera size="18" style={{ color: "white" }} />
                    </UserImgUpload>
                </UserImg> */}
                    {/* <img src={imageUrl} style={{ width: "80px", height: "80px", borderRadius: "50%" }} ></img> */}
                        <UserImg src={imageUrl} onClick={() => { onClickFileBtn() }} onError={onErrorImg}></UserImg>
                        <input type="file" ref={imgRef} onChange={onChangeImage} style={{ display: "none" }}></input>
                        <UserImgUpload onClick={() => { onClickFileBtn() }}>
                            <AiOutlineCamera size="18" style={{ color: "white" }} />
                        </UserImgUpload>
                </UserImgWrap>
                <UserInfo>
                    <FirstWrap>
                        <UserWrap>
                            <UserName>{mypages.username}</UserName>
                            <UserAdmission>| {mypages.admission}</UserAdmission>
                        </UserWrap>
                        <UserWrap>
                            <UserUniversity>{mypages.schoolName}</UserUniversity>
                            <UserDepartment>{mypages.departmentName}</UserDepartment>
                        </UserWrap>
                        <UserEmail>{mypages.email}</UserEmail>
                    </FirstWrap>
                    <SecondWrap>
                        <LogoutButton
                            onClick={showModal}
                        >
                            <LogoutTitle>로그아웃</LogoutTitle>
                        </LogoutButton>
                    </SecondWrap>
                </UserInfo>
            </UserContainer>
        </StLoginContainer>
    );
};

export default MyPageUserTest;

const StLoginContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.div`
    width: 90%;
    height: 78%;
    /* height: 200px; */
    display: flex;
    /* border: 1px solid green; */
`

const UserImgWrap = styled.div`
    width: 25%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    justify-content: center;
`

const UserImg = styled.img`
    background-image: url(${profiletest});
    background-position: center;
    background-size: 100% 100%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #f9f9f9;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    display: block;
    cursor: pointer;
`

const UserImgUpload = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 82%;
    right: 75%;
    cursor: pointer;
`
const UserInfo = styled.div`
    width: 75%;
    height: 100%;
    /* border: 1px solid purple; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const FirstWrap = styled.div`
    /* border: 1px solid red; */
    width: 95%;
    height: 100%;
    margin-top: 5px;
`
const SecondWrap = styled.div`
    width: 95%;
`

const UserUniversity = styled.div`
    font-weight: 600;
    font-size: 16px;
`

const UserDepartment = styled.div`
    font-weight: 600;
    font-size: 16px;
`
const UserWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const UserName = styled.div`
    font-weight: 700;
    font-size: 20px;
`
const UserAdmission = styled.div`
    color: white;
`
const UserEmail = styled.div`
    font-weight: 500;
    font-size: 12px;
    /* color: #f7931e; */
    color: #fff4cc;
`
const LogoutButton = styled.div`
    width: 76px;
    height: 22px;
    /* height: 100%; */
    border: 1px solid white;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    cursor: pointer;
`
const LogoutTitle = styled.div`
    font-size: 13px;
    font-weight: 500;
    color: white;
`