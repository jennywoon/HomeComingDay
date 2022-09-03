import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { __getFreeTalk } from "../../redux/modules/FreeTalkSlice";
import FreeTalkCard from "./FreeTalkCard"

const FreeTalk = () => {
  const dispatch = useDispatch();
  const { freetalks } = useSelector((state) => state.freetalks);
  console.log(freetalks)

  useEffect(() => {
    dispatch(__getFreeTalk());
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
            {freetalks.slice(0).reverse().map((freetalk) => (
              <FreeTalkCard key={freetalk.id} id={freetalk.id} freetalk={freetalk}/>
            ))}
          </>
        </HelpList>

      </HelpWrap>
    </HelpContainer>
  );
}

export default FreeTalk;

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