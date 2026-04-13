export const generateEnergyData = () => {
  const input = Math.floor(Math.random() * 500) + 1000;
  const billed = Math.floor(Math.random() * 500) + 800;

  return {
    area: "Tata Area",
    input_energy: input,
    billed_energy: billed,
    loss: input - billed,
    timestamp: new Date().toLocaleTimeString(),
  };
};