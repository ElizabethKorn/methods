import Zombie from "../zombie";

test("should create a valid Zombie", () => {
  const zombie = new Zombie("Zombie");
  const correct = {
    name: "Zombie",
    type: "Zombie",
    health: 100,
    level: 1,
    attack: 40,
    defence: 10,
  };
  expect(zombie).toEqual(correct);
});
