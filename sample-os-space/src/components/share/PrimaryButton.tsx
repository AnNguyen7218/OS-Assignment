import '@/styles/components/primaryButton.css';
import { BaseButton, type BaseButtonProps } from './BaseButton';

type PrimaryButtonProps = BaseButtonProps;

export const PrimaryButton = (props: PrimaryButtonProps) => {
  return <BaseButton {...props} className='btn-primary' />;
};
