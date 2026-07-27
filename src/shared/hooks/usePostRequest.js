var qs = require("qs");
import { useAuthStore } from "@/features/auth/store";
import Constants from "@/shared/constants/Constants";
import AppUtil from "@/shared/utils/AppUtil";
import axios from "axios";
import { useEffect, useState } from "react";

function getForceUpdateData(data) {
  if (data?.code === 426) {
    return data?.data || {};
  }
  return null;
}

const usePostRequest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.user);

  function isOK(res) {
    return res?.data?.status === Constants.API_OK;
  }

  function isNotOK(res) {
    return (
      res?.data?.status === "error" ||
      res?.data?.status === Constants.API_NOT_OK
    );
  }

  async function buildParams(obj) {
    const requiredParams = {
      app_version: AppUtil.getAppVersionNo(),
    };
    const params = { ...requiredParams, ...obj };

    let stringParams = "";
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        stringParams += params[key];
      }
    }
    return { ...params };
  }

  const extractErrorMessage = (errorData) => {
    if (typeof errorData === "string") {
      return errorData;
    }

    if (errorData && typeof errorData === "object") {
      if (Array.isArray(errorData.non_field_errors)) {
        return errorData.non_field_errors.join("\n");
      }
      if (typeof errorData.non_field_errors === "string") {
        return errorData.non_field_errors;
      }
      if (errorData.message) {
        if (typeof errorData.message === "object") {
          return extractErrorMessage(errorData.message);
        }
        return errorData.message;
      }
      if (errorData.detail) {
        if (typeof errorData.detail === "object") {
          return extractErrorMessage(errorData.detail);
        }
        return errorData.detail;
      }
      if (errorData.error) {
        if (typeof errorData.error === "object") {
          return extractErrorMessage(errorData.error);
        }
        return errorData.error;
      }

      const fieldErrors = [];
      for (const [key, value] of Object.entries(errorData)) {
        if (["status", "code", "timestamp"].includes(key)) {
          continue;
        }
        if (Array.isArray(value)) {
          const messages = value.filter((v) => typeof v === "string");
          if (messages.length > 0) {
            fieldErrors.push(messages.join("\n"));
          }
        } else if (typeof value === "string") {
          fieldErrors.push(value);
        }
      }

      if (fieldErrors.length > 0) {
        return fieldErrors.join("\n");
      }

      return "An error occurred. Please try again.";
    }

    return "An unknown error occurred";
  };

  useEffect(() => {
    if (error) {
      AppUtil.debug("❌ Error:", error);
    }
  }, [error]);

  const baseUrl = Constants.BASE_URI;

  const makePostRequest = async (
    endpoint,
    obj,
    config = {},
    contentType = "form",
  ) => {
    setLoading(true);
    setError(null);

    try {
      const url = baseUrl + endpoint;
      const params = await buildParams(obj);

      AppUtil.debug("=====> PARAMS <=====");
      AppUtil.debug(url);
      AppUtil.debugDeep(params);

      const isJson = contentType === "json";
      const requestData = isJson ? params : qs.stringify(params);
      const headers = {
        "Content-Type": isJson
          ? "application/json"
          : "application/x-www-form-urlencoded",
        "x-api-key": Constants.API_KEY,
      };

      const res = await axios.post(url, requestData, {
        headers,
        ...config,
      });

      setResponse(res.data);

      const forceUpdate = getForceUpdateData(res.data);
      if (forceUpdate) {
        return { response: null, error: null, forceUpdate: true };
      }

      if (isOK(res)) {
        return { response: res.data, error: null };
      } else if (isNotOK(res)) {
        const errorMessage = extractErrorMessage(res.data.message || res.data);
        setError(errorMessage);
        return { response: null, error: errorMessage };
      } else {
        return { response: res.data, error: null };
      }
    } catch (err) {
      const forceUpdate = getForceUpdateData(err.response?.data);
      if (forceUpdate) {
        return { response: null, error: null, forceUpdate: true };
      }

      let message = "";

      if (err.response?.data) {
        message = extractErrorMessage(err.response.data);
      } else if (err.response) {
        message =
          "We are currently under system maintenance. Please try again later.";
      } else if (err.request) {
        message =
          "Weak or no data connection. Please check your signal and try again.";
      } else {
        message = err.message || "An unknown error occurred";
      }

      setError(message);
      return { response: null, error: message };
    } finally {
      setLoading(false);
    }
  };

  return { makePostRequest, response, loading, error };
};

export default usePostRequest;
