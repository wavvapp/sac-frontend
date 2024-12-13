import { StaticScreenType } from "@/types"

type Page = {
  pageTitle: string
  pageContent: {
    title: string
    content: string
  }[]
}

export const STATIC_SCREEN_CONTENTS: Record<StaticScreenType, Page> = {
  privacy: {
    pageTitle: "Privacy policy",
    pageContent: [
      {
        title: "Information Collection and Use",
        content:
          "Our mobile application collects minimal personal information exclusively through Google and Apple sign-in services. We only collect and store the email address associated with your Google or Apple account for user authentication and account management purposes. No additional personal data is collected or stored beyond what is necessary for app functionality.",
      },
      {
        title: "Data Privacy",
        content:
          "We are committed to protecting your personal information. Your email address is used solely for account identification and communication related to the app's services. We do not sell, trade, or share your email address with third parties except as required to provide core app functionality.",
      },
      {
        title: "Authentication Process",
        content:
          "When you sign in using Google or Apple, we receive only the basic profile information necessary to create and manage your user account. We do not have access to or store any additional personal details beyond the email address provided by these authentication services.",
      },
      {
        title: "Data Storage and Security",
        content:
          "User email addresses are encrypted and stored securely. We implement industry-standard security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. Access to user data is restricted to essential personnel required for app maintenance and support.",
      },
      {
        title: "User Rights",
        content:
          "You have the right to request deletion of your account and associated data at any time through the app's account settings. Upon account deletion, all personally identifiable information will be permanently removed from our systems within 30 days.",
      },
      {
        title: "Third-Party Services",
        content:
          "Our application uses Google and Apple sign-in services, which are subject to their respective privacy policies. We recommend reviewing Google's and Apple's privacy terms to understand how they handle your authentication information.",
      },
      {
        title: "Children's Privacy",
        content:
          "Our application is not intended for users under the age of 13. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to remove such information from our servers.",
      },
      {
        title: "Policy Updates",
        content:
          "We may update this privacy policy periodically. Users will be notified of any significant changes through the app or via the email address associated with their account. Continued use of the application after policy changes constitutes acceptance of the updated terms.",
      },
      {
        title: "Contact Information",
        content:
          "For any privacy-related questions or concerns, please contact us at [Your Company Email Address]. We are committed to addressing your privacy inquiries promptly and transparently.",
      },
    ],
  },
  terms: {
    pageTitle: "Terms of services",
    pageContent: [
      {
        title: "Acceptance of Terms",
        content:
          "By downloading, accessing, or using our Social Gatherings mobile application, you agree to be bound by these Terms of Use. If you do not agree with these terms, you are prohibited from using the application. We reserve the right to modify these terms at any time, and continued use of the app constitutes acceptance of any changes.",
      },
      {
        title: "User Eligibility",
        content:
          "Users must be at least 13 years of age to use this application. By using the app, you represent and warrant that you meet the minimum age requirement and have the legal capacity to enter into these terms. Users under 18 must have parental or legal guardian consent to use the application.",
      },
      {
        title: "User Account",
        content:
          "Account creation is performed exclusively through Google or Apple sign-in services. Users are responsible for maintaining the confidentiality of their authentication credentials and agree to accept responsibility for all activities that occur under their account. Users must provide accurate and current information and promptly update any changes.",
      },
      {
        title: "User Conduct",
        content:
          "Users agree to use the application for lawful purposes only. Prohibited activities include, but are not limited to: uploading harmful content, attempting unauthorized access to system resources, harassing or threatening other users, sharing illegal or offensive content, and any actions that could compromise the application's functionality or security.",
      },
      {
        title: "Content Ownership and Rights",
        content:
          "Users retain ownership of the content they create or upload within the application. By using the platform, users grant the application a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute content solely for the purpose of providing and improving the application's services.",
      },
      {
        title: "Privacy",
        content:
          "User data collection and handling are governed by our separate Privacy Policy. We are committed to protecting user information and will only collect and use data necessary for providing and improving the application's core functionalities.",
      },
      {
        title: "Intellectual Property",
        content:
          "All application design, graphics, user interface, code, and related intellectual property are owned by the application developers. Users may not reproduce, distribute, modify, create derivative works, or exploit any portion of the application without explicit written permission.",
      },
      {
        title: "Limitation of Liability",
        content:
          "The application is provided 'as is' without any warranties. We are not liable for any direct, indirect, incidental, special, or consequential damages arising from app usage. We do not guarantee continuous, uninterrupted, or error-free service and reserve the right to modify, suspend, or discontinue any aspect of the application at our discretion.",
      },
      {
        title: "Termination",
        content:
          "We reserve the right to terminate or suspend user accounts immediately, without prior notice or liability, for any violation of these Terms of Use. Users may also delete their account at any time through the application's settings.",
      },
      {
        title: "Dispute Resolution",
        content:
          "Any disputes arising from the use of this application shall be resolved through binding arbitration in accordance with the rules of [Your Jurisdiction]. Users agree that any legal action shall be brought in the courts of [Your Jurisdiction] and waive any objections to jurisdiction and venue.",
      },
      {
        title: "Contact Information",
        content:
          "For any questions, concerns, or notices regarding these Terms of Use, please contact us at [Your Official Contact Email]. By using the application, users acknowledge they have read, understood, and agree to be bound by these terms.",
      },
    ],
  },
}
