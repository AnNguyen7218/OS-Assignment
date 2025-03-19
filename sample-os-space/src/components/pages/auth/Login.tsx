import { useLoginMutation } from '@/redux/auth/login';
import '@/styles/auth/login.css';
import { BaseButton, Input, PrimaryButton } from '../../share';

export default function Login() {
  const [login] = useLoginMutation();

  const handleSubmit = () => {
    // login({ email: 'test+member@yopmail.com', password: '12345678' });
    // login({ email: 'test+onboarding@yopmail.com', password: '12345678' });
    // login({ email: 'test+admin@yopmail.com', password: '12345678' });
  };

  return (
    <div className='login-form'>
      <h2>Welcome back!</h2>
      <h4>Login to continue with us</h4>
      <div className='login-credentials'>
        <Input placeholder={'Email'} />
        <Input placeholder={'Password'} />
      </div>
      <div className='login-form__action'>
        <PrimaryButton
          text={'login'}
          isLoading={false}
          disabled={false}
          icon='user'
          onClick={handleSubmit}
        />
        <BaseButton
          text={'Forgot your password?'}
          isLoading={false}
          disabled={false}
        />
      </div>
    </div>
  );
}
