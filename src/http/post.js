import XHR from "./XHR";
export default function post(type, url, options) {
  return XHR("POST", type, url, options);
};
