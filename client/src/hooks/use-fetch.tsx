import { useState, useEffect, useMemo } from "react";

type HTTP_Methods = "GET" | "POST" | "DELETE" | "PUT";

const serverBaseURL = "http://localhost:3000";

//generic custom useFetch hook that can be used for any API call to the backend
export function useFetch<T>(initialValue: T, subPath: string | null, method: HTTP_Methods, headers?: HeadersInit, body?: unknown) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string[] | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  //trigger function to make the fetchign start - it avoids loops
  const triggerFetch = () => {
    setShouldFetch(true);
    setError(null);
  };
  const memoizedHeaders = useMemo(() => headers, [headers]);
  const memoizedBody = useMemo(() => body, [body]);

  useEffect(() => {
    if (!shouldFetch || !subPath) return;

    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(serverBaseURL + subPath, {
          method,
          headers: memoizedHeaders,
          body: method !== "GET" && memoizedBody ? JSON.stringify(memoizedBody) : null,
          // body: shouldFetch ? JSON.stringify(memoizedBody) : null,
          credentials: "include",
        });
        if (!response.ok) {
          const responseBody = await response.json();
          // Set the error without throwing the error so it doesn't enter the catch block
          setError(Array.isArray(responseBody.message) ? responseBody.message : [responseBody.message]);
          return;  // Stop execution here, no need to continue the try block
        }
        const responseBody = await response.json();

        //data is set as the response of the request
        setData(responseBody);
      } catch (error) {
        setError(
          error instanceof Error ? [error.message] : ["An unknown error occurred"]
        );
      } finally {
        setLoading(false);
      }
    };
    setShouldFetch(false);
    getData();
  }, [subPath, method, memoizedHeaders, memoizedBody, shouldFetch]);

  return { data, loading, error, triggerFetch, shouldFetch, setLoading };
}
