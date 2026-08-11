import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { RideForm } from '../components/RideForm';
import { type Rides } from '../types';
import { Modal } from './Modal';

export const Home = () => {
  const [rides, setRides] = useState<Rides[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Add a new ride
  const handleAddRide = (newRide: Rides) => {
    setRides([...rides, newRide]);
    setIsOpen(false)  //  This will close the modal after submit the new ride
  };

  // Close Modal
  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        // get token from user
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await fetch('http://localhost:3000/api/rides', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
    <div className='flex flex-col gap-2 min-h-dvh bg-gray-100 pt-1'>
      <div className="flex justify-center">
        {/* Add Ride */}
        <button onClick={() => setIsOpen(true)} className='w-12.5 h-7.5 justify-center gap-3 border cursor-pointer px-2 items-center text-center rounded-xl bg-blue-100'>
          +
        </button>
      </div>
      <main className='flex mx-28 my-5 border p-4'>
        {rides.map((ride) => (
          <Card key={ride.id} ride={ride} />
        ))}

        {/* Form */}
        <Modal isOpen={isOpen} onClose={handleClose}>
          <RideForm onAddRide={handleAddRide} />
        </Modal>
      </main>
    </div>
  );
};
