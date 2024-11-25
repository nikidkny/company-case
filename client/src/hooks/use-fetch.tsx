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
        const response = await fetch(serverBaseURL + subPath, {
          method,
          headers,
          body: body instanceof FormData ? body : JSON.stringify(body), //this is to allow formData which doesn't need to be stringified
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
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    getData();
    //cleanup function that runs when the newUseEffect is running.
    return () => {
      isCorrect = false;
    };
  }, [subPath, method, headers, body]);

  return { data, loading, error };
}
