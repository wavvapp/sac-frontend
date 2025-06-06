export const capitalizeFirstLetter = (text: string = "") =>
  text?.charAt(0).toUpperCase() + text?.slice(1)

export const swapFullNames = (fullNames: string) =>
  fullNames.trim().split(/\s+/).reverse().join(" ")
