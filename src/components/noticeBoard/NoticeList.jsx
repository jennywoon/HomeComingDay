import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import NoticeCard from './NoticeCard';
// 모듈
import { __getNotice } from '../../redux/modules/NoticeSlice';
import { __getMyPage } from '../../redux/modules/MyPageSlice';
// 아이콘 이미지
import nonedatasquare from '../../assets/nonedatabell.png';

const NoticeList = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(__getMyPage());
    dispatch(__getNotice());
  }, [dispatch]);

  const data = useSelector((state) => state.notice.notices);

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
            <StNoneDataMsg>댓글, 좋아요가 달리면 알림을 받으실 수 있습니다</StNoneDataMsg>
          </StNoneData>
        </StNone>
      )}
    </StNoticeList>
  );
};

export default NoticeList;

const StNoticeList = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
  padding: 0;
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
