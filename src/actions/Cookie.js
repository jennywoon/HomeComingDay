import Cookies from "universal-cookie";

const cookies = new Cookies();

export function setTokenToCookie(data) {
  let now = new Date();
  let after1m = new Date();
  after1m.setMinutes(now.getMinutes() + 120);

  cookies.set("accessToken", data.accessToken, { path: "/", expires: after1m });
  cookies.set("refreshToken", data.refreshToken, { path: "/", expires: after1m });
  cookies.set("username", data.username, { path: "/", expires: after1m });

}
//Authorization

export function logout() {
  cookies.remove("accessToken", { path: "/" });
  cookies.remove("refreshToken", { path: "/" });
  cookies.remove("username", { path: "/" });

}


export function cookieCkeck() {
  const accessCookie = cookies.get("accessToken");
  if (accessCookie === undefined) {
    return false;
  } else {
    return true;
  }
}