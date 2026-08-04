import { useEffect, useState } from 'react';

type Rides = {
  id: number;
  title: string;
  description: string;
  distance: string;
  avg_speed: string;
  avg_power: number;
  ride_date: string;
  created_at: string;
};

export const Home = () => {
  const [rides, setRides] = useState<Rides[]>([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/rides');

        // if not ok, throw error
        if (!res.ok) {
          throw new Error(`Response Status: ${res.status}`);
        }

        const result = await res.json();

        setRides(result);
      } catch (err) {
        console.error('Message:', err);
      }
    };

    fetchRides();
  }, []);

  return (
    <>
      <div>
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>{ride.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
