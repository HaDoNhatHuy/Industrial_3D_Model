// ═══════════════════════════════════════════════════════════
// MAIN.JS · Sơn Hải Vân Industrial 3D
// ═══════════════════════════════════════════════════════════
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TABS, PALETTE, CTA_URL } from "./data.js";

// ══ 0. LANGUAGE ══════════════════════════════════════════
let lang = "vi";
const L = {
  vi: {
    toggleBtn: "EN",
    productTitle: "Hệ sơn đề nghị",
    applyAll: "Phủ toàn bộ",
    noColor: "Chưa chọn màu",
    hintPaint: "Chế độ sơn — Click vào bề mặt để phủ màu",
    hintReady: "Kéo xoay · Cuộn zoom · Bật bút để phủ màu lên mô hình",
    navShow: "Hiện menu ▼",
    panelOpen: "◀",
    panelClose: "▶",
  },
  en: {
    toggleBtn: "VI",
    productTitle: "Recommended Coatings",
    applyAll: "Paint All",
    noColor: "No color selected",
    hintPaint: "Paint mode — Click surface to apply color",
    hintReady: "Drag to rotate · Scroll to zoom · Enable brush to paint",
    navShow: "Show menu ▼",
    panelOpen: "◀",
    panelClose: "▶",
  },
};
const t = () => L[lang];

// ══ 1. SCENE SETUP ════════════════════════════════════════
// FIX 3: Chỉ dùng một nền sáng cho tất cả tab (bỏ BG_DARK)
const BG_DEFAULT = new THREE.Color(0xdde3ea);

const scene = new THREE.Scene();
scene.background = BG_DEFAULT.clone();
scene.fog = new THREE.Fog(0xdde3ea, 55, 160);

const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 500);
camera.position.set(13, 8, 16);

const canvasWrap = document.getElementById("canvas-wrap");
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
canvasWrap.appendChild(renderer.domElement);

function resize() {
  const w = canvasWrap.clientWidth,
    h = canvasWrap.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
resize();
window.addEventListener("resize", resize);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 2;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI * 0.56;

// Ground mesh
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(100, 100),
  new THREE.MeshLambertMaterial({ color: 0xcdd5de }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.02;
ground.receiveShadow = true;
ground.isGround = true;
scene.add(ground);

// ══ 2. LIGHTING ═══════════════════════════════════════════
scene.add(new THREE.AmbientLight(0xffffff, 1.15));
const sun = new THREE.DirectionalLight(0xfff8f0, 2.2);
sun.position.set(28, 48, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, {
  left: -30,
  right: 30,
  top: 30,
  bottom: -30,
  far: 130,
});
scene.add(sun);
const fill = new THREE.DirectionalLight(0xd0e4f8, 0.65);
fill.position.set(-14, 8, -12);
scene.add(fill);
scene.add(new THREE.HemisphereLight(0xe8f0ff, 0x9aabb8, 0.5));

// ══ 3. GEOMETRY HELPERS ═══════════════════════════════════
const mk = {
  box(w, h, d, mat, cs = true) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    m.castShadow = cs;
    m.receiveShadow = true;
    return m;
  },
  cyl(rT, rB, h, seg, mat, cs = true) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, h, seg), mat);
    m.castShadow = cs;
    m.receiveShadow = true;
    return m;
  },
  sph(r, seg, mat) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, seg), mat);
    m.castShadow = true;
    m.receiveShadow = true;
    return m;
  },
  tor(r, tube, seg, mat) {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, seg), mat);
    m.castShadow = true;
    return m;
  },
};
function cloneMat(hex, roughness = 0.38, metalness = 0.72) {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(hex),
    roughness,
    metalness,
  });
}
function iBeam(len, mat) {
  const g = new THREE.Group();
  const fl1 = mk.box(0.35, 0.05, len, mat);
  fl1.position.y = 0.32;
  const fl2 = mk.box(0.35, 0.05, len, mat);
  fl2.position.y = -0.32;
  const web = mk.box(0.04, 0.6, len, mat);
  g.add(fl1, fl2, web);
  return g;
}
function pipe(r, len, mat, ax = "y") {
  const m = mk.cyl(r, r, len, 16, mat);
  if (ax === "x") m.rotation.z = Math.PI / 2;
  if (ax === "z") m.rotation.x = Math.PI / 2;
  return m;
}

// ══ 4. MATERIAL SYSTEM ════════════════════════════════════
const origMaterialMap = new Map();
function saveOriginals(grp) {
  grp.traverse((c) => {
    if (c.isMesh && !c.isGround)
      origMaterialMap.set(
        c,
        Array.isArray(c.material)
          ? c.material.map((m) => m.clone())
          : c.material.clone(),
      );
  });
}

