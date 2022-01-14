const getValidator = require("../getvalidator");

let validate;

beforeEach(async function () {
  validate = await getValidator("action-data");
});

describe("The action-data schema", () => {
  describe("should reject", () => {
    it("bad type", () => {
      const result = validate("INVALID");
      expect(result).toBe(false);
      expect(validate.errors.length).toBe(1);
      expect(validate.errors[0].message).toBe("must be object");
    });
  });

  describe("should accept", () => {
    it("empty object", () => {
      const result = validate({});
      expect(result).toBe(true);
    });

    it("non-empty object", () => {
      const result = validate({
        Action: "Args"
      });
      expect(result).toBe(true);
    });
  });
});
