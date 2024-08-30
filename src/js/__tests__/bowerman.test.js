import Bowerman from "../bowerman";

test("should throw an error for invalid name length", () => {
  expect(() => new Bowerman("R")).toThrow(
    "Имя должно быть строкой длиной от 2 до 10 символов"
  );
  expect(() => new Bowerman("Rnsdkcndnvknkd")).toThrow(
    "Имя должно быть строкой длиной от 2 до 10 символов"
  );
});

test("should create a valid Bowerman", () => {
  const bowman = new Bowerman("Robin");
  const correct = {
    name: "Robin",
    type: "Bowman",
    health: 100,
    level: 1,
    attack: 25,
    defence: 25,
  };
  expect(bowman).toEqual(correct);
});

test("should level up character", () => {
  const bowman = new Bowerman("Legolas");
  bowman.levelUp();
  const correct = {
    name: "Legolas",
    type: "Bowman",
    health: 100,
    level: 2,
    attack: 25 * 1.2,
    defence: 25 * 1.2,
  };

  expect(bowman).toEqual(correct);
});

test("should not level up dead character", () => {
  const bowman = new Bowerman("Legolas");
  bowman.health = 0;
  expect(() => bowman.levelUp()).toThrow(
    "It's impossible to level up for a dead person"
  );
});

test("damage reduces health", () => {
  const bowman = new Bowerman("Legolas");
  const initialHealth = bowman.health;
  bowman.damage(50);
  const expectedHealth = initialHealth - 50 * (1 - bowman.defence / 100);
  expect(bowman.health).toBe(expectedHealth);
});

test("damage does not go below zero", () => {
  const bowman = new Bowerman("Legolas");
  bowman.health = 5;
  bowman.damage(10);
  expect(bowman.health).toBe(0);
});

test("damage does nothing if dead", () => {
  const bowman = new Bowerman("Legolas");
  bowman.health = 0;
  expect(() => bowman.damage(50)).toThrow("Person is dead");
});
