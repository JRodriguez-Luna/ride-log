import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { RideForm } from '../components/RideForm';
import { type Ride } from '../types';
import { Modal } from './Modal';

export const Rides = () => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Add a new ride
  const handleAddRide = (newRide: Ride) => {
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
    // Main Section of Content
    <main className='flex flex-col gap-2 pt-1'>
      {/* Form Module */}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <RideForm onAddRide={handleAddRide} />
      </Modal>
    </main>
  );
};
