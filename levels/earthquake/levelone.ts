import { EventController, GameObj, KaboomCtx } from "kaplay";
import { RefObject } from "react";
import generatePDF from "react-to-pdf";
import { toPng } from "html-to-image";

const pathway_width = 272;
const pathway_height = 48;

function progressBar(k: KaboomCtx) {
  const bar = k.make([
    k.rect(k.width() * 0.8, 10, {
      radius: 16,
    }),
    k.outline(2, k.Color.fromHex("#000000")),
    k.pos(k.center().x, 20),
    k.anchor("center"),
    k.area(),
    k.color(k.Color.RED),
    k.fixed(),
    k.z(10),
    {
      tick(survivalTime: number, maxSurvialtime = 30) {
        bar.width =
          ((maxSurvialtime - survivalTime) / maxSurvialtime) * k.width() * 0.8;
        bar.height = 10;
        bar.color =
          survivalTime / maxSurvialtime < 0.33
            ? k.Color.RED
            : survivalTime / maxSurvialtime < 0.66
              ? k.Color.YELLOW
              : survivalTime / maxSurvialtime <= 1
                ? k.Color.fromHex("#008000")
                : k.Color.BLACK;
      },
    },
  ]);
  return bar;
}

function WinScreen(k: KaboomCtx) {
  const winScreen = k.make([
    k.sprite("Win Screen"),
    k.pos(k.center()),
    k.anchor("center"),
    k.scale(0.5),
    k.fixed(),
  ]);
  return winScreen;
}

function makeStart(k: KaboomCtx) {
  const start = k.make([
    k.sprite("Start"),
    k.anchor("center"),
    k.area(),
    k.scale(5),
    k.fixed(),
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
    k.fixed(),
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
    k.fixed(),
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
        if (player.curAnim() != "idle") player.play("idle");
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

export default function levelOne(
  k: KaboomCtx,
  certificate: RefObject<HTMLElement | null>,
) {
  k.setGravity(2400);

  const map = k.add([
    k.sprite("Earthquake Background"),
    k.pos(0, 0),
    k.fixed(),
  ]);
  k.add([k.sprite("Road"), k.pos(0, 0), k.scale(1, 0.73)]);

  map.add([
    k.rect(k.width(), 60),
    k.color(k.Color.fromHex("#000000")),
    k.opacity(1),
    k.area(),
    k.pos(0, k.height() - 60),
    k.body({ isStatic: true }),
    "ground",
  ]);

  let debrisInterval: NodeJS.Timeout | undefined = undefined;
  let gameInterval: NodeJS.Timeout | undefined = undefined;

  k.wait(0.25, () => {
    const player = map.add(makePlayer(k, certificate));
    player.setUpControls();

    let debrisArray: GameObj[] = [];
    let explosionArray: GameObj[] = [];
    let obstacleArray = [];
    let debrisMaxCt = 10;
    let obstacleCt = 4;
    let asteroidSprites = ["tile000", "tile001"];

    const bar = map.add(progressBar(k));

    // Obstacles
    for (let i = 0; i < obstacleCt; i++) {
      const angle = ((Math.random() - 0.5) * 8 * Math.PI) / 180;
      obstacleArray.push(
        map.add([
          k.sprite("Scaffold"),
          k.scale(0.85, 1),
          k.area(),
          k.pos(
            ((k.width() - pathway_width) * i) / (obstacleCt - 1),
            k.height() -
              60 -
              pathway_height +
              Math.abs(Math.sin(angle) * pathway_height),
          ),
          k.rotate((Math.random() - 0.5) * 30),
          k.body({
            isStatic: true,
          }),
          "ground",
        ]),
      );
    }

    let maxSurvialtime = 30;
    let survivalTime = 0;

    gameInterval = setInterval(() => {
      bar.tick(survivalTime);
      if (survivalTime >= maxSurvialtime) {
        clearInterval(debrisInterval);
        debrisArray.forEach((debris) => {
          debris.destroy();
        });

        player.victory();
        clearInterval(gameInterval);
      } else {
        survivalTime++;
      }
    }, 1000);

    debrisInterval = setInterval(() => {
      if (debrisArray.length < debrisMaxCt) {
        obstacleArray.forEach((obstacle) => {
          k.tween(
            obstacle.pos.x,
            obstacle.pos.x + (Math.random() - 0.5) * 8,
            0.12,
            (val) => (obstacle.pos.x = val),
            k.easings.linear,
          );
        });
        k.shake(8);
        const debris = map.add([
          k.sprite(asteroidSprites[Math.ceil(Math.random() - 0.5)]),
          k.scale(1.5),
          k.pos(player.pos.x, -60),
          k.area(),
          k.rotate(Math.random() * 180),
          {
            speed: Math.floor(Math.random() * 2),
          },
          k.fixed(),
        ]);

        k.tween(
          debris.pos.y,
          k.height(),
          debris.speed,
          (val) => (debris.pos.y = val),
          k.easings.linear,
        );

        debris.onCollide("player", () => {
          clearInterval(debrisInterval);
          clearInterval(gameInterval);
          player.death();
        });

        debris.onCollide("ground", () => {
          const pos = debris.pos;
          debris.destroy();

          const explosion = k.add([
            k.sprite("Explosion", {
              anim: "explode",
            }),
            k.pos(pos),
            k.scale(4),
            k.fixed(),
          ]);

          explosionArray.push(explosion);
          debrisArray = debrisArray.filter((d) => d !== debris);
        });

        explosionArray = explosionArray.filter((explosion) => {
          if (explosion.curAnim() !== "explode") {
            explosion.destroy();
            return false;
          }
          return true;
        });
        debrisArray.push(debris);
      }
    }, 500);
  });
}
