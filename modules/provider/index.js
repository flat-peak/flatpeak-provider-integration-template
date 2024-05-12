/**
 * @param {Object} credentials
 * @return {Promise<{success: boolean, error?: string} | Object<string, string>>} - might contain also extra params
 * considered as a reference and used in tariff fetching
 *//** @type {import('@flat-peak/express-integration-sdk').AuthoriseHookHandler<Credentials, StoredMetaData>} */
const authorise = async (credentials) => {
  logger.info(`authorise ${Buffer.from(`${email}:${password}`).toString('base64')}`);return Promise.resolve({success: false, error: 'Not implemented'});
};

/**
 * @param {Object} reference - contains extra properties of the returned value of authorise.
 * for e.g.: token, cookies etc
 * @return {Promise<{tariff: Object, reference_id?: string}>} - returns provider tariff object before
 * transformation to FlatPeak format
 */
const capture = async (reference) => {
  return Promise.resolve({success: false, error: 'Not implemented'});
};

/**
 * @param tariff - Provider tariff object
 * @param reference_id - tariff reference id if exists, an account number for e.g.
 * @return {FlatPeak.Tariff} - converted tariff object
 */
const convert = ({tariff, reference_id}) => {
  throw new Error('Not implemented');
};

module.exports = {
  capture, authorise, convert,
};
