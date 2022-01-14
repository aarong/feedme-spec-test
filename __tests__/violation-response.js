const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("violation-response");
});

describe("The violation-response schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        Diagnostics: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - Diagnostics", () => {
      const result = validate({
        MessageType: "ViolationResponse"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Diagnostics'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "ViolationResponse",
        Diagnostics: {},
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
        Diagnostics: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Diagnostics", () => {
      const result = validate({
        MessageType: "ViolationResponse",
        Diagnostics: "INVALID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "ViolationResponse",
        Diagnostics: {}
      });
      expect(result).toBe(true);
    });
  });
});
