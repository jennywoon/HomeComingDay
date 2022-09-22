import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { __getNotice } from '../../redux/modules/NoticeSlice';
import NoticeCard from './NoticeCard';

const NoticeList = () => {

  // const {isLoading, data} = useQuery("noticeList", __getNotice, {
  //   refetchOnWindowFocus: false,
  //   onSuccess: (data) => {}
  // })

  return (
    <StNoticeList>
      {/* map */}
      <NoticeCard />
      <NoticeCard />
      <NoticeCard />
      {/* {data.data.map((notice) => (
        <li key={val.noticeId}>
          <NoticeCard alarmItem={notice} />
        </li>
      ))} */}
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div``;
