//used to fetch data from the frontend to the backend
import { useEffect } from "react";
import { useStore } from "../store/useStore";

type HTTP_Methods = "GET" | "POST" | "DELETE" | "PUT";

const serverBaseURL = "https://localhost:3000";

export function useFetch<T>(subPath: string, method: HTTP_Methods, headers?: HeadersInit, body?: unknown) {
  const { data, loading, error, setData, setLoading, setError } = useStore((state) => ({
    data: state.data as T, // Cast data to the generic type
    loading: state.loading,
    error: state.error,
    setData: state.setData,
    setLoading: state.setLoading,
    setError: state.setError,
  }));
  useEffect(() => {
    let isCorrect = true;

    const getData = async () => {
      setLoading(true);
      setError(""); //resetting error
      try {
        //this is to allow formData which doesn't need to be stringified and allowing also body to be null in case of "submitted false" just as a precaution
        const bodyToSend = body instanceof FormData ? body : body ? JSON.stringify(body) : null;
        const response = await fetch(serverBaseURL + subPath, {
          method,
          headers,
          body: bodyToSend,
        });
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const responseBody = await response.json();
        console.log(responseBody);
        if (isCorrect) {
          setData(responseBody);
        }
      } catch (error) {
        if (isCorrect) {
          setError(error instanceof Error ? error.message : "An unknown error occurred");
        }
      } finally {
        if (isCorrect) {
          setLoading(false);
        }
      }
    };
    getData();

    //cleanup function that runs when the newUseEffect is running.
    return () => {
      isCorrect = false;
    };
  }, [subPath, method, headers, body, setData, setLoading, setError]);

  return { data, loading, error };
}
