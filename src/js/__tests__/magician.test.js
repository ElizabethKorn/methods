import Magician from "../magician";

test("should create a valid Magician", () => {
  const magician = new Magician("Lucifer");
  const correct = {
    name: "Lucifer",
    type: "Magician",
    health: 100,
    level: 1,
    attack: 10,
    defence: 40,
  };
  expect(magician).toEqual(correct);
});

test("should level up character", () => {
  const magician = new Magician("Lucifer");
  magician.levelUp();
  const correct = {
    name: "Lucifer",
    type: "Magician",
    health: 100,
    level: 2,
    attack: 10 * 1.2,
    defence: 40 * 1.2,
  };

  expect(magician).toEqual(correct);
});

test("should not level up dead character", () => {
  const magician = new Magician("Lucifer");
  magician.health = 0;
  expect(() => magician.levelUp()).toThrow(
    "It's impossible to level up for a dead person"
  );
});

test("damage reduces health", () => {
  const magician = new Magician("Lucifer");
  const initialHealth = magician.health;
  magician.damage(70);
  const expectedHealth = initialHealth - 70 * (1 - magician.defence / 100);
  expect(magician.health).toBe(expectedHealth);
});

test("damage does not go below zero", () => {
  const magician = new Magician("Lucifer");
  magician.health = 5;
  magician.damage(20);
  expect(magician.health).toBe(0);
});

test("damage does nothing if dead", () => {
  const magician = new Magician("Lucifer");
  magician.health = 0;
  expect(() => magician.damage(0)).toThrow("Person is dead");
});
