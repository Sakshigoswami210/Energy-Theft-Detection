const DataTable = ({ data }) => {
  return (
    <div className="card">
      <h3>Energy Data</h3>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Area</th>
            <th>Input</th>
            <th>Billed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              <td>{d.timestamp}</td>
              <td>{d.area}</td>
              <td>{d.input_energy}</td>
              <td>{d.billed_energy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;