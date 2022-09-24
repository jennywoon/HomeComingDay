import React from 'react';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { __getNotice } from '../../redux/modules/NoticeSlice';
import NoticeCard from './NoticeCard';
import { getCookie } from '../../shared/cookies';

const NoticeList = () => {

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const {isLoading, data} = useQuery("noticeList", __getNotice, {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {}
  // })

  // useEffect(() => {
  //   const Subscribe = async() => {
  //     try {
  //       const eventSource = new EventSource(
  //         `${BASE_URL}/subscribe`,
  //         {
  //           headers: {
  //             Authorization: getCookie("accessToken"),
  //           },
  //         })
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [])

  return (
    <StNoticeList>
      {/* map */}
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />

      {/* {data.data.map((notice) => (
        <li key={notice.noticeId}>
          <NoticeCard item={notice} />
        </li>
      ))} */}
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div``;