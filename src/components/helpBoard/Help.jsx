import { useEffect } from "react";
import styled from "styled-components"
import help from "../../assets/help.png"
import { useSelector, useDispatch } from "react-redux";
import { __getHelp } from "../../redux/modules/HelpSlice";
import HelpCard from "./HelpCard";

const Help = () => {
  const dispatch = useDispatch();
  const { helps } = useSelector((state) => state.helps);
  console.log(helps)

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
            {helps?.map((help) => (
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
  gap: 12px;
  height: 100vh;
`;

const Banner = styled.div`
  height: 120px;
  border: 1px solid gray;
  margin-bottom: 12px;
  background-image: url(${help});
  background-position: center;
  background-size: 100% 100%;
`

const HelpWrap = styled.div`
  padding: 0 10px;
`;

const Select = styled.select`
  display: flex;
  margin-left: auto;
  margin-bottom: 10px;
  padding: 2px 4px;
  border-radius: 10px;
`;

const HelpList = styled.div``;

// const HelpCard = styled.div`
//   padding: 10px;
//   border: 1px solid #ddd;
//   border-radius: 10px;
//   cursor: pointer;
//   margin-bottom: 20px;
// `;