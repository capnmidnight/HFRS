import XHR from "./XHR";
export default function get(type, url, options) {
  return XHR("GET", type || "text", url, options);
};
