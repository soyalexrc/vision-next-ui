export function formatVenezuelanPhoneNumber(phoneNumber: string): string {
  // Remove non-numeric characters
  phoneNumber = phoneNumber?.replace(/\D/g, '');

  // Ensure the phone number has 11 digits
  // if (phoneNumber.length !== 11) {
  //   throw new Error('Invalid Venezuelan phone number length');
  // }

  // Format the phone number
  const areaCode = phoneNumber?.slice(0, 4);
  const firstPart = phoneNumber?.slice(4, 7);
  const secondPart = phoneNumber?.slice(7, 9);
  const thirdPart = phoneNumber?.slice(9);

  return `(${areaCode}) ${firstPart} ${secondPart} ${thirdPart}`;
}

export function generateNewCode(latestCode: string): string {
  const sliced = latestCode.replace('VINM_', '');
  const parsed = parseInt(sliced);
  const newCode = parsed + 1;
  const newCodeString = newCode.toString();
  let newCodeId = '';

  switch (newCodeString.length) {
    case 1:
      newCodeId = `VINM_00${newCode}`;
      break;
    case 2:
      newCodeId = `VINM_0${newCode}`;
      break;
    case 3:
      newCodeId = `VINM_${newCode}`;
      break;
  }

  return newCodeId;
}
