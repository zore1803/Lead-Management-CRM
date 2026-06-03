import { useCallback, useEffect, useState } from "react";
import { getLeads, getStats } from "../api/leadApi.js";

export default function useLeads(filters) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [leadData, statsData] = await Promise.all([getLeads(filters), getStats()]);
      setLeads(leadData.leads);
      setTotal(leadData.total);
      setStats(statsData);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to fetch leads");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { leads, stats, total, loading, error, refetch: fetchData };
}
