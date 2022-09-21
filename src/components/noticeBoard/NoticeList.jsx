import React from 'react';
import styled from 'styled-components';
import NoticeCard from './NoticeCard';

const NoticeList = () => {
  return (
    <StNoticeList>
      {/* map */}
      <NoticeCard/>
      <NoticeCard/>
      <NoticeCard/>
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div`

`