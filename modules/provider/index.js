const {NonProcessableContextError} = require('@flat-peak/express-integration-sdk');

/**
 * @typedef {Object} Credentials
 * @property {string} login
 * @property {string} password
 */

/**
 * @typedef {Object} SecureParams
 * @property {string} token
 * @property {string} [referenceId]
 */

/**
 * @typedef {Credentials} StoredMetaData
 * @property {SecureParams} secureParams
 * @property {"IMPORT"|"EXPORT"} direction
 */

/**
 * @typedef {Object} ProviderCapturedData
 * @property {Object} agreement
 * @property {string} reference_id
 * @property {string} tariff_code
 */

/**
 * @typedef {Object} ExtraAuthRequirements
 * @property {("no_available_tariffs" | "multiple_available_tariffs")} type
 * @property {AccountSelectionContext} data
 */

/**
 * @typedef {AccountSelectionData} ExtraAuthMetaData
 */

/**
 * @typedef {Object} AccountSelectionContext
 * @property {Array<{id: string, name: string, description?: string}>} accounts
 */

/**
 * @typedef {Object} AccountSelectionData
 * @property {string} account
 */


/** @type {import('@flat-peak/express-integration-sdk').AuthoriseHookHandler<Credentials, StoredMetaData>} */
const authorise = async (credentials) => {
	if (credentials.direction === "EXPORT") {
		return {
			data: {...credentials },
			extraAuthRequirements: {
				type: 'no_available_tariffs',
				data: {
					direction: credentials.direction
				}
			},
		};
	}
  return Promise.resolve({success: false, error: 'Not implemented'});
};

/** @type {import('@flat-peak/express-integration-sdk').CaptureExtraAuthRequirementsHandler<ExtraAuthMetaData, StoredMetaData, ExtraAuthRequirements>} */
const captureExtraAuthData = async (data, context) => {
  switch (context.type) {
    case "multiple_available_tariffs":
      return {
        ...context.data,
        selectedAccount: data.account
      }
    default:
      throw new NonProcessableContextError("Not supported auth requirement - " + context.type, "NOT_SUPPORTED_REQUIREMENT")
  }
}

/** @type {import('@flat-peak/express-integration-sdk').CaptureHookHandler<StoredMetaData, ProviderCapturedData>} */
const capture = async (reference) => {
  return Promise.resolve({success: false, error: 'Not implemented'});
};

/** @type {import('@flat-peak/express-integration-sdk').ConvertHookHandler<ProviderCapturedData>} */
const convert = (inputData) => {
  throw new Error('Not implemented');
};

module.exports = {
  capture, authorise, convert, captureExtraAuthData
};
