const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-open-response");
});

describe("The feed-open-response schema", () => {
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
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(true);
    });

    it("valid failure message", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: false,
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(true);
    });
  });
});