// ══ 5. PROCEDURAL MODELS ══════════════════════════════════
const M = {
  steel: cloneMat("#8fa8b8", 0.35, 0.8),
  steelDk: cloneMat("#607585", 0.4, 0.75),
  galv: cloneMat("#c8d4dc", 0.18, 0.85),
  rust: cloneMat("#a05030", 0.9, 0.2),
  tankBody: cloneMat("#b8ccd8", 0.22, 0.7),
  pipe: cloneMat("#7a9aaa", 0.28, 0.88),
  pipeDk: cloneMat("#4a6a7a", 0.32, 0.85),
  valve: cloneMat("#cc4444", 0.5, 0.6),
  concrete: cloneMat("#a8b4be", 0.92, 0.0),
  floor: cloneMat("#9ab0bc", 0.88, 0.05),
  floorEp: cloneMat("#608898", 0.18, 0.1),
  orange: cloneMat("#e07820", 0.55, 0.3),
  yellow: cloneMat("#e8c020", 0.6, 0.2),
  intu: cloneMat("#e8e0d0", 0.85, 0.0),
  hotzone: cloneMat("#cc3322", 0.5, 0.4),
};

function buildKetCauThep() {
  const g = new THREE.Group();
  const cols = [
    [-3, 0, -3],
    [3, 0, -3],
    [3, 0, 3],
    [-3, 0, 3],
  ];
  const H = 6;
  cols.forEach(([x, , z]) => {
    const col = iBeam(H, M.steel);
    col.rotation.x = Math.PI / 2;
    col.position.set(x, H / 2, z);
    g.add(col);
    const bp = mk.box(0.7, 0.08, 0.7, M.steelDk);
    bp.position.set(x, 0.04, z);
    g.add(bp);
  });
  for (let i = 0; i < 4; i++) {
    const [x, z] = cols[i];
    const [nx, nz] = cols[(i + 1) % 4];
    const cx = (x + nx) / 2,
      cz = (z + nz) / 2;
    const ang = Math.atan2(nz - z, nx - x);
    const beam = iBeam(6.6, M.steelDk);
    beam.position.set(cx, H, cz);
    beam.rotation.y = ang + Math.PI / 2;
    g.add(beam);
    const mbeam = iBeam(6.6, M.steel);
    mbeam.position.set(cx, H * 0.55, cz);
    mbeam.rotation.y = ang + Math.PI / 2;
    g.add(mbeam);
  }
  const br = mk.box(0.05, H * 0.55 * 1.05, 0.05, M.steelDk);
  br.rotation.z = Math.atan2(H * 0.55, 6);
  br.position.set(0, H * 0.275, -3);
  g.add(br);
  for (let i = -3; i < 3; i++) {
    const pn = mk.box(6.2, 0.04, 0.9, cloneMat("#bbc8d2", 0.6, 0.5));
    pn.position.set(0, H + 0.48, i + 0.5);
    g.add(pn);
  }
  const grate = mk.box(6.2, 0.06, 6.2, M.galv);
  grate.position.set(0, H * 0.55 + 0.03, 0);
  g.add(grate);
  for (let s = 0; s < 8; s++) {
    const st = mk.box(0.8, 0.06, 0.3, M.steelDk);
    st.position.set(3.7, s * 0.42, 3.0 - s * 0.24);
    g.add(st);
  }
  const rail = mk.cyl(0.025, 0.025, 4.5, 8, M.galv);
  rail.rotation.z = Math.atan2(4.5 * 0.55, 4.5);
  rail.position.set(3.7, 1.8, 1.2);
  g.add(rail);
  cols.forEach(([x, , z]) => {
    const w = mk.sph(0.07, 8, M.rust);
    w.position.set(x, H + 0.02, z);
    g.add(w);
  });
  return g;
}

