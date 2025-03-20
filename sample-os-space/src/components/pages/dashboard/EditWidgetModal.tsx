import '@/styles/pages/editWidgetModal.css';
import { BaseButton, FontIcon, PrimaryButton } from '@/components/share';
import { METRIC, widgetSchema, WidgetFormData } from '@/utils';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const METRIC_MAP = METRIC.reduce((acc: Record<string, any>, metric) => {
  acc[metric.id] = { ...metric };
  return acc;
}, {});

export const EditWidgetModal = ({
  widget,
  onSave,
  onClose
}: {
  widget: any;
  onSave: (formData: any) => void;
  onClose: () => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm<WidgetFormData>({
    resolver: zodResolver(widgetSchema),
    defaultValues: {
      id: widget.id || '',
      title: widget.title || '',
      description: widget.description || ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data: WidgetFormData) => {
    const updatedWidget = {
      ...widget,
      ...data
    };
    onSave(updatedWidget);
  };

  const liveTitle = watch('title');
  const liveDescription = watch('description');

  return (
    <div className='modal__overlay'>
      <div className='modal__content no-scrollbar'>
        <h3>Configure Widget</h3>
        <p>Add a title and select data to display on the overview page.</p>
        <div className='modal__content__layout'>
          <div className='first-col'>
            <div className='dashboard__grid-item'>
              <div>
                <h3>{liveTitle ?? widget.title}</h3>
                <div>
                  <FontIcon
                    icon={METRIC_MAP[widget.metricId].icon}
                    className='dashboard__grid-item_icon'
                  />
                </div>
                <p>{liveDescription ?? widget.description}</p>
              </div>
            </div>
          </div>
          <div className='last-col'>
            {widget.metricId && (
              <div className='modal__content__metric'>
                <p>Widget type</p>
                <p>
                  {METRIC_MAP[widget.metricId].title}-
                  {METRIC_MAP[widget.metricId].type}
                </p>
              </div>
            )}
            <form className='modal__content__form' id='modal-form'>
              <label>
                Title:
                <input type='text' {...register('title')} placeholder='Title' />
                {errors.title && (
                  <span className='error'>{errors.title.message}</span>
                )}
              </label>
              <label>
                Description:
                <textarea
                  {...register('description')}
                  placeholder='Description'
                />
                {errors.description && (
                  <span className='error'>{errors.description.message}</span>
                )}
              </label>
            </form>
          </div>
        </div>
        <div className='modal__actions'>
          <BaseButton onClick={onClose} text='Back' />
          <PrimaryButton
            onClick={handleSubmit(onSubmit)}
            text='Add'
            disabled={!isValid}
          />
        </div>
      </div>
    </div>
  );
};
