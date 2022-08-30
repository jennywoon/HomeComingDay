import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../elements/Button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const CalendarForm = () => {

    return (
        <FormContainer>
            <FormWrap>
                <FormHeader>
                    <IoIosArrowBack size="25px" cursor="pointer" />
                    <Button type="submit" backgroundColor="white">올리기</Button>
                </FormHeader>
                <FormBody>
                    <FormSelection name="category">
                        <option value="">도움요청</option>
                        <option value="">정보공유</option>
                        <option value="">만남일정</option>
                        <option value="">자유토크</option>
                    </FormSelection>
                    <FormInput></FormInput>
                    {/* <Textarea></Textarea> */}
                    <CalendarButton>
                        <CalendarTitle>날짜</CalendarTitle>
                        <IoIosArrowForward />
                    </CalendarButton>
                    <CalendarButton>
                        <CalendarTitle>시간</CalendarTitle>
                        <IoIosArrowForward />
                    </CalendarButton>
                    <CalendarDiv>
                        <CalendarTitle>장소</CalendarTitle>
                        <CalendarInput placeholder="내용을 입력해주세요"></CalendarInput>
                    </CalendarDiv>
                    <CalendarDiv>
                        <CalendarTitle>내용</CalendarTitle>
                        <CalendarInput placeholder="내용을 입력해주세요"></CalendarInput>
                    </CalendarDiv>
                </FormBody>
            </FormWrap>
        </FormContainer>
    );
};

export default CalendarForm;

const FormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const FormWrap = styled.form`
  width: 500px;
  height:100vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  
`;
const FormHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 80px;
    padding : 10px 20px;
`

const CalendarButton = styled.button`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #9b9999;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
`

const CalendarTitle = styled.div`
    font-size: 14px;
`
const CalendarDiv = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #9b9999;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`
const CalendarInput = styled.input`
    width: 80%;
    height: 30px;
    /* margin-top: 10px; */
    border-radius: 10px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ::-webkit-input-placeholder{text-align:right}
    padding-left: 10px;
`
const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    padding : 10px 20px;
`
const FormSelection = styled.select`
    border:none;
    margin-bottom: 25px;
    width:75px;
`
const FormInput = styled.input`
    font-size: 20px;
    border: none;
    border-bottom:1px solid gray;
    padding: 10px 10px 10px 5px;
    font-weight: bold;
    color: black;
`
const Textarea = styled.textarea`
    width: 100%;
    height:63vh;
    border:none;
    padding: 10px 5px;
`

const FormFooter = styled.div`
    display: flex;
    width:100%;
    /* background-color: yellow; */
    border-top: 1px solid gray;

`
const Filelabel = styled.label`
    margin : 10px 20px;
    
`

const Addfile = styled.input`
    display: none;
`