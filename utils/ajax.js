import axios from 'axios';

const API = 'https://www.reddit.com/r/popular';

export default function request(method, path, data = {}) {
  const headers = {
    'Content-type': 'text/plain;charset=UTF-8',
  };
  return axios({
    method,
    headers,
    url: `${API}/${path}`,
    data,
  });
}
