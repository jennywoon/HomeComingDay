import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {

  let now =new Date();
  let after1m = new Date();
  after1m.setMinutes(now.getMinutes() + 240);

  return cookies.set(name, value, { ...option, expires: after1m });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};

export function logout(){
  cookies.remove("accessToken", {path: "/"})
  cookies.remove("refreshToken", {path: "/"})
  cookies.remove("username", {path: "/"})
  // cookies.remove("schoolname", {path: "/"})
}