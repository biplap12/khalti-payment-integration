export const generatePurchaseOrderId = () => {
  const now = new Date();

  const dateTime = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .format(now)
    .replace(/\D/g, "");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `ORDER-${dateTime}-${random}`;
};
