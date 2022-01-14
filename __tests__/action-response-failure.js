const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("action-response-failure");
});

describe("The action-response-failure schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - Success", () => {
      const result = validate({
        MessageType: "ActionResponse",
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Success'"
      );
    });

    it("missing required property - CallbackId", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'CallbackId'"
      );
    });

    it("missing required property - ErrorCode", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ErrorCode'"
      );
    });

    it("missing required property - ErrorData", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ErrorData'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {},
        EXTRANEOUS: true
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must NOT have additional properties"
      );
    });

    it("invalid property - MessageType", () => {
      const result = validate({
        MessageType: "INVALID",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Success", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - CallbackId", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: 123,
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ErrorCode", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: 123,
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ErrorData", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ErrorCode: "ERROR_CODE",
        ErrorData: "INVALID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
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
