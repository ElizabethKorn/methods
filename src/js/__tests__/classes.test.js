import Character from "../character";

test("initial values", () => {
  const character = new Character("Person", "Swordsman");
  expect(character.name).toBe("Person");
  expect(character.type).toBe("Swordsman");
  expect(character.health).toBe(100);
  expect(character.level).toBe(1);
  expect(character.attack).toBe(10);
  expect(character.defence).toBe(10);
});

test("should throw an error for invalid name length", () => {
  expect(() => new Character("R", "Bowman")).toThrow(
    "Имя должно быть строкой длиной от 2 до 10 символов"
  );
  expect(() => new Character("Rnsdkcndnvknkd", "Bowman")).toThrow(
    "Имя должно быть строкой длиной от 2 до 10 символов"
  );
});

test("should throw an error for invalid character type", () => {
  expect(() => new Character("Robin", "type")).toThrow(
    "Тип должен быть одним из следующих: Bowman, Swordsman, Magician, Daemon, Undead, Zombie"
  );
});

test("levelUp increases level and stats", () => {
  const character = new Character("Person", "Swordsman");
  const initialAttack = character.attack;
  const initialDefence = character.defence;
  character.levelUp();
  expect(character.level).toBe(2);
  expect(character.attack).toBeCloseTo(initialAttack * 1.2);
  expect(character.defence).toBeCloseTo(initialDefence * 1.2);
  expect(character.health).toBe(100);
});

test("levelUp raises error if dead", () => {
  const character = new Character("Person", "Swordsman");
  character.health = 0;
  expect(() => character.levelUp()).toThrow(
    "It's impossible to level up for a dead person"
  );
});

test("damage reduces health", () => {
  const character = new Character("Person", "Swordsman");
  const initialHealth = character.health;
  character.damage(10);
  const expectedHealth = initialHealth - 10 * (1 - character.defence / 100);
  expect(character.health).toBeCloseTo(expectedHealth);
});

test("damage does not go below zero", () => {
  const character = new Character("Person", "Swordsman");
  character.health = 5;
  character.damage(10);
  expect(character.health).toBe(0);
});

test("damage does nothing if dead", () => {
  const character = new Character("Person", "Swordsman");
  character.health = 0;
  expect(() => character.damage(10)).toThrow("Person is dead");
});
