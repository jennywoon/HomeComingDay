import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import Button from '../elements/Button';
import {
  __getCalendar,
  __updateCalendar,
} from '../../redux/modules/CalendarSlice';
import { useSelector } from 'react-redux';

const CalendarUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { calendars } = useSelector((state) => state.calendars);
  const calendarfind = calendars.find((calendar) => calendar.id === Number(id));

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = (e) => {
      e.preventDefault();
      setModalOpen(true);
  }

  const [value, onChange] = useState(['10:00', '11:00']);
  const [isOnActive, setIsOnActive] = useState(false);
  const [EditTitle, setEditTitle] = useState(
    calendarfind && calendarfind.calendartitle
  );
  const [EditLocation, setEditLocation] = useState(
    calendarfind && calendarfind.calendarlocation
  );
  const [EditContent, setEditContent] = useState(
    calendarfind && calendarfind.calendarcontent
  );

  const onChangeTitle = (e) => {
    setEditTitle(e.target.value);
  };
  const onChangeLocation = (e) => {
    setEditLocation(e.target.value);
  }
  const onChangeContent = (e) => {
    setEditContent(e.target.value);
  };

  useEffect(() => {
    dispatch(__getCalendar());
  }, [dispatch]);

  const onUpdateHandler = (e) => {
    e.preventDefault();
    const editcalendarfind = {
      ...calendarfind,
      id: id,
      calendartitle: EditTitle,
      calendarlocation: EditLocation,
      calendarcontent: EditContent,
    };
    dispatch(__updateCalendar(editcalendarfind));
    navigate(`/calendardetail/${id}`)
    // window.location.reload();
  };

  return (
    <>
    <FormContainer>
      <FormWrap onSubmit={onUpdateHandler}>
        <FormHeader>
          <IoIosArrowBack size='25px' cursor='pointer' onClick={() => {navigate(`/calendardetail/${id}`)}} />
        </FormHeader>
        <FormBody>
          <FormSelection name='category'>
            <option value=''>만남일정</option>
            <option value='help'>도움요청</option>
            <option value='information'>정보공유</option>
            <option value='freetalk'>자유토크</option>
          </FormSelection>
          <FormInput
            name='calendartitle'
            value={EditTitle}
            onChange={onChangeTitle}
            placeholder='제목을 입력해주세요'
          ></FormInput>
          {/* <Textarea></Textarea> */}
          <CalendarButton onClick={showModal}>
            <CalendarTitle>날짜</CalendarTitle>
            <IoIosArrowForward />
            {/* <DateDiv></DateDiv> */}
          </CalendarButton>
          <TimeDiv>
            <CalendarTitle>시간</CalendarTitle>
            {/* <IoIosArrowForward /> */}
            <TimeRangePicker onChange={onChange} value={value} />
          </TimeDiv>
          <CalendarDiv>
            <CalendarTitle>장소</CalendarTitle>
            <CalendarInput
              name='calendarlocation'
              value={EditLocation}
              onChange={onChangeLocation}
              placeholder='장소를 입력해주세요'
            ></CalendarInput>
          </CalendarDiv>
          <CalendarDiv>
            <CalendarTitle>내용</CalendarTitle>
            <CalendarInput
              name='calendarcontent'
              value={EditContent}
              onChange={onChangeContent}
              placeholder='내용을 입력해주세요'
            ></CalendarInput>
          </CalendarDiv>
          {/* <CalendarTest/> */}
        </FormBody>
        <FooterBtn>
          <Button type='submit' backgroundColor='#F7931E' width="90%" height="40px" color="white" style={{ display: "block", margin: "15px auto" ,backgroundColor:'#F7931E'}} isDisabled={isOnActive ? false : true}>
            <div style={{ fontWeight: "500", fontSize: "16px" }}>수정하기</div>
          </Button>
        </FooterBtn>
      </FormWrap>
    </FormContainer>
    </>
);
};

export default CalendarUpdate;

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
  width: 100%;
  padding-left:15px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0px;
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
    outline: none;
`
const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    padding : 10px 20px;
`
const FormSelection = styled.select`
     border: none;
    margin-bottom: 25px;
    width: 75px;
    color: #f7931e;
    font-size: 14px;
    font-weight: 600;
`
const FormInput = styled.input`
    font-size: 20px;
    border: none;
    border-bottom:1px solid gray;
    padding: 10px 10px 10px 5px;
    font-weight: bold;
    color: black;
    margin-bottom: 10px;
    outline: none;
    ::placeholder {
    font-size: 20px;
    color: black;
    font-weight: 600;
  }
`
const FooterBtn = styled.div`
        margin:0 auto;
        width:100%;       
`