class Particle {
  effect: any;
  size: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  vx: number;
  vy: number;
  ease: number;
  dx: number;
  dy: number;
  distance: number;
  force: number;
  angle: number;
  friction: number;

  constructor(effect: any, x: number, y: number, color: string) {
    this.effect = effect;
    this.size = this.effect.gap - 0;
    this.x = Math.random() * this.effect.width * 1;
    this.y = Math.random() * this.effect.height * 1;

    this.originX = Math.floor(x);
    this.originY = Math.floor(y);
    this.color = color;
    this.vx = 0;
    this.vy = 0;
    this.ease = Math.random() * 0.08 + 0.02;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.force = 0;
    this.angle = 0;
    this.friction = 0.1;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.dx = this.effect.mouse.x - this.x;
    this.dy = this.effect.mouse.y - this.y;
    this.distance = this.dx * this.dx + this.dy * this.dy;

    this.force = (-this.effect.mouse.radius / this.distance) * 4;

    if (this.distance < this.effect.mouse.radius) {
      this.angle = Math.atan2(this.dy, this.dx);
      this.vx += this.force * Math.cos(this.angle);
      this.vy += this.force * Math.sin(this.angle);
    }

    this.x += (this.vx *= this.friction) + (this.originX - this.x) * this.ease;
    this.y += (this.vy *= this.friction) + (this.originY - this.y) * this.ease;
  }

  warp() {
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.ease = Math.random() * 0.08 + 0.02;
  }
}

export class Effect {
  lastFrameTime: number;
  frameRate: number;
  width: number;
  height: number;
  particlesArray: Particle[];
  image: HTMLImageElement;
  centerX: number;
  centerY: number;
  x: number;
  y: number;
  gap: number;
  mouse: { radius: number; x: number | undefined; y: number | undefined };

  constructor(width: number, height: number) {
    this.lastFrameTime = performance.now();
    this.frameRate = 0;
    this.width = width;
    this.height = height;
    this.particlesArray = [];
    this.image = document.getElementById("image1") as HTMLImageElement;
    this.centerX = this.width * 0.5;
    this.centerY = this.height * 0.5;

    this.x = this.centerX - this.image.width * 0.5;
    this.y = this.centerY - this.image.height * 0.5;
    this.gap = 2;
    this.mouse = {
      radius: 10000,
      x: undefined,
      y: undefined,
    };
    window.addEventListener("mousemove", (e: MouseEvent) => {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    });
  }

  init(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y);

    const pixels = context.getImageData(0, 0, this.width, this.height).data;
    context.clearRect(0, 0, this.width, this.height);
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 0) {
          const red = pixels[index];
          const green = pixels[index + 1];
          const blue = pixels[index + 2];
          const color = "rgb(" + red + "," + green + "," + blue + ")";
          this.particlesArray.push(new Particle(this, x, y, color));
        }
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.particlesArray.forEach((particle) => particle.draw(context));

    // Display the frame rate
    /* context.fillStyle = "white ";
    context.font = "15px Times New Roman";
    context.fillText(`FPS : ${Math.round(this.frameRate)}`, 1450, 30);*/
  }

  update() {
    /*const now = performance.now();
    const deltaTime = now - this.lastFrameTime;
    this.frameRate = 1000 / deltaTime;
    this.lastFrameTime = now;*/

    this.particlesArray.forEach((particle) => particle.update());
  }

  warp() {
    this.particlesArray.forEach((particle) => particle.warp());
  }
}
