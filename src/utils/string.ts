export function formatVenezuelanPhoneNumber(phoneNumber: string): string {
  // Remove non-numeric characters
  phoneNumber = phoneNumber.replace(/\D/g, '');

  // Ensure the phone number has 11 digits
  // if (phoneNumber.length !== 11) {
  //   throw new Error('Invalid Venezuelan phone number length');
  // }

  // Format the phone number
  const areaCode = phoneNumber.slice(0, 4);
  const firstPart = phoneNumber.slice(4, 7);
  const secondPart = phoneNumber.slice(7, 10);
  const thirdPart = phoneNumber.slice(10);

  return `(${areaCode}) ${firstPart} ${secondPart} ${thirdPart}`;
}
