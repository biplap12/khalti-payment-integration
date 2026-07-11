function poisaToRupees(poisa: number): string {
  const rupees = poisa / 100;
  return rupees.toFixed(2); // Convert to string with 2 decimal places
}

export default poisaToRupees;
