import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Img from "../../assets/naverIcon.png"
import { __getInformation } from "../../redux/modules/InformationSlice";
import InformationCard from "./InformationCard";
import {TiPencil} from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { informations } = useSelector((state) => state.informations);
  console.log(informations)
  useEffect(() => {
    dispatch(__getInformation());
  },[dispatch])

  return (
    <HelpContainer>
      <Banner />
      <HelpWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
        {/* <Iconbox onClick={()=>navigate('/informationform')}>
          <TiPencil color="white" size="40px"/>
        </Iconbox> */}
        <HelpList>
          <>
            {informations.slice(0).reverse().map((information) => (
              <InformationCard key={information.id} id={information.id} information={information}/>
            ))}
          </>
        </HelpList>

      </HelpWrap>
    </HelpContainer>
  );
}

export default Information;

const HelpContainer = styled.div`
  gap: 12px;
  height: 100vh;
  overflow-y: scroll;
`;

const Banner = styled.div`
  height: 120px;
  border: 1px solid gray;
  margin-bottom: 12px;
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
