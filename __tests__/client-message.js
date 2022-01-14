const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("client-message");
});

describe("The client-message schema", () => {
  describe("should reject", () => {
    it("does not match a client message", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(5);
      expect(validate.errors[4].message).toBe("must match a schema in anyOf");
    });
  });

  describe("should accept", () => {
    it("valid Handshake message", () => {
      const result = validate({
        MessageType: "Handshake",
        Versions: ["X.X"]
      });
      expect(result).toBe(true);
    });

    it("valid Action message", () => {
      const result = validate({
        MessageType: "Action",
        ActionName: "ACTION_NAME",
        ActionArgs: {},
        CallbackId: "CALLBACK_ID"
      });
      expect(result).toBe(true);
    });

    it("valid FeedOpen message", () => {
      const result = validate({
        MessageType: "FeedOpen",
        FeedName: "FEED_NAME",
        FeedArgs: {}
      });
      expect(result).toBe(true);
    });

    it("valid FeedClose message", () => {
      const result = validate({
        MessageType: "FeedClose",
        FeedName: "FEED_NAME",
        FeedArgs: {}
      });
      expect(result).toBe(true);
    });
  });
});
