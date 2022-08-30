import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import Img from "../assets/naverIcon.png"
import { __getInformation } from '../redux/modules/InformationSlice';

const InformationCard = ({information}) => {
    const dispatch = useDispatch();
    // const param = useParams();
    // const informations = useSelector((state) => state.informations.informations)

    useEffect(() => {
        dispatch(__getInformation());
    }, [dispatch])

    return (
        <HelpCard>
            <CardHead>
              <HeadImg src={Img} alt='' />
              <HeadName>여기는 정보공유</HeadName>
              <HeadStudent>14학번</HeadStudent>
              <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
              <BodyTitle>{information.title}</BodyTitle>
              <BodyContent>
              {information.content}
              </BodyContent>
            </CardBody>
            <CardFooter>
              <Views>조회수 1500</Views>
              <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
          </HelpCard>
    );
};

export default InformationCard;

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
const BodyTitle = styled.div`
    margin: 5px 0px;
    font-size: 16px;
`
const BodyContent = styled.div`
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