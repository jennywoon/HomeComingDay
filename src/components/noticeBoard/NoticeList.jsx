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
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [listening, setListening] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [value, setValue] = useState(null);
  const [eventSourceStatus, setEventSourceStatus] = useState(null);

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getNotice());
  }, [dispatch]);

  const data = useSelector((state) => state.notice.notices);
  console.log(data);

  const EventSource = EventSourcePolyfill;

  useEffect(() => {
    let eventSource;

    const subscription = async () => {
      try {
        const eventSource = new EventSource(`${BASE_URL}/subscribe`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
            // 'Content-Type': 'application/event-stream',
            Connection: 'keep-alive',
            heartbeatTimeout: 180 * 1000,
          },
          // https
          withCredentials: true,
          lastEventIdQueryParameterName: 'Last-Event-ID',
          // credentials: 'include'
        });
        console.log(eventSource);

        eventSource.onopen = async (e) => {
          const result = await e;
          console.log('Connection is open', result);
          setEventSourceStatus(result.type);
        };

        eventSource.onmessage = async (e) => {
          const result = await JSON.parse(e.data);
          console.log('onmessage: ', result);
          setAlarms((prev) => [...prev, result]);
        };

        eventSource.onerror = async (e) => {
          const result = await e;
          console.log('onerror: ', result);
          // result.error.message.includes('45000 milliseconds')
          //   ? setEventSourceStatus(result.type)
          //   : eventSource.close();
          eventSource.close();
        };
        setListening(true);
      } catch (error) {
        console.log(error);
      }
    };
    subscription();
    // return () => eventSource.close();
  }, []);
  return (
    <StNoticeList>
      {data.length > 0 ? (
        <div>
          {data &&
            data.map((notice) => (
              <NoticeCard item={notice} key={notice.notificationId} />
            ))}
        </div>
      ) : (
        <StNone>
          <StNoneData>
            <StNoneDataImg></StNoneDataImg>
            <p>받은 알림이 없습니다</p>
          </StNoneData>
        </StNone>
      )}
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div`
height: 100vh;
  overflow: scroll;
  /* scrollbar-width: 0; */
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const StNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StNoneData = styled.div`
  /* margin-top: 300px; */
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
