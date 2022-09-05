import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { __getCalendar } from "../../redux/modules/CalendarSlice";
import CalendarCard from "./CalendarCard";
import { TiPencil } from "react-icons/ti";

const Calendar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { calendars } = useSelector((state) => state.calendars);

  useEffect(() => {
    dispatch(__getCalendar());
  },[dispatch])

  return (
    <HelpContainer>
      <Banner />
      <HelpWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
        <HelpList>
          <>
            {calendars.slice(0).reverse().map((calendar) => (
              <CalendarCard key={calendar.id} id={calendar.id} calendar={calendar}/>
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
  overflow-y: scroll;
`;

const Banner = styled.div`
  height: 120px;
  border: 1px solid gray;
  margin-bottom: 12px;
`

const HelpWrap = styled.div`
  /* padding: 0 10px; */
  width: 100%;
`;
const Select = styled.select`
  display: flex;
  margin-left: auto;
  margin-bottom: 10px;
  padding: 2px 4px;
  border-radius: 10px;
`;

const HelpList = styled.div`
  /* border: 1px solid red; */
`;

const IconWrap = styled.div`
  width: 95%;
  display: flex;
  justify-content: right;
`
const Iconbox = styled.div`
  width:50px;
  height:50px;
  background-color: black;
  border-radius: 30px;
  position: fixed;
  bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`