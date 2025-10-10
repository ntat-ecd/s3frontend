import styles from './Dropdown.module.css';

const Dropdown = ({ ref, children }) => {
  return <div className={styles['dropdown-area']} ref={ref}>{children}</div>;
};

const ProfileDrop = ({ isExpand, onClick, selected, disabled }) => {
  return (
    <div
      id='profileDrop'
      className={`${styles['s3-dropdown']} ${isExpand ? 'expand' : ''} ${disabled ? 'disabled' : ''} `}
      onClick={!disabled ? onClick : null}
    >
      <div className={styles.selected}>{selected}</div>
      <div className={`${styles.icon} ${styles.expand}`}></div>
    </div>
  );
};
const ProfileDropOpt = ({ isExpand, children }) => {
  return (
    <div
      id='profileDropOpt'
      className={`${styles['s3-options']} flex ${isExpand ? 'expand' : ''}`}
      style={{ bottom: 'unset', top: '27px' }}
    >
      {children}
    </div>
  );
};
const Option = ({ onClick, children, selected }) => {
  return (
    <div className={`${styles.option} ${selected ? 'selected' : ''}`} onClick={onClick}>
      {children}
    </div>
  );
};

Dropdown.ProfileDrop = ProfileDrop;
Dropdown.ProfileDropOpt = ProfileDropOpt;
Dropdown.Option = Option;
export default Dropdown;