function buildBonChua() {
  const g = new THREE.Group();
  const R = 2.4,
    TH = 6.5;
  [0, 60, 120, 180, 240, 300].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const leg = mk.cyl(0.12, 0.14, 1.2, 8, M.steelDk);
    leg.position.set(Math.cos(rad) * (R - 0.3), 0.6, Math.sin(rad) * (R - 0.3));
    g.add(leg);
    const foot = mk.cyl(0.2, 0.22, 0.12, 8, M.steelDk);
    foot.position.set(
      Math.cos(rad) * (R - 0.3),
      0.06,
      Math.sin(rad) * (R - 0.3),
    );
    g.add(foot);
  });
  const rb = mk.tor(R - 0.3, 0.07, 32, M.steelDk);
  rb.rotation.x = Math.PI / 2;
  rb.position.y = 1.1;
  g.add(rb);
  const body = mk.cyl(R, R, TH, 40, M.tankBody);
  body.position.y = 1.2 + TH / 2;
  g.add(body);
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(R, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    M.tankBody.clone(),
  );
  dome.castShadow = true;
  dome.position.y = 1.2 + TH;
  g.add(dome);
  const cone = mk.cyl(R, R * 0.3, 1.0, 40, M.tankBody);
  cone.position.y = 1.2;
  g.add(cone);
  const bot = mk.cyl(R * 0.3, R * 0.3, 0.2, 16, M.steelDk);
  bot.position.y = 0.85;
  g.add(bot);
  [1.5, 2.5, 3.5, 4.5].forEach((h) => {
    const ring = mk.tor(R + 0.04, 0.06, 40, M.steelDk);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.2 + h * (TH / 5);
    g.add(ring);
  });
  const vent = mk.cyl(0.25, 0.25, 0.4, 12, M.steelDk);
  vent.position.set(0.8, 1.2 + TH + R * 0.5 + 0.2, 0);
  g.add(vent);
  const vc = mk.cyl(0.32, 0.32, 0.06, 12, M.steelDk);
  vc.position.set(0.8, 1.2 + TH + R * 0.5 + 0.44, 0);
  g.add(vc);
  const pBot = pipe(0.12, 2.5, M.pipe, "z");
  pBot.position.set(R - 0.1, 1.0, 0);
  g.add(pBot);
  const pSide = pipe(0.1, 1.8, M.pipeDk, "z");
  pSide.position.set(R - 0.1, 3.0, 0);
  g.add(pSide);
  for (let r = 0; r < 14; r++) {
    const rg = mk.box(0.4, 0.04, 0.04, M.galv);
    rg.position.set(R + 0.12, 0.8 + r * 0.6, -0.05);
    g.add(rg);
  }
  const rl1 = mk.cyl(0.04, 0.04, 9.5, 6, M.galv);
  rl1.position.set(R + 0.3, 5.5, -0.1);
  g.add(rl1);
  const rl2 = mk.cyl(0.04, 0.04, 9.5, 6, M.galv);
  rl2.position.set(R - 0.1, 5.5, -0.1);
  g.add(rl2);
  const plt = mk.tor(R + 0.35, 0.18, 40, M.galv);
  plt.rotation.x = Math.PI / 2;
  plt.position.y = 1.2 + TH - 0.8;
  g.add(plt);
  return g;
}

function buildDuongOng() {
  const g = new THREE.Group();
  const mp = pipe(0.22, 14, M.pipe, "z");
  mp.position.set(0, 2.2, 0);
  g.add(mp);
  [-5, -2, 1, 4].forEach((z) => {
    const f = mk.cyl(0.32, 0.32, 0.06, 20, M.steelDk);
    f.rotation.x = Math.PI / 2;
    f.position.set(0, 2.2, z);
    g.add(f);
  });
  [-4, 0, 4].forEach((z) => {
    const br = pipe(0.14, 3.5, M.pipeDk, "x");
    br.position.set(-1.5, 2.2, z);
    g.add(br);
    const f = mk.cyl(0.22, 0.22, 0.06, 20, M.steelDk);
    f.rotation.z = Math.PI / 2;
    f.position.set(-3.15, 2.2, z);
    g.add(f);
  });
  [-4, 4].forEach((z) => {
    const vp = pipe(0.14, 2.5, M.pipeDk, "y");
    vp.position.set(-3.2, 1.05, z);
    g.add(vp);
  });
  const ins = mk.cyl(0.38, 0.38, 8, 20, cloneMat("#ddd8c0", 0.85, 0));
  ins.rotation.z = Math.PI / 2;
  ins.position.set(0, 4.0, 0);
  g.add(ins);
  [-2, 2].forEach((z) => {
    const vb = mk.cyl(0.28, 0.28, 0.3, 8, M.valve);
    vb.position.set(0, 2.2, z);
    g.add(vb);
    const vh = mk.box(0.18, 0.44, 0.18, M.valve);
    vh.position.set(0, 2.44, z);
    g.add(vh);
    const hn = mk.box(0.55, 0.06, 0.06, M.steelDk);
    hn.position.set(0, 2.7, z);
    g.add(hn);
  });
  [-5, -1, 3].forEach((z) => {
    const l1 = mk.cyl(0.06, 0.06, 2.2, 8, M.steelDk);
    l1.position.set(0.5, 1.1, z);
    g.add(l1);
    const l2 = mk.cyl(0.06, 0.06, 2.2, 8, M.steelDk);
    l2.position.set(-0.5, 1.1, z);
    g.add(l2);
    const cb = mk.box(1.2, 0.06, 0.06, M.steelDk);
    cb.position.set(0, 2.15, z);
    g.add(cb);
    const ft = mk.box(0.3, 0.06, 0.3, M.steelDk);
    ft.position.set(0.5, 0.03, z);
    g.add(ft);
  });
  const trench = mk.box(1.2, 0.25, 8, cloneMat("#7a8a94", 0.95, 0));
  trench.position.set(-5.5, -0.1, 0);
  g.add(trench);
  const ugp = pipe(0.22, 8, cloneMat("#3a5a6a", 0.3, 0.8), "z");
  ugp.position.set(-5.5, -0.04, 0);
  g.add(ugp);
  return g;
}

