import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __getHelp, __postHelp } from '../../redux/modules/HelpSlice';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { AiOutlinePlusCircle,AiOutlineMinusCircle  } from 'react-icons/ai';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import Button from '../elements/Button';
import {
  __getCalendar,
  __updateCalendar,
} from '../../redux/modules/CalendarSlice';
import { useSelector } from 'react-redux';
import '../calendarBoard/CalendarModal.css';
import { TimePicker } from 'antd';
import Calendar from 'react-calendar';
import moment from 'moment';


const CalendarUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { calendars } = useSelector((state) => state.calendars);
  const calendarfind = calendars.find((calendar) => calendar.articleId === Number(id));
  console.log(calendarfind)

  const [modalOpen, setModalOpen] = useState(false);

  const showModal = (e) => {
      e.preventDefault();
      setModalOpen(true);
  }

  const onChange = (value) => setDate(value);
  const [date, setDate] = useState({
    calendarDate: '',
  });
  const realCalendar = moment(date.toString()).format('YYYY년 MM월 DD일 dddd');
  const dates = { calendarDate: realCalendar };
  const [isOnActive, setIsOnActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [calendar, setCalendar] = useState({
    calendartitle: '',
    calendarDate: '',
    calendartime: '',
    calendarlocation: '',
    calendarcontent: '',
  });

  const handleCheck = (e) => {
    setIsOnActive(e);
  };

  const [EditTitle, setEditTitle] = useState(
    calendarfind && calendarfind.title
  );
  const [EditLocation, setEditLocation] = useState(
    calendarfind && calendarfind.calendarLocation
  );
  const [EditContent, setEditContent] = useState(
    calendarfind && calendarfind.content
  );
  const [reactCalendar, setReactCalendar] = useState(
    calendarfind && calendarfind.calendarDate
    );
  const [selectedTime, setSelectedTime] = useState(
    calendarfind && calendarfind.calendarTime
    );
  const [joinNumber , setJoinNumber] = useState(calendarfind && calendarfind.maxPeople);

  const onChangeCalendar = (e) => {
    setReactCalendar(e.target.value);
  };

  const onSelectTimeHandler = (value) => {
    const timeString = moment(value).format('hh:mm a');
    setSelectedTime(timeString);
    console.log(selectedTime);
  };

  //참여하기 인원 수정

  const joinMinusHandle =()=>{
    if(joinNumber > 1){
    setJoinNumber(joinNumber -1)
  }
  }
  const joinPlusHandle =()=>{
    if(joinNumber < 5)
    setJoinNumber(joinNumber +1)
  }

  const onChangeTitle = (e) => {
    setEditTitle(e.target.value);
  };
  const onChangeLocation = (e) => {
    setEditLocation(e.target.value);
  }
  const onChangeContent = (e) => {
    setEditContent(e.target.value);
  };

  const {
    calendartitle,
    calendarDate,
    calendartime,
    calendarlocation,
    calendarcontent,
  } = calendar;

  useEffect(() => {
    if (EditTitle !== '' && EditLocation !== '' && EditContent !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  },[EditTitle, EditContent, EditLocation])

  useEffect(() => {
    dispatch(__getCalendar());
  }, [dispatch]);

  

  const onUpdateHandler = async(e) => {
    e.preventDefault();
    const editcalendarfind = {
      ...calendarfind,
      id: id,
      title: EditTitle,
      content: EditContent,
      calendarLocation: EditLocation,
      calendarDate:realCalendar,
      calendarTime:selectedTime,
      maxPeople : joinNumber
    };
    await dispatch(__updateCalendar(editcalendarfind));
    await dispatch(__getCalendar())
    navigate(`/calendardetail/${id}`)
    // window.location.reload();
  };

  return (
    <>
    <FormContainer>
      <FormWrap 
      onSubmit={onUpdateHandler}
      >
        <FormHeader>
          <IoIosArrowBack size='25px' cursor='pointer' onClick={() => {navigate(`/calendardetail/${id}`)}} />
        </FormHeader>
        <FormBody>
          <FormSelection name='category'>
            <option value=''>만남일정</option>
            {/* <option value='help'>도움요청</option>
            <option value='information'>정보공유</option>
            <option value='freetalk'>자유토크</option> */}
          </FormSelection>
          <FormInput
                name='calendartitle'
                value={EditTitle}
                onChange={onChangeTitle}
                placeholder='제목을 입력해주세요'
                maxLength='40'
              ></FormInput>
              <CalendarButton type="button"
              // onClick={showModal}
              >
                <CalendarTitle>날짜</CalendarTitle>
                <DateDiv onClick={() => setIsActive(!isActive)}>
                  {moment(date).format('YYYY년 MM월 DD일')}
                  <IoIosArrowForward />
                </DateDiv>
              </CalendarButton>
              <CalendarWrap value={reactCalendar} onClick={onChangeCalendar}>
                {isActive && (
                  <Calendar
                    name='calendarDate'
                    value={calendarDate}
                    onChange={onChange}
                  />
                )}
                </CalendarWrap>
          {/* <Textarea></Textarea> */}
          {/* <CalendarButton onClick={showModal}>
            <CalendarTitle>날짜</CalendarTitle>
            <IoIosArrowForward />
            <DateDiv></DateDiv>
          </CalendarButton> */}
          <TimeDiv>
                <CalendarTitle>시간</CalendarTitle>
                <StTimePicker
                  use12Hours
                  format='hh:mm a'
                  name='calendartime'
                  // value={calendartime}
                  // onChange={calendarTimeChangeHandler}
                  placeholder='시간을 선택해주세요'
                  showNow={false}
                  value={moment(selectedTime, 'hh:mm a')}
                  onSelect={onSelectTimeHandler}
                />
                {/* <IoIosArrowForward /> */}
              </TimeDiv>
              <StJoinPeople>
                <CalendarTitle>인원</CalendarTitle>
                <StJoinDiv>
                  {/* <AiOutlineMinusCircle size="20px" onClick={joinMinusHandle}/> */}
                    {joinNumber}명
                  {/* <AiOutlinePlusCircle size="20px" onClick={joinPlusHandle}/> */}
                </StJoinDiv>
              </StJoinPeople>
          <CalendarDiv>
            <CalendarTitle>장소</CalendarTitle>
            <CalendarInput
              name='calendarlocation'
              value={EditLocation}
              onChange={onChangeLocation}
              placeholder='장소를 입력해주세요'
            ></CalendarInput>
          </CalendarDiv>
          <TextDiv>
            <CalendarTitle>내용</CalendarTitle>
            <CalendarTextarea
              name='calendarcontent'
              value={EditContent}
              onChange={onChangeContent}
              placeholder='내용을 입력해주세요'
              maxLength='400'
            ></CalendarTextarea>
          </TextDiv>
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
  color: #f7931e;
  font-weight: 600;
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
    text-align: right;
    ::-webkit-input-placeholder{text-align:right}
    outline: none;
`
const CalendarTextarea = styled.textarea`
  width: 65%;
  height: 200px;
  resize: none;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  textarea::placeholder {
    text-align: right;
  }
  padding: 0 10px;
  text-align: right;
`;

const TextDiv = styled.div`
  height: 210px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #9b9999;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  
`;
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

const DateDiv = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
`
const CalendarWrap = styled.div`
  display: flex;
  justify-content: right;
  /* padding-right: 10px; */
`;
const StTimePicker = styled(TimePicker)`
  width: 160px;
  justify-content: space-between;
  border: none;
  color: orange;
  input::placeholder {
    color: gray;
  }
`;
const StJoinPeople = styled.div`
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
const StJoinDiv = styled.div`
  height: 30px;
  font-size: 14px;
  width: 80%;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border:none;
`