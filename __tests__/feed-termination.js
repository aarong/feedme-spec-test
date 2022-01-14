const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-termination");
});

describe("The feed-termination schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });

    it("missing required property - MessageType", () => {
      const result = validate({
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - FeedName", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedArgs: {},
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedName'"
      );
    });

    it("missing required property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedArgs'"
      );
    });

    it("missing required property - ErrorCode", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: {},
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
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: {},
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
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: {},
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
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - FeedName", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedName: 123,
        FeedArgs: {},
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: "INVALID",
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ErrorCode", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ErrorCode: 123,
        ErrorData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ErrorData", () => {
      const result = validate({
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: {},
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
        MessageType: "FeedTermination",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ErrorCode: "ERROR_CODE",
        ErrorData: {}
      });
      expect(result).toBe(true);
    });
  });
});
