import { useState, useEffect, useMemo } from "react";

type HTTP_Methods = "GET" | "POST" | "DELETE" | "PUT";

const serverBaseURL = "http://localhost:3000";

export function useFetch<T>(initialValue: T, subPath: string | null, method: HTTP_Methods, headers?: HeadersInit, body?: unknown) {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldFetch, setShouldFetch] = useState(false);

  const triggerFetch = () => {
    setShouldFetch(true);
  };
  const memoizedHeaders = useMemo(() => headers, [headers]);
  const memoizedBody = useMemo(() => body, [body]);

  useEffect(() => {
    if (!shouldFetch || !subPath) return;

    const getData = async () => {
      setLoading(true);
      setError(null); // Reset error
      try {
        const response = await fetch(serverBaseURL + subPath, {
          method,
          headers: memoizedHeaders,
          body: shouldFetch ? JSON.stringify(memoizedBody) : null,
          credentials: 'include',
        });
        if (!response.ok) {
          const { message } = await response.json();
          console.error(`Error ${response.status}: ${response.statusText}${message ? `; ${message}` : ''}`);
          throw new Error(`Error ${response.status}: ${response.statusText}${message ? `; ${message}` : ''}`);
        }
        const responseBody = await response.json();

        setData(responseBody);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    setShouldFetch(false);
    getData();
  }, [subPath, method, memoizedHeaders, memoizedBody, shouldFetch]);

  return { data, loading, error, triggerFetch };
}
