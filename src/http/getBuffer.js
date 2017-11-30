import get from "./get";
export default function getBuffer(url, options) {
  return get("arraybuffer", url, options);
};
