Hooks.on("init", () => {
  game.settings.register("squeaker", "chatsound", {
    name: "Chat Sound file link",
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

  game.settings.register("squeaker", "active", {
    name: "Disable chat sound when the chat is visible",
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

  game.settings.register("squeaker", "rollactive", {
    name: "Disable roll sound when the chat is visible",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
});

Hooks.on("renderChatMessage", (msg, html) => {
  let chatIsActive = ui.sidebar.activeTab == "chat";
  if (
    !msg.isRoll &&
    (!chatIsActive || game.settings.get("squeaker", "active")) &&
    game.settings.get("squeaker", "enable")
  ) {
    msg.data.sound = game.settings.get("squeaker", "chatsound");
  } else if (
    game.settings.get("squeaker", "disableroll") ||
    (chatIsActive && game.settings.get("squeaker", "rollactive"))
  ) {
    msg.data.sound = null;
  }
});
