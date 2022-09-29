import React from "react";
import { useEffect ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { __getInformation, __getPopularInformation } from "../../redux/modules/InformationSlice";
import InformationCard from "./InformationCard";
import { useNavigate } from "react-router-dom";
import informationorange from "../../assets/informationorange.png"
import nonedatasquare from "../../assets/nonedatasquare.png"
import { __getMyPage } from "../../redux/modules/MyPageSlice";

const Information = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { informations } = useSelector((state) => state.informations);
  const {informationPopular} = useSelector((state)=>state.informations)
  const [select, setSelect] = useState('new');
  console.log(informationPopular)

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  useEffect(() => {
    dispatch(__getMyPage())
    dispatch(__getInformation());
    dispatch(__getPopularInformation());
  }, [dispatch])

  return (
    <StInformationContainer>
      <StBannerWrap>
        <StBanner />
      </StBannerWrap>
      <StInformationWrap>
      <StSelect name='state' onChange={handleSelect}>
          <option value='new'>최신순</option>
          <option value='popular'>인기순</option>
        </StSelect>
         <StInformationList>
          <>
            {select === "new"&&informations && informations.length > 0 ? (
              <div>
                {informations && informations.slice(0).map((information) => (
                  <InformationCard key={information.articleId} id={information.articleId} information={information} />
                ))}
              </div>
            ) :
              select === "popular"&& informationPopular && informationPopular.length > 0 ?
            (<div>
             {informationPopular && informationPopular.slice(0).map((information) => (
               <InformationCard key={information.articleId} id={information.articleId} information={information} />
             ))}
           </div>) :
             (
               <StNoneData>
                 <StNoneDataImg></StNoneDataImg>
                 <p>내가 쓴 게시글이 없습니다</p>
               </StNoneData>
             )}
          </>
        </StInformationList>

      </StInformationWrap>
    </StInformationContainer>
  );
}

export default React.memo(Information);

const StInformationContainer = styled.div`
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
  background-image: url(${informationorange});
  background-position: center;
  background-size: 100% 100%;
`

const StInformationWrap = styled.div`
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

const StInformationList = styled.div`
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
    margin-bottom: 5px;
`