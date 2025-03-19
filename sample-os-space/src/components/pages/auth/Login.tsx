import '@/styles/auth/login.css';
import { useNavigate } from 'react-router-dom';
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
import { useAppDispatch } from '@/redux/hooks';
import { setUser } from '@/redux/user/userSlice';
import { setTokens } from '@/redux/auth/authSlice';

export default function Login() {
  const [login, { error: serverError, isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data).unwrap();
      const userData = {
        ...response.user,
        view: response.view.type
      };
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      dispatch(setTokens(response.tokens));
      dispatch(setUser({ user: userData }));

      console.log('Login success:', response);
      navigate('/admin');
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
              isLoading={isSubmitting || isLoading}
              disabled={isSubmitting || !isValid || isLoading}
              onClick={handleSubmit(onSubmit)}
            />
            <BaseButton
              text={'Forgot your password?'}
              isLoading={false}
              disabled={isSubmitting || isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
