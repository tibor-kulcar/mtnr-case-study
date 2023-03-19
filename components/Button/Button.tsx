import React from 'react';

import styles from './Button.module.css';

type ButtonProps = {
  label: string;
  onClick?: () => void;
  icon?: string;
  active?: boolean;
};

const Button = ({ label, onClick, icon, active }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${active && styles.active}`}
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
      <div className={styles.buttonLabel}>{label}</div>
    </button>
  );
};

export default Button;
