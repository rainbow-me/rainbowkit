import { sprinkles } from '../../css/sprinkles.css';

export const ProfilePillImageClassName = sprinkles({
  borderRadius: 'full',
  height: '24',
  marginRight: '6',
  width: '24',
});

export const ProfilePillClassName = sprinkles({
  transform: {
    active: 'shrink',
    hover: 'grow',
  },
  transition: 'default',
});

export const InnerProfilePillClassName = sprinkles({
  transition: 'default',
});
