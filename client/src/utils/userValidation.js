import jwt from "jwt-decode";
let decodedData, token;

export function getUserDataFromToken() {
  try {
    token = localStorage.getItem("profile");
    const decodedToken = jwt(token);
    if (decodedToken.exp > Date.now() / 1000) {
      decodedData = decodedToken;
      decodedData.Permissions = JSON.parse(decodedToken.Permissions);
    } else {
      localStorage.clear();
      decodedData = null;
    }
  } catch {
    decodedData = null;
  }
  return { result: decodedData, token: token };
}

export function isTokenExpired() {
  if (decodedData?.exp <= Date.now() / 1000) {
    return true;
  } else {
    return false;
  }
}
