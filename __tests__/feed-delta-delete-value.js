const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-delta-delete-value");
});

describe("The feed-delta-delete-value schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - Operation", () => {
      const result = validate({
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Operation'"
      );
    });

    it("missing required property - Path", () => {
      const result = validate({
        Operation: "DeleteValue",
        Value: "VALUE"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Path'"
      );
    });

    it("missing required property - Value", () => {
      const result = validate({
        Operation: "DeleteValue",
        Path: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Value'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        Operation: "DeleteValue",
        Path: [],
        Value: "VALUE",
        EXTRANEOUS: true
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must NOT have additional properties"
      );
    });

    it("invalid property - Operation", () => {
      const result = validate({
        Operation: "INVALID",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Path", () => {
      const result = validate({
        Operation: "DeleteValue",
        Path: "INVALID",
        Value: "VALUE"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        Operation: "DeleteValue",
        Path: [],
        Value: "VALUE"
      });
      expect(result).toBe(true);
    });
  });
});
