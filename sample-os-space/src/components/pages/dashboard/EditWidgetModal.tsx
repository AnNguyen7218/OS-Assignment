import '@/styles/pages/editWidgetModal.css';
import { BaseButton, FontIcon, PrimaryButton } from '@/components/share';
import { useState } from 'react';
import { METRIC } from '@/utils';

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
  const [formData, setFormData] = useState({ ...widget });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSave(formData);
  };
  return (
    <div className='modal__overlay'>
      <div className='modal__content no-scrollbar'>
        <h3>Configure Widget</h3>
        <p>Add a title and select data to display on the overview page.</p>
        <div className='modal__content__layout'>
          <div className='first-col'>
            <div className='dashboard__grid-item'>
              <div>
                <h3>{formData.title ?? widget.title}</h3>
                <div>
                  <FontIcon
                    icon={widget.icon}
                    className='dashboard__grid-item_icon'
                  />
                </div>
                <p>{formData.description ?? widget.description}</p>
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
            <form className='modal__content__form'>
              <label>
                Title:
                <input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  placeholder='Title'
                />
              </label>
              <label>
                Description:
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='Description'
                />
              </label>
            </form>
          </div>
        </div>
        <div className='modal__actions'>
          <BaseButton onClick={onClose} text='Back' />
          <PrimaryButton onClick={(e: any) => handleSubmit(e)} text='Add' />
        </div>
      </div>
    </div>
  );
};
