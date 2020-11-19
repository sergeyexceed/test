import { isObject } from "lodash";
import { baseUrl } from "../constants/env";
import { buildQuery } from "../utils/query";

class Api {
  baseUrl = baseUrl;
  token = null;
  headers = {
    "Content-Type": "application/json",
  };

  setBaseUrl(url) {
    this.baseUrl = url;

    return this;
  }

  setAuthorization(token) {
    this.token = token;

    return this;
  }

  setHeaders(headers) {
    Object.getOwnPropertyNames(headers).forEach((key) => {
      if (headers[key]) {
        this.headers[key] = headers[key];
      } else {
        delete this.headers[key];
      }
    });

    return this;
  }

  // parseJSON param can be used for not json response
  async call(url, method, query = null, body = null, parseJSON = true) {
    // if query is object - create query string from its values
    // if no - just return as it was passed
    const queryParams = isObject(query) ? buildQuery(query) : query;
    let options = {
      method,
      headers: {
        ...this.headers,
        "Access-Token": this.token,
      },
    };

    if (body) {
      options.body =
        body.constructor.name !== "FormData" ? JSON.stringify(body) : body;
    }

    const queryString = query !== null ? `?${queryParams}` : "";
    const urlString = `${this.baseUrl}${url}${queryString}`;

    const response = await fetch(urlString, options);
    this.response = response;
    if (response.status >= 200 && response.status < 300) {
      if (parseJSON) {
        return response.json();
      }

      return response;
    }
    let error;
    try {
      error = await response.json();
    } catch (e) {
      // if couldn't parse json
      throw new Error(`${response.status} - ${response.statusText}`);
      const error = undefined;
    }
    throw error;
  }
}

export default () => new Api();
