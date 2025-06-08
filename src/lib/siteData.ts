export const siteData = {
  name: "Allergy Agents",
  tagline: "AI-powered food safety dashboard",
  description: "AI-powered food safety analysis to help you identify potential allergens in packaged foods. Use as a helpful tool, but always verify ingredients yourself.",
  email: "info@allergyagents.com",
  supportEmail: "support@allergyagents.com",
  website: "https://allergyagents.com",
  version: "1.0.0",
  founded: "2024",
  
  // Social links (if needed in future)
  social: {
    twitter: "@allergyagents",
    github: "https://github.com/allergyagents",
  },
  
  // Legal information
  legal: {
    company: "Allergy Agents Inc.",
    copyright: "© 2024 Allergy Agents. This tool is for informational purposes only and should not replace professional medical advice.",
  },
  
  // Contact information
  contact: {
    general: "info@allergyagents.com",
    support: "support@allergyagents.com",
    emergency: "For medical emergencies, call your local emergency services immediately.",
  },
  
  // App-specific data
  app: {
    maxImageSize: "10MB",
    supportedFormats: ["jpg", "jpeg", "png", "webp"],
    analysisTimeout: 30000, // 30 seconds
    storageKey: "allergy-agents-theme",
  },
  
  // Feature flags (for future use)
  features: {
    darkMode: true,
    imageUpload: true,
    offlineMode: false,
    multipleAllergies: true,
  }
} as const;

export type SiteData = typeof siteData;