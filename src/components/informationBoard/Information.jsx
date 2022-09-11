import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import Img from "../../assets/naverIcon.png"
import { __getInformation } from "../../redux/modules/InformationSlice";
import InformationCard from "./InformationCard";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import informationorange from "../../assets/informationorange.png"
import nonedatasquare from "../../assets/nonedatasquare.png"

const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { informations } = useSelector((state) => state.informations);
  console.log(informations)

  useEffect(() => {
    dispatch(__getInformation());
  }, [dispatch])

  return (
    <InformationContainer>
      <BannerWrap>
        <Banner />
      </BannerWrap>
      <InformationWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
         <InformationList>
          <>
            {informations && informations.length > 0 ? (
              <div>
                {informations && informations.slice(0).map((information) => (
                  <InformationCard key={information.articleId} id={information.articleId} information={information} />
                ))}
              </div>
            ) : (
              <NoneData>
                <NoneDataImg></NoneDataImg>
                <p>내가 쓴 게시글이 없습니다</p>
              </NoneData>
            )}
          </>
        </InformationList>

      </InformationWrap>
    </InformationContainer>
  );
}

export default Information;

const InformationContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  height: 100vh;
  gap: 12px;
`;

const BannerWrap = styled.div`
  width: 100%;
  height: 180px;
  /* height: 20% */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7931e;
  margin-bottom: 12px;
  position: absolute;
`
const Banner = styled.div`
  height: 180px;
  /* height: 20% */
  width: 95%;
  /* border: 1px solid red; */
  background-image: url(${informationorange});
  background-position: center;
  background-size: 100% 100%;
`

const InformationWrap = styled.div`
  position: relative;
  top: 170px;
  width: 100%;
  height: 100vh;
  /* height: 63%; */
  border-radius: 20px;
  background-color: white;
  padding: 10px 5px 10px 5px;
  /* border: 1px solid red; */
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

const InformationList = styled.div`
  /* height: 100%; */
  width: 100%;
  height: 97%;
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