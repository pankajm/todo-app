/**
 * Reusable Http service using Fetch API
 */

import { URL } from "../constants";

const HttpService = async (config: RequestInit, url = URL) => {
  const response = await fetch(url, config);
  const { data } = await response.json();
  return data;
};

export default HttpService;
