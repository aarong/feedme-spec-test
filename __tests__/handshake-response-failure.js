const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("handshake-response-failure");
});

describe("The handshake-response-failure schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        Success: false
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - Success", () => {
      const result = validate({
        MessageType: "HandshakeResponse"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Success'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: false,
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
        Success: false
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Success", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: true
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: false
      });
      expect(result).toBe(true);
    });
  });
});
