import { useState, useEffect } from "react";

export const useBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/balance');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return { balance, fetchBalance };
};