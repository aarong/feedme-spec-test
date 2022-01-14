const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("action-response");
});

describe("The action-response schema", () => {
  describe("should reject", () => {
    it("matches neither success nor failure", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(3);
      expect(validate.errors[2].message).toBe("must match a schema in anyOf");
    });
  });

  describe("should accept", () => {
    it("valid success message", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: {}
      });
      expect(result).toBe(true);
    });

    it("valid failure message", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(true);
    });
  });
});
