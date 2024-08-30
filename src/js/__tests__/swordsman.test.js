import Swordsman from "../swordsman";

test("should create a valid Swordsman", () => {
  const swordsman = new Swordsman("Arthur");
  const correct = {
    name: "Arthur",
    type: "Swordsman",
    health: 100,
    level: 1,
    attack: 40,
    defence: 10,
  };
  expect(swordsman).toEqual(correct);
});
