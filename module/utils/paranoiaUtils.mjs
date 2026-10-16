export function flagLevelToDescription(flagLevel) {
  switch (flagLevel) {
    case 4:
      return game.i18n.localize("PARANOIA.TreasonStatus.Wanted");
    case 3:
      return game.i18n.localize("PARANOIA.TreasonStatus.CitizenOfInterest");
    case 2:
      return game.i18n.localize("PARANOIA.TreasonStatus.Restricted");
    case 1:
      return game.i18n.localize("PARANOIA.TreasonStatus.Greylisted");
    case 0:
      return game.i18n.localize("PARANOIA.TreasonStatus.Loyal");
  }
}

export function healthLevelToDescription(healthLevel) {
  switch (healthLevel) {
    case 4:
      return game.i18n.localize("PARANOIA.HealthLevel.Fine");
    case 3:
      return game.i18n.localize("PARANOIA.HealthLevel.Hurt");
    case 2:
      return game.i18n.localize("PARANOIA.HealthLevel.Injured");
    case 1:
      return game.i18n.localize("PARANOIA.HealthLevel.Maimed");
    case 0:
      return game.i18n.localize("PARANOIA.HealthLevel.Dead");
  }
}
