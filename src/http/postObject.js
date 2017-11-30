import post from "./post";
export default function postObject(url, options) {
  return post("json", url, options);
};