function buildSanBeTong() {
  const g = new THREE.Group();
  const slab = mk.box(14, 0.24, 12, M.concrete);
  slab.position.set(0, 0.12, 0);
  g.add(slab);
  const epoxy = mk.box(6, 0.02, 6, M.floorEp);
  epoxy.position.set(-1, 0.25, 0);
  g.add(epoxy);
  const chem = mk.box(3.5, 0.02, 5.5, cloneMat("#4a7888", 0.14, 0.08));
  chem.position.set(-5, 0.25, 0.25);
  g.add(chem);
  const outdoor = mk.box(4.5, 0.01, 12, cloneMat("#a0b0b8", 0.85, 0));
  outdoor.position.set(4.75, 0.245, 0);
  g.add(outdoor);
  for (let i = -6; i <= 7; i++) {
    const gl = mk.box(0.03, 0.01, 12.5, cloneMat("#8898a4", 1, 0));
    gl.position.set(i, 0.26, 0);
    g.add(gl);
  }
  for (let i = -5; i <= 6; i++) {
    const gl = mk.box(14.5, 0.01, 0.03, cloneMat("#8898a4", 1, 0));
    gl.position.set(0, 0.26, i);
    g.add(gl);
  }
  const yl = mk.box(14.5, 0.015, 0.12, M.yellow);
  yl.position.set(0, 0.255, -2.5);
  g.add(yl);
  const yl2 = mk.box(14.5, 0.015, 0.12, M.yellow);
  yl2.position.set(0, 0.255, 2.5);
  g.add(yl2);
  [
    [-6, 6],
    [0, 6],
    [6, 6],
    [-6, -6],
    [0, -6],
    [6, -6],
  ].forEach(([x, z]) => {
    const c = mk.box(0.5, 5.5, 0.5, M.concrete);
    c.position.set(x, 3.0, z);
    g.add(c);
  });
  const w1 = mk.box(14, 4.5, 0.25, M.concrete);
  w1.position.set(0, 2.5, -6.1);
  g.add(w1);
  const w2 = mk.box(14, 4.5, 0.25, M.concrete);
  w2.position.set(0, 2.5, 6.1);
  g.add(w2);
  const dn = mk.box(12, 0.07, 0.22, cloneMat("#607070", 0.8, 0.3));
  dn.position.set(0, 0.24, 0);
  g.add(dn);
  return g;
}

function buildDacBiet() {
  const g = new THREE.Group();
  const sc = iBeam(5.0, M.steel);
  sc.rotation.x = Math.PI / 2;
  sc.position.set(-5, 2.8, 0);
  g.add(sc);
  const il = mk.box(0.55, 5.05, 0.12, M.intu);
  il.position.set(-5, 2.8, 0);
  g.add(il);
  const fp = mk.box(0.8, 0.3, 0.04, cloneMat("#cc2222", 0.7, 0));
  fp.position.set(-5, 1.8, 0.1);
  g.add(fp);
  [
    [-1.5, -1.5],
    [1.5, -1.5],
    [1.5, 1.5],
    [-1.5, 1.5],
  ].forEach(([x, z]) => {
    const jl = mk.cyl(0.14, 0.16, 6.0, 12, M.pipeDk);
    jl.position.set(x, 3.2, z);
    g.add(jl);
    const sp = mk.cyl(0.16, 0.16, 1.0, 12, M.hotzone);
    sp.position.set(x, 1.5, z);
    g.add(sp);
  });
  [1.0, 3.5].forEach((y) => {
    [
      [-1.5, -1.5, 1.5, -1.5],
      [-1.5, -1.5, -1.5, 1.5],
      [1.5, -1.5, 1.5, 1.5],
      [-1.5, 1.5, 1.5, 1.5],
    ].forEach(([x1, z1, x2, z2]) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const br = mk.cyl(0.07, 0.07, len, 8, M.pipe);
      br.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
      br.rotation.y = Math.atan2(z2 - z1, x2 - x1);
      br.rotation.z = Math.PI / 2;
      g.add(br);
    });
  });
  const deck = mk.box(3.6, 0.2, 3.6, M.galv);
  deck.position.set(0, 6.3, 0);
  g.add(deck);
  const heli = mk.cyl(1.4, 1.4, 0.08, 40, M.orange);
  heli.position.set(0, 6.45, 0);
  g.add(heli);
  const stk = mk.cyl(0.5, 0.55, 7.5, 16, cloneMat("#c8a060", 0.45, 0.5));
  stk.position.set(5, 3.8, 0);
  g.add(stk);
  for (let i = 0; i < 3; i++) {
    const band = mk.tor(0.55, 0.06, 20, cloneMat("#ff4444", 0.4, 0.4));
    band.rotation.x = Math.PI / 2;
    band.position.set(5, 1.5 + i * 1.8, 0);
    g.add(band);
  }
  const esd = mk.box(4.5, 0.05, 4.5, cloneMat("#1a3a4a", 0.15, 0.25));
  esd.position.set(-5, 0.025, -3.5);
  g.add(esd);
  const est = mk.box(4.5, 0.01, 0.15, M.yellow);
  est.position.set(-5, 0.06, -3.5);
  g.add(est);
  return g;
}

