import { sprinkles } from '../../css/sprinkles.css';

export const NetworkClassName = sprinkles({
  transform: {
    active: 'shrink',
    hover: 'grow',
  },
  transition: 'default',
});

export const SelectedMarkClassName = sprinkles({
  background: 'connectionIndicator',
});
