'use babel';

// json-schema.org
export default {
  saveUiConfig: {
    title: 'Save UI Theme Configuration',
    description: 'Many UI themes are configurable. Check this box to save the UI theme configuration to your theme (Note: UI configurations may be very large and will impact package load time).',
    type: 'boolean',
    default: true
  },
  saveSyntaxConfig: {
    title: 'Save Syntax Configuration',
    description: 'Some syntax themes support configuration. Check this box to save the syntax theme configuration to your theme.',
    type: 'boolean',
    default: true
  }
};
