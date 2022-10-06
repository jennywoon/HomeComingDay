<!-- # 🏫 Homecoming Day -->

# <img src="https://user-images.githubusercontent.com/109018926/193449320-c1ffb73a-c554-4870-8497-a8348c6b1a3b.png" width="250px" height="40px">
<br/>
<br/>

<img src="https://user-images.githubusercontent.com/109018926/193449385-70608a7e-5b44-49e1-9c08-f168783f5a22.png" >

<br/>
<br/>

### 👩‍🎓 대학교 졸업생 동문 사이트 [Homecoming Day] 에서 전국의 선후배를 만나보세요! 👨‍🎓

<br/>

🏫 Homecoming Day는 미국에서 고교 졸업자들이 30년 뒤에 모교를 방문하는 행사를 말합니다. 한국에서는 동창회란 표현이 있기 때문에 홈커밍은 동창회나 동문회, 동기회에서 추진하는 연간 모임이 아닌 학교 등 교육기관에서 공식적으로 추진하는 행사를 가리키는 표현이 되었습니다.[출처 : 나무위키]
<br/>
<br/>
청춘이 시작되는 20대를 함께 보낸 동기들, 의지하고 싶은 선후배를 찾고 싶지만 아쉽게도 동문을 만날 수 있는 방법은 많이 없습니다. 오픈채팅, 카페 등을 이용하여 동창들과 이어지는 것을 넘어 졸업 후에도 선후배를 만날 수 있는 커뮤니티를 만들고자 하는 아이디어에서 시작된 프로젝트입니다.

<br/>
<br/>

## 📪 주소
<br/>

