import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import "./CalendarModal.css"
import dayjs from 'dayjs';
import moment from 'moment';
// import { __postCalendar } from '../../redux/modules/CalendarSlice';
import { __postDate } from '../../redux/modules/DateSlice';

const CalendarModal = ({ setModalOpen }) => {
    const dispatch = useDispatch();
    // const [value, onChange] = useState(new Date())

    // const {dates} = useSelector((state) => state.dates)
    // console.log(dates);

    const [date, setDate] = useState({
        calendarDate: "",
    });
    const { calendarDate } = date;
    const realCalendar = date.toString();

    const modalRef = useRef(null);

    // const {realcalendars} = useSelector((state) => state.realcalendars);
    // console.log(realcalendars);

    const closeModal = (e) => {
        if (!modalRef.current.contains(e.target)) {
            setModalOpen(false);
        }
    };

    const onChange = value => setDate(value);

    // const callDay = (clikedDay) => { 
    //     console.log(clikedDay)
    // };

    // const {clikedDay} = value;

    const onsubmitHandler = (e) => {
        e.preventDefault();
        const dates = { calendarDate: realCalendar }
        dispatch(__postDate(dates));
    }

    return (
        <Background onClick={closeModal}>
            {/* <ModalContainer> */}
                <Container >
                {/* <ModalContainer> */}
                    {/* <div className='wrap' > */}
                        <Wrap >
                            <CalendarWrap ref={modalRef}>
                                <Calendar
                                    onChange={onChange}
                                    // calendarDate={calendarDate} 
                                    // name="calendarDate"
                                    // value={calendarDate}
                                    formatDay={(locale, date) => dayjs(date).format('DD')}
                                />
                                <CalendarButton
                                    onClick={onsubmitHandler}
                                >확인</CalendarButton>
                                {moment(date).format("YYYY년 MM월 DD일")}
                            </CalendarWrap>
                        </Wrap>
                    {/* </div> */}
                    {/* </ModalContainer> */}
                </Container>
        </Background>
    );
};

export default CalendarModal;

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background-color: rgba(87,87,87,0.5); */
    z-index: 10;
`

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  /* height: 100vh; */
  width: 100%;
  /* height: 100%; */
  /* background-color: #f7ede2; */
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    background-image: none;
  }
  // 모바일 뷰
  .wrap {
    position: relative;
    width: 100%;
    /* max-height: 1000px; */
    max-height: 1202px;
    max-width: 420px;
    margin: auto;
    /* background-color: var(--white); */
    /* background-color: white; */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 24 px;
    @media screen and (min-width: 1024px) {
      /* position: relative; */
      left: 15%;
      top: 0%;
      overflow: auto;
    }
  }
`;

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    background-color: rgba(87,87,87,0.3);
    overflow-y: hidden;
    /* border: 1px solid red; */
`

const CalendarWrap = styled.div`
    width: 100%;
    height: 450px;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
`

const CalendarButton = styled.button`
    width: 400px;
    height: 50px;
    margin-top: 25px;
    border-radius: 20px;
    border: none;
    color: white;
    background-color: #aaaaaa;
    font-weight: bold;
    cursor: pointer;
`