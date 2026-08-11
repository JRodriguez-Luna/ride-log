import { useNavigate } from 'react-router';
import type { Rides } from '../types';
useNavigate;

type RideFormProps = {
  onAddRide: (newRide: Rides) => void;
};

export const RideForm = ({ onAddRide }: RideFormProps) => {
  let navigate = useNavigate();

  const handleActionSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);
      const token = localStorage.getItem('token');

      if (!token) navigate('/sign-in');

      // Post ride with authorization token
      // ** Authorization needed else when submitting, it will error.
      const response = await fetch('http://localhost:3000/api/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const newRide = await response.json();
      onAddRide(newRide);
    } catch (error) {
      console.error('message', error);
    }
  };

  return (
    <form
      action={handleActionSubmit}
      className='flex flex-col justify-center items-center gap-5'
    >
      <h2>Input here</h2>
      {/* title */}
      <label htmlFor='title'>Title</label>
      <input className='border' name='title' id='title' type='text' />

      {/* description */}
      <label htmlFor='description'>Description</label>
      <textarea
        className='border'
        name='description'
        maxLength={50}
        id='description'
      ></textarea>

      {/* distance */}
      <label htmlFor='distance'>Distance</label>
      <input className='border' name='distance' id='distance' type='text' />

      {/* avg_speed */}
      <label htmlFor='avg_speed'>Avg Speed</label>
      <input className='border' name='avg_speed' id='avg_speed' type='text' />

      {/* avg_power */}
      <label htmlFor='avg_power'>Avg Power</label>
      <input className='border' name='avg_power' id='avg_power' type='number' />

      {/* ride_date */}
      <label htmlFor='ride_date'>Ride Date</label>
      <input className='border' name='ride_date' id='ride_date' type='date' />

      {/* Submit Button */}
      <button className='cursor-pointer border p-4' type='submit'>
        Submit
      </button>
    </form>
  );
};
