import '@/styles/pages/createWidgetModal.css';
import { BaseButton, FontIcon, PrimaryButton } from '@/components/share';
import { useState } from 'react';
import { METRIC } from '@/utils';

export const CreateWidgetModal = ({
  metric,
  selectMetric,
  onSave,
  onClose
}: {
  metric: any;
  onSave: (formData: any) => void;
  onClose: () => void;
  selectMetric: (metric: any) => void;
}) => {
  const handleSelectMetric = (metric: any) => {
    selectMetric(metric);
  };

  return (
    <div className='modal__overlay'>
      <div className='modal__content'>
        <h3>Add a Metric</h3>
        <p>Select a widget type to add to the overview page.</p>
        <h4>Overview</h4>
        <div className='modal__content__layout'>
          <div className='metric-grid'>
            {METRIC.map((item) => {
              const isSelected = metric.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectMetric(item)}
                  className={`metric-grid__item ${isSelected ? 'selected' : ''}`}
                >
                  <FontIcon icon={item.icon} />
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='modal__actions'>
          <BaseButton onClick={onClose} text='Back' />
          <PrimaryButton onClick={onSave} text='Next' />
        </div>
      </div>
    </div>
  );
};
