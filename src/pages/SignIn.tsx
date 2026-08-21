import { useNavigate } from 'react-router';
import { Input } from '../components/Input.tsx';

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
      className='flex flex-col justify-center items-center bg-panel border h-dvh'
    >
      <div className='flex flex-col items-center w-full p-4 gap-5 text-white'>
        <div className='flex items-center px-6 py-7'>
          <img
            className='h-auto w-15'
            src='/attaque-lime.png'
            alt='attaque logo'
          />
          <span className='text-4xl font-semibold text-white'>ttaque</span>
        </div>

        {/* title */}
        <h1 className='text-5xl text-accent font-semibold'>Sign in</h1>
        {/* Motto */}
        <p className="text-lg text-gray-400">Please login to continue to your account</p>

        {/* Username */}
        <Input name='username' type='text' className='w-full' />

        {/* Password */}
        <Input name='password' type='text' className='w-full' />

        {/* Keep me logged in feature - Soon */}

        <button
          className='flex w-full justify-center text-black font-semibold text-lg border bg-accent hover:bg-slight-accent rounded-xl p-4 cursor-pointer'
          type='submit'
        >
          Sign in
        </button>

        {/* Navigate to Sign Up */}
        <button
          onClick={() => navigate('/sign-up')}
          className='text-gray-400 cursor-pointer'
        >
          Need an account?{' '}
          <span className='text-accent hover:text-slight-accent underline'>
            Create one!
          </span>
        </button>

        {/* Google Login - Soon */}
      </div>
    </form>
  );
};
