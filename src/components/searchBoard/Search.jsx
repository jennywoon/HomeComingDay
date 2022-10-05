import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import SearchCard from './SearchCard';
// 모듈
import { __getSearchArticle, __getSearchArticlePopular } from '../../redux/modules/SearchSlice';
import { __getReset } from "../../redux/modules/MyPageSlice";
// 아이콘 이미지
import SearchColorimg from '../../assets/SearchColor.png';
import Xcircle from '../../assets/x-circle.png';

const Search = () => {

  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [inputText, setInputText] = useState('');
  const [select, setSelect] = useState('new');

  useEffect(() => {
    setSelect('new')
},[])

useEffect(() => {
dispatch(__getSearchArticle());
dispatch(__getSearchArticlePopular());
}, [dispatch]);


  
  const searchArticle = useSelector((state) => state.searchs.searchs);
  const searchArticlePopular = useSelector((state) => state.searchs.popular);
 
  useEffect(()=>{
    dispatch(__getReset())
    },[])

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  //Articles
  const [filteredList, setFilteredList] = new useState(searchArticle);
  const filterBySearch = (e) => {
    const query = e.target.value;
    let updatedList = [...searchArticle];
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredList(updatedList);
  };

  //ArticlesPopural
  const [filteredPopularList, setFilteredPopularList] = new useState(
    searchArticlePopular
  );
  const filterByPopularSearch = (e) => {
    const query = e.target.value;
    let updatedList = [...searchArticlePopular];
    updatedList = updatedList.filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setFilteredPopularList(updatedList);
  };

  // input 안 x버튼 클릭할 때, input 내용 없어지도록 구현 + post 기능 추가
  // const [inputText, setInputText] = useState("");

  // const onChangeInput = (e) => {
  //     setInputText(e.target.value);
  //     const { value, name } = e.target;
  //     setSearch({
  //         ...search,
  //         [name]: value,
  //     })
  // }

  const onReset = () => {
    setInputText('');
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StContainer 
    onSubmit={onSubmitHandler}
    >
      <StWrap>
        <StSearchWrap>
          <StSearchDiv>
            <StImg
              src={SearchColorimg}
              alt='검색'
            />

            {select === 'new' ? (
              <StSearchInput
                id='search-box'
                onChange={filterBySearch}
                placeholder='게시글 제목을 입력해주세요'
              />
            ) : select === 'popular' ? (
              <StSearchInput
                id='search-box'
                onChange={filterByPopularSearch}
                placeholder='게시글 제목을 입력해주세요'
              />
            ) : null}
            {/* <StClose
              onClick = {onReset}
              src={Xcircle}
              alt='검색'
            /> */}
            <div/>
          </StSearchDiv>
        </StSearchWrap>

        <StSelectBox>
            <StSelectInBox>
          <StSelect name='state' onChange={handleSelect}>
            <option value='new'>최신순</option>
            <option value='popular'>인기순</option>
          </StSelect>
          </StSelectInBox>
        </StSelectBox>
        <StRecentSearch>
          <StRecentWrap id='item-list'>
            {select === 'new' && (filteredList && filteredList.length > 0) ? (
              <>
                {filteredList &&
                  filteredList?.map((search) => (
                    <SearchCard
                      key={search.articleId}
                      id={search.articleId}
                      search={search}
                    />
                  ))}
              </>
            ) : select === 'popular' &&
              (filteredPopularList &&
              filteredPopularList.length) > 0 ? (
              <>
                {filteredPopularList &&
                  filteredPopularList?.map((search) => (
                    <SearchCard
                      key={search.articleId}
                      id={search.articleId}
                      search={search}
                    />
                  ))}
              </>
            ) : null}
          </StRecentWrap>
        </StRecentSearch>
      </StWrap>
    </StContainer>
  );
};

export default Search;

const StContainer = styled.form`
  gap: 12px;
  height: 100%;
`;

const StWrap = styled.div`
  width: 100%;
  height: 87%;
`;

const StSearchWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StSearchDiv = styled.div`
  width: 90%;
  height: 48px;
  margin-top: 30px;
  border: 1px solid #f7931e;
  border-radius: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StImg = styled.img`
padding-left: 20px;
 width: 5%;
  color: #F7931E;
`

const StSearchInput = styled.input`
  width: 70%;
  height: 60%;
  border: none;
  outline: none;
  font-size: 16px;
`;

const StClose = styled.img`
  padding-right: 20px;
  cursor: pointer;
  color: #F7931E;
  width: 5%;
`

const StSelectBox = styled.div`
  display: flex;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 12px;
  justify-content: center;
`;

const StSelectInBox = styled.div`
    width: 90%;
    display: flex;
    justify-content: right;
`

const StSelect = styled.select`
  display: flex;
  margin-left: auto;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #f7931e;
  color: #f7931e;
  width: 68px;
  height: 20px;
  font-weight: 500;
  font-size: 12px;
  outline: none;
`;

const StRecentSearch = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const StRecentWrap = styled.div`
  width: 90%;
  height: 100vh;
`;
