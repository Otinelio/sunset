import { jsx, jsxs } from "react/jsx-runtime";
function WaveAnimation({ className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `pointer-events-none w-full overflow-hidden ${className}`, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 1440 80", preserveAspectRatio: "none", className: "w-[200%] wave-animate h-16 md:h-20", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "waveg", x1: "0", x2: "1", children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#E85C3A", stopOpacity: "0.85" }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#F2A65C", stopOpacity: "0.85" })
    ] }) }),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z M1440,40 C1680,80 1920,0 2160,40 C2400,80 2640,0 2880,40 L2880,80 L1440,80 Z",
        fill: "url(#waveg)"
      }
    )
  ] }) });
}
export {
  WaveAnimation as W
};
