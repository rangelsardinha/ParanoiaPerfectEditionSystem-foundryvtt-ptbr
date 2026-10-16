import { getAllPlayerCharacters } from "../utils/foundryUtils.mjs";

/**
 * A GM-only application for creating and distributing a Paranoia Treason Circle.
 * @extends {FormApplication}
 */
export class TreasonCircleApp extends FormApplication {
  constructor(options = {}) {
    super(options);
    this._firstRender = true;
    this.allPlayerCharacters = [];
    this.circleEntries = [];
  }

  /**
   * Internal counter for unique row IDs.
   * @private
   */
  _nextRowId = 0;

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "paranoia-treason-circle-architect",
      title: game.i18n.localize("PARANOIA.TreasonCircleTitle"),
      template: "systems/paranoia/templates/apps/treason-circle-sheet.hbs",
      width: 960,
      height: 720,
      resizable: true,
      submitOnChange: false,
      submitOnClose: false,
      classes: ["paranoia-app", "treason-circle"],
    });
  }

  /**
   * @override
   * We override render to check for GM permissions before proceeding.
   * This prevents the application from being rendered for non-GM users.
   */
  render(force, options) {
    if (!game.user.isGM) {
      ui.notifications.error(game.i18n.localize("PARANOIA.OnlyGM"));
      return;
    }
    return super.render(force, options);
  }

  /**
   * @override
   * We override _render to force a reposition on the first draw.
   * This solves a Foundry VTT quirk where windows with dynamic content
   * can sometimes render in the top-left corner initially before snapping
   * to the center on a resize.
   */
  async _render(force, options) {
    await super._render(force, options);

    if (this._firstRender) {
      this.setPosition();
      this._firstRender = false;
    }
  }

  /**
   * Prepare the data for the template.
   * It fetches all non-GM users who have an assigned character.
   * @override
   */
  async getData() {
    this.allPlayerCharacters = getAllPlayerCharacters();
    console.log("Paranoia Comparison | All Player Characters:", this.allPlayerCharacters);
    console.log(getAllPlayerCharacters());
    console.log(game.actors.filter((a) => a.hasPlayerOwner));
  }

  /**
   * Dynamically calculates and applies the optimal width for dropdown columns.
   * This makes the layout more efficient by not overallocating space to dropdowns.
   * @private
   */
  _updateColumnWidths() {
    if (!this.allPlayerCharacters || this.allPlayerCharacters.length === 0) return;

    // Find the longest character name to use as a measuring stick.
    const longestName = this.allPlayerCharacters.reduce((long, char) => {
      return char.name.length > long.length ? char.name : long;
    }, "");

    if (!longestName) return;

    const ruler = document.createElement("span");
    ruler.style.font = "var(--font-size-12, 12px) var(--font-family-sans-serif)";
    ruler.style.visibility = "hidden";
    ruler.style.position = "absolute";
    ruler.style.whiteSpace = "nowrap";
    ruler.innerHTML = longestName;
    document.body.appendChild(ruler);

    const textWidth = ruler.offsetWidth;
    document.body.removeChild(ruler);

    const selectWidth = textWidth + 40;

    const styleId = `treason-circle-style-${this.appId}`;
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    const cssRule = `
      .app[data-appid="${this.appId}"] .treason-entry {
        grid-template-columns: ${selectWidth}px 1.5fr ${selectWidth}px 2fr auto;
      }
    `;
    styleEl.innerHTML = cssRule;
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find(".add-row-button").click(this._onAddRow.bind(this));

    html.on("click", ".remove-row-button", this._onRemoveRow.bind(this));

    this._updateColumnWidths();

    if (this.element.find(".treason-entry").length === 0) {
      this._onAddRow();
    }
  }

  /**
   * Handles adding a new treason circle entry row.
   * @private
   */
  _onAddRow() {
    const rowContainer = this.element.find(".treason-entries-container");
    const newRowId = this._nextRowId++;

    const newRowHtml = `
      <div class="treason-entry" data-row-id="${newRowId}">
          <div class="form-group"><select name="character-${newRowId}">${this.allPlayerCharacters.map((char) => `<option value="${char.id}">${char.name}</option>`).join("")}</select></div>
          <div class="form-group"><textarea name="culpable-act-${newRowId}" rows="1" placeholder="${game.i18n.localize("PARANOIA.CulpableActPlaceholder")}"></textarea></div>
          <div class="form-group"><select name="suspect-${newRowId}">${this.allPlayerCharacters.map((char) => `<option value="${char.id}">${char.name}</option>`).join("")}</select></div>
          <div class="form-group"><textarea name="how-they-know-${newRowId}" rows="1" placeholder="${game.i18n.localize("PARANOIA.HowTheyKnowPlaceholder")}"></textarea></div>
          <button type="button" class="remove-row-button" title="${game.i18n.localize("PARANOIA.RemoveEntry")}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    rowContainer.append(newRowHtml);
  }

  async _updateObject(event, formData) {
    const { big_treason } = formData;

    if (!big_treason) {
      return ui.notifications.error(game.i18n.localize("PARANOIA.PrimaryTreasonEmpty"));
    }

    const treasonCircleData = {};
    for (const key in formData) {
      if (key.startsWith("character-")) {
        const id = key.split("-")[1];
        treasonCircleData[id] = treasonCircleData[id] || {};
        treasonCircleData[id].characterId = formData[key];
      } else if (key.startsWith("culpable-act-")) {
        const id = key.split("-")[2];
        treasonCircleData[id] = treasonCircleData[id] || {};
        treasonCircleData[id].culpableAct = formData[key];
      } else if (key.startsWith("suspect-")) {
        const id = key.split("-")[1];
        treasonCircleData[id] = treasonCircleData[id] || {};
        treasonCircleData[id].suspectId = formData[key];
      } else if (key.startsWith("how-they-know-")) {
        const id = key.split("-")[3];
        treasonCircleData[id] = treasonCircleData[id] || {};
        treasonCircleData[id].howTheyKnow = formData[key];
      }
    }

    const entries = Object.values(treasonCircleData);

    if (entries.length === 0) {
      return ui.notifications.warn(game.i18n.localize("PARANOIA.NoTreasonEntries"));
    }

    let whispersSent = 0;

    for (const entry of entries) {
      const character = game.actors.get(entry.characterId);
      const suspect = game.actors.get(entry.suspectId);
      const howTheyKnow = entry.howTheyKnow || "";

      if (!character || !suspect || !entry.culpableAct) {
        console.warn(`Paranoia | Skipping whisper for incomplete entry:`, entry);
        continue;
      }

      const playerUser = game.users.find((u) => u.character?.id === character.id);
      if (!playerUser) {
        ui.notifications.warn(
          game.i18n.format("PARANOIA.NoPlayerForCharacter", { name: character.name }),
        );
        continue;
      }

      const howTheyKnowText = howTheyKnow ? `<br><em>${howTheyKnow}</em>` : "";
      const whisperContent = `
                <div class="paranoia">
                    <div class="paranoia-container">
                        <h3 class="paranoia-header"><i class="fas fa-user-secret"></i> ${game.i18n.localize("PARANOIA.TreasonAlert")}</h3>
                        <p><strong>${game.i18n.localize("PARANOIA.TreasonAlertBody")}</strong></p>
                    </div>
                    <div class="paranoia-container">
                        <h3 class="paranoia-header">${game.i18n.localize("PARANOIA.PrimaryTreasonAct")}</h3>
                        <p><em>${big_treason}</em></p>
                    </div>
                    <div class="paranoia-container">
                        <h3 class="paranoia-header">${game.i18n.localize("PARANOIA.CulpableAction")}</h3>
                        <p>${entry.culpableAct}</p>
                    </div>
                    <div class="paranoia-container">
                        <h3 class="paranoia-header">${game.i18n.localize("PARANOIA.CounterTreasonIntelligence")}</h3>
                        <p>${game.i18n.format("PARANOIA.KnowInvolvement", { name: `<strong>${suspect.name}</strong>` })}${howTheyKnowText}</p>
                    </div>
                    <div class="paranoia-container">
                        <p><em>${game.i18n.localize("PARANOIA.StayAlert")}</em></p>
                    </div>
                </div>`;

      ChatMessage.create({
        user: game.user.id,
        content: whisperContent,
        whisper: [playerUser.id],
      });

      whispersSent++;
    }

    if (whispersSent > 0) {
      ui.notifications.info(
        game.i18n.format("PARANOIA.TreasonWhispersSent", { count: whispersSent }),
      );
    } else {
      ui.notifications.error(game.i18n.localize("PARANOIA.NoWhispersSent"));
    }
  }

  /**
   * Handles removing a treason circle entry row.
   * @param {Event} event - The click event.
   * @private
   */
  _onRemoveRow(event) {
    const row = $(event.currentTarget).closest(".treason-entry");
    row.remove();
  }

  /** @override */
  async close(options) {
    const styleEl = document.getElementById(`treason-circle-style-${this.appId}`);
    if (styleEl) {
      styleEl.remove();
    }
    return super.close(options);
  }
}
