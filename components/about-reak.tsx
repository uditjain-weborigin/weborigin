"use client";

import Link from "next/link";
import { useRef, useEffect, useCallback, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useInView,
  useVelocity,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   WebGL Image Distortion  — exact port of image-gsl-effect.js
   Wave distortion + chromatic aberration on hover
───────────────────────────────────────────────────────────── */
function useWebGLHoverEffect(
  containerRef: React.RefObject<HTMLDivElement | null>,
  imgRef: React.RefObject<HTMLImageElement | null>,
) {
  const s = useRef({
    gl: null as WebGLRenderingContext | null,
    program: null as WebGLProgram | null,
    canvas: null as HTMLCanvasElement | null,
    texture: null as WebGLTexture | null,
    strength: 0,
    targetStrength: 0,
    mouseX: 0.5,
    mouseY: 0.5,
    time: 0,
    lastTime: 0,
    lastMouseMoveTime: 0,
    rafId: 0,
    vBuf: null as WebGLBuffer | null,
    uvBuf: null as WebGLBuffer | null,
    a: null as { pos: number; uv: number } | null,
    u: null as {
      tex: WebGLUniformLocation | null;
      time: WebGLUniformLocation | null;
      str: WebGLUniformLocation | null;
      mouse: WebGLUniformLocation | null;
      hover: WebGLUniformLocation | null;
    } | null,
  });

  const mkShader = useCallback(
    (gl: WebGLRenderingContext, type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    },
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;border-radius:inherit;";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl");
    if (!gl) {
      canvas.remove();
      return;
    }
    s.current.gl = gl;
    s.current.canvas = canvas;

    /* GLSL — identical to original */
    const vs = mkShader(
      gl,
      gl.VERTEX_SHADER,
      `attribute vec2 position;attribute vec2 aTexCoord;
       varying vec2 vTexCoord;
       void main(){vTexCoord=aTexCoord;gl_Position=vec4(position,0.0,1.0);}`,
    );
    const fs = mkShader(
      gl,
      gl.FRAGMENT_SHADER,
      `precision highp float;
       varying vec2 vTexCoord;
       uniform sampler2D uTexture;uniform float uTime;
       uniform float uStrength;uniform vec2 uMouse;uniform bool uHover;
       void main(){
         vec2 uv=vTexCoord;
         if(uHover){
           vec2 d=uv-uMouse;float dist=length(d);float angle=atan(d.y,d.x);
           float wave=sin(dist*15.0-angle*1.0)*0.02;
           float effect=uStrength*smoothstep(0.45,0.1,dist);
           vec2 off=normalize(d)*wave*effect;vec2 dp=uv+off;
           vec2 rd=normalize(d);float ra=0.02*effect;
           float r=texture2D(uTexture,dp+rd*ra).r;
           float g=texture2D(uTexture,dp).g;
           float b=texture2D(uTexture,dp-rd*ra).b;
           gl_FragColor=vec4(r,g,b,1.0);
         } else { gl_FragColor=texture2D(uTexture,uv); }
       }`,
    );
    if (!vs || !fs) {
      canvas.remove();
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);
    s.current.program = prog;
    s.current.a = {
      pos: gl.getAttribLocation(prog, "position"),
      uv: gl.getAttribLocation(prog, "aTexCoord"),
    };
    s.current.u = {
      tex: gl.getUniformLocation(prog, "uTexture"),
      time: gl.getUniformLocation(prog, "uTime"),
      str: gl.getUniformLocation(prog, "uStrength"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      hover: gl.getUniformLocation(prog, "uHover"),
    };
    s.current.vBuf = gl.createBuffer();
    s.current.uvBuf = gl.createBuffer();

    const resize = () => {
      const r = container.getBoundingClientRect();
      canvas.width = r.width * window.devicePixelRatio;
      canvas.height = r.height * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const loadTex = (image: HTMLImageElement) => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image,
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      s.current.texture = tex;
    };
    if (img.complete && img.naturalWidth) loadTex(img);
    else img.onload = () => loadTex(img);

    const onMouseMove = (e: MouseEvent) => {
      s.current.lastMouseMoveTime = performance.now();
      const r = img.getBoundingClientRect();
      if (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      ) {
        s.current.targetStrength = 1.0;
        s.current.mouseX = (e.clientX - r.left) / r.width;
        s.current.mouseY = 1.0 - (e.clientY - r.top) / r.height;
      } else {
        s.current.targetStrength = 0;
      }
    };
    document.addEventListener("mousemove", onMouseMove);

    s.current.lastTime = performance.now();
    const render = () => {
      const c = s.current;
      if (!c.gl || !c.program || !c.texture || !c.a || !c.u) {
        c.rafId = requestAnimationFrame(render);
        return;
      }
      const now = performance.now();
      const dt = Math.min((now - c.lastTime) / 1000, 1 / 30);
      c.lastTime = now;
      c.time += dt;

      if (c.targetStrength > 0 && now - c.lastMouseMoveTime > 100)
        c.targetStrength = 0;
      c.strength += (c.targetStrength - c.strength) * dt * 4.0;
      c.strength = Math.max(0, Math.min(1, c.strength));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);

      gl.bindBuffer(gl.ARRAY_BUFFER, c.vBuf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(c.a.pos);
      gl.vertexAttribPointer(c.a.pos, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, c.uvBuf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
        gl.STATIC_DRAW,
      );
      gl.enableVertexAttribArray(c.a.uv);
      gl.vertexAttribPointer(c.a.uv, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, c.texture);
      gl.uniform1i(c.u.tex, 0);
      gl.uniform1f(c.u.time, c.time);
      gl.uniform1f(c.u.str, c.strength);
      gl.uniform2f(c.u.mouse, c.mouseX, c.mouseY);
      gl.uniform1i(c.u.hover, c.strength > 0.01 ? 1 : 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      c.rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(s.current.rafId);
      document.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/* ─────────────────────────────────────────────────────────────
   ScrollWord — one word with bidirectional scroll-driven reveal
   Mirrors: GSAP SplitText { type:"words" } + scrub:0.7
───────────────────────────────────────────────────────────── */
function ScrollWord({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const rawOpacity = useTransform(progress, range, [0, 1]);
  const rawY = useTransform(progress, range, [20, 0]);
  const opacity = useSpring(rawOpacity, { stiffness: 80, damping: 20 });
  const y = useSpring(rawY, { stiffness: 80, damping: 20 });
  return (
    <motion.span
      style={{
        opacity,
        y,
        display: "inline-block",
        willChange: "transform, opacity",
      }}
      className="mr-[0.18em]"
    >
      {word}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────────────
   ScrollRevealHeading — splits heading into individually
   scroll-tracked words; stagger matches template's stagger:0.09
───────────────────────────────────────────────────────────── */
function ScrollRevealHeading({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "start 0.2"],
  });
  const words = text.split(" ");
  const total = words.length;
  const winSize = 0.22;
  const stagger = total > 1 ? (1 - winSize) / (total - 1) : 0;

  return (
    <h3
      ref={ref}
      className="about-section-title"
      aria-label={text}
      style={{
        position: "relative",
        fontWeight: 700,
        fontSize: "clamp(48px, 9vw, 144px)",
        lineHeight: 1.06,
        color: "#fff",
        fontFamily: "var(--font-heading), 'Funnel Display', sans-serif",
        margin: 0,
      }}
    >
      {words.map((word, i) => {
        const start = i * stagger;
        const end = Math.min(start + winSize, 1);
        return (
          <ScrollWord
            key={`${word}-${i}`}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </h3>
  );
}

/* ─────────────────────────────────────────────────────────────
   useCountUp — animates a number from 0 → end when scrolled in.
   Replaces PureCounter from the original template.
───────────────────────────────────────────────────────────── */
function useCountUp(end: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.round(progress * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, count };
}

/* ─────────────────────────────────────────────────────────────
   FunfactCard — one stat card matching sd-funfact-card styles
───────────────────────────────────────────────────────────── */
function FunfactCard({
  label,
  end,
  suffix,
  bgColor,
  hasImage,
  imageSrc,
  white,
}: {
  label: string;
  end: number;
  suffix: string;
  bgColor: string;
  hasImage: boolean;
  imageSrc?: string;
  white?: boolean;
}) {
  const { ref, count } = useCountUp(end);
  return (
    <div
      style={{
        position: "relative",
        padding: 30,
        borderRadius: 10,
        backgroundColor: bgColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 300,
        marginBottom: 30,
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* Background 3D shape image */}
      {hasImage && imageSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: -1,
            maxWidth: "80%",
            maxHeight: "85%",
            objectFit: "contain",
            objectPosition: "bottom right",
          }}
        />
      )}

      {/* Label — e.g. "YEARS OF EXPERIENCE" */}
      <span
        className="funfact-card-label"
        style={{ color: white ? "#fff" : "rgba(255,255,255,0.5)" }}
      >
        {label}
      </span>

      {/* Bottom row: big number + description */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4 style={{ margin: 0, color: "#fff", fontFamily: "inherit" }}>
          <i
            ref={ref as React.RefObject<HTMLElement>}
            className="funfact-title"
            style={{ color: "#fff" }}
          >
            {count}
          </i>
          {suffix}
        </h4>
        <p className="funfact-desc">
          Expertise that <br />
          drives meaningful results
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   RotatingFidgetShape — Slowly rotates, but speeds up on scroll
───────────────────────────────────────────────────────────── */
function RotatingFidgetShape() {
  const ref = useRef<HTMLImageElement>(null);
  // Only trigger speed boost when mostly in viewport
  const isInView = useInView(ref, { amount: 0.5 });

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const rotation = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    // Very slow default rotation (approx 60s for 360deg = 6deg/s)
    let speed = 6 * (delta / 1000);

    // If it's mostly in view, increase speed proportional to scroll velocity
    if (isInView) {
      // Math.abs() so it always spins forward, but just speeds up
      speed += Math.abs(smoothVelocity.get()) * 0.15 * (delta / 1000);
    }

    rotation.set(rotation.get() + speed);
  });

  return (
    <motion.img
      ref={ref}
      src="/images/funfact/team-2.png"
      alt=""
      aria-hidden
      style={{
        rotate: rotation,
        position: "absolute",
        top: "-25%",
        right: "16%",
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   AboutReak — main export
   Identical structure to index-5-dark.html § about area
───────────────────────────────────────────────────────────── */
export function AboutReak() {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  useWebGLHoverEffect(imgContainerRef, imgRef);

  const visionItems = [
    "Clear and focused strategy",
    "Design that drives impact",
    "Collaboration without the chaos",
    "Outcomes that build momentum",
    "Smart solutions, tailored for you",
  ];

  return (
    <>
      <section
        id="about"
        aria-label="About WebOrigin — Not just another agency"
        style={{
          position: "relative",
          paddingTop: 120,
          paddingBottom: 120,
          background: "#0d0d0d",
        }}
      >
        <div
          style={{
            maxWidth: 1750,
            margin: "0 auto",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          {/* ── Row 1: subtitle ── */}
          <div style={{ marginBottom: 0 }}>
            <div style={{ maxWidth: "33.33%" }}>
              <div style={{ marginBottom: 30 }}>
                {/* oit-section-subtitle: 500w 14px uppercase */}
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    lineHeight: 1.1,
                    display: "inline-block",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Not just another agency
                </span>
              </div>
            </div>
          </div>

          {/* ── Row 2: image + content ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 4fr) minmax(0, 8fr)",
              gap: "0 48px",
              alignItems: "flex-end",
            }}
            className="about-grid-responsive"
          >
            {/* ── LEFT: Image with WebGL effect ── */}
            <div>
              {/* image-gsl wrapper */}
              <div
                ref={imgContainerRef}
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                {/* The canvas is injected here by useWebGLHoverEffect */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src="/images/about/ab-2-1.jpg"
                  alt="WebOrigin team - not just another agency"
                  crossOrigin="anonymous"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "inline-block",
                    borderRadius: 12,
                  }}
                />
              </div>
            </div>

            {/* ── RIGHT: Content ── */}
            <div style={{ paddingLeft: 90 }} className="about-content-pl">
              {/* Heading with scroll-driven word-by-word reveal */}
              {/* oit-section-title: 700w, 144px, line-height 1.06, white */}
              <div
                style={{
                  paddingTop: 15,
                  marginBottom: 60,
                  position: "relative",
                }}
              >
                <ScrollRevealHeading text="Turning Vision into reality" />
              </div>

              {/* Vision columns */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 0",
                  marginBottom: 30,
                }}
                className="about-vision-grid"
              >
                {/* Left vision item — paragraph */}
                <div style={{ marginBottom: 30 }}>
                  {/* ba-about-vision-title: 600w 30px */}
                  <h4
                    style={{
                      fontWeight: 600,
                      fontSize: 30,
                      lineHeight: 1,
                      marginBottom: 30,
                      color: "#fff",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    Our Mission
                  </h4>
                  {/* ba-about-vision-item p: 500w 18px 1.4, #999 in dark */}
                  <p
                    style={{
                      fontWeight: 500,
                      fontSize: 18,
                      lineHeight: 1.4,
                      paddingRight: 85,
                      color: "#999999",
                      margin: 0,
                    }}
                  >
                    To empower brands through bold design, strategic thinking,
                    and{" "}
                    <span style={{ color: "#fff" }}>digital experiences</span>{" "}
                    that inspire action and create lasting impact. To help{" "}
                    <span style={{ color: "#fff" }}>businesses</span> stand out
                    through thoughtful branding and{" "}
                    <span style={{ color: "#fff" }}>high-performance</span>{" "}
                    <span style={{ color: "#fff" }}>digital solutions</span>{" "}
                    rooted in creativity and clarity.
                  </p>
                </div>

                {/* Right vision item — checklist; ba-about-vision-inner pl-70 */}
                <div style={{ marginBottom: 30 }}>
                  <div
                    style={{ paddingLeft: 70 }}
                    className="about-vision-inner"
                  >
                    {/* ba-about-vision-title */}
                    <h4
                      style={{
                        fontWeight: 600,
                        fontSize: 30,
                        lineHeight: 1,
                        marginBottom: 30,
                        color: "#fff",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      Our Mission
                    </h4>
                    {/* ba-about-vision-item ul */}
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {visionItems.map((item) => (
                        <li key={item} style={{ marginBottom: 15 }}>
                          {/* span::before = 7px white circle */}
                          <span
                            style={{
                              fontWeight: 500,
                              fontSize: 16,
                              lineHeight: 1.1,
                              color: "#999999",
                              letterSpacing: "-0.02em",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 7,
                            }}
                          >
                            <span
                              style={{
                                display: "inline-block",
                                height: 7,
                                width: 7,
                                borderRadius: "50%",
                                backgroundColor: "#fff",
                                flexShrink: 0,
                                transform: "translateY(-1px)",
                              }}
                            />
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* ── CTA Button — oit-btn-border btn-white-bg ── */}
              {/* White bg, black text, pill, dual-text slide, diagonal arrow */}
              <div style={{ marginTop: 0 }} className="ba-about-btn">
                <Link
                  href="/about"
                  id="about-cta-btn"
                  aria-label="Learn more about WebOrigin"
                  className="oit-btn-border-react"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    fontSize: 16,
                    fontWeight: 500,
                    padding: "10px 26px 10px 26px",
                    paddingRight: 8,
                    borderRadius: 30,
                    textTransform: "uppercase",
                    color: "#000",
                    border: "1px solid #fff",
                    backgroundColor: "#fff",
                    textDecoration: "none",
                    letterSpacing: "0.02em",
                  }}
                >
                  {/* Dual sliding text */}
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      overflow: "hidden",
                      display: "inline-block",
                      height: "1.1em",
                    }}
                  >
                    <span
                      className="btn-text-1"
                      style={{
                        position: "relative",
                        display: "block",
                        transition: "0.3s",
                        transform: "translateY(-1px)",
                      }}
                    >
                      more about us
                    </span>
                    <span
                      className="btn-text-2"
                      style={{
                        position: "absolute",
                        top: "100%",
                        display: "block",
                        transition: "0.3s",
                        transform: "translateY(-1px)",
                      }}
                    >
                      more about us
                    </span>
                  </span>

                  {/* Arrow icon circle */}
                  <i
                    style={{
                      height: 38,
                      width: 38,
                      lineHeight: "38px",
                      borderRadius: "50%",
                      marginLeft: 2,
                      textAlign: "center",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      backgroundColor: "#000",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        width: 14,
                        height: 14,
                        display: "inline-flex",
                      }}
                    >
                      {/* first arrow — slides out on hover */}
                      <span
                        className="arrow-1"
                        style={{
                          transform: "translateY(-2px)",
                          position: "absolute",
                          bottom: -1,
                          left: 1,
                          transition: "all 0.2s ease-out",
                        }}
                      >
                        <ArrowUpRight size={13} />
                      </span>
                      {/* second arrow — slides in on hover */}
                      <span
                        className="arrow-2"
                        style={{
                          position: "absolute",
                          left: -12,
                          bottom: -12,
                          opacity: 0,
                          transition: "all 0.2s ease-out",
                        }}
                      >
                        <ArrowUpRight size={13} />
                      </span>
                    </span>
                  </i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Template-identical CSS for button hover + responsive ── */}
        <style>{`
        /* Button hover: text slides, arrow comes in */
        .oit-btn-border-react:hover .btn-text-1 {
          transform: translateY(-150%);
        }
        .oit-btn-border-react:hover .btn-text-2 {
          top: 50%;
          transform: translateY(-50%);
        }
        .oit-btn-border-react:hover .arrow-1 {
          transform: translate(16px, -16px);
        }
        .oit-btn-border-react:hover .arrow-2 {
          opacity: 1;
          visibility: visible;
          transform: translate(13px, -13px);
        }

        /* Responsive: stack on tablet/mobile */
        @media (max-width: 1199px) {
          .about-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .about-content-pl {
            padding-left: 0 !important;
          }
        }
        @media (max-width: 767px) {
          .about-vision-grid {
            grid-template-columns: 1fr !important;
          }
          .about-vision-inner {
            padding-left: 0 !important;
          }
        }
        /* Border between vision columns on desktop */
        @media (min-width: 992px) {
          .about-vision-grid > div:first-child {
            border-right: 1px solid #2a2a2a;
          }
          .about-vision-inner {
            padding-left: 70px;
          }
        }

        /* ── Funfact cards ── */
        .funfact-card-label {
          font-weight: 500;
          font-size: 18px;
          line-height: 1.4;
          text-transform: uppercase;
          display: block;
          text-align: start;
        }
        .funfact-title {
          font-weight: 400;
          font-size: 60px;
          line-height: 0.9;
          text-transform: uppercase;
          font-style: normal;
          display: inline;
        }
        .funfact-desc {
          font-weight: 400;
          font-size: 14px;
          line-height: 1.5;
          text-align: right;
          color: #5d5d5d;
          margin-bottom: 0;
          flex: 0 0 auto;
        }
        @media (max-width: 767px) {
          .funfact-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 479px) {
          .funfact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
      </section>

      {/* ── Funfact / Stats section ── identical to ba-funfact-style in template */}
      <section
        aria-label="Stats and achievements"
        style={{
          position: "relative",
          paddingTop: 60,
          paddingBottom: 70,
          background: "#0d0d0d",
        }}
      >
        {/* sd-funfact-shape-3 — team-2.png rotating blob, desktop only */}
        <RotatingFidgetShape />
        <div
          style={{
            maxWidth: 1750,
            margin: "0 auto",
            paddingLeft: 24,
            paddingRight: 24,
          }}
        >
          <div
            className="funfact-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              alignItems: "flex-end",
            }}
          >
            {/* Card 1 — plain dark, no image */}
            <FunfactCard
              label="Years Of Experience"
              end={12}
              suffix="+"
              bgColor="#101216"
              hasImage={false}
            />
            {/* Card 2 — with chrome shape image */}
            <FunfactCard
              label="Creative Solutions"
              end={95}
              suffix="+"
              bgColor="#0D0D0D"
              hasImage
              imageSrc="/images/funfact/funfact-shape-4-1.png"
              white
            />
            {/* Card 3 — plain dark, no image */}
            <FunfactCard
              label="Completed Projects"
              end={100}
              suffix="%"
              bgColor="#101216"
              hasImage={false}
            />
            {/* Card 4 — with dark shape image */}
            <FunfactCard
              label="Creative Solutions"
              end={99}
              suffix="%"
              bgColor="#0D0D0D"
              hasImage
              imageSrc="/images/funfact/funfact-shape-4-2.png"
              white
            />
          </div>
        </div>
      </section>
    </>
  );
}
