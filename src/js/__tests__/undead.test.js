import Undead from "../undead";

test("should create a valid Undead", () => {
  const undead = new Undead("Diablo");
  const correct = {
    name: "Diablo",
    type: "Undead",
    health: 100,
    level: 1,
    attack: 25,
    defence: 25,
  };
  expect(undead).toEqual(correct);
});
