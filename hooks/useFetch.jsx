import { useState } from "react";

const useFetch = (url, options = {}, requestData = null, timeout = 3000) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const controller = new AbortController();
      const signal = controller.signal;

      const timer = setTimeout(() => {
        controller.abort(); // Abortar la petición después del tiempo de espera
      }, timeout);

      const fetchOptions = { ...options, signal };

      if (requestData) {
        fetchOptions.body = JSON.stringify(requestData);
        fetchOptions.headers = {
          ...fetchOptions.headers,
          "Content-Type": "application/json",
        };
      }

      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const jsonData = await response.json();
      setData(jsonData);
      if (!jsonData.status) {
        setError(jsonData.message);
        setData(null);
      }
      setIsLoading(false);

      clearTimeout(timer);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useFetch;
