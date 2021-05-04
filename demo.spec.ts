var AWS = require("aws-sdk");

describe("demo", () => {
  describe("basic", () => {
    it("toBe toEqual toStrictEqual", () => {
      class A {
        a = "test";
      }
      const a = new A();
      expect(1 + 1).toBe(2);
      expect({ a: "test" }).toEqual(a);
      expect({ a: "test" }).not.toStrictEqual(a);
    });

    it("toBeNull toBeUndefined toBeDefined toBeTruthy toBeFalsy toBeNaN ", () => {
      expect(1).toBeDefined();
      expect(parseInt("a")).toBeNaN();
    });

    it("toMatch partically", () => {
      expect({ a: 1, b: 2 }).toMatchObject({ a: 1 });
      expect({ a: 1, b: 2 }).toEqual(expect.objectContaining({ a: 1 }));
      expect([4, 3, 2, 1]).toContain(1);
      expect([4, 3, 2, 1]).toEqual(expect.arrayContaining([1, 2, 3, 4])); // expect.xxx => build mock matcher object

      expect({ a: [4, 3, 2, 1], b: 2 }).toMatchObject({
        a: expect.arrayContaining([1]),
      });
      expect([{ foo: "bar" }, { baz: 1, bar: 2 }]).toMatchObject([
        { foo: "bar" },
        { baz: 1 },
      ]);
    });

    it("customize matcher", () => {
      expect.extend({
        toBeString(received, argument) {
          return { pass: this.equals(typeof received, "string") };
        },
      });
      expect("jdkfj").toBeString();
      expect(12).not.toBeString();
    });

    it("stub function", () => {
      const stub = jest.fn().mockImplementation(() => 3); // equal jest.fn(() => 3) or jest.fn().mockReturnValue(3);
      expect(stub()).toBe(3);
    });

    it("mock modules", async () => {
      // there are four ways to do this
      const s3Client = new AWS.S3();
      jest.spyOn(s3Client, "getObject").mockRejectedValue(new Error("err"));

      await expect(s3Client.getObject()).rejects.toThrowError();
    });

    // table scenerio
    it.each([
      [1, 1, 2],
      [1, 2, 3],
      [2, 1, 3],
    ])(".add(%i, %i)", (a, b, expected) => {
      expect(a + b).toBe(expected);
    });
  });
});
