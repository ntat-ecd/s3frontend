const DashboardHeader = ({ title, children }) => {
  return (
    <div className="dashboardHeader">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default DashboardHeader