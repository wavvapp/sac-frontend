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
    titleText: "What is your name?",
    inputPlaceholder: "Name",
    descriptionText:
      "Go by whatever name you like—your friends will see this. You can always tweak it later in settings.",
  },
  2: {
    badgeName: "2/3",
    titleText: "Add your username",
    inputPlaceholder: "Username",
    descriptionText:
      "Pick a unique username—letters, numbers, underscores, and periods only. This will be your forever handle so choose wisely!",
  },
}