const BUILDERS = {
  ket_cau_thep: buildKetCauThep,
  bon_chua: buildBonChua,
  duong_ong: buildDuongOng,
  san_be_tong: buildSanBeTong,
  dac_biet: buildDacBiet,
};

const CAM_PRESETS = {
  ket_cau_thep: { pos: [12, 9, 14], target: [0, 3.5, 0] },
  bon_chua: { pos: [14, 10, 10], target: [0, 4.5, 0] },
  duong_ong: { pos: [10, 6, 12], target: [0, 2.2, 0] },
  san_be_tong: { pos: [10, 10, 8], target: [0, 0.5, 0] },
  dac_biet: { pos: [14, 9, 14], target: [0, 3.5, 0] },
};

// FIX 3: Màu mặc định cho tab Lĩnh vực đặc biệt khi nền sáng
// Dùng màu thép xanh đậm vừa, nổi rõ trên nền #dde3ea
const DAC_BIET_DEFAULT_COLOR = "#6e8a9a";

const tabGroups = {};
let activeTabKey = null;

// ══ 6. COLOR PAINT SYSTEM ════════════════════════════════
let paintMode = false;
let selectedColor = null;
const paintedMeshes = new Map();

// FIX 2: Thêm emissive cho màu tối để người dùng phân biệt được
// Cho phép ghi đè màu — không có guard paint-once nữa
function applyColorToMesh(mesh, colorEntry) {
  const origMat = Array.isArray(mesh.material)
    ? mesh.material[0]
    : mesh.material;
  const newMat = origMat.clone();
  const color = new THREE.Color(colorEntry.hex);
  newMat.color = color;

  if (colorEntry.metallic) {
    newMat.roughness = 0.12;
    newMat.metalness = 0.92;
    newMat.envMapIntensity = 1.0;
    newMat.emissive = new THREE.Color(0x000000);
    newMat.emissiveIntensity = 0;
  } else {
    // Giảm metalness để màu hiện rõ hơn, tăng roughness nhẹ để màu không quá phẳng
    newMat.roughness = 0.52;
    newMat.metalness = 0.06;

    // Tính độ sáng (luminance) của màu được chọn
    // Nếu màu quá tối (lum < 0.18), thêm emissive để người dùng nhìn thấy màu thực
    const lum = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    if (lum < 0.18) {
      // Màu tối: thêm emissive với cùng màu, intensity đủ để thấy sắc độ
      newMat.emissive = color.clone();
      newMat.emissiveIntensity = 0.42;
    } else {
      newMat.emissive = new THREE.Color(0x000000);
      newMat.emissiveIntensity = 0;
    }
  }

  mesh.material = Array.isArray(mesh.material) ? [newMat] : newMat;
  paintedMeshes.set(mesh, colorEntry.hex);
}

function applyColorToAll(colorEntry) {
  const grp = tabGroups[activeTabKey];
  if (!grp) return;
  grp.traverse((c) => {
    if (c.isMesh) applyColorToMesh(c, colorEntry);
  });
}

function resetAllColors() {
  origMaterialMap.forEach((origMat, mesh) => {
    mesh.material = Array.isArray(origMat)
      ? origMat.map((m) => m.clone())
      : origMat.clone();
  });
  paintedMeshes.clear();
}

