import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { BiSearch } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import SearchCard from "./SearchCard";
import { __getSearch, __getSearchArticle, __getSearchArticlePopular, __postSearch } from "../../redux/modules/SearchSlice";

const Search = () => {
    const dispatch = useDispatch();

    // search post 연습
    
    const [search, setSearch] = useState()
    const [inputText, setInputText] = useState("");
    const [select, setSelect] = useState('new');

    const searchArticle = useSelector((state)=>state.searchs.searchs)
    const searchArticlePopular = useSelector((state)=>state.searchs.popular)
    

    console.log(searchArticle)
    console.log(searchArticlePopular)

    // const searchArticlePopulars = searchArticle.map((article)=>article.views )
    // console.log("searchArticlePopulars",searchArticlePopulars)


    const handleSelect = (e) => {
        setSelect(e.target.value);
      };
    
    
    // //filter
    // const [filteredList, setFilteredList] = new useState(searchArticle);
    // const filterBySearch = (e) => {
    //     // Access input value
    //     const query =e.target.value;
    //     // console.log(query)
    //     // Create copy of item list
    //     let updatedList = [...searchArticle];
    //     // Include all elements which includes the search query
    //     updatedList = updatedList.filter((item) => {
    //       return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    //     });
    //     // Trigger render with updated values
    //     setFilteredList(updatedList);
    //   };
      
      //Articles
      const [filteredList, setFilteredList] = new useState(searchArticle);
      const filterBySearch = (e) => {
          // Access input value
          const query = e.target.value
          // console.log(query)
          // Create copy of item list
          let updatedList = [...searchArticle];
          // Include all elements which includes the search query
          updatedList = updatedList.filter((item) => {
            return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          });
          // Trigger render with updated values
          setFilteredList(updatedList);
        };
      
    //ArticlesPopural
      const [filteredPopularList, setFilteredPopularList] = new useState(searchArticlePopular);
      const filterByPopularSearch = (e) => {
          // Access input value
          const query = e.target.value
          // console.log(query)
          // Create copy of item list
          let updatedList = [...searchArticlePopular];
          // Include all elements which includes the search query
          updatedList = updatedList.filter((item) => {
            return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          });
          // Trigger render with updated values
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
        setInputText("");
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(__postSearch(search))
    }

    useEffect(() => {
        dispatch(__getSearchArticle())
        dispatch(__getSearchArticlePopular())
    }, [dispatch])


    return (
        <HelpContainer onSubmit={onSubmitHandler}>
            {/* <Banner /> */}
            <HelpWrap>
                <SearchWrap>
                    <SearchDiv >
                        <BiSearch size="37" style={{ paddingLeft: "20px" , color:"#F7931E"}} />
                        

                        {select === "new" ? (
                        <SearchInput id="search-box" onChange={filterBySearch} placeholder="검색어를 입력해주세요" />
                        ) : 
                        select === "popular" ?
                        (
                        <SearchInput id="search-box" onChange={filterByPopularSearch} placeholder="검색어를 입력해주세요" />   
                        ) :
                           null }
                        <IoCloseCircle
                            onClick={onReset}
                            size="37" style={{ paddingRight: "20px", cursor: "pointer" , color:"#F7931E"}} />
                    </SearchDiv>
                    
                </SearchWrap>
               
                <SearchFilterBox>
                 {/* 필터검색용 */}
                {/* <SearchFilter>
                    <FilterMenu>
                        <FilterList show={helpBtn} onClick={helpSearchFilter}>도움요청</FilterList>
                        <FilterList show={informationBtn} onClick={informationSearchFilter}>정보공유</FilterList>
                        <FilterList show={freeTalkBtn} onClick={freeTalkSearchFilter}>만남공유</FilterList>
                        <FilterList show={calendarBtn} onClick={calendarSearchFilter}>자유토크</FilterList>
                    </FilterMenu>
                </SearchFilter> */}
                </SearchFilterBox>
                <SelectBox>
                <Select name='state' onChange={handleSelect}>
                    <option value='new'>최신순</option>
                    <option value='popular'>인기순</option>
                </Select>
                </SelectBox>
                <RecentSearch>
                    
                    <RecentWrap id="item-list">
                        {/* <RecentTitle>최근 검색어</RecentTitle> */}
                        {/* search card 맵 돌릴 예정 */}
                        {select === "new"&& filteredList && filteredList.length > 0 ? (
                        <>
                            {filteredList && filteredList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            ))}
                        </>
                        ) : 
                        select === "popular"&& filteredPopularList && filteredPopularList.length > 0 ? (
                        <>
                            {filteredPopularList && filteredPopularList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            ))}
                        </>
                        ) : null}
                        
                    </RecentWrap>
                    

                </RecentSearch>
            </HelpWrap>
        </HelpContainer>
    );
}

export default Search;

const HelpContainer = styled.form`
  gap: 12px;
  height: 100%;
  /* overflow-y: scroll; */
`;

const HelpWrap = styled.div`
  /* padding: 0 10px; */
  width: 100%;
  height: 87%;;
  /* border: 1px solid red; */
`;

const SearchWrap = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SearchDiv = styled.div`
    width: 90%;
    height: 48px;
    /* top: 129px; */
    margin-top: 30px;
    border: 1px solid #F7931E;
    border-radius: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SearchInput = styled.input`
    width: 70%;
    height: 60%;
    border: none;
    outline: none;
    font-size: 16px;
`
const SelectBox = styled.div`
    display: flex;
  width:90%;
  margin-top: 10px ;
  margin-bottom: 10px ;
`

const Select = styled.select`
  display: flex;
  margin-left: auto;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #f7931e;
  color: #f7931e;
  width: 70px;
  font-weight: 500;
  font-size: 12px;
  outline: none;
`;


const RecentSearch = styled.div`
    width: 100%;
    height: 85%;
    display: flex;
    justify-content: center;
    overflow: scroll;
    ::-webkit-scrollbar{
    width: 0px;
  }
    /* border: 1px solid blue; */
`

const RecentWrap = styled.div`
    width: 90%;
    height: 100vh;
    
`
const RecentTitle = styled.div`
    margin: 50px 0 20px 0;
    font-size: 20px;
    font-weight: 700;
`
const SearchFilter = styled.div`

`
const SearchFilterBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    
`

const FilterMenu =styled.ul`
    display: flex;
    width: 90%;
    text-align: center;
    justify-content: space-between;
    
    height:25px;
    margin:10px 0px;
    
`
const FilterList = styled.li`
    width:70px;
    text-align: center;
    border-radius: 20px;
    display: inline-block;
    /* border:1px solid red; */
    background-color: ${props => props.show ? "#F7931E" : "white" };
    color:${props => props.show ? "white" : "black" };
    list-style:none;
    cursor:pointer;

`