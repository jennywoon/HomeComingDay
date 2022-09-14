import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { VscBell } from "react-icons/vsc";
import BottomTap from './BottomTap';
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { __getMyPage } from '../redux/modules/MyPageSlice';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => (
    //     dispatch(__getMyPage())
    // ), [dispatch])
    const data = useSelector((state) => state.mypages.mypages)
    console.log(data);

    return (
        <HeaderContainer>
            <HeaderWrap>
                <Logo onClick={() => { navigate("/") }} style={{ cursor: "pointer" }} />
                <div>{data && data.schoolName}</div>
                <IconWrap>
                    <VscBell size="27"
                        onClick={() => { navigate("/notice") }} style={{ cursor: "pointer" }}
                    />
                    <NewDiv>
                        <NewTitle>N</NewTitle>
                    </NewDiv>
                </IconWrap>
            </HeaderWrap>

        </HeaderContainer>

    );
};

export default Header;

const HeaderContainer = styled.div`
    /* position: sticky;
    top: 0; */
    /* background-color: #eee; */
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    /* border: 1px solid green; */
`

const Logo = styled.div`
    width: 27px;
    height: 36px;
    background-image: url(${logo});
    background-position: center;
    background-size: 100% 100%;
`
const HeaderWrap = styled.div`
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid red; */
`
const HeaderTitle = styled.div`
`
const IconWrap = styled.div`
    display: flex;
    /* border: 1px solid red; */
    align-items: start;
    position: relative;
`
const NewDiv = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f7931e;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 15px;
    position: absolute;
`
const NewTitle = styled.div`
    font-size: 10px;
    font-weight: 600;
    color: white;
`
