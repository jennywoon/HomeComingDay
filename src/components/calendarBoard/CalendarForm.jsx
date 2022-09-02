import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../elements/Button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import CalendarModal from './CalendarModal';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import "./TimeRange.css"
import { __getCalendar, __postCalendar } from '../../redux/modules/CalendarSlice';
import moment from 'moment';

const CalendarForm = () => {
    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
    }

    const [value, onChange] = useState(['10:00', '11:00']);

    const [calendar, setCalendar] = useState({
        calendartitle: "",
        calendarlocation: "",
        calendarcontent: "",
    })

    useEffect(() => {
        dispatch(__getCalendar());
    }, [dispatch])

    const { calendartitle, calendarlocation, calendarcontent } = calendar;

    const onChangeHandler = (e) => {
        const {value, name} = e.target;
        setCalendar({
            ...calendar,
            [name]: value,
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(calendartitle === ""){
            return alert("제목을 입력해주세요");
        } else if(calendarlocation ===""){
            return alert("장소를 입력해주세요");
        } else if(calendarcontent === ""){
            return alert("내용을 입력해주세요");
        }
        dispatch(__postCalendar(calendar));
    }

    return (
        <>
        {modalOpen && <CalendarModal setModalOpen={setModalOpen}/>}
            <FormContainer>
                <FormWrap onSubmit={onSubmitHandler}>
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
                        <FormInput name="calendartitle" value={calendartitle} onChange={onChangeHandler} placeholder="제목을 입력해주세요"></FormInput>
                        {/* <Textarea></Textarea> */}
                        <CalendarButton onClick={showModal}>
                            <CalendarTitle>날짜</CalendarTitle>
                            <IoIosArrowForward />
                            {/* <DateDiv></DateDiv> */}
                        </CalendarButton>
                        <TimeDiv>
                            <CalendarTitle>시간</CalendarTitle>
                            {/* <IoIosArrowForward /> */}
                            <TimeRangePicker
                            onChange={onChange}
                            value={value}
                        />
                        </TimeDiv>
                        <CalendarDiv>
                            <CalendarTitle>장소</CalendarTitle>
                            <CalendarInput name="calendarlocation" value={calendarlocation} onChange={onChangeHandler} placeholder="장소를 입력해주세요"></CalendarInput>
                        </CalendarDiv>
                        <CalendarDiv>
                            <CalendarTitle>내용</CalendarTitle>
                            <CalendarTextarea name="calendarcontent" value={calendarcontent} onChange={onChangeHandler}placeholder="내용을 입력해주세요"></CalendarTextarea>
                        </CalendarDiv>
                        {/* <CalendarTest/> */}
                    </FormBody>
                </FormWrap>
            </FormContainer>
        </>
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

const TimeDiv = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #9b9999;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    /* cursor: pointer; */
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
    width: 65%;
    height: 30px;
    /* margin-top: 10px; */
    border-radius: 10px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ::-webkit-input-placeholder{text-align:right}
    padding: 0 10px;
    /* outline: none; */
`
const CalendarTextarea = styled.textarea`
    width: 65%;
    height: 30px;
    /* margin-top: 10px; */
    border-radius: 10px;
    border: none;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    ::-webkit-input-placeholder{text-align:right}
    padding: 0 10px;
    /* outline: none; */
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