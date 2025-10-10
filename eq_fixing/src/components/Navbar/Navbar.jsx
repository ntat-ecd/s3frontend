import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const links = [
  { path: '/sound', label: 'SOUND' },
  { path: '/mixer', label: 'MIXER' },
  { path: '/enhancement', label: 'ENHANCEMENT' },
  { path: '/eq', label: 'EQ' },
  { path: '/mic', label: 'MIC' },
  { path: '/lighting', label: 'LIGHTING' },
  { path: '/power', label: 'POWER' },
];

const Navbar = () => {
  return (
    <div className={`${styles['nav-tabs']} flex app-header`}>
      <div className={`${styles.nav} ${styles.arrow} ${styles.back}`}></div>
      <div className={`${styles.nav} ${styles.arrow} ${styles.forward} ${styles.disabled}`}></div>

      {links.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? `${styles.nav} ${styles.active}` : styles.nav
          }
        >
          {label}
        </NavLink>
      ))}

      <div className={styles.user}>
        <div className={styles.avatar}></div>
      </div>
    </div>
  );
};

export default Navbar;
