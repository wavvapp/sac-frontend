export function formatAppVersionToNumber(version: string): number {
  return Number(version.split(".").join())
}