// FIX 3: Phủ màu mặc định cho tab Lĩnh vực đặc biệt (gọi TRƯỚC saveOriginals)
// để màu mặc định trở thành baseline khi reset
function applyDefaultColorToGroup(grp, hexColor) {
  const color = new THREE.Color(hexColor);
  grp.traverse((c) => {
    if (c.isMesh && !c.isGround) {
      const mats = Array.isArray(c.material) ? c.material : [c.material];
      mats.forEach((mat) => {
        if (mat && mat.isMeshStandardMaterial) {
          mat.color = color.clone();
          mat.roughness = 0.42;
          mat.metalness = 0.55;
          mat.emissive = new THREE.Color(0x000000);
          mat.emissiveIntensity = 0;
        }
      });
    }
  });
}

// Raycaster for click painting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener("click", (e) => {
  if (!paintMode || !selectedColor || !activeTabKey) return;
  const rect = canvasWrap.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const grp = tabGroups[activeTabKey];
  if (!grp) return;
  const meshList = [];
  grp.traverse((c) => {
    if (c.isMesh) meshList.push(c);
  });
  const hits = raycaster.intersectObjects(meshList, false);
  if (hits.length) applyColorToMesh(hits[0].object, selectedColor);
});

renderer.domElement.addEventListener("mousemove", (e) => {
  const rect = canvasWrap.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  if (paintMode) {
    raycaster.setFromCamera(mouse, camera);
    const grp = tabGroups[activeTabKey];
    if (!grp) return;
    const meshList = [];
    grp.traverse((c) => {
      if (c.isMesh) meshList.push(c);
    });
    const hits = raycaster.intersectObjects(meshList, false);
    renderer.domElement.style.cursor = hits.length ? "crosshair" : "cell";
  } else {
    renderer.domElement.style.cursor = "grab";
  }
});

// ══ 7. UI — TOP NAV ══════════════════════════════════════
let navCollapsed = false;

function renderTabs() {
  const nav = document.getElementById("top-nav");
  nav.innerHTML = "";
  TABS.forEach((tab) => {
    const item = document.createElement("div");
    item.className = "tab-item" + (activeTabKey === tab.key ? " active" : "");
    item.style.color = tab.color;
    item.innerHTML = `
      <span class="tab-color-dot" style="background:${tab.color}"></span>
      <span class="tab-name">${lang === "vi" ? tab.label : tab.labelEn || tab.label}</span>`;
    item.addEventListener("click", () => onTabClick(tab.key));
    nav.appendChild(item);
  });
}

document.getElementById("nav-toggle").addEventListener("click", toggleNav);

function toggleNav() {
  navCollapsed = !navCollapsed;
  document
    .getElementById("top-nav-wrap")
    .classList.toggle("collapsed", navCollapsed);
  document.body.classList.toggle("nav-collapsed", navCollapsed);
  document.getElementById("nav-toggle-icon").textContent = navCollapsed
    ? "▼"
    : "▲";
  setTimeout(resize, 360);
}

const floatBtn = document.createElement("button");
floatBtn.id = "nav-float-btn";
floatBtn.textContent = t().navShow;
floatBtn.addEventListener("click", toggleNav);
document.body.appendChild(floatBtn);

// ══ 8. RIGHT PANEL COLLAPSE ════════════════════════════════
// FIX 1: Nút đóng/mở panel phải — thiết kế rõ ràng hơn
let panelCollapsed = false;
const infoPanel = document.getElementById("info-panel");

const panelToggleBtn = document.createElement("button");
panelToggleBtn.id = "panel-toggle-btn";
panelToggleBtn.title = "Ẩn/Hiện bảng thông tin";
panelToggleBtn.innerHTML = `
  <span class="ptb-arrow">◀</span>
  <span class="ptb-label">Bảng thông tin</span>
`;
infoPanel.appendChild(panelToggleBtn);

panelToggleBtn.addEventListener("click", () => {
  panelCollapsed = !panelCollapsed;
  infoPanel.classList.toggle("collapsed", panelCollapsed);
  panelToggleBtn.querySelector(".ptb-arrow").textContent = panelCollapsed
    ? "▶"
    : "◀";
  setTimeout(resize, 320);
});

// ══ 9. UI — RIGHT PANEL ═══════════════════════════════════
function renderPalette() {
  const grid = document.getElementById("palette-grid");
  grid.innerHTML = "";
  PALETTE.forEach((c) => {
    const sw = document.createElement("div");
    sw.className =
      "color-swatch" +
      (selectedColor?.code === c.code ? " selected" : "") +
      (c.metallic ? " metallic" : "");
    if (!c.metallic) sw.style.background = c.hex;
    sw.title = `${c.code} — ${c.name}`;
    sw.addEventListener("click", () => selectColor(c));
    grid.appendChild(sw);
  });
  document.getElementById("product-block-title").textContent = t().productTitle;
  document.getElementById("btn-apply-all").textContent = t().applyAll;
}

