import get from "./get";
export default function getText(url, options) {
  return get("text", url, options);
};
