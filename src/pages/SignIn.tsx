import { useNavigate } from 'react-router';

export const SignIn = () => {
  let navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);

      const response = await fetch('http://localhost:3000/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const user = await response.json();
      // store the token in localStorage
      localStorage.setItem('token', user.token);
      navigate('/');
    } catch (error) {
      console.error('message', error);
    }
  };

  return (
    <form
      action={handleSubmit}
      className='flex flex-col justify-center items-center border gap-10 h-dvh'
    >
      <h1 className='text-7xl'>Welcome!</h1>

      <div className='flex flex-col border p-4 gap-5'>
        {/* Username */}
        <label htmlFor='username'>Username</label>
        <input
          className='border px-1'
          name='username'
          id='username'
          type='text'
          required
        />

        {/* Password */}
        <label htmlFor='password'>Password</label>
        <input
          className='border px-1'
          name='password'
          id='password'
          type='password'
          required
        />

        <button
          className='border bg-gray-100 hover:bg-gray-300  p-4 cursor-pointer'
          type='submit'
        >
          Sign In
        </button>

        {/* Navigate to Sign Up */}
        <button
          onClick={() => navigate('/sign-up')}
          className='text-blue-500 hover:text-blue-800 underline cursor-pointer'
        >
          New user? Sign up here!
        </button>
      </div>
    </form>
  );
};
