import { type Ride } from '../types' 

type CardProps = {
  ride: Ride,
}

export const Card = ({ ride }: CardProps) => {
  return (
    <div className='flex flex-col justify-evenly h-auto p-4 border gap-5 cursor-pointer bg-white'>
      <h3 className='text-xl'>{ride.title}</h3>
      <p className='text-base wrap-break-word min-w-0'>{ride.description}</p>
      <div className='grid grid-cols-2 gap-5'>
        {/* Distance */}
        <div className='flex flex-col gap-1'>
          <p>Distance:</p>
          <p className='font-bold'>{ride.distance}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p>Avg Speed:</p>
          <p className='font-bold'>{ride.avg_speed}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <div>Avg Power:</div>
          <p className='font-bold'>{ride.avg_power}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p>Date:</p>
          <p className='font-bold'>{ride.ride_date.split('T')[0]}</p>
        </div>
      </div>
    </div>
  );
}