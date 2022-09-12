import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { BiSearch } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import SearchCard from "./SearchCard";
import { __getSearch, __postSearch } from "../../redux/modules/SearchSlice";
import { __getHelp } from "../../redux/modules/HelpSlice";


const SearchTest = () => {
    const dispatch = useDispatch();

    // search post 연습

    
    const [search, setSearch] = useState()
    const searchs = useSelector((state)=>state.helps.helps)
    
    console.log(searchs)

    useEffect(() => {
        // dispatch(__getSearch());
        dispatch(__getHelp())
    }, [dispatch])

    // search 연습

    

    // input 안 x버튼 클릭할 때, input 내용 없어지도록 구현 + post 기능 추가

    const [inputText, setInputText] = useState("");

    const onChangeInput = (e) => {
        setInputText(e.target.value);
        const { value, name } = e.target;
        setSearch({
            ...search,
            [name]: value,
        })
    }
    const onReset = () => {
        setInputText("");
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(__postSearch(search))
    }

    return (
        <HelpContainer onSubmit={onSubmitHandler}>
            {/* <Banner /> */}
            <HelpWrap>
                <SearchWrap>
                    <SearchDiv>
                        <BiSearch size="37" style={{ paddingLeft: "20px" }} />
                        <SearchInput
                            //  id="search-box" onChange={filterBySearch} value={inputText}
                            placeholder="검색어를 입력해주세요" 
                            // onKeyPress={(e) => {
                            //     if (e.key === 'Enter') {
                            //       dispatch(__getSearch(inputText))
                                  
                            //     }
                            //   }
                            // }
                            />
                        <IoCloseCircle
                            onClick={onReset}
                            size="37" style={{ paddingRight: "20px", cursor: "pointer" }} />
                    </SearchDiv>
                </SearchWrap>
                <SearchFilter>
                    <FilterMenu>
                        <FilterList>도움요청</FilterList>
                        <FilterList>정보공유</FilterList>
                        <FilterList>만남공유</FilterList>
                        <FilterList>자유토크</FilterList>
                    </FilterMenu>
                </SearchFilter>
                <RecentSearch>
                    <RecentWrap>
                        {/* <RecentTitle>최근 검색어</RecentTitle> */}
                        {/* search card 맵 돌릴 예정 */}
                        {/* <>
                            {filteredList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            ))}
                        </> */}
                        {/* <SearchCard/> */}
                    </RecentWrap>
                    

                </RecentSearch>
            </HelpWrap>
        </HelpContainer>
    );
}

export default SearchTest;

const HelpContainer = styled.form`
  gap: 12px;
  height: 100%;
  /* overflow-y: scroll; */
`;

const HelpWrap = styled.div`
  /* padding: 0 10px; */
  width: 100%;
`;

const SearchWrap = styled.div`
    width : 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const SearchDiv = styled.div`
    width: 80%;
    height: 48px;
    /* top: 129px; */
    margin-top: 30px;
    border: 1px solid #000000;
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

const RecentSearch = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
`

const RecentWrap = styled.div`
    width: 75%;
    height: 100vh;
    overflow: scroll;
`
const RecentTitle = styled.div`
    margin: 50px 0 20px 0;
    font-size: 20px;
    font-weight: 700;
`
const SearchFilter = styled.div`

`
const FilterMenu =styled.ol`
    display: flex;
    width: 80%;
    justify-content: space-between;
    margin:10px 0;
`
const FilterList = styled.li`
    width:70px;
    text-align: center;
    border-radius: 20px;
    /* border:1px solid red; */
    background-color: #F7931E;;
    color:white;
    list-style:none;

`