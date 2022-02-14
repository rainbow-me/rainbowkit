import { sprinkles } from '../../css/sprinkles.css';

export const ProfileDetailsImageClassName = sprinkles({
  borderRadius: 'full',
  height: '54',
  width: '54',
});

export const CloseButtonClassName = sprinkles({
  transform: {
    active: 'shrinkSm',
    hover: 'growLg',
  },
  transition: 'default',
});
