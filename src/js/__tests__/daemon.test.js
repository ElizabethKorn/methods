import Daemon from "../daemon";

test("should create a valid Daemon", () => {
  const daemon = new Daemon("Merlin");
  const correct = {
    name: "Merlin",
    type: "Daemon",
    health: 100,
    level: 1,
    attack: 10,
    defence: 40,
  };
  expect(daemon).toEqual(correct);
});

test("should level up character", () => {
  const daemon = new Daemon("Merlin");
  daemon.levelUp();
  const correct = {
    name: "Merlin",
    type: "Daemon",
    health: 100,
    level: 2,
    attack: 10 * 1.2,
    defence: 40 * 1.2,
  };

  expect(daemon).toEqual(correct);
});

test("should not level up dead character", () => {
  const daemon = new Daemon("Merlin");
  daemon.health = 0;
  expect(() => daemon.levelUp()).toThrow(
    "It's impossible to level up for a dead person"
  );
});

test("damage reduces health", () => {
  const daemon = new Daemon("Merlin");
  const initialHealth = daemon.health;
  daemon.damage(50);
  const expectedHealth = initialHealth - 50 * (1 - daemon.defence / 100);
  expect(daemon.health).toBe(expectedHealth);
});

test("damage does not go below zero", () => {
  const daemon = new Daemon("Merlin");
  daemon.health = 5;
  daemon.damage(10);
  expect(daemon.health).toBe(0);
});

test("damage does nothing if dead", () => {
  const daemon = new Daemon("Merlin");
  daemon.health = 0;
  expect(() => daemon.damage(50)).toThrow("Person is dead");
});
