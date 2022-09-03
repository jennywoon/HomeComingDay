# 🏫 Home Coming Day
<br/>
[홈커밍데이 HomeComingDay] 라는 단어는 미국에서 고교 졸업자들이 30년 뒤에 모교를 방문하는 행사를 말합니다. 한국에서는 동창회란 표현이 있기 때문에 홈커밍은 동창회나 동문회, 동기회에서 추진하는 연간 모임이 아닌 학교 등 교육기관에서 공식적으로 추진하는 행사를 가리키는 표현이 되었습니다.[출처 : 나무위키]

학교를 졸업하고도 학연을 그리워하는 한국에서, 아쉽게도 동문을 만날 수 있는 방법은 많이 없습니다. 카카오 오픈채팅, 네이버 카페 등을 이용하여 동창들과 이어지는 것을 넘어 졸업 후에도 선후배를 만날 수 있는 커뮤니티를 만들고자 하는 아이디어에서 시작되었습니다.

대학교 졸업생 동문 사이트 [홈커밍데이 HomeComingDay] 에서 전국의 선후배를 만나보세요!
<br/>
<br/>
<br/>

## 🗓프로젝트 기간
<br/>
- 2022.08.26 ~ 2022.10.07
<br/>
<br/>

## 🔔 기술 스택 Front-End 
<br/>

<img alt="Csharp" src ="https://img.shields.io/badge/JavaScript-F7DF1E.svg?&style=for-the-badge&logo=JavaScript&logoColor=whtie"/>&nbsp;&nbsp;&nbsp;<img alt="Csharp" src ="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"/>

<br/>
<br/>

## 📊 주요 기능

<br/>
<br/>
<br/>


## 📪 주소
- 사이트 링크 : 
- 시연 영상 : 유튜브 링크 달자
- Front-End Git Hub : [Front-End Git Hub 링크 클릭](https://github.com/jennywoon/HomeComingDay.git)
- Back-End Git Hub : 
- 기획안 정리(팀 회의록 포함) : [Notion 링크 클릭](https://prairie-scion-76d.notion.site/1-194af719c75a4851b4bdb7d3e38f6bde)
<br/>
<br/>
<br/>

## 📑 API 설계도
- Notion : [Notion 링크 클릭](https://prairie-scion-76d.notion.site/API-7e8621cd61dc49fbb935f692242d69f3)
- 일부 캡처
![image](https://user-images.githubusercontent.com/109018926/187039932-52f91535-68e1-4493-9bef-5910aa04158b.png)
<br/>
<br/>
<br/>

## 📕 와이어 프레임 및 뷰 구현
- Figma : [Figma 링크 클릭](https://www.figma.com/file/73hhMPremRjZhBagMjIFgy/Untitled?node-id=7%3A32)
<br/>
<br/>
- 아이콘 : 리액트 아이콘 통일

## ❓ Trouble Shooting Front-End
- 반응형 페이지 구성 : 웹을 만들지만 앱 모양으로 만들다보니, 반응형 구현이 너무 어려웠다.. 기능이 들어가지도 않았는데 커밋 갯수가 105개였다.
- 달력 라이브러리 get, post : 디자인상 라이브러리를 모달로 만들어서 사용해야 했기 때문에, 같은 module을 사용할 수 없어 두 개의 모듈을 구성해서 만들었다. useSelector로 다른 컴포넌트에서 데이터값을 찾아 입력하려고 했는데 여기서 문제가 발생했다. 두 가지의 모듈이 달라 데이터를 일치시킬 수 없어서 달력에 찍힌 값을 length-1로 구해 찾아보려고 했으나, db.json에 데이터가 한 개도 없을 경우, 오류가 발생하였고 이 부분을 해결하기 위해 하루종일을 썼는데,,, 아주 쉽게 해결 할 수 있었다.
-> 에러 : {moment(getLastArrItem.calendarDate).format("YYYY년 MM월 DD일")} : 이렇게 사용하면 db가 없을 경우 에러가 뜬다.
-> 올바른 코드 : {getLastArrItem&&moment(getLastArrItem.calendarDate).format("YYYY년 MM월 DD일")} : 정의한 값 && 이것만 넣어줘도 에러가 해결된다 ㅠㅡㅠ
