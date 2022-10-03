import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { __getNotice } from '../../redux/modules/NoticeSlice';
import NoticeCard from './NoticeCard';
import { getCookie } from '../../shared/cookies';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import axios from 'axios';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
import nonedatasquare from '../../assets/nonedatabell.png';

const NoticeList = () => {
  // // 콘솔 에러 안찍히게 하기
  //   console.warn = console.error = () => {};
  // // or IIFE
  // (() => { console.warn = console.error = () => {}} )();

  const dispatch = useDispatch();
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const [listening, setListening] = useState(false);
  // const [alarms, setAlarms] = useState([]);
  // const [value, setValue] = useState(null);
  // const [eventSourceStatus, setEventSourceStatus] = useState(null);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getNotice());
  }, [dispatch]);

  const data = useSelector((state) => state.notice.notices);
  // console.log(data);

  return (
    <StNoticeList>
      {data.length > 0 ? (
        <StNoticeWrap>
          {data &&
            data.map((notice) => (
              <NoticeCard item={notice} key={notice.notificationId} />
            ))}
        </StNoticeWrap>
      ) : (
        <StNone>
          <StNoneData>
            <StNoneDataImg />
            <StNoneDataMsg>받은 알림이 없습니다</StNoneDataMsg>
          </StNoneData>
        </StNone>
      )}
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  display: flex;
  justify-content: center;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const StNoticeWrap = styled.div`
  width: 100%;
`;
const StNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const StNoneDataMsg = styled.p``;
