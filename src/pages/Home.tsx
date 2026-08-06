import { useEffect, useState } from 'react';
import { NavBar } from '../components/NavBar';
import { Card } from '../components/Card';
import { RideForm } from '../components/RideForm';
import { type Rides } from '../types';

export const Home = () => {
  const [rides, setRides] = useState<Rides[]>([]);

  // Add a new ride
  const handleAddRide = (newRide: Rides) => {
    setRides([...rides, newRide]);
  };

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
    <div className='flex flex-col gap-2 min-h-dvh'>
      <NavBar />
      <main className='flex mx-28 border p-4'>
        {rides.map((ride) => (
          <Card key={ride.id} ride={ride} />
        ))}

        {/* Form */}
        <RideForm onAddRide={handleAddRide} />
      </main>
    </div>
  );
};
