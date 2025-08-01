// const { VITE_NODE_ENV } = import.meta.env; // Use import.meta.env instead of process.env
const { hostname } = window.location;

const servers = {
  local: "http://localhost:3053",
  customDev: "https://react.customdev.solutions:3053",
  live: "",
  dummy: "https://9d2f-204-157-158-10.ngrok-free.app",
};

var URL;

if (hostname.includes("react.customdev.solutions")) {
  URL = servers.customDev;
} else if (hostname.includes("buffaloaudiovisual.com")) {
  URL = servers.live;
} else {
  URL = servers.local;
}
export const SOCKET_URL = URL;
export const UPLOADS_URL = `${URL}/`;
export const BASE_URL = `${URL}/api/v1`;