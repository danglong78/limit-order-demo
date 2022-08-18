import get from 'lodash/get';

const getSlotName = (child) => get(child, 'props.name', '');

const getSlotChildren = (slot) => get(slot, 'props.children', null);

export const getSlot = ({ childrenArray = [], slotName = '' }) => {
  const slot = childrenArray.find((child) => getSlotName(child) === slotName);
  return getSlotChildren(slot);
};
