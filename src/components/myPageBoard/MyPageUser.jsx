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
import goldmedal from "../../assets/goldmedal.png"
import silvermedal from "../../assets/silvermedal.png"
import bronzemedal from "../../assets/bronzemedal.png"

const MyPageUser = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const mypages = useSelector((state) => state.mypages.mypages);
    const { mypages, totalCount } = useSelector((state) => state.mypages);
    // console.log(mypages, totalCount);

    useEffect(() => {
        dispatch(__getMyPage())
    }, [dispatch])

    //프로필 이미지 PATCH 기능

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

    // 마이페이지 로그아웃 모달
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
                            <CameraIcon />
                        </UserImgUpload>
                </UserImgWrap>
                <UserInfo>
                    <FirstWrap>
                        <StUserContainer>
                            <StFirstUserWrap>
                                <StUserName>{mypages.username}</StUserName>
                                <UserAdmission>| {mypages.admission}</UserAdmission>
                            </StFirstUserWrap>
                            <StUserLankWrap>
                                <StUserLank>
                                    {totalCount < 5 ? <img src={bronzemedal} /> :
                                    totalCount < 10 ? <img src={silvermedal} /> : <img src={goldmedal} />}
                                </StUserLank>
                                {/* <StUserLankContent>게시글 개수 5개 이상 실버 왕관, 10개 이상 골드 왕관</StUserLankContent> */}
                            </StUserLankWrap>
                        </StUserContainer>
                        <StUserWrap>
                            <UserUniversity>{mypages.schoolName}</UserUniversity>
                            <UserDepartment>{mypages.departmentName}</UserDepartment>
                        </StUserWrap>
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
    width: 100%;
    height: 78%;
    /* height: 200px; */
    display: flex;
    gap: 15px;
`

const UserImgWrap = styled.div`
    width: 25%;
    height: 90px;
    display: flex;
    justify-content: flex-end;
    margin-left: 30px;
    align-items: flex-end;
`

const UserImg = styled.img`
    width: 85px;
    height: 85px;
    border-radius: 50%;
    background-color: #f9f9f9;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    display: block;
    cursor: pointer;
    position: relative;
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
    /* bottom: 81%;
    right: 70%; */
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
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
`

const FirstWrap = styled.div`
    width: 100%;
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

const StUserContainer = styled.div`
    display: flex;
    /* flex-direction: row; */
    align-items: center;
    gap: 5px;
    height: 40px;
    width: 100%;
`
const StUserWrap = styled.div`
    display: flex;
    gap: 5px;
`

const StFirstUserWrap = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`
const StUserName = styled.div`
    font-weight: 700;
    font-size: 20px;
`
const UserAdmission = styled.div`
    color: white;
`

const StUserLankWrap = styled.p`
    display: flex;
    align-items: center;
    flex-direction: row;
    /* justify-content: space-between; */
`

const StUserLank = styled.p`
    margin: 0 8px 3px 5px;
    /* &:hover {
    ~div{
        display: block;
    }
    } */
`

// const StUserLankContent = styled.div`
//     display: none;
//     color: white;
//     font-size: 8px;
//     width: 130px;
// `
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