import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import './CalendarModal.css';
import CalendarCard from './CalendarCard';
// 모듈
import { __getMyPage, __getReset } from "../../redux/modules/MyPageSlice";
import { __getCalendar, __getPopularCalendar } from '../../redux/modules/CalendarSlice';
// 아이콘 이미지
import calendarorange from '../../assets/calendarorange.png';
import nonedatasquare from '../../assets/nonedatasquare.png';

const Calendar = () => {

  const dispatch = useDispatch();
  const { calendars } = useSelector((state) => state.calendars);
  const { calendarPopular } = useSelector((state) => state.calendars);
  const [select, setSelect] = useState('new');

  useEffect(()=>{
    dispatch(__getReset())
  },[])

  useEffect(() => {
    dispatch(__getMyPage())
    dispatch(__getCalendar());
    dispatch(__getPopularCalendar());
  }, [dispatch]);

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <StHelpContainer>
      <StBannerWrap>
        <StBanner />
      </StBannerWrap>
      <StHelpWrap>
      <StSelect name='state' onChange={handleSelect}>
          <option value='new'>최신순</option>
          <option value='popular'>인기순</option>
        </StSelect>
        <StHelpList>
          <>
          {select === "new"&&calendars && calendars.length > 0 ? (
            <div>
            {calendars && calendars.slice(0).map((calendar) => (
              <CalendarCard key={calendar.articleId} id={calendar.articleId} calendar={calendar} />
            ))}
            </div>
          ) : 
          
          select === "popular"&& calendarPopular && calendarPopular.length > 0 ?
          (<div>
           {calendarPopular && calendarPopular.slice(0).map((calendar) => (
             <CalendarCard key={calendar.articleId} id={calendar.articleId} calendar={calendar} />
           ))}
         </div>) :
          (
            <StNoneData>
                <StNoneDataImg></StNoneDataImg>
                <p>아직 게시글이 없습니다</p>
                 <div>첫 게시글을 작성해주세요</div>
              </StNoneData>
          )}
          </>
        </StHelpList>
      </StHelpWrap>
    </StHelpContainer>
  );
};

export default React.memo(Calendar);

const StHelpContainer = styled.div`
  gap: 12px;
  width: 100%;
  height: 100%;
`;

const StBannerWrap = styled.div`
  width: 100%;
  height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  margin-bottom: 12px;
  position: absolute;
`;

const StBanner = styled.div`
  height: 190px;
  width: 95%;
  background-image: url(${calendarorange});
  background-position: center;
  background-size: 100% 100%;
`;

const StHelpWrap = styled.div`
  position: relative;
  top: 170px;
  /* width: 100%; */
  height: 62%;
  border-radius: 20px;
  background-color: white;
  padding: 10px 5px 10px 5px;
`;

const StSelect = styled.select`
  display: flex;
  margin-left: auto;
  margin-right: 10px;
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

const StHelpList = styled.div`
  width: 95%;
  height: 95%;
  margin: 0 auto;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const StNoneData = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b3b3b3;
  font-weight: 500;
  font-size: 16px;
`;

const StNoneDataImg = styled.div`
  width: 50px;
  height: 50px;
  background-image: url(${nonedatasquare});
  background-position: center;
  background-size: 100% 100%;
  margin-bottom: 5px;
`;