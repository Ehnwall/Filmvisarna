import { useEffect, useState } from 'react';
import { OCCUPIEDSEATS } from '@/utils/types/types';

export const useGetOccupiedSeats = (showId: number) => {
  const [data, setData] = useState<OCCUPIEDSEATS | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!showId) return;

    const eventSource = new EventSource(`/api/occupiedSeats/${showId}`);

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setData(parsedData);
    };

    eventSource.onerror = (event) => {
      setError('Error occurred while receiving SSE data');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [showId]);

  return { data, error };
};
