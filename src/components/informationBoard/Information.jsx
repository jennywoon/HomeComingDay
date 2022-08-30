import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Img from "../../assets/naverIcon.png"
import { __getInformation } from "../../redux/modules/InformationSlice";
import InformationCard from "./InformationCard";

const Information = () => {
  const dispatch = useDispatch();

  const { informations } = useSelector((state) => state.informations);
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
        <HelpList>
          <>
            {informations?.map((information) => (
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

const HelpCard = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const CardHead = styled.div`
    display: flex;
    align-items: center;
`
const HeadImg = styled.img`
    width:30px;
`
const HeadName = styled.h2`
    font-size: 18px;
    margin: 0px 5px;
`
const HeadStudent = styled.p`
    font-size: 12px;
    color:gray;
`
const HeadTime = styled.p`
    font-size: 12px;
    color:gray;
    margin-left: auto;
`
const CardBody = styled.div`
`
const BodyTitle = styled.h3`
    margin: 5px 0px;
    font-size: 16px;
`
const BodyContent = styled.p`
    font-size: 12px;
    margin: 5px 0px;
`
const CardFooter = styled.div`
    display: flex;
    justify-content: end;
`
const Views = styled.div`
    font-size: 12px;
    color:gray;
    margin-right:10px;
`
const CommentCount = styled.div`
    font-size: 12px;
    color:gray;
`