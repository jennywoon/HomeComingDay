import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, option) => {

  let now =new Date();
  let after1m = new Date();
  after1m.setMinutes(now.getMinutes() + 60);

  return cookies.set(name, value, { ...option, expires: after1m });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

export const removeCookie = (name) => {
  return cookies.remove(name);
};