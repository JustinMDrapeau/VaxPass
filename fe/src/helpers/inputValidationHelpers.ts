export function isValidEmail(email: string) {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)

    // Non empty and email format
    return regex.test(email.toLowerCase())
    && email !== "";
};

export function isValidPassword(password: string) {
  // Non empty
  return password !== ""
};

export function isValidHealthNumber(healthNumber: string) {
  // TODO: Validate the health card number format
  // Non empty
  return healthNumber !== ""
};

export function isValidName(name: string) {
  const regex = new RegExp(/^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð][a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð,.'-]+$/u)

  // Non empty && only letters
  return name !== "" &&
    regex.test(name.toLowerCase())
};

export function isValidAddress(address: string) {
  const regex = new RegExp(/^\d+\s[a-z]+\s*/g)

  // Non empty && address format
  return address !== "" &&
    regex.test(address.toLowerCase())
};

export function isValidPostalCode(code: string) { 
  const regex = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)

  // Non empty && postal code format
  return code !== "" && 
    regex.test(code)
}