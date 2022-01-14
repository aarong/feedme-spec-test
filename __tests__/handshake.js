const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("handshake");
});

describe("The handshake schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        Versions: ["0.1"]
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - Handshake", () => {
      const result = validate({
        MessageType: "Handshake"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Versions'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "Handshake",
        Versions: ["0.1"],
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
        Versions: ["0.1"],
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Versions", () => {
      const result = validate({
        MessageType: "Handshake",
        Versions: "INVALID",
      });
      expect(result).toBe(false);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "Handshake",
        Versions: ["0.1"],
      });
      expect(result).toBe(true);
    });
  });
});
