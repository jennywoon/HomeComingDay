import styled from "styled-components"
import Img from "../assets/naverIcon.png"

const Help = () => {
  return (
    <HelpContainer>
      <Banner />
      <HelpWrap>
        <Select name='state'>
          <option>최신순</option>
          <option>인기순</option>
        </Select>
        <HelpList>
          {/* map돌리기 */}
          <HelpCard>
            <CardHead>
              <HeadImg src={Img} alt='' />
              <HeadName>최형용</HeadName>
              <HeadStudent>14학번</HeadStudent>
              <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
              <BodyTitle>제목인데 어떻습니까</BodyTitle>
              <BodyContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                iure esse ad, dicta asperiores mollitia similique maiores
                nostrum accusamus unde sed enim voluptatum voluptas soluta error
                veritatis harum excepturi obcaecati.
              </BodyContent>
            </CardBody>
            <CardFooter>
              <Views>조회수 1500</Views>
              <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
          </HelpCard>
        </HelpList>
        <HelpList>
          {/* map돌리기 */}
          <HelpCard>
            <CardHead>
              <HeadImg src={Img} alt='' />
              <HeadName>최형용</HeadName>
              <HeadStudent>14학번</HeadStudent>
              <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
              <BodyTitle>제목인데 어떻습니까</BodyTitle>
              <BodyContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                iure esse ad, dicta asperiores mollitia similique maiores
                nostrum accusamus unde sed enim voluptatum voluptas soluta error
                veritatis harum excepturi obcaecati.
              </BodyContent>
            </CardBody>
            <CardFooter>
              <Views>조회수 1500</Views>
              <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
          </HelpCard>
        </HelpList>
        <HelpList>
          {/* map돌리기 */}
          <HelpCard>
            <CardHead>
              <HeadImg src={Img} alt='' />
              <HeadName>최형용</HeadName>
              <HeadStudent>14학번</HeadStudent>
              <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
              <BodyTitle>제목인데 어떻습니까</BodyTitle>
              <BodyContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                iure esse ad, dicta asperiores mollitia similique maiores
                nostrum accusamus unde sed enim voluptatum voluptas soluta error
                veritatis harum excepturi obcaecati.
              </BodyContent>
            </CardBody>
            <CardFooter>
              <Views>조회수 1500</Views>
              <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
          </HelpCard>
        </HelpList>
        <HelpList>
          {/* map돌리기 */}
          <HelpCard>
            <CardHead>
              <HeadImg src={Img} alt='' />
              <HeadName>최형용</HeadName>
              <HeadStudent>14학번</HeadStudent>
              <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
              <BodyTitle>제목인데 어떻습니까</BodyTitle>
              <BodyContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                iure esse ad, dicta asperiores mollitia similique maiores
                nostrum accusamus unde sed enim voluptatum voluptas soluta error
                veritatis harum excepturi obcaecati.
              </BodyContent>
            </CardBody>
            <CardFooter>
              <Views>조회수 1500</Views>
              <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
          </HelpCard>
        </HelpList>
        <HelpList>
          {/* map돌리기 */}
          <HelpCard>
            <CardHead>
              <HeadImg src={Img} alt='' />
              <HeadName>최형용</HeadName>
              <HeadStudent>14학번</HeadStudent>
              <HeadTime>15분전</HeadTime>
            </CardHead>
            <CardBody>
              <BodyTitle>제목인데 어떻습니까</BodyTitle>
              <BodyContent>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                iure esse ad, dicta asperiores mollitia similique maiores
                nostrum accusamus unde sed enim voluptatum voluptas soluta error
                veritatis harum excepturi obcaecati.
              </BodyContent>
            </CardBody>
            <CardFooter>
              <Views>조회수 1500</Views>
              <CommentCount>댓글 2700</CommentCount>
            </CardFooter>
          </HelpCard>
        </HelpList>
      </HelpWrap>
    </HelpContainer>
  );
};

export default Help;

const HelpContainer = styled.div`
  gap: 12px;
`;

const Banner = styled.div`
  height: 120px;
  border: 1px solid gray;
  margin-bottom: 12px;
`;

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
  /* box-shadow: 5px 3px 3px -2px rgba(0,0,0,0.10); */
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
    /* border: 1px solid red; */
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