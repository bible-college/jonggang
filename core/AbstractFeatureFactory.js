class AbstractFeatureFactory {
  createCommand() {
    throw new Error('createCommand() must be implemented');
  }

  createInputSchema() {
    throw new Error('createInputSchema() must be implemented');
  }

  createFormatter() {
    throw new Error('createFormatter() must be implemented');
  }

  getDisplayName() {
    throw new Error('getDisplayName() must be implemented');
  }
}

module.exports = AbstractFeatureFactory;
