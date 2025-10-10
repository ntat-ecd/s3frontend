import styles from './Widgets.module.css';

const Widget = ({ id, children }) => {
  return (
    <div id={id} className={`${styles.widget}`}>
      <div className={`${styles.help}`}></div>
      <div className={`${styles.tip}`}>
        I'm just a tooltip. I'm just a tooltip. I'm just a tooltip. I'm just a tooltip. I'm just a tooltip.
      </div>

      {children}
    </div>
  );
};

const Title = ({ children }) => {
  return <div className={`${styles.title}`}>{children}</div>;
};

const H2Title = ({ children }) => {
  return <div className={`${styles['h2-title']} mt20`}>{children}</div>;
};

const H2Body = ({ children }) => {
  return <div className={`${styles['h2-body']}`}>{children}</div>;
};
Widget.Title = Title;
Widget.H2Title = H2Title;
Widget.H2Body = H2Body;

export default Widget;
