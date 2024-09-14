export function generateCustomerId(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let customerId = "";
  for (let i = 0; i < length; i++) {
    customerId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return customerId;
}
