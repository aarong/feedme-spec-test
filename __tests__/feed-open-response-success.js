const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-open-response-success");
});

describe("The feed-open-response-success schema", () => {
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
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - Success", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'Success'"
      );
    });

    it("missing required property - FeedName", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedName'"
      );
    });

    it("missing required property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedArgs'"
      );
    });

    it("missing required property - FeedData", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedArgs: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedData'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {},
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
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - Success", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: false,
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - FeedName", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: 123,
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedArgs: "INVALID",
        FeedData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedData", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: "INVALID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        Success: true,
        FeedName: "FEED_NAME",
        FeedArgs: {},
        FeedData: {}
      });
      expect(result).toBe(true);
    });
  });
});
