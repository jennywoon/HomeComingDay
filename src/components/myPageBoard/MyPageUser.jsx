import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { __getMyPage, __patchProfileImage } from '../../redux/modules/MyPageSlice';
import MyPageLogoutModal from "./MyPageLogoutModal"
import profileorange from "../../assets/profileorange.png"
import camera from "../../assets/camera.png"

const MyPageUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mypages = useSelector((state) => state.mypages.mypages);
    console.log(mypages);

    useEffect(() => {
        dispatch(__getMyPage())
    }, [dispatch])

    //이미지 업로드

    const [imageUrl, setImageUrl] = useState("");
    const imgRef = useRef();

    const onChangeImage = async (e) => {
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
            userImage.append("userImage", e.target.files[0]);
            await dispatch(__patchProfileImage(userImage));
            await dispatch(__getMyPage());
            console.log(userImage);
        }
    }

    const onClickFileBtn = (e) => {
        imgRef.current.click();
    }

    const onErrorImg = (e) => {
        e.target.src = profileorange
    }

    const [modalOpen, setModalOpen] = useState(false);
    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    return (
        <StLoginContainer>
            {modalOpen && <MyPageLogoutModal setModalOpen={setModalOpen} />}
            <UserContainer>
                <UserImgWrap>
                        <UserImg 
                        src={mypages.userImage} onClick={() => { onClickFileBtn() }} 
                        onError={onErrorImg}
                        >
                        </UserImg>
                        <input type="file" ref={imgRef} onChange={onChangeImage} style={{ display: "none" }}></input>
                        <UserImgUpload onClick={() => { onClickFileBtn() }}>
                            <CameraIcon/>
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

export default MyPageUser;

const StLoginContainer = styled.form`
  width: 100%;
  /* height: 100%; */
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserContainer = styled.div`
    width: 85%;
    height: 78%;
    /* height: 200px; */
    display: flex;
    /* border: 1px solid green; */
    gap: 10px;
`

const UserImgWrap = styled.div`
    width: 25%;
    height: 100%;
    /* border: 1px solid green; */
    display: flex;
    justify-content: center;
`

const UserImg = styled.img`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #f9f9f9;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    display: block;
    cursor: pointer;
`

const UserImgUpload = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 81%;
    right: 70%;
    cursor: pointer;
`

const CameraIcon = styled.div`
    width: 20px;
    height: 20px;
    background-image: url(${camera});
    background-position: center;
    background-size: 100% 100%;
`
const UserInfo = styled.div`
    width: 75%;
    height: 100%;
    /* border: 1px solid purple; */
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
`

const FirstWrap = styled.div`
    /* border: 1px solid red; */
    width: 95%;
    /* height: 100%; */
    margin: 5px 0 15px 0;
`
const SecondWrap = styled.div`
    width: 95%;
    /* border: 1px solid red; */
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