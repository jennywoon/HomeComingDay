// import React, { useEffect, useState } from 'react';
// import io from "socket.io-client"
// import styled from 'styled-components';

// const socket = io.connect("http://localhost:3001");
// socket.emit("init", "접속했습니다")

// const ChatFrontTest = () => {

//     const [chatList, setChatList] = useState([]);
//     const [chat, setChat] = useState({
//         nickname: "",
//         message: "",
//     })

//     useEffect(() => {
//         socket.on("receive message", (message) => {
//             setChatList(chatList => chatList.concat(message))
//         })
//     }, [])

//     useEffect(() => {
//         return () => {
//             socket.close()
//         }
//     }, [])

//     return (
//         <ChatDiv>
//             <ChatList chatList={chatList} />
//             <ChatInput chat={chat} setChat={setChat} />
//         </ChatDiv>
//     );
// };

// export default ChatFrontTest;

// const ChatDiv = styled.div`
//     width: 100%;
//     height: 100%;
// `

// function ChatList({ chatList }) {
//     return (
//         <div style={{width: "100%", height:"500px"}}>
//             <section className='chat-box'>
//                 {chatList && chatList.map((chat, index) => (
//                     <p key={index}>{chat.nickname} : {chat.message}</p>
//                 ))}
//             </section>
//         </div>
//     )
// }

// function ChatInput({ chat, setChat }) {
//     const changeInput = (e) => {
//         const { name, value } = e.target;
//         setChat(chat => {
//             return { ...chat, [name]: value }
//         })
//     }
//     const postChat = () => {
//         socket.emit("send message", {
//             nickname: chat.nickname,
//             message: chat.message
//         })
//     }
//     return (
//         <div>
//             <input name="nickname" value={chat.nickname} onChange={changeInput} />
//             <input name="message" value={chat.message} onChange={changeInput} />
//             <button onClick={postChat}>전송</button>
//         </div>
//     )
// }