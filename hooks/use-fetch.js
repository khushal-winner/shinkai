"use client";
import React, { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setError(null);
    setLoading(true);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn, setData };
};

export default useFetch;
