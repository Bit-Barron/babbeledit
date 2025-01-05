interface ProjectConfigProps {
  acceptedTypes: string[];
  maxSize: number;
  title: string;
  description: string;
}

export const PROJECT_CONFIGS: Record<string, ProjectConfigProps> = {
  "Generic JSON": {
    acceptedTypes: [".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure JSON Translation Project",
    description: "Upload your JSON translation files and configure languages",
  },
  "Generic YAML": {
    acceptedTypes: [".yml", ".yaml"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure YAML Translation Project",
    description: "Upload your YAML translation files and configure languages",
  },
  "Java Properties": {
    acceptedTypes: [".properties"],
    maxSize: 2 * 1024 * 1024,
    title: "Configure Java Properties Project",
    description: "Upload your .properties files and configure languages",
  },
  "Flutter ARB": {
    acceptedTypes: [".arb"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure Flutter ARB Project",
    description: "Upload your ARB translation files and configure languages",
  },
  "resx Resource": {
    acceptedTypes: [".resx"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure RESX Resource Project",
    description: "Upload your RESX resource files and configure languages",
  },
  Angular: {
    acceptedTypes: [".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure Angular Translation Project",
    description: "Upload your Angular i18n JSON files and configure languages",
  },
  React: {
    acceptedTypes: [".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure React Translation Project",
    description:
      "Upload your React localization JSON files and configure languages",
  },
  i18next: {
    acceptedTypes: [".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure i18next Translation Project",
    description: "Upload your i18next JSON files and configure languages",
  },
  "Ruby on Rails YAML": {
    acceptedTypes: [".yml", ".yaml"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure Rails Translation Project",
    description:
      "Upload your Rails localization YAML files and configure languages",
  },
  Laravel: {
    acceptedTypes: [".php", ".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure Laravel Translation Project",
    description: "Upload your Laravel language files and configure languages",
  },
  "vue-i18n JSON": {
    acceptedTypes: [".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure Vue I18n Project",
    description: "Upload your Vue I18n JSON files and configure languages",
  },
  Ember: {
    acceptedTypes: [".json"],
    maxSize: 5 * 1024 * 1024,
    title: "Configure Ember Translation Project",
    description: "Upload your Ember localization files and configure languages",
  },
};
