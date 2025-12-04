import { useState, useCallback } from "react";
import doorAPI from "@/apis/doorAPI";

export function useDoor() {
  const [fingerprintID, setFingerprintID] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFingerprint = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await doorAPI.getFingerprintID();
      setFingerprintID(res.data?.fingerprint_id ?? null);
      return res.data?.fingerprint_id;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error fetching fingerprint");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    fingerprintID,
    loading,
    error,
    fetchFingerprint,
  };
}
