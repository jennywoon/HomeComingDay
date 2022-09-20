import { useEffect, useState } from "react";
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { __getHelp, __getPopularHelp } from "../../redux/modules/HelpSlice";
import HelpCard from "./HelpCard";
import Loading from "../test/Loading";
import helporange from "../../assets/helporange.png"
import helpwhite from "../../assets/helpwhite.png"
import nonedatasquare from "../../assets/nonedatasquare.png"


const Help = () => {

  const dispatch = useDispatch();
  const { helps } = useSelector((state) => state.helps);
  const {helpPopular} = useSelector((state)=>state.helps)
  const { isLoading } = useSelector((state) => state.helps);
  const [select, setSelect] = useState('new');
  // console.log(isLoading)
  // console.log(helps)
  // console.log(helpPopular)

  useEffect(() => {
    dispatch(__getHelp());
    dispatch(__getPopularHelp());
  }, [dispatch])


  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <HelpContainer>
      <BannerWrap>
        <Banner />
      </BannerWrap>
      <HelpWrap>
        <Select name='state' onChange={handleSelect}>
          <option value='new'>최신순</option>
          <option value='popular'>인기순</option>
        </Select>
        {/* <Loading /> */}
        <HelpList>
          <>
            {select === "new"&& helps && helps.length > 0 ? (
              <div>
                {helps && helps.slice(0).map((help) => (
                  <HelpCard key={help.articleId} id={help.articleId} help={help} />
                ))}
              </div>
            ) : 
            select === "popular"&& helpPopular && helpPopular.length > 0 ?
           (<div>
            {helpPopular && helpPopular.slice(0).map((help) => (
              <HelpCard key={help.articleId} id={help.articleId} help={help} />
            ))}
          </div>) :
            (
              <NoneData>
                <NoneDataImg></NoneDataImg>
                <p>내가 쓴 게시글이 없습니다</p>
              </NoneData>
            )}
          </>
        </HelpList>
      </HelpWrap>
    </HelpContainer>
  );
};

export default Help;

const HelpContainer = styled.div`
  width: 100%;
  height: 100%;
  /* height: 100vh; */
  gap: 12px;
`;

const BannerWrap = styled.div`
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
const Banner = styled.div`
  height: 190px;
  /* height: 20% */
  width: 95%;
  /* border: 1px solid red; */
  background-image: url(${helporange});
  /* background-image: url(${helpwhite}); */
  background-position: center;
  background-size: 100% 100%;
`

const HelpWrap = styled.div`
  position: relative;
  top: 170px;
  width: 100%;
  /* height: 100vh; */
  height: 62%;
  border-radius: 20px;
  background-color: white;
  padding: 10px 5px 10px 5px;
  /* border: 1px solid red; */
`;

const Select = styled.select`
  display: flex;
  /* margin: 0 auto; */
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

const HelpList = styled.div`
  /* height: 100%; */
  width: 95%;
  height: 95%;
  margin: 0 auto;
  /* border: 1px solid green; */
  overflow-y: scroll;
  /* overflow-y: auto; */
  ::-webkit-scrollbar{
    width: 0px;
    /* height: 100vh; */
  }
  /* ::-webkit-scrollbar-thumb{
    background: #f7931e;
    height: 100%;
  }
  ::-webkit-scrollbar-track{
    background: #f7931e;
  } */
`;

const NoneData = styled.div`
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
const NoneDataImg = styled.div`
    width: 50px;
    height: 50px;
    background-image: url(${nonedatasquare});
    background-position: center;
    background-size: 100% 100%;
`