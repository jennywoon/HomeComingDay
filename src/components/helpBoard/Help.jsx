import { useEffect } from "react";
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux";
import { __getHelp } from "../../redux/modules/HelpSlice";
import HelpCard from "./HelpCard";
import Loading from "../test/Loading";
import helporange from "../../assets/helporange.png"
import helpwhite from "../../assets/helpwhite.png"
const Help = () => {

  const dispatch = useDispatch();
  const { helps } = useSelector((state) => state.helps);
  const { isLoading } = useSelector((state) => state.helps)
  console.log(isLoading)
  // console.log(helps)

  useEffect(() => {
    dispatch(__getHelp());
  }, [dispatch])

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <HelpContainer>
      <BannerWrap>
        <Banner />
      </BannerWrap>
      <HelpWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
        {/* <Loading /> */}
        {/* <Iconbox onClick={()=>navigate('/helpform')}>
          <TiPencil color="white" size="40px"/>
        </Iconbox> */}
        <HelpList>
          <>
            {helps && helps.slice(0).reverse().map((help) => (
              <HelpCard key={help.id} id={help.id} help={help} />
            ))}
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
  gap: 12px;
  /* border: 1px solid red; */
  /* height: 100vh; */
  /* overflow-y: scroll; */
`;

const BannerWrap = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  margin-bottom: 12px;
  position: absolute;
`
const Banner = styled.div`
  height: 180px;
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
  border-radius: 20px;
  background-color: white;
  padding: 10px 5px 10px 5px;
`;

const Select = styled.select`
  display: flex;
  margin-left: auto;
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
  /* height: 100vh; */
  /* height: 100%; */
  /* border: 1px solid green; */
  /* overflow-y: scroll; */
`;