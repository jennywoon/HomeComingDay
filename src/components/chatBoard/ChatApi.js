import { instance } from "./config";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 채팅방 생성
export const chatApi = {
    createChat: async(userId) => {
        let req = {
            userId: userId,
        }
        // const data = await instance.post("/chat/rooms", req);
        const data = await instance.post(`${BASE_URL}/chat/rooms`, req);
        console.log(data);
        return data;
    },

    // 채팅방 목록 조회
    getChatList: async(page) => {
        // const data = await instance.get(`/chat/rooms/${page}`);
        const data = await instance.get(`${BASE_URL}/chat/rooms/${page}`);
        return data;
    },

    // 채팅방 입장
    enterChatRoom: async(roomId) => {
        // const data = await instance.get(`/chat/rooms/otherUserInfo/${roomId}`);
        // const data = await instance.get(`${BASE_URL}/chat/rooms/otherUserInfo/9118e16a-8a69-4835-8497-6595648977bf`);
        const data = await instance.get(`${BASE_URL}/chat/rooms/otherUserInfo/${roomId}`);
        return data;
    },

    // 이전 채팅 메시지 불러오기
    getChatMessage: async(roomId) => {
        // const data = await instance.get(`/chat/rooms/${roomId}/messages`);
        // const data = await instance.get(`${BASE_URL}/chat/rooms/9118e16a-8a69-4835-8497-6595648977bf/messages`);
        const data = await instance.get(`${BASE_URL}/chat/rooms/${roomId}/messages`);
        return data;
    },

    // 채팅방 삭제
    deleteChat: async(roomId) => {
        // const data = await instance.delete(`/chat/rooms/${roomId}`);
        const data = await instance.delete(`${BASE_URL}/chat/rooms/${roomId}`);
        return data;
    }
}