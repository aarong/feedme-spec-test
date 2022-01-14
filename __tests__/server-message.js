const getValidator = require("../getvalidator");

beforeEach(async function () {
  validate = await getValidator("server-message");
});

describe("The server-message schema", () => {
  describe("should reject", () => {
    it("does not match a server message", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(14);
      expect(validate.errors[13].message).toBe("must match a schema in anyOf");
    });
  });

  describe("should accept", () => {
    it("valid ViolationResponse message", () => {
      const result = validate({
        MessageType: "ViolationResponse",
        Diagnostics: {}
      });
      expect(result).toBe(true);
    });

    it("valid HandshakeResponse message", () => {
      const result = validate({
        MessageType: "HandshakeResponse",
        Success: true,
        Version: "X.X"
      });
      expect(result).toBe(true);
    });

    it("valid ActionResponse message", () => {
      const result = validate({
        MessageType: "ActionResponse",
        Success: true,
        CallbackId: "CALLBACK_ID",
        ActionData: {}
      });
      expect(result).toBe(true);
    });

    it("valid FeedOpenResponse message", () => {
      const result = validate({
        MessageType: "FeedOpenResponse",
        FeedName: "FEED_NAME",
        FeedArgs: {},
        Success: true,
        FeedData: {}
      });
      expect(result).toBe(true);
    });

    it("valid FeedCloseResponse message", () => {
      const result = validate({
        MessageType: "FeedCloseResponse",
        FeedName: "FEED_NAME",
        FeedArgs: {}
      });
      expect(result).toBe(true);
    });

    it("valid FeedAction message", () => {
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

    it("valid FeedTermination message", () => {
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
