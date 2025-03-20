import '@/styles/pages/dashboard.css';
import { useContext, useEffect, useState } from 'react';
import { DashboardGrid } from './dashboard/DashboardGrid';
import { LAYOUT_CONFIG, WIDGETS } from '@/utils';
import { BaseButton, PrimaryButton } from '../share';
import { AuthContext } from '../context/AuthProvider';
import { EditWidgetModal } from './dashboard/EditWidgetModal';

const isAdmin = true;
export default function Dashboard() {
  // const { isAdmin } = useContext(AuthContext);
  const localLayout = localStorage.getItem('dashboardLayouts') ?? '{}';
  const storedLayouts = JSON.parse(localLayout) ?? LAYOUT_CONFIG;
  const [layouts, setLayouts] = useState(storedLayouts);
  const [widgets, setWidgets] = useState(WIDGETS);
  const [editingWidget, setEditingWidget] = useState(null);

  const handleEditClick = (widget: any) => {
    if (isAdmin) setEditingWidget(widget);
  };
  const handleClose = () => {
    setEditingWidget(null);
  };
  const handleSave = (updatedWidget: any) => {
    const updatedWidgets = widgets.map((w) =>
      w.id === updatedWidget.id ? updatedWidget : w
    );
    setWidgets(updatedWidgets);
    setEditingWidget(null);
  };

  const onLayoutChange = (layout: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  useEffect(() => {
    const savedLayouts = localStorage.getItem('dashboardLayouts');
    if (savedLayouts) setLayouts(JSON.parse(savedLayouts));
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardLayouts', JSON.stringify(layouts));
  }, [layouts]);

  return (
    <div className='main-text dashboard'>
      <div className='dashboard__head'>
        <h1>Dashboard page</h1>
        <div className='dashboard__action'>
          <PrimaryButton
            text={'Add Widget'}
            isLoading={false}
            disabled={false}
          />
        </div>
      </div>
      <DashboardGrid
        layouts={layouts}
        widgets={widgets}
        onLayoutChange={onLayoutChange}
        handleEditClick={handleEditClick}
      />
      {editingWidget && isAdmin && (
        <EditWidgetModal
          widget={editingWidget}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
