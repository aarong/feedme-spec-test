const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("handshake-response");
});

describe("The handshake-response schema", () => {
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
        MessageType: "HandshakeResponse",
        Success: true,
        Version: "0.1"
      });
      expect(result).toBe(true);
    });

    it("valid failure message", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: false
      });
      expect(result).toBe(true);
    });
  });
});
