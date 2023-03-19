import React from 'react';

import styles from './Button.module.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  label?: string;
  icon?: string;
  active?: boolean;
};

const Button = ({ label, icon, active, ...buttonProps }: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ''}`}
      {...buttonProps}
    >
      {icon && (
        <div className={styles.buttonIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            viewBox="0 0 24 24"
          >
            <path d={icon} fill="#fff" />
          </svg>
        </div>
      )}
      {label && <div className={styles.buttonLabel}>{label}</div>}
    </button>
  );
};

export default Button;
