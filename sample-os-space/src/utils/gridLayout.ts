export const calculateNewWidgetPosition = (
  currentLayout: any[],
  cols: number,
  widgetWidth = 2,
  widgetHeight = 2,
  newWidgetId: any
) => {
  let maxY = 0;
  const lastRowWidgets: any[] = [];
  currentLayout.forEach((item: { y: any; h: any }) => {
    const itemBottom = item.y + item.h;
    if (itemBottom > maxY) {
      maxY = itemBottom;
      lastRowWidgets.length = 0;
      lastRowWidgets.push(item);
    } else if (itemBottom === maxY) {
      lastRowWidgets.push(item);
    }
  });

  const occupiedWidthInLastRow = lastRowWidgets.reduce(
    (sum, item) => sum + item.w,
    0
  );

  let newX, newY;
  if (occupiedWidthInLastRow + widgetWidth <= cols) {
    newX = occupiedWidthInLastRow;
    newY = maxY - (lastRowWidgets[0]?.h || 0);
  } else {
    newX = 0;
    newY = maxY;
  }

  return {
    x: newX,
    y: newY,
    w: widgetWidth,
    h: widgetHeight,
    i: newWidgetId,
    minW: 2,
    minH: 2,
    maxW: cols
  };
};
