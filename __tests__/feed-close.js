const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-close");
});

describe("The feed-close schema", () => {
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
        FeedArgs: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - FeedName", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedArgs: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedName'"
      );
    });

    it("missing required property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedName: "FEED_NAME"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedArgs'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedName: "FEED_NAME",
        FeedArgs: {},
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
        FeedArgs: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - FeedName", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedName: 123,
        FeedArgs: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedName: "FEED_NAME",
        FeedArgs: "INVALID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedName: "FEED_NAME",
        FeedArgs: {}
      });
      expect(result).toBe(true);
    });
  });
});
