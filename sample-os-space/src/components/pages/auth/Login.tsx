import '@/styles/auth/login.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation } from '@/redux/auth/login';
import { BaseButton, Input, PrimaryButton } from '../../share';
import {
  ERROR_CODE,
  ErrorType,
  LoginFormData,
  loginSchema,
  LOGO,
  transformResponse
} from '@/utils';

export default function Login() {
  const [login, { error: serverError }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // login({ email: 'test+member@yopmail.com', password: '12345678' });
  // login({ email: 'test+onboarding@yopmail.com', password: '12345678' });
  // login({ email: 'test+admin@yopmail.com', password: '12345678' });

  return (
    <div className='login-wrapper'>
      <div className='login-wrapper__login-logo'>
        <img src={LOGO} />
      </div>
      <div className='login-wrapper__login-form'>
        <div className='login-wrapper__login-form__inner'>
          <h2>Welcome back!</h2>
          <h4>Login to continue with Opensend</h4>
          <div className='login-wrapper__login-credentials'>
            <Input
              {...register('email')}
              placeholder={'Email'}
              iconLeft='fa-envelope'
              error={
                errors.email?.message ??
                transformResponse({
                  response:
                    serverError && 'data' in serverError
                      ? (serverError.data as ErrorType)
                      : undefined,
                  errorCodeNeeded: ERROR_CODE.AUTH_EMAIL_NOTFOUND
                })
              }
            />
            <Input
              {...register('password')}
              iconAction={() => setShowPassword(!showPassword)}
              className='input-password'
              placeholder={'Password'}
              iconLeft='fa-lock'
              iconRight={`${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
              type={`${showPassword ? 'text' : 'password'}`}
              error={
                errors.password?.message ??
                transformResponse({
                  response:
                    serverError && 'data' in serverError
                      ? (serverError.data as ErrorType)
                      : undefined,
                  errorCodeNeeded: ERROR_CODE.AUTH_PASSWORD_MISMATCHED
                })
              }
            />
          </div>
          <div className='login-wrapper__login-form__action'>
            <PrimaryButton
              text={'Login'}
              isLoading={isSubmitting}
              disabled={isSubmitting || !isValid}
              onClick={handleSubmit(onSubmit)}
            />
            <BaseButton
              text={'Forgot your password?'}
              isLoading={false}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
