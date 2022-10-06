import { instance } from "./config";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// 채팅방 생성
export const chatApi = {
    createChat: async(userId) => {
        let req = {
            userId: userId,
        }
        const data = await instance.post(`${BASE_URL}/chat/rooms`, req);
        return data;
    },

    // 채팅방 목록 조회
    getChatList: async(page) => {
        const data = await instance.get(`${BASE_URL}/chat/rooms/${page}`);
        return data;
    },

    // 채팅방 입장
    enterChatRoom: async(roomId) => {
        const data = await instance.get(`${BASE_URL}/chat/rooms/otherUserInfo/${roomId}`);
        return data;
    },

    // 이전 채팅 메시지 불러오기
    getChatMessage: async(roomId) => {
        const data = await instance.get(`${BASE_URL}/chat/rooms/${roomId}/messages`);
        return data;
    },

    // 채팅방 삭제
    deleteChat: async(roomId) => {
        const data = await instance.delete(`${BASE_URL}/chat/rooms/${roomId}`);
        return data;
    }
}