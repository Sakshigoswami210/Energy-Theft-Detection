const PredictionPanel = ({ prediction }) => {
  if (!prediction) return null;

  return (
    <div className="card">
      <h3>AI Prediction</h3>
      <p><strong>Status:</strong> {prediction.prediction}</p>
      <p><strong>Loss:</strong> {prediction.loss_percent}%</p>
      <p><strong>Risk Level:</strong> {prediction.risk_level}</p>
    </div>
  );
};

export default PredictionPanel;