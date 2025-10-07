import styles from './Switch.module.css';

const Switch = ({ isOn, onToggle, id }) => {
  return (
    <div className={`${styles.switch} ${styles['switch-slider']} ${isOn ? styles.on : ''}`} id={id} onClick={onToggle}>
      <div className={`${styles.handle}`}></div>
    </div>
  );
};

export default Switch;