function selectColor(c) {
  // Tự động xóa màu cũ khi chọn màu mới — không cần người dùng reset thủ công
  if (selectedColor && selectedColor.code !== c.code) {
    resetAllColors();
  }
  selectedColor = c;
  const swatch = document.getElementById("active-swatch");
  if (c.metallic) {
    swatch.className = "metallic";
    swatch.style.background = "";
  } else {
    swatch.className = "";
    swatch.style.background = c.hex;
  }
  document.getElementById("active-code").textContent = `${c.name}`;
  document.getElementById("active-hex").textContent = c.hex.toUpperCase();
  document.querySelectorAll(".color-swatch").forEach((el) => {
    el.classList.toggle("selected", el.title.startsWith(c.code + " "));
  });
  if (!paintMode) enablePaintMode();
}

function enablePaintMode() {
  paintMode = true;
  document.getElementById("btn-paint").dataset.active = "true";
  document.getElementById("paint-hint").classList.remove("hidden");
  document.getElementById("hint-text").textContent = t().hintPaint;
  controls.enableRotate = false;
}

function disablePaintMode() {
  paintMode = false;
  document.getElementById("btn-paint").dataset.active = "false";
  document.getElementById("paint-hint").classList.add("hidden");
  document.getElementById("hint-text").textContent = t().hintReady;
  controls.enableRotate = true;
}

document.getElementById("btn-paint").addEventListener("click", () => {
  if (paintMode) disablePaintMode();
  else enablePaintMode();
});

document.getElementById("btn-reset-color").addEventListener("click", () => {
  resetAllColors();
  const swatch = document.getElementById("active-swatch");
  swatch.className = "";
  swatch.style.background = "#cccccc";
  document.getElementById("active-code").textContent = t().noColor;
  document.getElementById("active-hex").textContent = "";
  selectedColor = null;
  document
    .querySelectorAll(".color-swatch")
    .forEach((el) => el.classList.remove("selected"));
  disablePaintMode();
});

document.getElementById("btn-apply-all").addEventListener("click", () => {
  if (!selectedColor) return;
  applyColorToAll(selectedColor);
});

function renderProducts(tab) {
  const el = document.getElementById("product-list");
  el.innerHTML = "";
  (tab.products || []).forEach((p, i) => {
    const item = document.createElement("div");
    item.className = "product-item";
    item.innerHTML = `
      <div class="prod-num">${i + 1}</div>
      <div class="prod-info">
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.desc}</div>
      </div>
      <a href="${p.link}" target="_blank" class="prod-link">Xem →</a>`;
    el.appendChild(item);
  });
}

function renderTabInfo(tab) {
  document.getElementById("tab-name-display").textContent =
    lang === "vi" ? tab.label : tab.labelEn || tab.label;
  document.getElementById("tab-desc-display").textContent =
    lang === "vi" ? tab.desc : tab.descEn || tab.desc;
  renderProducts(tab);
}

// ══ 10. TAB SWITCHING ══════════════════════════════════════
function onTabClick(key) {
  if (activeTabKey === key) return;
  resetAllColors();
  disablePaintMode();
  switchTab(key);
}

// FIX 3: Xóa logic nền tối — tất cả tab dùng nền sáng thống nhất
function setSceneBackground(key) {
  scene.background = BG_DEFAULT.clone();
  scene.fog = new THREE.Fog(0xdde3ea, 55, 160);
  ground.material.color.setHex(0xcdd5de);
}

function switchTab(key) {
  showLoading("Đang tạo mô hình...");
  if (activeTabKey && tabGroups[activeTabKey])
    tabGroups[activeTabKey].visible = false;
  activeTabKey = key;
  setSceneBackground(key);
  renderTabs();
  const tab = TABS.find((t) => t.key === key);
  renderTabInfo(tab);

  setTimeout(() => {
    if (!tabGroups[key]) {
      tryLoadGLB(key, tab.modelFile, () => {
        if (!tabGroups[key]) buildAndAdd(key);
        afterSwitch(key);
      });
    } else {
      afterSwitch(key);
    }
  }, 80);
}

// FIX 3: Áp màu mặc định cho dac_biet TRƯỚC saveOriginals
// → màu mặc định trở thành baseline khi người dùng nhấn reset
function buildAndAdd(key) {
  const grp = BUILDERS[key]();
  if (key === "dac_biet") {
    applyDefaultColorToGroup(grp, DAC_BIET_DEFAULT_COLOR);
  }
  scene.add(grp);
  saveOriginals(grp);
  tabGroups[key] = grp;
}

function afterSwitch(key) {
  tabGroups[key].visible = true;
  flyToPreset(key);
  hideLoading();
}

