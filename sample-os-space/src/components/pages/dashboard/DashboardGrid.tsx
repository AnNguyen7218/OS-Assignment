import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import '@/styles/pages/dashboard.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { FontIcon } from '@/components/share';
import { MouseEvent } from 'react';
import { WidgetType } from '@/utils';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardGrid = ({
  layouts,
  onLayoutChange,
  widgets,
  handleEditClick
}: {
  layouts: any;
  widgets: WidgetType[];
  onLayoutChange: (layout: any, allLayouts: any) => void;
  handleEditClick: (widget: WidgetType) => void;
}) => {
  if (widgets.length === 0 || !layouts.lg) {
    return (
      <div className='empty-content'>
        <h3>Nothing here. Add more widget</h3>
      </div>
    );
  }

  const selectWidget = (e: MouseEvent<HTMLDivElement>, widget: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleEditClick(widget);
  };
  console.log(layouts.lg, widgets);
  return (
    <div>
      <ResponsiveGridLayout
        compactType='horizontal'
        className='layout'
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 4, xxs: 2 }}
        onLayoutChange={onLayoutChange}
        draggableHandle='.drag-handle'
        resizeHandles={['se']}
      >
        {layouts.lg.map((item: { i: number | null | undefined }) => {
          const widget = widgets.find(
            (w: { id: any }) => w.id.toString() === item.i
          );
          return (
            <div key={item.i} className='dashboard__grid-item'>
              <div className='drag-handle'>⋮⋮⋮</div>
              <div onClick={(e) => selectWidget(e, widget)}>
                <h3>{widget?.title}</h3>
                <div>
                  <FontIcon
                    icon={widget?.icon ?? ''}
                    className='dashboard__grid-item_icon'
                  />
                </div>
                <p>{widget?.description}</p>
              </div>
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};
