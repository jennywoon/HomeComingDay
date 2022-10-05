import axios from "axios";
import { getCookie, setCookie } from "../../shared/cookies";
import { store } from "../../redux/config/configStore";
// 모듈
import { showError } from "../../redux/modules/ErrorSlice";

export const instance = axios.create({
    BASE_URL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type" : "application/json;charset=utf-8",
        "Access-Control-Allow-Headers": "*",
    },
});

let isTokenRefreshing = false;
let refreshSubscribers = [];
// callback 이라는 인자를 받으면, 그 인자를 refreshSubscribers 배열에 더한다
const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
}

instance.interceptors.request.use(
    (config) => {
        //config에는 위의 instance 객체를 request를 보냈을 때의 모든 설정이 들어있다.
        const accessToken = `Bearer ${getCookie("accessToken")}`;
        if(accessToken) {
            config.headers["Authorization"] = accessToken;
            return config;
        }
        return config;
    },
    (error) => {
        return;
    },
);

instance.interceptors.response.use(
    function(response){
        // 요청을 보낸 뒤에 response가 오는 경우, 여기서 먼저 확인 가능
        let originRequest = response.config;
        // 만료된 토큰이라는 응답을 받은 경우,
        if(response.data.errorMessage === "만료된 토큰입니다."){
            // 1) isTokenRefreshing 이 false일 땐 true로 변경
            if(!isTokenRefreshing){
                isTokenRefreshing = true;
                // 헤더에 refreshToken을 넣어 새 accessToken을 발급받는다.
                let axiosConfig = {
                    headers: {
                        refreshToken: `Bearer ${getCookie("refreshToken")}`,
                    },
                };
                axios.post(process.env.REACT_APP_BASE_URL + "/refresh", {}, axiosConfig).then((res) => {
                    let accessToken = res.headers.Authorization;
                    // 새 accessToken을 발급받아 instance의 header에 넣고 저장
                    instance.defaults.headers["Authorization"] = accessToken;
                    setCookie("accessToken", accessToken);

                    // refreshSubscribers에 저장되어 있던 callback 함수를 새 accessToken을 넣어 실행
                    refreshSubscribers.map((callback) => callback(accessToken));

                    // refreshSubscribers 배열을 초기화 하고, isTokenRefreshing을 false로 변경
                    refreshSubscribers = [];
                    isTokenRefreshing = false;
                });
            }
            // 2) isTokenRefreshing 이 true일 땐, Promise 객체 retryOriginRequest를 만들고 이 객체를 반환
            const retryOriginRequest = new Promise((resolve) => {
                // callback 함수를 RefreshSubscriber 배열에 더한다
                addRefreshSubscriber((accessToken) => {
                    // response.config에 headers가 있으면 header에 accessToken을 넣고
                    if(originRequest.headers){
                        originRequest.headers.Authorization = accessToken;
                        // axios(originRequest) 실행
                        resolve(axios(originRequest));
                    }
                });
            });
            // promise 객체를 반환하는데, 어떻게 활용하는지 확인 필요
            return retryOriginRequest;
        }
        return response;
    },

    function(error) {
        store.dispatch(showError({ isOpen: true, message: error.response.data.message}));
        return Promise.reject(error);
    },
);
