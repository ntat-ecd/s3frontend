import styles from './CheckItem.module.css'

const CheckItem = ({ isOn, onToggle, id, children }) => {
  return (
    <div className={styles['check-item']}>
      <input type='checkbox' id={id} onChange={() => onToggle(id)} checked={isOn} />
      <label htmlFor={id} className={styles['check-box']}>
        <div className={styles['check-text']}>{children}</div>
      </label>
    </div>
  );
};

export default CheckItem;
