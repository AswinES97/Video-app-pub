export const generateValidK8sName = (dns1035Regex: RegExp): string => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const alphanumeric = "abcdefghijklmnopqrstuvwxyz0123456789";

  const firstChar = alphabet.charAt(
    Math.floor(Math.random() * alphabet.length),
  );
  let name = firstChar;

  for (let i = 1; i < 36; i++) {
    // Ensure the length is appropriate
    name += alphanumeric.charAt(
      Math.floor(Math.random() * alphanumeric.length),
    );
  }

  if (dns1035Regex.test(name)) {
    return name;
  } else {
    return generateValidK8sName(dns1035Regex);
  }
};
