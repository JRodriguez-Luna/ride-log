import { useNavigate } from "react-router";

export const SignOut = () => {
  let navigate = useNavigate()

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  return (
    <button
      onClick={handleSignOut}
      type='submit'
      className='border text-center items-center text-base cursor-pointer'
    >
      Sign Out
    </button>
  );
};
