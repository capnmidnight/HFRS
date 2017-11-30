import del from "./del";
export default function delObject(url, options) {
  return del("json", url, options);
};
