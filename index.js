import BaseModule from "./structures/BaseModule.js";

export default class Moderation extends BaseModule {
  /**
   * @param {Main} main
   */
  constructor(main) {
    super(main);

    this.register(Moderation, {
      name: "moderation",
    });
  }

  init() {
    this.modules.commandRegistrar.registerCommands('moderation', import.meta.url);

    return true;
  }
}
