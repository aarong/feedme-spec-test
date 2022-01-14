const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("action");
});

describe("The action schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        ActionName: "ACTION_NAME",
        ActionArgs: {},
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - ActionName", () => {
      const result = validate({
        MessageType: "Action",
        ActionArgs: {},
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ActionName'"
      );
    });

    it("missing required property - ActionArgs", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ActionArgs'"
      );
    });

    it("missing required property - CallbackId", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        ActionArgs: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'CallbackId'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        ActionArgs: {},
        CallbackId: "CALLBACK_ID",
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
        ActionName: "ACTION_NAME",
        ActionArgs: {},
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - ActionName", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: 123,
        ActionArgs: {},
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ActionArgs", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        ActionArgs: "INVALID",
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - CallbackId", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        ActionArgs: {},
        CallbackId: 123
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        ActionArgs: {},
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(true);
    });
  });
});
