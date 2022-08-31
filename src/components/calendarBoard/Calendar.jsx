import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { __getCalendar } from "../../redux/modules/CalendarSlice";
import CalendarCard from "./CalendarCard";

const Calendar = () => {
  const dispatch = useDispatch();
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
            {calendars?.map((calendar) => (
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
  height: 100vh;
  overflow-y: scroll;
`;

const Banner = styled.div`
  height: 120px;
  border: 1px solid gray;
  margin-bottom: 12px;
`

const HelpWrap = styled.div`
  padding: 0 10px;
`;
const Select = styled.select`
  display: flex;
  margin-left: auto;
  margin-bottom: 10px;
  padding: 2px 4px;
  border-radius: 10px;
`;

const HelpList = styled.div``;