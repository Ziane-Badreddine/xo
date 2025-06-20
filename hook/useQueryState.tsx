"use client";

import { useQuery } from "convex/react";
import { useState, useEffect } from "react";

export const useQueryState = (queryToRun: any, args?: any) => {
  const [loading, setLoading] = useState(true);
  
  const data = useQuery(queryToRun, args);

   const mutate = (payload: any) => {
    setLoading(true);

    return queryToRun(payload)
      .then((res: any) => res)
      .catch((e: any) => {
        throw e;
      })
      .finally(() => setLoading(false));
  };

  const refetch = () => {
    setLoading(true);
    // Note: Convex queries automatically refetch, this is mainly for state consistency
  };

  return {
    data,
    loading,
    refetch
  };
};