import XHR from "./XHR";
export default function del(type, url, options) {
  return XHR("DELETE", type, url, options);
};
