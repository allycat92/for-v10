Hooks.on("init", () => {
  game.settings.register("squeaker", "chatsound", {
    name: "Enable chat sound",
    hint: "If set to false there won't be any chat sound.",
    scope: "client",
    config: true,
    default: "modules/squeaker/squeak.wav",
    type: String,
    hint:
      "The default squeaking is provided to you by InspectorJ from freesound.org",
  });

  game.settings.register("squeaker", "enable", {
    name: "Enable chat sound",
    hint: "If set to false there won't be any chat sound.",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register("squeaker", "disableroll", {
    name: "Disable dice roll sound",
    hint: "If set to false there won't be any dice sound.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
});

Hooks.on("renderChatMessage", (msg, html) => {
  if (!msg.isRoll && game.settings.get("squeaker", "enable")) {
    msg.data.sound = game.settings.get("squeaker", "chatsound");
  } else if (game.settings.get("squeaker", "disableroll")) {
    msg.data.sound = null;
  }
});