- Homecoming Day : [Homecoming Day 접속 링크](https://www.homecomingdaycare.com/)
- Front-End Git Hub : [Front-End Git Hub 링크 클릭](https://github.com/jennywoon/HomeComingDay.git)
- Back-End Git Hub : [Back-End Git Hub 링크 클릭](https://github.com/251643/HomecomingDay.git)
- 기획안 정리(팀 회의록 포함) : [Notion 링크 클릭](https://prairie-scion-76d.notion.site/1-194af719c75a4851b4bdb7d3e38f6bde)
- 시연 영상 : 추후 유튜브 링크 달 예정
- API Notion : [Notion 링크 클릭](https://www.notion.so/API-958fc1f5810045a684d94cc16b43772a)
<br/>
<br/>
<br/>

## ⚙ 서비스 아키텍쳐

<br/>

![서비스아키텍처](https://user-images.githubusercontent.com/109018926/193449550-206751e5-a40c-4325-a7ee-80990fbd328d.png)

<br/>

## 🗓 프로젝트 기간 & 마케팅

<br/>

- 2022.08.26 ~ 10.07 (6주)
- 10월 1일 배포, 마케팅 시작
- 10월 3일 기준 순 방문자 227명, 누적 가입자 수 83명
- 10월 6일 기준<br/>
> - 순 방문자 463명, 누적 가입자 수 170명<br/>
> - 유저 테스트 1,794개
>> - 작성 게시글 153개, 댓글 600개, 대댓글 58개, 채팅 메시지 534개, 좋아요 125개, 알림 324개

<br/>
<br/>

## 🍀 페이지별 기능 소개
<details>
<summary><b>상세내용 확인</b></summary>
<br/>

### 📲 로그인, 회원가입 페이지

<br/>

- 일반 로그인 기능
- 네이버 소셜 로그인

<br/>

![회원가입1](https://user-images.githubusercontent.com/109018926/190409932-2eaae376-01ff-4e28-af60-7547cceaaa9c.png)

</br>

- 이메일 인증 기능

<br/>

![회원가입2](https://user-images.githubusercontent.com/109018926/190410047-e55e3b85-e954-43c1-9760-feb7c6664392.png)

<br/>

- 학교, 학과, 학번을 기재하는 정보 입력 페이지

<br/>

![학교정보](https://user-images.githubusercontent.com/109018926/190411088-537def90-9c8b-412b-87ba-6d4cffa25227.png)

<br/>

### 🗒 메인 페이지 및 게시글 작성 페이지

- 같은 학교 학생들만 볼 수 있는 학교별 페이지 기능 구현, 다른 학교일 경우 접근 불가
- 도움요청, 정보공유, 만남일정, 자유토크 네 가지 게시판 CRUD 구현
- 한 가지 폼 안에서 네 개의 게시판 POST 되도록 구현

<br/>

![메인_글쓰기](https://user-images.githubusercontent.com/109018926/190411952-14e71a20-2143-4279-9758-c925b0b2a5e4.png)

<br/>

### 📂 도움요청, 정보공유, 만남일정, 자유토크를 동문들과 나누는 게시판

- 게시글 수정, 삭제 기능 
- 댓글, 대댓글
- 좋아요 기능

<br/>

![게시글상세](https://user-images.githubusercontent.com/109018926/190413074-04f3c553-b576-4ed3-8432-e3384b5ee5a7.png)

<br/>

### 🔍 검색 페이지, 채팅 페이지

- 게시글 Title별 검색 기능 구현
- 동문들끼리 1:1 대화를 나눌 수 있는 채팅 페이지 구현

<br/>

![검색+채팅](https://user-images.githubusercontent.com/109018926/190413740-d7d4d38a-adfd-4f8d-97e4-ffec8a01b567.png)

<br/>

### 🔔 알림 페이지

- 댓글, 좋아요가 달리면 바로 확인할 수 있는 알림 페이지 구현

<br/>

![알림페이지](https://user-images.githubusercontent.com/109018926/190414238-8f88d454-2469-43cb-8ea5-1595d8018fce.png)

<br/>

### 🪞 마이 페이지

- 내가 쓴 게시글을 확인할 수 있도록 구현
- 게시글 클릭시 해당 게시글로 들어갈 수 있도록 구현
- 프로필 사진 변경 기능 구현
- 무한 스크롤

<br/>

![마이페이지](https://user-images.githubusercontent.com/109018926/190415293-26e15cae-e219-4f67-bc99-71d7a0b3098a.png)

<br/>

</details>

<br/>

## 🔔 기술 스택 Front-End 

<br/>
<p>

<img src="https://img.shields.io/badge/react-282C34?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white">
<img src="https://img.shields.io/badge/Axios-39477F?style=for-the-badge&logo=Axios&logoColor=white">
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/styled_components-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=black">
<img src="https://img.shields.io/badge/Swiper-6332F6?style=for-the-badge&logo=Swiper&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/kakao map-FFCD00?style=for-the-badge&logo=kakao&logoColor=black">
<img src="https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=PWA&logoColor=white">
<img src="https://img.shields.io/badge/Stomp & Sock.Js-0ABF53?style=for-the-badge&logo=Stomp & Sock.Js&logoColor=white">
<br/>
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white">
<img src="https://img.shields.io/badge/-aws%20amplify-FF9900?style=for-the-badge&logo=aws%20amplify&logoColor=white">
<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white">
</p>
<br/>

| 이름       | 포지션       | GitHub & Email          | 담당                             |
| ---------- | ------------ | ------------------------------ |  ------------------------------ |
| **나청운** | `프론트엔드` | https://github.com/jennywoon/HomeComingDay.git | [부리더]<br/>1. 마이페이지, 프로필 수정, 등급 기능<br/> 2. 메인 페이지 게시글 get, post <br/> 3. 채팅 기능 <br/>4. 네이버 소셜로그인<br/> 5. 상세 페이지 calendar, time <br/> 6. 무한 스크롤<br/> 7. 전체 회의록 & 피드백 & QA 시트 관리
| **조수정** | `프론트엔드` | https://github.com/suzzeong/HomeComingDay.git | 1. 로그인/회원가입/회원가입 완성 페이지<br/> 2. 학교정보입력 페이지<br/> 3. 좋아요 기능<br/> 4. 알림 기능<br/> 5. PWA 기능
| **최형용** | `프론트엔드` | https://github.com/hyeongyong-choi/HomeComingDay.git | 1. 게시글, 댓글, 대댓글 CRUD<br/> 2. 검색 기능<br/> 3. 참여하기 기능<br/>4. 이미지 리사이징<br/> 5. 게시글 폼 페이지<br/> 6. 최신순, 인기순 필터

## ❓ Front-End Trouble Shooting

<details>
<summary><b>✅ 게시글 조회 속도</b></summary>
해당 트러블 슈팅은 백엔드 속도 개선이다. useEffect도 잘 되어 있는 것 같았고 아무리 코드를 수정해도 렌더링 속도가 너무 느리고 이미지는 더 느리게 나와서, BackEnd와 계속해서 속도를 확인해보다, Redis를 통해 속도를 개선할 수 있다는 것을 알게 됨
</br>
메인 페이지인 article/help 위치에선 무려 723%의 속도 개선율을 보였다. FrontEnd에서도 해당 과정을 알고 있었다면 더 빠르게 소통해볼 수 있었을 것 같아 좋은 러닝이 되어 기록.
<img src="https://user-images.githubusercontent.com/109018926/194244336-268d2921-5a5c-4a5d-9859-06e15b8123e5.png">
</br>
</details>
<details>
<summary><b>✅ TimePicker 라이브러리</b></summary>

</br>

✔ 문제상황
- 디자이너님이 원하는 디자인은 React에서 만들 수 없었고 TimePicker 라이브러리 Custom을 아무리 하여도 원하는 디자인을 만들 수 없었음. post하는 과정에서도 라이브러리는 비효율성이 있음.

</br>

✔ 해결방안

- 라이브러리를 제거하고 시간을 코드로 구현하도록 변경함. 라이브러리에 의존하기 보다, 직접 구현을 통해 Custom을 자유롭게 할 수 있는 경험이 됨.
- 폴더 formBoard / 파일 FormBoard.jsx 197번째줄 시작
<img src="https://user-images.githubusercontent.com/109018926/194243399-bae9186a-ef9a-4740-be4c-f74de6cce9e1.png">

</details>

<details>
<summary><b>✅ 게시판 이미지 POST</b></summary>

</br>

✔ 문제상황
- 게시판 등록시에 텍스트와 이미지를 Formdata에 묶어 전송하였으나 State 500에러 발생
- 드랍존 라이브러리를 사용해서 오류를 해결하면서 이미지 프리뷰를 추가 구현하고 드래그앤드랍을 구현하려고 했으나 실패함

</br>

✔ 해결방안

- 이미지 또한 Formdata화 시켜야 한다는 사실을 확인함 

</details>

<details>
<summary><b>✅ 마이페이지 프로필 사진 변경</b></summary>

</br>

✔ 문제상황
- 우리가 구현하고 있는 기능은 로그인 이후 학교 정보를 받아야 했기 때문에 회원가입, 로그인 시 프로필 사진 추가를 할 수 없었음
- 따라서 마이페이지의 state에 프로필 사진 변경 기능을 넣어야 했음
- 발생된 문제는, 프론트에서 기본 프로필을 마이페이지에 등록해둔다고 하여도 게시판 메인 페이지의 프로필 사진에서 사진 이미지가 PATCH 되기전엔 이미지 에러가 발생함
- PATCH를 한다고 하여도 초반에 에러가 발생된 모습이 USER에게 노출될 수 있었음

</br>

✔ 해결방안

- 백엔드의 S3에 기본 이미지를 탑재해 데이터를 받을 때부터 null값이 아닌 기본 이미지로 받는 방향으로 게시판 이미지의 에러를 해결함
- 기본 이미지를 GET한 후, 프론트에서 PATCH를 사용하여 프로필 사진을 변경하였고 마이페이지, 게시판 페이지에 사진을 업데이트하여 해결함

</details>