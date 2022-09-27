import React from 'react';
import {useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { __getNotice } from '../../redux/modules/NoticeSlice';
import NoticeCard from './NoticeCard';
import { getCookie } from '../../shared/cookies';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import axios from "axios";
import { __getMyPage } from '../../redux/modules/MyPageSlice';

const NoticeList = () => {
  const dispatch = useDispatch();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [listening, setListening] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [value, setValue] = useState(null);
  const [eventSourceStatus, setEventSourceStatus] = useState(null);

  const token = getCookie("accessToken")
  // console.log(token);

  // const { status, data, error } = useQuery('noticeList', __getNotice, {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  //   onError: (e) => {
  //     console.log(e.message);
  //   },
  // });
  // console.log(data);

  const EventSource = EventSourcePolyfill || NativeEventSource;

  // fetch('https://homecomingdays.net', {
  //   credentials: 'include'
  // })

  useEffect(() => {
    let eventSource;

    const subscription = async () => {
      try {
        const eventSource = new EventSource(`${BASE_URL}/subscribe`, {
          headers: {
            'Authorization': `Bearer ${getCookie("accessToken")}`,
            // 'Content-Type': 'application/event-stream',
            // Connection: 'keep-alive',
            },
          // https
          withCredentials: true,
          // credentials: 'include'
        });
        console.log(eventSource);

        eventSource.onopen = async(e) => {
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
          console.log('onerror: ', result.error.message);
          result.error.message.includes("No activity within 45000 milliseconds.")
          ? setEventSourceStatus(result.type) //구독
          : eventSource.close();
        };
        setListening(true);
      } catch (error) {
        console.log(error);
      }
    };
    subscription();
    // return () => eventSource.close();
  });

  // if (status === 'loading') {
  //   return <span>Loading...</span>;
  // }

  // if (status === 'error') {
  //   return <span>Error: {error.message}</span>;
  // }

  useEffect(()=>{
    dispatch(__getMyPage())
  }, [dispatch])

  return (
    <StNoticeList>
      {/* map */}
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />

      {/* {data.data.map((notice) => (
          <NoticeCard item={notice} key={notice.noticeId} />
      ))} */}
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div``;
