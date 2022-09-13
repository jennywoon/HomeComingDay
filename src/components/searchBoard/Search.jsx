import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components"
import { BiSearch } from "react-icons/bi";
import { IoCloseCircle } from "react-icons/io5";
import SearchCard from "./SearchCard";
import { __getSearch, __getSearchArticle, __postSearch } from "../../redux/modules/SearchSlice";
import { __getHelp } from "../../redux/modules/HelpSlice";
import { __getInformation } from "../../redux/modules/InformationSlice";
import { __getCalendar } from "../../redux/modules/CalendarSlice";
import { __getFreeTalk } from "../../redux/modules/FreeTalkSlice";


const Search = () => {
    const dispatch = useDispatch();

    // search post 연습
    
    const [search, setSearch] = useState()
    const [helpBtn , setHelpBtn] = useState(false)
    const [informationBtn , setInformationBtn] = useState(false)
    const [freeTalkBtn , setFreeTalkBtn] = useState(false)
    const [calendarBtn , setCalendarBtn] = useState(false)

    const searchArticle = useSelector((state)=>state.searchs.searchs)
    const helpSearchs = useSelector((state)=>state.helps.helps)
    const informationSearchs = useSelector((state)=>state.informations.informations)
    const freeTalkSearchs = useSelector((state)=>state.freetalks.freetalks)
    const calendarSearchs = useSelector((state)=>state.calendars.calendars)

    // const searchs = [...helpSearchs,...informationSearchs,...freeTalkSearchs,...calendarSearchs]

    console.log(searchArticle)

    
    useEffect(() => {
        dispatch(__getSearchArticle())
    }, [dispatch])

    
    const helpSearchFilter = () =>{
        setHelpBtn(!helpBtn)
        setInformationBtn(false)
        setFreeTalkBtn(false)
        setCalendarBtn(false)
    }
  
    const informationSearchFilter = () =>{
        setInformationBtn(!informationBtn)
        setHelpBtn(false)
        setFreeTalkBtn(false)
        setCalendarBtn(false)
    }

    const freeTalkSearchFilter = () =>{
        setFreeTalkBtn(!freeTalkBtn)
        setInformationBtn(false)
        setHelpBtn(false)
        setCalendarBtn(false)
    }

    const calendarSearchFilter = () =>{
        setCalendarBtn(!calendarBtn)
        setFreeTalkBtn(false)
        setInformationBtn(false)
        setHelpBtn(false)
    }

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
      
    //Help
    const [filteredHelpList, setFilteredHelpList] = new useState(helpSearchs);
    const filterByHelpSearch = (e) => {
        // Access input value
        const query = e.target.value
        // console.log(query)
        // Create copy of item list
        let updatedList = [...helpSearchs];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setFilteredHelpList(updatedList);
      };

     //informationfilter
      const [filteredInformationList, setFilteredInformationList] = new useState(informationSearchs);
      const filterByInformationSearch = (e) => {
          // Access input value
          const query = e.target.value
          // console.log(query)
          // Create copy of item list
          let updatedList = [...informationSearchs];
          // Include all elements which includes the search query
          updatedList = updatedList.filter((item) => {
            return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          });
          // Trigger render with updated values
          setFilteredInformationList(updatedList);
        };

      //Freetalkfilter
      const [filteredFreetalkList, setFilteredFreetalkList] = new useState(freeTalkSearchs);
      const filterByFreetalkSearch = (e) => {
          // Access input value
          const query = e.target.value
          // console.log(query)
          // Create copy of item list
          let updatedList = [...freeTalkSearchs];
          // Include all elements which includes the search query
          updatedList = updatedList.filter((item) => {
            return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          });
          // Trigger render with updated values
          setFilteredFreetalkList(updatedList);
        };

    //Calendarfilter
    const [filteredCalendarList, setFilteredCalendarList] = new useState(calendarSearchs);
    const filterByCalendarSearch = (e) => {
        // Access input value
        const query = e.target.value
        // console.log(query)
        // Create copy of item list
        let updatedList = [...calendarSearchs];
        // Include all elements which includes the search query
        updatedList = updatedList.filter((item) => {
          return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
        // Trigger render with updated values
        setFilteredCalendarList(updatedList);
      };


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
                    <SearchDiv >
                        <BiSearch size="37" style={{ paddingLeft: "20px" }} />
                        {/* <SearchInput
                        id="search-box" onChange={filterBySearch} 
                        placeholder="검색어를 입력해주세요" 
                            // onKeyPress={(e) => {
                            //     if (e.key === 'Enter') {
                            //       dispatch(__getSearch(inputText))
                            //     }
                            //   }
                            // }
                            /> */}
                        {helpBtn ?
                        <SearchInput id="search-box" onChange={filterByHelpSearch} placeholder="검색어를 입력해주세요" />
                        :
                        informationBtn?
                        <SearchInput id="search-box" onChange={filterByInformationSearch} placeholder="검색어를 입력해주세요" />
                        :
                        freeTalkBtn?
                        <SearchInput id="search-box" onChange={filterByFreetalkSearch} placeholder="검색어를 입력해주세요" />
                        :
                        calendarBtn?
                        <SearchInput id="search-box" onChange={filterByCalendarSearch} placeholder="검색어를 입력해주세요" />
                        :
                        <SearchInput id="search-box" onChange={filterBySearch} placeholder="검색어를 입력해주세요" />
                        }
                        
                        <IoCloseCircle
                            onClick={onReset}
                            size="37" style={{ paddingRight: "20px", cursor: "pointer" }} />
                    </SearchDiv>
                </SearchWrap>
                <SearchFilterBox>
                <SearchFilter>
                    <FilterMenu>
                        <FilterList show={helpBtn} onClick={helpSearchFilter}>도움요청</FilterList>
                        <FilterList show={informationBtn} onClick={informationSearchFilter}>정보공유</FilterList>
                        <FilterList show={freeTalkBtn} onClick={freeTalkSearchFilter}>만남공유</FilterList>
                        <FilterList show={calendarBtn} onClick={calendarSearchFilter}>자유토크</FilterList>
                    </FilterMenu>
                </SearchFilter>
                </SearchFilterBox>
                <RecentSearch>
                    <RecentWrap id="item-list">
                        {/* <RecentTitle>최근 검색어</RecentTitle> */}
                        {/* search card 맵 돌릴 예정 */}

                        {/* <>
                            {filteredList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            ))}
                        </> */}
                        {helpBtn ? 
                            (filteredHelpList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            )))
                            :  
                        informationBtn? 
                            (filteredInformationList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            )))
                            :
                        freeTalkBtn?
                            (filteredFreetalkList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            ))) 
                            :
                        calendarBtn?
                            (filteredCalendarList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            ))) 
                            :
                            (filteredList?.map((search) => (
                                <SearchCard key={search.articleId} id={search.articleId} search={search} />
                            )))
                            
                        }
                        
                        
                        
                        {/* <SearchCard/> */}
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
    overflow: scroll;
`

const RecentWrap = styled.div`
    width: 75%;
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