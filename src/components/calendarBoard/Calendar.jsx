import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { __getCalendar } from "../../redux/modules/CalendarSlice";
import CalendarCard from "./CalendarCard";
import calendarorange from "../../assets/calendarorange.png"
import "./CalendarModal.css"

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { calendars } = useSelector((state) => state.calendars);

  useEffect(() => {
    dispatch(__getCalendar());
  }, [dispatch])

  return (
    <HelpContainer>
      <BannerWrap>
        <Banner />
      </BannerWrap>
      <HelpWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
        <HelpList>
          <>
            {calendars.slice(0).map((calendar) => (
              <CalendarCard key={calendar.id} id={calendar.id} calendar={calendar} />
            ))}
          </>
        </HelpList>
      </HelpWrap>
    </HelpContainer>
  );
}

export default Calendar;

const HelpContainer = styled.div`
  gap: 12px;
  /* height: 100vh; */
  width: 100%;
  height: 100%;
  /* overflow-y: scroll; */
`;

const BannerWrap = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  margin-bottom: 12px;
  position: absolute;
`

const Banner = styled.div`
  height: 180px;
  width: 95%;
  /* border: 1px solid red; */
  background-image: url(${calendarorange});
  background-position: center;
  background-size: 100% 100%;
`

const HelpWrap = styled.div`
  position: relative;
  top: 170px;
  width: 100%;
  border-radius: 20px;
  background-color: white;
  padding: 10px 5px 10px 5px;
`;
const Select = styled.select`
  display: flex;
  margin-left: auto;
  margin-bottom: 10px;
  padding: 2px 4px;
  border-radius: 10px;
  border: 1px solid #f7931e;
  color: #f7931e;
  width: 70px;
  font-weight: 500;
  font-size: 12px;
  outline: none;
`;

const HelpList = styled.div`
  /* border: 1px solid red; */
`;
