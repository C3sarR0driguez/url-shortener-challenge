const uuidv4 = require("uuid/v4");
const { domain } = require("../../../environment");
const SERVER = `${domain.protocol}://${domain.host}`;

const UrlModel = require("../../models/Url");
const parseUrl = require("url").parse;
const validUrl = require("valid-url");

/**
 * Lookup for existant, active shortened URLs by hash.
 * 'null' will be returned when no matches were found.
 * @param {string} hash
 * @returns {object}
 */
async function getUrl(hash) {
  let source = await UrlModel.findOne({ active: true, hash });
  return source;
}

//WHY DO WE NEED REMOVE TOKEN?
async function deleteUrl(hash) {
  const oldRecord = await UrlModel.findOneAndUpdate(
    { active: true, hash },
    { active: false }
  );
  return oldRecord;
}

const SAFE_CHARACTERS = 4;
const characterSet = "0123456789ABCDFGHIJKLMNOPQRSTUVWXYZ";

async function registerVisit(id) {
  const newRecord = await UrlModel.findOneAndUpdate(
    { active: true, _id: id },
    { $inc: { visits: 1 } }
  );
  return newRecord;
}

async function getUrls(){
  return await UrlModel.find({ active: true });
}

async function getUrl(hash) {
  //TODO handle errors
  let source = await UrlModel.findOne({ active: true, hash });
  return source;
}

function generateRandomSafeCharacter() {
  const len = characterSet.length - 1;
  return characterSet[Math.round(Math.random() * len)];
}

function generateHash() {
  const chars = new Array(SAFE_CHARACTERS)
    .fill(null)
    .map(_ => generateRandomSafeCharacter());
  return encodeURIComponent(new Date().getTime().toString() + chars.join(""));
}

/**
 * Generate a random token that will allow URLs to be (logical) removed
 * @returns {string} uuid v4
 */
function generateRemoveToken() {
  return uuidv4();
}

/**
 * Create an instance of a shortened URL in the DB.
 * Parse the URL destructuring into base components (Protocol, Host, Path).
 * An Error will be thrown if the URL is not valid or saving fails.
 * @param {string} url
 * @param {string} hash
 * @returns {object}
 */
async function shorten(url, hash) {
  if (!isValid(url)) {
    throw new Error("Invalid URL");
  }

  // Get URL components for metrics sake
  const urlComponents = parseUrl(url);
  const protocol = urlComponents.protocol || "";
  const domain = `${urlComponents.host || ""}${urlComponents.auth || ""}`;
  const path = `${urlComponents.path || ""}${urlComponents.hash || ""}`;

  // Generate a token that will alow an URL to be removed (logical)
  const removeToken = generateRemoveToken();

  // Create a new model instance
  const shortUrl = new UrlModel({
    url,
    protocol,
    domain,
    path,
    hash,
    isCustom: false,
    removeToken,
    active: true
  });

  const saved = await shortUrl.save();
  // TODO: Handle save errors

  return {
    url,
    shorten: `${SERVER}/${hash}`,
    hash,
    removeUrl: `${SERVER}/${hash}/${removeToken}`
  };
}

/**
 * Validate URI
 * @param {string} url
 * @returns {boolean}
 */
function isValid(uri) {
  return validUrl.isWebUri(uri);
}

module.exports = {
  shorten,
  getUrl,
  generateHash,
  generateRemoveToken,
  isValid,
  deleteUrl,
  registerVisit,
  getUrls
};