function tryLoadGLB(key, filename, fallback) {
  new GLTFLoader().load(
    `./assets/models/${filename}`,
    (gltf) => {
      const model = gltf.scene;
      const bbox = new THREE.Box3().setFromObject(model);
      const size = bbox.getSize(new THREE.Vector3());
      const s = 10 / Math.max(size.x, size.y, size.z);
      model.scale.setScalar(s);
      const cen = bbox.getCenter(new THREE.Vector3());
      model.position.set(-cen.x * s, -bbox.min.y * s, -cen.z * s);
      model.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = c.receiveShadow = true;
        }
      });
      // FIX 3: Áp màu mặc định trước saveOriginals cho GLB dac_biet
      if (key === "dac_biet") {
        applyDefaultColorToGroup(model, DAC_BIET_DEFAULT_COLOR);
      }
      scene.add(model);
      saveOriginals(model);
      tabGroups[key] = model;
      fallback();
    },
    (xhr) =>
      setLoadingPct(xhr.total ? Math.round((xhr.loaded / xhr.total) * 100) : 0),
    () => fallback(),
  );
}

// ══ 11. CAMERA FLY-TO ═════════════════════════════════════
let flyTarget = null,
  flyT = 1;
const _sp = new THREE.Vector3(),
  _sl = new THREE.Vector3(),
  _tl = new THREE.Vector3();
const FLY_SPEED = 0.032;
function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function flyToPreset(key) {
  const p = CAM_PRESETS[key];
  if (!p) return;
  _sp.copy(camera.position);
  _sl.copy(controls.target);
  flyTarget = {
    pos: new THREE.Vector3(...p.pos),
    look: new THREE.Vector3(...p.target),
  };
  flyT = 0;
}

// ══ 12. TOOLBAR BUTTONS ═══════════════════════════════════
document.getElementById("btn-reset").addEventListener("click", () => {
  if (activeTabKey) flyToPreset(activeTabKey);
});
document.getElementById("btn-fit").addEventListener("click", () => {
  const grp = tabGroups[activeTabKey];
  if (!grp) return;
  const bbox = new THREE.Box3().setFromObject(grp);
  const cen = bbox.getCenter(new THREE.Vector3());
  const size = bbox.getSize(new THREE.Vector3());
  const d = Math.max(size.x, size.y, size.z) * 1.7;
  _sp.copy(camera.position);
  _sl.copy(controls.target);
  flyTarget = {
    pos: new THREE.Vector3(cen.x + d * 0.6, cen.y + d * 0.45, cen.z + d * 0.7),
    look: cen.clone(),
  };
  flyT = 0;
});
let autoRotate = false;
document.getElementById("btn-rotate").addEventListener("click", () => {
  autoRotate = !autoRotate;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 1.2;
  document.getElementById("btn-rotate").dataset.active = String(autoRotate);
});

// ══ 13. LANGUAGE TOGGLE ═══════════════════════════════════
document.getElementById("btn-lang").addEventListener("click", () => {
  lang = lang === "vi" ? "en" : "vi";
  document.getElementById("lang-label").textContent = t().toggleBtn;
  floatBtn.textContent = t().navShow;
  renderTabs();
  renderPalette();
  if (activeTabKey) renderTabInfo(TABS.find((t) => t.key === activeTabKey));
});

// ══ 14. LOADING UI ════════════════════════════════════════
const overlay = document.getElementById("loading-overlay");
function showLoading(msg) {
  document.getElementById("loading-title").textContent = msg || "Đang tải...";
  document.getElementById("loading-bar").style.width = "0%";
  document.getElementById("loading-pct").textContent = "0%";
  overlay.classList.remove("hidden");
}
function setLoadingPct(p) {
  document.getElementById("loading-bar").style.width = p + "%";
  document.getElementById("loading-pct").textContent = p + "%";
}
function hideLoading() {
  document.getElementById("loading-bar").style.width = "100%";
  document.getElementById("loading-pct").textContent = "100%";
  setTimeout(() => overlay.classList.add("hidden"), 320);
}

// ══ 15. RENDER LOOP ════════════════════════════════════════
const clock = new THREE.Clock();
(function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (flyTarget && flyT < 1) {
    flyT = Math.min(1, flyT + FLY_SPEED);
    const e = ease(flyT);
    camera.position.lerpVectors(_sp, flyTarget.pos, e);
    _tl.lerpVectors(_sl, flyTarget.look, e);
    controls.target.copy(_tl);
    if (flyT >= 1) flyTarget = null;
  }
  controls.update();
  renderer.render(scene, camera);
})();

// ══ 16. INIT ══════════════════════════════════════════════
function init() {
  renderTabs();
  renderPalette();
  showLoading("Đang khởi tạo...");
  setTimeout(() => switchTab(TABS[0].key), 200);
}
init();
