import apiClient from "@/shared/api/apiClient";
import Constants from "@/shared/constants/Constants";
import AppUtil from "@/shared/utils/AppUtil";
import { useEffect, useState } from "react";

function extractErrorMessage(errorData) {
  if (typeof errorData === "string") return errorData;

  if (errorData && typeof errorData === "object") {
    if (errorData.message) return errorData.message;
    if (errorData.detail) return errorData.detail;
    return "An error occurred. Please try again.";
  }

  return "An unknown error occurred";
}

const useGetRequest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isNotOK = (res) =>
    res?.data?.status === "error" || res?.data?.status === Constants.API_NOT_OK;

  useEffect(() => {
    if (error) AppUtil.debug(`❌ Error: ${error}`);
  }, [error]);

  const makeGetRequest = async (endpoint, config = {}) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get(endpoint, config);
      setResponse(res.data);

      if (isNotOK(res)) {
        const errorMessage = extractErrorMessage(res.data.message || res.data);
        setError(errorMessage);
        return { response: null, error: errorMessage };
      }

      return { response: res.data, error: null };
    } catch (err) {
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

  return { makeGetRequest, response, loading, error };
};

export default useGetRequest;
