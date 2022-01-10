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
  const regex = new RegExp(/^[a-zàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)

  // Non empty && only letters
  return name !== "" &&
    regex.test(name.toLowerCase())
};