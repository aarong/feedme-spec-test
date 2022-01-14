const Ajv = require("ajv");

const schemaFolder = "../feedme-spec/schemas";
const ajv = new Ajv({
  loadSchema: loadSchema,
  allErrors: true // Don't report only the first error
});

// Have Ajv automatically load $ref schemas
// https://ajv.js.org/guide/managing-schemas.html#asynchronous-schema-loading

async function loadSchema(uri) {
  const uriParts = uri.split("/");
  const schemaId = uriParts[uriParts.length - 1];
  const schemaObj = require(schemaFolder + "/" + schemaId + ".json");
  return schemaObj;
}

module.exports = async function getValidator(schemaId) {
  const schemaObj = require(schemaFolder + "/" + schemaId + ".json");
  const validate = await ajv.compileAsync(schemaObj);
  return validate;
};
