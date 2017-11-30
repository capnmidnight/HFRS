import get from "./get";
export default function getObject(url, options) {
  return get("json", url, options);
};
