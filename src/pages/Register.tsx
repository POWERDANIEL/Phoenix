import Link from 'next/link';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { banner } from '../assets/assets';
import { useSnackbar } from '../hooks/useSnackbar';
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { CircularProgress, LinearProgress } from '../components/Progress';
import Logo from '../components/Logo';

const Register = () => {
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: handle register
    } catch (err: any) {
      showSnackbar({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle title='Create an account' />
      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Logo classes='mb-auto mx-auto lg:mx-0' />
          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground dark:text-dark-onBackground text-center'>
              Create an account
            </h2>
            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Register today and gain access to powerful tools that will supercharge your ideas.
            </p>
            <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-4'>
              <TextField type='text' name='name' label='Full name' placeholder='Full name' required autoFocus />
              <TextField type='email' name='email' label='Email' placeholder='Email' required />
              <TextField type='password' name='password' label='Password' placeholder='Enter your password' required />
              <Button type='submit' disabled={loading}>
                {loading ? <CircularProgress size='small' /> : 'Create account'}
              </Button>
            </form>
            <p className='text-bodyMedium text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-center mt-4'>
              Already have an account?
              <Link href='/login' className='link text-labelLarge inline-block ms-1 text-light-onSurface dark:text-dark-onSurface'>
                Sign in
              </Link>
            </p>
          </div>
          <p className='mt-auto mx-auto text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant text-bodyMedium lg:mx-0'>
            &copy; 2024 RomanVasylenko. All right reserved.
          </p>
        </div>
        <div className='hidden img-box lg:block lg:relative lg:rounded-large'>
          <img src={banner} alt='' className='img-cover' />
          <p className='absolute bottom-10 left-12 right-12 z-10 text-displayLarge font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[72px]'>
            Chat with Phoenix to supercharge your ideas.
          </p>
        </div>
      </div>
      <AnimatePresence>{loading && <LinearProgress classes='absolute top-0 left-0 right-0' />}</AnimatePresence>
    </>
  );
};

export default Register;
