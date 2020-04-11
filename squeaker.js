Hooks.on("init", () => {
  game.settings.register("squeaker", "chatSound", {
    name: "Chat Sound file link",
    scope: "world",
    config: true,
    default: "modules/squeaker/squeak.wav",
    type: String,
    hint:
      "The default squeaking is provided to you by InspectorJ from freesound.org, replace by sounds/notify.wav if you're no fun.",
  });

  game.settings.register("squeaker", "enableChat", {
    name: "Enable chat sound",
    hint: "If set to false there won't be any chat sound.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("squeaker", "chatActive", {
    name: "Disable chat sound when the chat is visible",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register("squeaker", "rollSound", {
    name: "Roll Sound file link",
    scope: "world",
    config: true,
    default: "sounds/dice.wav",
    type: String,
  });

  game.settings.register("squeaker", "enableRoll", {
    name: "Enable dice roll sound",
    hint: "If set to false there won't be any dice sound.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("squeaker", "rollActive", {
    name: "Disable roll sound when the chat is visible",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
});

Hooks.on("renderChatMessage", (msg, html) => {
  let chatIsActive = ui.sidebar.activeTab == "chat";
  if (msg.isRoll) {
    if (game.settings.get("squeaker", "enableRoll") && (!chatIsActive || !game.settings.get("squeaker", "rollActive"))) {
      msg.data.sound = game.settings.get("squeaker", "rollSound");
    } else {
      msg.data.sound = null;
    }
  } else {
    if (game.settings.get("squeaker", "enableChat") && (!chatIsActive || !game.settings.get("squeaker", "chatActive"))) {
      msg.data.sound = game.settings.get("squeaker", "chatSound");
    } else {
      msg.data.sound = null;
    }
  }
  console.log(msg);
});
