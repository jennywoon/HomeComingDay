import React, { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import FreeTalkCard from "./FreeTalkCard"
// 모듈
import { __getFreeTalk, __getPopularFreeTalk } from "../../redux/modules/FreeTalkSlice";
import { __getMyPage, __getReset } from "../../redux/modules/MyPageSlice";
// 아이콘 이미지
import freetalkorange from "../../assets/freetalkorange.png"
import nonedatasquare from "../../assets/nonedatasquare.png"

const FreeTalk = () => {
  const dispatch = useDispatch();
  const { freetalks } = useSelector((state) => state.freetalks);
  const { freePopular } = useSelector((state) => state.freetalks);
  const [select, setSelect] = useState('new');

  useEffect(()=>{
    dispatch(__getReset())
  },[])

  useEffect(() => {
    dispatch(__getMyPage())
    dispatch(__getFreeTalk());
    dispatch(__getPopularFreeTalk());
  }, [dispatch])

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };
  
  return (
    <StFreeTalkContainer>
      <StBannerWrap>
        <StBanner />
      </StBannerWrap>
      <StFreeTalkWrap>
      <StSelect name='state' onChange={handleSelect}>
          <option value='new'>최신순</option>
          <option value='popular'>인기순</option>
        </StSelect>
        <StFreeTalkList>
          <>
            {select === "new"&& freetalks && freetalks.length > 0 ? (
              <div>
                {freetalks && freetalks.slice(0).map((freetalk) => (
                  <FreeTalkCard key={freetalk.articleId} id={freetalk.articleId} freetalk={freetalk} />
                ))}
              </div>
            ) : 
            select === "popular"&& freePopular && freePopular.length > 0 ?
            (<div>
             {freePopular && freePopular.slice(0).map((freetalk) => (
               <FreeTalkCard key={freetalk.articleId} id={freetalk.articleId} freetalk={freetalk} />
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
        </StFreeTalkList>

      </StFreeTalkWrap>
    </StFreeTalkContainer>
  );
}

export default React.memo(FreeTalk);

const StFreeTalkContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 12px;
  overflow-x: hidden;
`;

const StBannerWrap = styled.div`
  width: 100%;
  height: 190px;
  /* height: 20% */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  margin-bottom: 12px;
  position: absolute;
`
const StBanner = styled.div`
  height: 190px;
  /* height: 20% */
  width: 95%;
  /* border: 1px solid red; */
  background-image: url(${freetalkorange});
  background-position: center;
  background-size: 100% 100%;
`

const StFreeTalkWrap = styled.div`
  position: relative;
  top: 170px;
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

const StFreeTalkList = styled.div`
  width: 95%;
  height: 95%;
  margin: 0 auto;
  overflow-y: scroll;
  ::-webkit-scrollbar{
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
`
const StNoneDataImg = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${nonedatasquare});
    background-position: center;
    background-size: 100% 100%;
`