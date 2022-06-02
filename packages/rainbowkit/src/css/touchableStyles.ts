import * as styles from './touchableStyles.css';

interface TouchableStylesOptions {
  hover?: keyof typeof styles.hover;
  active: keyof typeof styles.active;
}

export function touchableStyles({ active, hover }: TouchableStylesOptions) {
  return [styles.base, hover && styles.hover[hover], styles.active[active]];
}
