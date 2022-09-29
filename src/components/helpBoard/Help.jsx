import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { __getHelp, __getPopularHelp } from "../../redux/modules/HelpSlice";
import HelpCard from "./HelpCard";
import helporange from "../../assets/helporange.png"
import nonedatasquare from "../../assets/nonedatasquare.png"
import { __getMyPage } from "../../redux/modules/MyPageSlice";
import { __getReset } from "../../redux/modules/MyPageSlice";

const Help = () => {

  useEffect(()=>{
    dispatch(__getReset())
  },[])

  const dispatch = useDispatch();
  const { helps } = useSelector((state) => state.helps);
  const {helpPopular} = useSelector((state)=>state.helps)
  const [select, setSelect] = useState('new');
  // console.log(helps)
  // console.log(helpPopular)

  useEffect(() => {
    dispatch(__getMyPage())
    dispatch(__getHelp());
    dispatch(__getPopularHelp());
  }, [dispatch])


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
            {select === "new"&& helps && helps.length > 0 ? (
              <div>
                {helps && helps.map((help) => (
                  <HelpCard key={help.articleId} id={help.articleId} help={help} />
                ))}
              </div>
            ) : 
            select === "popular"&& helpPopular && helpPopular.length > 0 ?
           (<div>
            {helpPopular && helpPopular.map((help) => (
              <HelpCard key={help.articleId} id={help.articleId} help={help} />
            ))}
          </div>) :
            (
              <StNoneData>
                <StNoneDataImg></StNoneDataImg>
                <p>내가 쓴 게시글이 없습니다</p>
              </StNoneData>
            )}
          </>
        </StHelpList>
      </StHelpWrap>
    </StHelpContainer>
  );
};

export default React.memo(Help);

const StHelpContainer = styled.div`
  width: 100%;
  height: 100%;
  gap: 12px;
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
`
const StBanner = styled.div`
  height: 190px;
  width: 95%;
  background-image: url(${helporange});
  background-position: center;
  background-size: 100% 100%;
`

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