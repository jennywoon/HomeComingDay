import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { VscBell } from "react-icons/vsc";
import BottomTap from './BottomTap';
import logo from "../assets/logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { __getMyPage } from '../redux/modules/MyPageSlice';
import Cookies from 'universal-cookie';

const Header = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useEffect(() => (
    //     dispatch(__getMyPage())
    // ), [dispatch])
    const data = useSelector((state) => state.mypages.mypages)
    console.log(data);
    const cookies = new Cookies();

    return (
        <HeaderContainer>
            <HeaderWrap>
                <Logo onClick={() => { navigate("/main") }} style={{ cursor: "pointer" }} />
                <div style={{fontSize:"20px"}}>
                    {data && data.schoolName}
                    {/* {cookies.get("schoolname")} */}
                    </div>
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
    border-bottom: 1px solid #eeeded;
    /* box-shadow: 0px 2px 13px rgba(107, 107, 107, 0.1); */
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
