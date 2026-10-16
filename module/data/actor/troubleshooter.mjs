import { resourceField, skillField } from "../index.mjs";
import { SystemSettingsKeys } from "../../settings/settings.mjs";

export class ParanoiaTroubleshooterData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const { SchemaField, NumberField, StringField } = foundry.data.fields;
    const maximumMoxie = game.settings.get(
      SystemSettingsKeys.SYSTEM,
      SystemSettingsKeys.MAXIMUM_MOXIE,
    );
    const startingXP = game.settings.get(SystemSettingsKeys.SYSTEM, SystemSettingsKeys.STARTING_XP);

    return {
      health: resourceField(4, 4),
      flag: resourceField(0, 4),
      moxie: resourceField(8, maximumMoxie),
      team: new StringField(),
      mbd: new StringField(),
      serviceGroup: new StringField(),
      treasonButton: new StringField(),
      violenceButton: new StringField(),
      abilities: new SchemaField({
        brains: new SchemaField({
          label: new StringField({ initial: "Brains" }),
          value: new NumberField({ initial: 0 }),
          skills: new SchemaField({
            alphaComplex: skillField("Alpha Complex", 0),
            bureaucracy: skillField("Bureaucracy", 0),
            psychology: skillField("Psychology", 0),
            science: skillField("Science", 0),
          }),
        }),
        chutzpah: new SchemaField({
          label: new StringField({ initial: "Chutzpah" }),
          value: new NumberField({ initial: 0 }),
          skills: new SchemaField({
            bluff: skillField("Bluff", 0),
            charm: skillField("Charm", 0),
            intimidate: skillField("Intimidate", 0),
            stealth: skillField("Stealth", 0),
          }),
        }),
        mechanics: new SchemaField({
          label: new StringField({ initial: "Mechanics" }),
          value: new NumberField({ initial: 0 }),
          skills: new SchemaField({
            demolitions: skillField("Demolitions", 0),
            engineer: skillField("Engineer", 0),
            operate: skillField("Operate", 0),
            program: skillField("Program", 0),
          }),
        }),
        violence: new SchemaField({
          label: new StringField({ initial: "Violence" }),
          value: new NumberField({ initial: 0 }),
          skills: new SchemaField({
            athletics: skillField("Athletics", 0),
            guns: skillField("Guns", 2),
            melee: skillField("Melee", 0),
            throw: skillField("Throw", 0),
          }),
        }),
      }),
      xp: new NumberField({ initial: startingXP }),
      missionObjectives: new StringField({
        initial:
          "Quando receber sua missão, registre aqui o objetivo para não esquecer nada importante, cidadão!",
      }),
      assignedGear: new StringField({
        initial:
          "Liste aqui os equipamentos sob sua responsabilidade. Mantenha tudo em perfeito estado!",
      }),
      secrets: new SchemaField({
        aliases: new StringField({
          initial:
            "Liste suas identidades alternativas. Perfeito para quando precisar se misturar... ou se destacar!",
        }),
        secretObjective: new StringField({
          initial:
            "Registre sua missão secreta. Seja discreto; não queremos surpresas, não é mesmo?",
        }),
        serviceGroupFavors: new StringField({
          initial:
            "Registre os favores que seu Grupo de Serviço deve a você e os que você solicitou. A cooperação mantém o Complexo Alfa funcionando!",
        }),
        secretSociety: new StringField({
          initial:
            "Documente sua sociedade traidora. Lembre-se: revelar isso pode levar a diversão não autorizada!",
        }),
        mutantPower: new StringField({
          initial:
            "Anote suas habilidades proibidas. Lembre-se: mutações não autorizadas não são motivo de riso... a menos que sejam hilárias!",
        }),
        secretSocietyFavors: new StringField({
          initial:
            "Anote os favores da sua sociedade e os favores solicitados por outros membros. A lealdade traz benefícios... e às vezes, vidas extras!",
        }),
        treasonousGear: new StringField({
          initial: "Catalogue itens ilegais aqui. Não que você tenha algo assim, é claro.",
        }),
        evidence: new StringField({
          initial:
            "Registre evidências contra Traidores. Chantagem pode ser um exercício delicioso de integração da equipe!",
        }),
        notes: new StringField({
          initial:
            "Registre outros detalhes interessantes e potencialmente traiçoeiros. Um Traidor bem documentado é um Traidor bem preparado!",
        }),
      }),
    };
  }

  static migrateData(source) {
    const maximumMoxie = game.settings.get(
      SystemSettingsKeys.SYSTEM,
      SystemSettingsKeys.MAXIMUM_MOXIE,
    );
    if (source.moxie.value > maximumMoxie) {
      source.moxie.max = maximumMoxie;
    }
    if (source.moxie.value > source.moxie.max) {
      source.moxie.value = source.moxie.max;
    }
    return super.migrateData(source);
  }
}
