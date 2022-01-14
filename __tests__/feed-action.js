const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("feed-action");
});

describe("The feed-action schema", () => {
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
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'MessageType'"
      );
    });

    it("missing required property - FeedName", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedName'"
      );
    });

    it("missing required property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedArgs'"
      );
    });

    it("missing required property - ActionName", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ActionName'"
      );
    });

    it("missing required property - ActionData", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'ActionData'"
      );
    });

    it("missing required property - FeedDeltas", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {}
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe(
        "must have required property 'FeedDeltas'"
      );
    });

    it("extraneous property", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: [],
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
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be equal to constant");
    });

    it("invalid property - FeedName", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: 123,
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedArgs", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: "INVALID",
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ActionName", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: 123,
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - ActionData", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: "INVALID",
        FeedDeltas: []
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedDeltas", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: "INVALID"
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });

    it("invalid property - FeedMd5", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: [],
        FeedMd5: 123
      });
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      // error.message is checked in $ref schema
    });
  });

  describe("should accept", () => {
    it("valid message - without Md5", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: []
      });
      expect(result).toBe(true);
    });

    it("valid message - with Md5", () => {
      const result = validate({
        MessageType: "FeedAction",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        ActionName: "ACTION_NAME",
        ActionData: {},
        FeedDeltas: [],
        FeedMd5: "012345678901234567890123"
      });
      expect(result).toBe(true);
    });
  });
});
