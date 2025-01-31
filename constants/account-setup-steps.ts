import { AccountCreationStep } from "@/types"

export const ACCOUNT_SETUP_STEPS: Record<
  AccountCreationStep,
  {
    badgeName: string
    titleText: string
    inputPlaceholder: string
    descriptionText: string
  }
> = {
  1: {
    badgeName: "1/2",
    titleText: "Enter an invitation code",
    inputPlaceholder: "Code",
    descriptionText:
      "Don’t have a code? Ask a friend already on Wavv to invite you!",
  },
  // TODO: add name submission step
  // 2: {
  //   badgeName: "2/3",
  //   titleText: "What is your name?",
  //   inputPlaceholder: "Full name",
  //   descriptionText: "Add your name so friends can find you.",
  // },
  2: {
    badgeName: "2/2",
    titleText: "Add your username",
    inputPlaceholder: "Username",
    descriptionText:
      "Usernames can only contain letters, numbers, underscores, and periods.",
  },
}
