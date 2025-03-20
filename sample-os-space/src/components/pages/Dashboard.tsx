import '@/styles/pages/dashboard.css';
import { useContext, useEffect, useState } from 'react';
import { DashboardGrid } from './dashboard/DashboardGrid';
import { METRIC, MetricType, WidgetType } from '@/utils';
import { PrimaryButton } from '../share';
import { AuthContext } from '../context/AuthProvider';
import { EditWidgetModal } from './dashboard/EditWidgetModal';
import { CreateWidgetModal } from './dashboard/CreateWidgetModal';
import { calculateNewWidgetPosition } from '@/utils/gridLayout';

export default function Dashboard() {
  const { isAdmin } = useContext(AuthContext);

  const [layouts, setLayouts] = useState(() => {
    const savedLayouts = localStorage.getItem('dashboardLayouts');
    return savedLayouts ? JSON.parse(savedLayouts) : {};
  });

  const [widgets, setWidgets] = useState<WidgetType[]>(() => {
    const savedWidgets = localStorage.getItem('widgets');
    return savedWidgets ? JSON.parse(savedWidgets) : [];
  });

  const [editingWidget, setEditingWidget] = useState<WidgetType | null>(null);
  const [metric, setMetric] = useState<MetricType>(METRIC[0]);
  const [showModalAdd, setShowModalAdd] = useState(false);

  const handleEditClick = (widget: any) => {
    if (isAdmin) {
      setEditingWidget(widget);
    }
  };

  const handleClose = () => {
    setEditingWidget(null);
  };

  const handleSave = (updatedWidget: any) => {
    let updatedWidgets;

    const widgetExists = widgets.some((w) => w.id === updatedWidget.id);

    if (widgetExists) {
      updatedWidgets = widgets.map((w) =>
        w.id === updatedWidget.id ? updatedWidget : w
      );
    } else {
      updatedWidgets = [...widgets, updatedWidget];

      const cols = 6;
      const newLayoutItem = calculateNewWidgetPosition(
        layouts.lg || [],
        cols,
        2,
        2,
        updatedWidget.id
      );

      setLayouts((prevLayouts: any) => ({
        ...prevLayouts,
        lg: [...(prevLayouts.lg ? [...prevLayouts.lg] : []), newLayoutItem]
      }));
    }

    setWidgets(updatedWidgets);
    setEditingWidget(null);
    setMetric(METRIC[0]);
  };

  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayouts(allLayouts);
  };

  const handleConfigWidgetWithMetric = () => {
    const mockWidget = {
      id: `${new Date().getTime()}`,
      title: 'Identities Provided',
      description: 'New identities provided during the selected time period.',
      metricId: metric.id,
      icon: metric.icon
    } as any;
    setShowModalAdd(false);
    setEditingWidget(mockWidget);
  };

  useEffect(() => {
    localStorage.setItem('dashboardLayouts', JSON.stringify(layouts));
    localStorage.setItem('widgets', JSON.stringify(widgets));
  }, [layouts, widgets]);

  return (
    <div className='main-text dashboard'>
      <div className='dashboard__head'>
        <h1>Dashboard page</h1>
        <div className='dashboard__action'>
          <PrimaryButton
            text={'Add Metric'}
            onClick={() => setShowModalAdd(true)}
          />
        </div>
      </div>
      <DashboardGrid
        layouts={layouts}
        widgets={widgets}
        onLayoutChange={onLayoutChange}
        handleEditClick={handleEditClick}
      />
      {editingWidget && (
        <EditWidgetModal
          widget={editingWidget}
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
      {showModalAdd && (
        <CreateWidgetModal
          metric={metric}
          selectMetric={setMetric}
          onSave={handleConfigWidgetWithMetric}
          onClose={() => setShowModalAdd(false)}
        />
      )}
    </div>
  );
}
