export class SystemSettingsKeys {
  static get SYSTEM() {
    return "paranoia";
  }
  static get MAXIMUM_MOXIE() {
    return "maximumMoxie";
  }

  static get STARTING_XP() {
    return "startingXP";
  }

  static get ALLOW_NEGATIVE_XP() {
    return "allowNegativeXP";
  }
}

export function registerGameSettings() {
  game.settings.register(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.MAXIMUM_MOXIE, {
    name: "PARANOIA.MaximumMoxie",
    hint: "PARANOIA.MaximumMoxieHint",
    scope: "world",
    config: true,
    default: 8,
    type: Number,
    requiresReload: true,
  });

  game.settings.register(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.STARTING_XP, {
    name: "PARANOIA.StartingXP",
    hint: "PARANOIA.StartingXPHint",
    scope: "world",
    config: true,
    default: 200,
    type: Number,
    requiresReload: true,
  });

  game.settings.register(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.ALLOW_NEGATIVE_XP, {
    name: "PARANOIA.AllowNegativeXP",
    hint: "PARANOIA.AllowNegativeXPHint",
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    requiresReload: true,
  });
}
