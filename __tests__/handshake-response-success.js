const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("handshake-response-success");
});

describe("The handshake-response-success schema", () => {
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
        Version: "0.1"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - Success", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Version: "0.1"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Success'"
      );
    });

    it("missing required property - Version", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: true
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Version'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: true,
        Version: "0.1",
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
        Version: "0.1"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Success", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: false,
        Version: "0.1"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Version", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: true,
        Version: 123
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: true,
        Version: "0.1"
      });
      expect(result).toBe(true);
    });
  });
});
