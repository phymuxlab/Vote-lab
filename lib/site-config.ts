export const siteConfig = {
  name: "VoteLab",
  productName: "Vote Lab",
  developer: "MUXLAB",
  description: "A campus election platform for creating, publishing and managing digital ballots.",
  legalName: process.env.NEXT_PUBLIC_BUSINESS_NAME || "[BUSINESS / LEGAL NAME REQUIRED]",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "[CONTACT EMAIL REQUIRED]",
  contactAddress: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "[BUSINESS ADDRESS REQUIRED]",
};
