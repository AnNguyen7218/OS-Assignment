import '@/styles/pages/editWidgetModal.css';
import { BaseButton, PrimaryButton } from '@/components/share';
import { useState } from 'react';

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
      <div className='modal__content'>
        <h3>Edit Widget</h3>
        <form>
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
          <div className='modal__actions'>
            <BaseButton onClick={onClose} text='Back' />
            <PrimaryButton onClick={(e: any) => handleSubmit(e)} text='Add' />
          </div>
        </form>
      </div>
    </div>
  );
};
