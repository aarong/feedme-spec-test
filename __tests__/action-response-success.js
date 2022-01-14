const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("action-response-success");
});

describe("The action-response-success schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: {}
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
        ActionData: {}
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
        Success: true,
        ActionData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'CallbackId'"
      );
    });

    it("missing required property - ActionData", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ActionData'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: {},
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
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: {},
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Success", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: false,
        CallbackId: "CALLBACK_ID",
        ActionData: {},
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - CallbackId", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: 123,
        ActionData: {},
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ActionData", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: "INVALID"
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
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: {}
      });
      expect(result).toBe(true);
    });
  });
});
