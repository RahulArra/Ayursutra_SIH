import styles from './Button/Button.module.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const buttonClass = `
    ${styles.button}
    ${styles[variant]}
    ${size !== 'medium' ? styles[size] : ''}
    ${fullWidth ? styles.fullWidth : ''}
    ${className}
  `.trim();

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;