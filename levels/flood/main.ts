import { KaboomCtx } from "kaplay";

function DescriptionCard(
  k : KaboomCtx,
  heading = "Description Heading",
  content = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero officia consequatur laboriosam. Aliquid minima hic, voluptates deleniti vero, sint sunt excepturi beatae labore pariatur eaque, ipsamaspernatur adipisci ad magnam.",
  action : () => void
) {
  const card = k.make([
    k.rect(k.width() * 0.75, k.height() * 0.75, {
      radius: 16,
    }),
    k.anchor("center"),
    k.pos(k.center()),
    k.color(k.Color.CYAN),
    k.outline(2, k.Color.BLUE),
  ]);

  card.add([
    k.text(`${heading}`, {
      size: 36,
      width: k.width() * 0.33,
      font: "doto",
      align: "center",
    }),
    k.color(k.Color.BLACK),
    k.anchor("top"),
    k.pos(0, -card.height / 2 + 50),
  ]);

  card.add([
    k.text(`${content}`, {
      size: 16,
      width: k.width() * 0.7,
      align: "center",
    }),
    k.color(k.Color.BLACK),
    k.anchor("center"),
    k.pos(0, 0),
  ]);

  const btn = card.add([
    k.rect(200, 80, {
      radius: 16,
    }),
    k.area(),
    k.outline(2, k.Color.BLACK),
    k.color(k.Color.BLUE),
    k.anchor("bot"),
    k.pos(0, k.height() / 2 - 120),
  ]);

  btn.add([
    k.text("Continue", {
      size: 28,
      width: 150,
      font: "orbitron",
      align: "center",
    }),
    k.color(k.Color.WHITE),
    k.anchor("center"),
    k.pos(0, -36),
  ]);

  btn.onClick(() => {
    k.tween(
      btn.pos.y,
      k.height() + card.height,
      0.5,
      (val) => (card.pos.y = val),
      k.easings.easeInQuad
    );
    k.wait(0.5, () => {
      action();
      card.destroy();
    });
  });

  return card;
}
function StartButton(k : KaboomCtx) {
  const btn = k.make([
    k.rect(300, 80, {
      radius: 16,
    }),
    k.color(k.Color.BLACK),
    k.outline(2, k.Color.WHITE),
    k.anchor("center"),
    k.pos(k.center()),
    k.area(),
  ]);

  btn.add([
    k.text("Start", {
      font: "doto",
      size: 48,
    }),
    k.anchor("center"),
  ]);

  btn.onClick(() => {
    k.tween(
      btn.pos.y,
      k.height() + btn.height,
      0.5,
      (val) => (btn.pos.y = val),
      k.easings.easeInOutQuad
    );

    k.wait(0.5, () => {
      k.add(
        DescriptionCard(
          k,
          "Level I",
          "As the alarms blare, a single voice crackles over the radio: This is command. The seawall is breached. Floodwaters are rising fast. Get to the rooftop and await rescue. You have less than a minute before this building is completely submerged. Go! Go! Go! The signal cuts out as the player, soaked and disoriented, finds themselves on the ground floor of a high-rise, with a rapidly rising tide swirling around their knees. The only way out is up.",
          () => {
            k.go("Level I");
          }
        )
      );
    });
  });

  return btn;
}

function homeButton(k : KaboomCtx) {
  const btn = k.make([
    k.rect(80, 80, {
      radius: 16,
    }),
    k.color(k.Color.BLACK),
    k.outline(2, k.Color.WHITE),
    k.anchor("center"),
    k.pos(k.width() - 48, k.height() - 48),
    k.area(),
  ]);

  btn.add([k.sprite("Exit"), k.scale(2), k.pos(0, 0), k.anchor("center")]);

  btn.onClick(() => {
    window.location.href = "/";
  });

  return btn;
}

export default function makeFlood(k : KaboomCtx) {
  const map = k.add([k.sprite("Flood Background"), k.pos(0, 0), k.fixed()]);
  map.add(StartButton(k));
  map.add(homeButton(k));
}
