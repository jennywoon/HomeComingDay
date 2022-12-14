import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import styled from 'styled-components';
import Button from '../elements/Button';
import '../calendarBoard/CalendarModal.css';
import Calendar from 'react-calendar';
import moment from 'moment';
// 모듈
import { __getDetailCalendar, __updateCalendar } from '../../redux/modules/CalendarSlice';
// 아이콘 이미지
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

const CalendarUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { calendarJoin } = useSelector((state) => state.calendars)
  const { calendarfind } = useSelector((state) => state.calendars);

  const onChange = (value) => setDate(value);

  const [date, setDate] = useState({
    calendarDate: ''
  });
  const realCalendar = moment(date.toString()).format('YYYY년 MM월 DD일 dddd');

  const dates = { calendarDate: realCalendar };
  const [isOnActive, setIsOnActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [calendar, setCalendar] = useState({
    calendartitle: '',
    calendarDate: null,
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
    (calendarfind && calendarfind.calendarLocation)
  );

  const [EditContent, setEditContent] = useState(
    calendarfind && calendarfind.content
  );




  const [joinNumber, setJoinNumber] = useState(calendarfind && calendarfind.maxPeople);

  //참여하기 인원 수정

  const joinMinusHandle = () => {
    if (calendarJoin.joinPeople < joinNumber && joinNumber > 1) {
      setJoinNumber(joinNumber - 1)
    }
  }
  const joinPlusHandle = () => {
    if (joinNumber < 50)
      setJoinNumber(joinNumber + 1)
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
    calendarcontent,
  } = calendar;


  const calendaronChangeHandler = (e) => {
    const { value, name } = e.target;
    setCalendar({
      ...calendar,
      [name]: value,
    });
  };

  // 시간 구현

  const [dateShow, setDateShow] = useState(true);
  const [timeShow, setTimeShow] = useState(false);

  const calendarTimes = calendarfind && calendarfind.calendarTime

  const calendarHour = calendarTimes.substring(0, 2)
  const calendarMinute = calendarTimes.substring(3, 5)


  const [selectTime, setSelectTime] = useState("오전");
  const [selectHour, setSelectHour] = useState(calendarHour);
  const [selectMinute, setSelectMinute] = useState(calendarMinute);

  const division = ["오전", "오후"];
  const hourSelect = [ "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12" ];
  const minuteSelect = ["00", "10", "20", "30", "40", "50"];
  const hour = String(
    Number(selectHour) + Number(selectTime === "오후" ? 12 : 0)
  ).padStart(2, "0");


  const timeShowBtn = () => {
    setDateShow(false);
    setTimeShow(!timeShow);
  };

  const closeTimeShowBtn = () => {
    setTimeShow(!timeShow);
  }

  // 카카오 주소 검색하기
  const [openPostcode, setOpenPostcode] = useState(false);
  const [calendarlocation, setCalendarLocation] = useState(calendarfind && calendarfind.calendarLocation)
  const locations = { calendarLocation: calendarlocation }

  const handle = {
    clickButton: () => {
      setOpenPostcode(current => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data) => {
      setCalendarLocation(data.address);
      setOpenPostcode(false);
    },
  }

  const now = new Date()
  const defaultValue = moment(now.toString()).format('YYYY년 MM월 DD일 dddd')

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    const editcalendarfind = {
      ...calendarfind,
      id: id,
      title: EditTitle,
      content: EditContent,
      calendarLocation: calendarlocation,
      calendarDate: realCalendar,
      calendarTime: hour + ":" + selectMinute,
      maxPeople: joinNumber
    };

    if (editcalendarfind.calendarDate === "Invalid date") {
      editcalendarfind.calendarDate = defaultValue
    }

    await dispatch(__updateCalendar(editcalendarfind));
    await dispatch(__getDetailCalendar(id))
    navigate(`/calendardetail/${id}`)
  };

  useEffect(() => {
    if (EditTitle !== '' && EditContent !== '') {
      handleCheck(true);
    } else {
      handleCheck(false);
    }
  }, [EditTitle, EditContent, calendarlocation])

  useEffect(() => {
    dispatch(__getDetailCalendar(id));
  }, [dispatch]);

  const node = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (isActive && node.current && !node.current.contains(e.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isActive]);

  return (
    <>
      <StFormContainer>
        <StFormWrap
          onSubmit={onUpdateHandler}
        >
          <StFormHeader>
            <IoIosArrowBack size='25px' cursor='pointer' onClick={() => { navigate(`/calendardetail/${id}`) }} />
          </StFormHeader>
          <StFormBody>
            <StFormSelection name='category'>
              <option value=''>만남일정</option>
            </StFormSelection>
            <StFormInput
              name='calendartitle'
              value={EditTitle}
              onChange={onChangeTitle}
              placeholder='제목을 입력해주세요'
              maxLength='40'
            ></StFormInput>
            <div>
              <StCalendarButton>
                <StCalendarTitle>날짜</StCalendarTitle>
                <StDateDiv onClick={() => setIsActive(!isActive)}>
                  {moment(date).format('YYYY년 MM월 DD일')}
                  <ArrowForward />
                </StDateDiv>
              </StCalendarButton>
              <StCalendarWrap ref={node}>
                {isActive && (
                  <Calendar
                    name='calendarDate'
                    value={calendarDate}
                    onChange={onChange}
                  />
                )}
              </StCalendarWrap>
            </div>
            <StTimeDiv>
              <StCalendarTitle>시간</StCalendarTitle>
              <StTimeOpenBtn
                onClick={timeShowBtn}
                timeShow={timeShow}
                name='calendartime'
                value={`${hour}:${selectMinute}`}
              >
                {`${hour}:${selectMinute}`}
                <ArrowForward />
              </StTimeOpenBtn>
            </StTimeDiv>
            <StKakaoMap>
              {timeShow && (
                <StTimeWrap>
                  <StTimeModal className="modal">
                    <div className="section">
                      <div className="select-time">
                        <div className="division">
                          {division.map((e, idx) => {
                            const color =
                              selectTime === e ? "#black" : "#bebebe";
                            return (
                              <StSelectTimeBtn
                                type="button"
                                key={idx}
                                onClick={() => {
                                  setSelectTime(e);
                                }}
                                color={color}
                              >
                                {e}
                              </StSelectTimeBtn>
                            );
                          })}
                        </div>
                        <div className="hour">
                          {hourSelect.map((e, idx) => {
                            const color =
                              selectHour === e ? "#black" : "#bebebe";
                            return (
                              <StSelectTimeBtn
                                type="button"
                                key={idx}
                                onClick={() => {
                                  setSelectHour(e);
                                }}
                                color={color}
                              >
                                {e}
                              </StSelectTimeBtn>
                            );
                          })}
                        </div>
                        <div className="minute">
                          {minuteSelect.map((e, idx) => {
                            const color =
                              selectMinute === e ? "#black" : "#bebebe";
                            return (
                              <StSelectTimeBtn
                                key={idx}
                                onClick={() => {
                                  setSelectMinute(e);
                                }}
                                color={color}
                              >
                                {e}
                              </StSelectTimeBtn>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </StTimeModal>
                  <StTimeClose onClick={closeTimeShowBtn}>확인</StTimeClose>
                </StTimeWrap>
              )}
            </StKakaoMap>
            <StJoinPeople>
              <StCalendarTitle>인원</StCalendarTitle>
              <StJoinDiv>
                {calendarJoin.joinPeople < joinNumber ?
                  <MinusCircle size="20px" onClick={joinMinusHandle} />
                  : null}
                {joinNumber}명
                <PlusCircle size="20px" onClick={joinPlusHandle} />
              </StJoinDiv>

            </StJoinPeople>

            <StCalendarDiv>
              <StCalendarTitle>장소</StCalendarTitle>
              <StCalendarInput
                name='calendarlocation'
                value={calendarlocation}
                onChange={calendaronChangeHandler}
                onClick={handle.clickButton}
              >
                {calendarlocation ? calendarlocation : `${EditLocation}`}
                <ArrowForward />
              </StCalendarInput>
            </StCalendarDiv>
            <StKakaoMap>
              {openPostcode &&
                <DaumPostcode
                  onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                  autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                  defaultQuery={EditLocation} // 팝업을 열때 기본적으로 입력되는 검색어 
                />}
            </StKakaoMap>
            <StTextDiv>
              <StCalendarTitle>내용</StCalendarTitle>
              <StCalendarTextarea
                name='calendarcontent'
                value={EditContent}
                onChange={onChangeContent}
                placeholder='내용을 입력해주세요'
                maxLength='400'
              ></StCalendarTextarea>
            </StTextDiv>
          </StFormBody>
          <StFooterBtn>
            <Button
              type='submit'
              backgroundColor='#F7931E'
              width="100%" height="40px" color="white"
              style={{ width: "90%", backgroundColor: '#F7931E' }} isDisabled={isOnActive ? false : true}>
              <StChangediv>수정하기</StChangediv>
            </Button>
          </StFooterBtn>
        </StFormWrap>
      </StFormContainer>
    </>
  );
};

export default CalendarUpdate;

const StFormContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 100%;
  background-color: #f7ede2;
  display: flex;
  justify-content: center;
  overflow:hidden;
  @media only screen and (max-width: 768px) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`;

const StFormWrap = styled.form`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StFormHeader = styled.div`
  width: 100%;
  height: 50px;
  padding-left:15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0;
  @media only screen and (max-width: 768px) {
    margin: 0px 0px 20px 0px;
  }
`

const StCalendarButton = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
`

const StTimeDiv = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`
const StCalendarTitle = styled.div`
    font-size: 14px;
  color: #f7931e;
  font-weight: 600;
  width:50px;
`
const StCalendarDiv = styled.div`
    height: 40px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`
const StKakaoMap = styled.div`
`


const StCalendarInput = styled.div`
 width: 80%;
  height: 40px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  
`
const StCalendarTextarea = styled.textarea`
  width: 85%;
  height: 200px;
  resize: none;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  ::placeholder {
    line-height: 200px;
    top: 50%;
    text-align: right;
  }
  padding: 0 10px;
  text-align: left;
`;

const StTextDiv = styled.div`
  height: 210px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  
`;
const StFormBody = styled.div`
    display: flex;
    flex-direction: column;
    padding : 10px 20px;
`
const StFormSelection = styled.select`
     border: none;
    margin-bottom: 25px;
    width: 75px;
    color: #f7931e;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    
`
const StFormInput = styled.input`
    font-size: 20px;
    border: none;
    border-bottom:1px solid #d9d9d9;
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
const StFooterBtn = styled.div`
  width: 100%;
  height: 100%;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 20px;
  @media only screen and (max-width: 768px) {
    padding-bottom: 15px;
  }
`

const StChangediv = styled.div`
  font-weight: 500;
  font-size: 16px;
`

const StDateDiv = styled.div`
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: right;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  gap: 10px;
`
const StCalendarWrap = styled.div`
  display: flex;
  justify-content: right;
`;
const StTimeOpenBtn = styled.div`
  font-weight: 500;
height: 30px;
font-size: 14px;
width: 80%;
display: flex;
justify-content: right;
align-items: center;
gap: 10px;
cursor: pointer;
`;

const StTimeWrap = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`
const StTimeModal = styled.div`
  border-radius: 6.83801px;
  border: none;
  height: 130px;
  overflow: hidden;
  text-align: center;
  width: 85%;

  .select-time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;

    div {
      :nth-child(1) {
        justify-content: center;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 150px;
      padding: 28px 9px;
      width: auto;
      box-sizing: border-box;
      text-align: center;
      flex: 1;
      text-align: center;
      overflow-y: scroll;
      ::-webkit-scrollbar{
    width: 0px;
  }
    }
  }
`;

const StSelectTimeBtn = styled.p`
  background-color: transparent;
  padding: 10px;
  font-weight: 700;
  font-size: 20px;
  color: ${(props) => props.color && props.color};
  border: 1px solid white;
  cursor: pointer;
`;

const StTimeClose = styled.div`
  background-color: #f7931e;
  border-radius: 20px;
  width: 70%;
  color: white;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 15px 0;
  height: 36px;
  cursor: pointer;
`

const StJoinPeople = styled.div`
  height: 40px;
  margin-top: 10px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.05);
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
  border:none;
`
const ArrowForward = styled(IoIosArrowForward)`
  color:#cfcfcf;
`
const MinusCircle = styled(AiOutlineMinusCircle)`
color:#cfcfcf;
cursor: pointer;
`
const PlusCircle = styled(AiOutlinePlusCircle)`
  color:#cfcfcf;
  cursor: pointer;
`