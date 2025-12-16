export const formatPhoneNumber = (phoneNumber: string) => {
  const cleaned = phoneNumber.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  return phoneNumber;
};
