import { useEffect } from "react";
import styled from "styled-components"
import helptest from "../../assets/helptest.png"
import { useSelector, useDispatch } from "react-redux";
import { __getHelp } from "../../redux/modules/HelpSlice";
import HelpCard from "./HelpCard";

const Help = () => {

  const dispatch = useDispatch();
  const { helps } = useSelector((state) => state.helps);
  // console.log(helps)

  useEffect(() => {
    dispatch(__getHelp());
  },[dispatch])

  return (
    <HelpContainer>
      <Banner />
      <HelpWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
        {/* <Iconbox onClick={()=>navigate('/helpform')}>
          <TiPencil color="white" size="40px"/>
        </Iconbox> */}
        <HelpList>
          <>
            {helps.slice(0).reverse().map((help) => (
              <HelpCard key={help.id} id={help.id} help={help}/>
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
  overflow-y: scroll;
`;

const Banner = styled.div`
  height: 160px;
  /* border: 1px solid gray; */
  margin-bottom: 12px;
  background-image: url(${helptest});
  background-position: center;
  background-size: 100% 100%;
`

const HelpWrap = styled.div`
  width: 100%;
  /* height: 100%; */
  /* border: 1px solid blue; */
  /* padding: 0 10px; */
  /* height: 100%; */
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