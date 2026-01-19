import { EventController, GameObj, KaboomCtx, Vec2 } from "kaplay";
import { toPng } from "html-to-image";
import { RefObject } from "react";

const pathway_width = 320;
const pathway_height = 48;

function WinScreen(k: KaboomCtx) {
  const winScreen = k.make([
    k.sprite("Win Screen"),
    k.pos(k.center()),
    k.anchor("center"),
    k.scale(0.5),
  ]);
  return winScreen;
}

function makeStart(k: KaboomCtx) {
  const start = k.make([
    k.sprite("Start"),
    k.anchor("center"),
    k.area(),
    k.scale(5),
    k.pos(k.center().x - 50, k.center().y),
    {
      action() {
        k.go("main");
      },
    },
  ]);

  start.onClick(() => {
    start.action();
  });
  return start;
}

function makeRestart(k: KaboomCtx) {
  const restart = k.make([
    k.sprite("Restart"),
    k.anchor("center"),
    k.area(),
    k.scale(5),
    k.pos(k.center().x + 50, k.center().y),
    {
      action() {
        k.go("Level I");
      },
    },
  ]);

  restart.onClick(() => {
    restart.action();
  });
  return restart;
}

function makeShare(k: KaboomCtx, certificate: RefObject<HTMLElement | null>) {
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

  btn.add([k.sprite("Share"), k.pos(0, 0), k.anchor("center")]);

  btn.onClick(() => {
    const node = certificate.current;
    if (!node) return;

    toPng(certificate.current || document.createElement("div"), {
      cacheBust: true,
      skipFonts: true,
      width: 1280,
      height: 720,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return btn;
}

function flood(k: KaboomCtx) {
  const flood = k.make([
    k.rect(k.width(), k.height()),
    k.color(k.Color.fromHex("#25448b")),
    k.pos(0, k.height()),
    k.area({
      shape: new k.Rect(k.vec2(0, 0), k.width(), k.height()),
    }),
    k.z(10),
    {
      tween: undefined,
      moveFlood() {
        if (!flood.tween) {
          flood.tween = k.tween(
            flood.pos.y,
            0,
            10,
            (val) => (flood.pos.y = val),
            k.easings.linear,
          );

          flood.onCollide("player", () => {
            flood.tween?.cancel();
          });
        }
      },
    },
    "flood",
  ]) as GameObj;

  const x_sprite_ct = Math.ceil(k.width() / 600);

  for (let i = 0; i < x_sprite_ct; i++) {
    flood.add([k.sprite("Flood Water"), k.pos(i * 600, Math.random() * -8)]);
  }

  return flood;
}

function makePlayer(k: KaboomCtx, certificate: RefObject<HTMLElement | null>) {
  const speed = 5;
  const player = k.make([
    k.sprite("Player", {
      anim: "idle",
    }),
    k.area(),
    k.body(),
    k.pos(k.center().x, k.height() - 100),
    k.z(1),
    {
      alive: true,
      inputControllers: [],
      jumping: false,
      climbing: false,
      death() {
        player.alive = false;
        player.play("idle");
        player.disableControls();

        k.add(makeStart(k));
        k.add(makeRestart(k));

        player.destroy();
      },
      setUpControls() {
        player.inputControllers.push(
          k.onKeyDown("d", () => {
            if (player.curAnim() != "run") player.play("run");
            if (player.flipX) player.flipX = false;
            player.pos.x = Math.min(
              k.width() - player.width,
              player.pos.x + speed,
            );
          }),
        );

        player.inputControllers.push(
          k.onKeyRelease("d", () => {
            player.play("idle");
          }),
        );

        player.inputControllers.push(
          k.onKeyDown("a", () => {
            if (player.curAnim() != "run") player.play("run");
            if (!player.flipX) player.flipX = true;
            player.pos.x = Math.max(0, player.pos.x - speed);
          }),
        );

        player.inputControllers.push(
          k.onKeyRelease("a", () => {
            player.play("idle");
          }),
        );

        player.inputControllers.push(
          k.onKeyPress("w", () => {
            if (!player.jumping) {
              if (player.curAnim() != "jump") player.play("jump");
              player.jumping = true;
              player.jump();
            }
          }),
        );

        player.inputControllers.push(
          k.onKeyPress("e", () => {
            if (!player.climbing) {
              player.climbing = true;
            }
          }),
        );

        player.inputControllers.push(
          k.onKeyRelease("e", () => {
            if (player.climbing) {
              player.climbing = false;
            }
          }),
        );

        player.onCollide("ground", () => {
          player.jumping = false;
        });

        player.onCollide("flood", () => {
          if (player.alive) player.death();
        });
      },

      disableControls() {
        player.inputControllers.forEach((controller: EventController) => {
          controller.cancel();
        });
      },

      victory() {
        player.disableControls();
        k.add(WinScreen(k));
        k.add(makeRestart(k));
        k.add(makeStart(k));
        k.add(makeShare(k, certificate));
      },
    },
    "player",
  ]) as GameObj;
  return player;
}

function pathway(k: KaboomCtx, pos: Vec2) {
  const pathway = k.make([
    k.sprite("Scaffold"),
    k.pos(pos),
    k.area(),
    k.body({
      isStatic: true,
    }),
    k.scale(1, 1),
    "ground",
  ]);

  return pathway;
}

export default function levelOne(
  k: KaboomCtx,
  certificate: RefObject<HTMLElement | null>,
) {
  k.setGravity(2400);
  const map = k.add([k.sprite("Flood Background"), k.pos(0, 0), k.fixed()]);
  map.add([
    k.rect(k.width(), 60),
    k.pos(0, k.height() - 60),
    k.color(k.Color.BLACK),
    k.area(),
    k.body({
      isStatic: true,
    }),
    "ground",
  ]);

  k.wait(0.25, () => {
    const player = map.add(makePlayer(k, certificate));
    player.setUpControls();

    const floodObj = map.add(flood(k));
    floodObj.moveFlood();

    let pathway_array = [];
    pathway_array.push(
      map.add(
        pathway(k, k.vec2(k.center().x, k.height() - 60 - pathway_height)),
      ),
    );

    1;
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(
            k.width() - pathway_width,
            k.height() - 124 - pathway_height / 2,
          ),
        ),
      ),
    );

    // 2
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(k.center().x - 40, k.height() - 180 - pathway_height / 2),
        ),
      ),
    );

    // 3
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(
            k.center().x - 100 - pathway_width,
            k.height() - 240 - pathway_height / 2,
          ),
        ),
      ),
    );

    // 4
    pathway_array.push(
      map.add(
        pathway(k, k.vec2(k.center().x, k.height() - 300 - pathway_height)),
      ),
    );

    // 5
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(
            k.center().x + pathway_width,
            k.height() - 300 - pathway_height,
          ),
        ),
      ),
    );

    //6
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(k.width() - pathway_width, k.height() - 360 - pathway_height),
        ),
      ),
    );

    const ladder = map.add([
      k.sprite("Ladder"),
      k.pos(k.width() - 60, k.height() - 360 - 256 - pathway_height),
      k.scale(2, 2),
      k.area(),
      "ladder",
    ]) as GameObj;

    const ladder_highlight = ladder.add([
      k.rect(20, 20, {
        radius: 4,
      }),
      k.color(k.Color.BLACK),
      k.outline(2, k.Color.WHITE),
      k.pos(4, ladder.height - 36),
      k.opacity(0),
    ]) as GameObj;

    const ladder_highlight_text = ladder_highlight.add([
      k.text("E", {
        size: 8,
        font: "orbitron",
      }),
      k.anchor("center"),
      k.pos(10, 10),
      k.opacity(0),
    ]);

    k.onUpdate(() => {
      if (ladder.isColliding(player)) {
        ladder_highlight.opacity = 1;
        ladder_highlight_text.opacity = 1;
        if (player.climbing) {
          player.gravityScale = 0;
          player.pos.y -= 1;
        }
      } else {
        ladder_highlight.opacity = 0;
        ladder_highlight_text.opacity = 0;
        player.gravityScale = 1;
      }
    });

    // 7
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(
            k.width() - 60 - pathway_width,
            k.height() - 360 - 256 - pathway_height,
          ),
        ),
      ),
    );

    // 8
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(
            k.width() - 60 - 2 * pathway_width,
            k.height() - 360 - 256 - pathway_height,
          ),
        ),
      ),
    );

    // 9
    pathway_array.push(
      map.add(
        pathway(
          k,
          k.vec2(
            k.width() - 60 - 3 * pathway_width,
            k.height() - 360 - 256 - pathway_height,
          ),
        ),
      ),
    );

    // Victory Pad
    const victory_pad = map.add([
      k.rect(200, pathway_height),
      k.pos(
        k.width() - 260 - 3 * pathway_width,
        k.height() - 360 - 256 - pathway_height,
      ),
      k.color(k.Color.BLACK),
      k.area(),
      k.body({
        isStatic: true,
      }),
      "ground",
      "victory_pad",
    ]);

    victory_pad.add([k.rect(5, 30), k.pos(0, -30), k.color(k.Color.BLACK)]);

    const flag = victory_pad.add([
      k.sprite("Flag"),
      k.scale(2),
      k.pos(0, -30),
      k.area(),
    ]);

    flag.onCollide("player", () => {
      floodObj.tween?.cancel();
      player.victory();
    });
  });
}
