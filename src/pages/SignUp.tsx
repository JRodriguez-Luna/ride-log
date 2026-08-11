import { useNavigate } from 'react-router';

export const SignUp = () => {
  let navigate = useNavigate();

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData);

      const response = await fetch('http://localhost:3000/api/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      navigate('/sign-in');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      action={handleSubmit}
      className='flex flex-col justify-center items-center border gap-10 h-dvh'
    >
      <h1 className='text-7xl'>Sign Up Here!</h1>

      <div className='flex flex-col border p-4 gap-5'>
        {/* First Name */}
        <label htmlFor='first_name'>First Name</label>
        <input
          className='border px-1'
          name='first_name'
          id='first_name'
          type='text'
        />

        {/* Last Name */}
        <label htmlFor='last_name'>Last Name</label>
        <input
          className='border px-1'
          name='last_name'
          id='last_name'
          type='text'
        />

        {/* Email */}
        <label htmlFor='email'>Email</label>
        <input
          className='border px-1'
          name='email'
          id='email'
          type='email'
          required
        />

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
          Sign Up
        </button>

        {/* Existing user? */}
        <button
          onClick={() => navigate('/sign-in')}
          className='text-blue-500 hover:text-blue-800 underline cursor-pointer'
        >
          Alredy have an account? Sign in!
        </button>
      </div>
    </form>
  );
};
