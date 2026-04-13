const AlertsPanel = ({ alerts }) => {
  return (
    <div className="card">
      <h3>Recent Alerts</h3>
      {alerts.length === 0 ? (
        <p>No alerts detected.</p>
      ) : (
        <ul className="alert-list">
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPanel;