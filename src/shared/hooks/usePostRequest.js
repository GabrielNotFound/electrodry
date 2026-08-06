import apiClient from "@/shared/api/apiClient";
import Constants from "@/shared/constants/Constants";
import AppUtil from "@/shared/utils/AppUtil";
import qs from "qs";
import { useEffect, useState } from "react";

function getForceUpdateData(data) {
  return data?.code === 426 ? data?.data || {} : null;
}

function extractErrorMessage(errorData) {
  if (typeof errorData === "string") return errorData;

  if (errorData && typeof errorData === "object") {
    if (Array.isArray(errorData.non_field_errors)) {
      return errorData.non_field_errors.join("\n");
    }
    if (typeof errorData.non_field_errors === "string") {
      return errorData.non_field_errors;
    }
    if (errorData.message) return extractErrorMessage(errorData.message);
    if (errorData.detail) return extractErrorMessage(errorData.detail);
    if (errorData.error) return extractErrorMessage(errorData.error);

    const fieldErrors = Object.entries(errorData)
      .filter(([key]) => !["status", "code", "timestamp"].includes(key))
      .flatMap(([, value]) => {
        if (Array.isArray(value))
          return value.filter((v) => typeof v === "string");
        if (typeof value === "string") return [value];
        return [];
      });

    return fieldErrors.length > 0
      ? fieldErrors.join("\n")
      : "An error occurred. Please try again.";
  }

  return "An unknown error occurred";
}

const usePostRequest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isNotOK = (res) =>
    res?.data?.status === "error" || res?.data?.status === Constants.API_NOT_OK;

  useEffect(() => {
    if (error) AppUtil.debug(`❌ Error: ${error}`);
  }, [error]);

  const makePostRequest = async (
    endpoint,
    body = {},
    config = {},
    contentType = "form",
  ) => {
    setLoading(true);
    setError(null);

    const isJson = contentType === "json";
    const requestData = isJson ? body : qs.stringify(body);
    const headers = {
      "Content-Type": isJson
        ? "application/json"
        : "application/x-www-form-urlencoded",
    };

    AppUtil.debug("=====> REQUEST <=====");
    AppUtil.debug(endpoint);
    AppUtil.debugDeep(body);

    try {
      const res = await apiClient.post(endpoint, requestData, {
        headers,
        ...config,
      });
      setResponse(res.data);

      const forceUpdate = getForceUpdateData(res.data);
      if (forceUpdate)
        return { response: null, error: null, forceUpdate: true };

      if (isNotOK(res)) {
        const errorMessage = extractErrorMessage(res.data.message || res.data);
        setError(errorMessage);
        return { response: null, error: errorMessage };
      }

      return { response: res.data, error: null };
    } catch (err) {
      const forceUpdate = getForceUpdateData(err.response?.data);
      if (forceUpdate)
        return { response: null, error: null, forceUpdate: true };

      let message;
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
