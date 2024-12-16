import { Link, Form, useNavigation, useActionData } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { banner } from '../assets/assets';

import { useSnackbar } from '../hooks/useStackbar';

import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { CircularProgress, LinearProgress } from '../components/Progress';
import Logo from '../components/Logo';

const Register = () => {
  const error = useActionData();

  const navigation = useNavigation();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (error?.message) {
      showSnackbar({
        message: error.message,
        type: 'error',
      });
    }
  }, [error, showSnackbar]);

  return (
    <>
      <PageTitle title='Create an account' />

      <div className='flex items-center justify-center h-screen bg-light-background dark:bg-dark-background'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-5xl w-full'>
          {/* Логотип і форма */}
          <div className='flex flex-col justify-center items-center p-8 bg-light-surfaceContainer dark:bg-dark-surfaceContainer rounded-large shadow-lg'>
            <Logo classes='mb-auto mx-auto lg:mx-0' />

            <h2 className='text-displaySmall font-semibold text-center text-light-onBackground dark:text-dark-onBackground'>
              Create an account
            </h2>
            <p className='text-bodyLarge text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mb-6'>
              Register today and gain access to powerful tools that will
              supercharge your ideas.
            </p>

            <Form
              method='POST'
              className='w-full max-w-md space-y-4'
            >
              <TextField
                type='text'
                name='name'
                label='Full name'
                placeholder='Full name'
                required={true}
              />
              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                required={true}
              />
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your password'
                required={true}
              />
              <Button
                type='submit'
                className='w-full btn filled primary'
                disabled={navigation.state === 'submitting'}
              >
                {navigation.state === 'submitting' ? (
                  <CircularProgress size='small' />
                ) : (
                  'Create account'
                )}
              </Button>
            </Form>
            <p className='text-bodyMedium text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-4'>
              Already have an account?{' '}
              <Link
                to='/login'
                className='link text-labelLarge inline-block ms-1 text-light-onSurface dark:text-dark-onSurface'
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Зображення з текстом */}
          <div className='hidden lg:block relative'>
            <img
              src={banner}
              alt=''
              className='w-full h-full object-cover rounded-large'
            />
            <div className='absolute inset-0 flex items-center justify-center p-8'>
              <p className='text-displayLarge font-semibold text-light-onSurface dark:text-dark-onSurface text-center drop-shadow-lg'>
                Chat with Phoenix to supercharge your ideas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {navigation.state === 'loading' && (
          <LinearProgress classes='absolute top-0 left-0 right-0' />
        )}
      </AnimatePresence>
    </>
  );
};

export default Register;
