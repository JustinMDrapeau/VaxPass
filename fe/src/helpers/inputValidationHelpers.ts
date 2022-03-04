export function isValidEmail(email: string) {
  const regex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)

  // Non empty and email format
  return regex.test(email.toLowerCase())
  && email !== "";
};

export function isValidClinicName(name: string) {
  const regex = new RegExp(/^[a-z\u00C0-\u02AB'´`]+\.?\s([a-z\u00C0-\u02AB'´`]+\.?\s?)+$/i)

  // Non empty && only letters
  return name !== "" &&
    regex.test(name.toLowerCase())
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

export function isValidLink(link: string) { 
  const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i)

  // Non empty && postal code format
  return regex.test(link)
}

export function isValidWalletAddress(walletAddress: string) { 
  const regex = new RegExp(/^0x[a-fA-F0-9]{40}$/i)

  // Non empty && postal code format
  return walletAddress !== "" && 
    regex.test(walletAddress)
}