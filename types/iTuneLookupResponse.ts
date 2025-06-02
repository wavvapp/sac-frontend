export interface ITuneLookupResponse {
  resultCount: number
  results: Result[]
}

export interface Result {
  artistViewUrl: string
  artworkUrl60: string
  artworkUrl100: string
  isGameCenterEnabled: boolean
  features: string[]
  advisories: string[]
  supportedDevices: string[]
  kind: string
  screenshotUrls: any[]
  ipadScreenshotUrls: any[]
  appletvScreenshotUrls: any[]
  artworkUrl512: string
  trackCensoredName: string
  trackViewUrl: string
  contentAdvisoryRating: string
  averageUserRating: number
  artistId: number
  artistName: string
  genres: string[]
  price: number
  releaseDate: string
  bundleId: string
  primaryGenreName: string
  primaryGenreId: number
  trackId: number
  trackName: string
  sellerName: string
  isVppDeviceBasedLicensingEnabled: boolean
  genreIds: string[]
  currentVersionReleaseDate: string
  releaseNotes: string
  version: string
  wrapperType: string
  currency: string
  description: string
  trackContentRating: string
  sellerUrl: string
  languageCodesISO2A: string[]
  fileSizeBytes: string
  formattedPrice: string
  userRatingCountForCurrentVersion: number
  averageUserRatingForCurrentVersion: number
  minimumOsVersion: string
  userRatingCount: number
}
