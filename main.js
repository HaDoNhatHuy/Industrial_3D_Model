// ═══════════════════════════════════════════════════════════
// MAIN.JS — Sơn Công Nghiệp 3D · Hải Vân Paint
// Three.js engine + UI + Procedural models + Hotspot system
// ═══════════════════════════════════════════════════════════

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { TABS, TAB_ZONES, CTA_URL } from "./data.js";

// ═══════════════════════════════════════════════════════════
// 0. LANGUAGE
// ═══════════════════════════════════════════════════════════
let lang = "vi";
const L = {
  vi: {
    toggleBtn: "EN",
    paintLabel: "Dòng sơn đề nghị",
    viewProduct: "Xem sản phẩm",
    ctaInlineLabel: "Cần tư vấn thêm?",
    ctaInlineBtn: "Gặp chuyên gia →",
    ctaBlockLabel: "Nhận tư vấn miễn phí",
    ctaBlockSub: "Chuyên gia Hải Vân Paint sẽ giúp bạn chọn đúng hệ sơn",
    ctaBlockBtn: "Liên hệ tư vấn ngay",
    typeExterior: "Bề mặt ngoài",
    typeInterior: "Khu vực bên trong",
    reasonLabel: "⚠ Tại sao cần bảo vệ?",
    sidebarDesc: "Chọn ngành để khám phá",
    hintLoading: "Đang khởi tạo...",
    hintBuilding: (name) => `Đang tạo mô hình ${name}...`,
    hintReady: "Kéo xoay · Cuộn zoom · Click điểm sáng để xem chi tiết",
    closePanel: "✕",
    panelEmptyTitle: "Chọn một vùng",
    panelEmptyDesc:
      "Click vào các điểm sáng trên mô hình 3D để xem thông tin chi tiết và đề xuất dòng sơn phù hợp",
  },
  en: {
    toggleBtn: "VI",
    paintLabel: "Recommended Coatings",
    viewProduct: "View Product",
    ctaInlineLabel: "Need more advice?",
    ctaInlineBtn: "Talk to an expert →",
    ctaBlockLabel: "Free Consultation",
    ctaBlockSub:
      "Hai Van Paint experts will help you choose the right coating system",
    ctaBlockBtn: "Contact Our Experts Now",
    typeExterior: "Exterior Surface",
    typeInterior: "Interior / Inside",
    reasonLabel: "⚠ Why protection matters",
    sidebarDesc: "Select an industry to explore",
    hintLoading: "Initializing...",
    hintBuilding: (name) => `Building ${name} model...`,
    hintReady:
      "Drag to rotate · Scroll to zoom · Click glowing spots for details",
    closePanel: "✕",
    panelEmptyTitle: "Select a zone",
    panelEmptyDesc:
      "Click the glowing hotspots on the 3D model to see details and coating recommendations",
  },
};
const t = () => L[lang];

// ═══════════════════════════════════════════════════════════
// 1. SCENE / CAMERA / RENDERER
// ═══════════════════════════════════════════════════════════
const HEADER_H = 56,
  BRAND_H = 38;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdde3ea);
scene.fog = new THREE.Fog(0xdde3ea, 60, 180);

const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 500);
camera.position.set(14, 9, 18);

const canvasWrap = document.getElementById("canvas-wrap");
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
canvasWrap.appendChild(renderer.domElement);

function resizeRenderer() {
  const w = canvasWrap.clientWidth,
    h = canvasWrap.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
resizeRenderer();
window.addEventListener("resize", resizeRenderer);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.07;
controls.minDistance = 2;
controls.maxDistance = 80;
controls.maxPolarAngle = Math.PI * 0.55;

// ═══════════════════════════════════════════════════════════
// 2. LIGHTING
// ═══════════════════════════════════════════════════════════
scene.add(new THREE.AmbientLight(0xffffff, 1.1));

const sun = new THREE.DirectionalLight(0xfff8f0, 2.2);
sun.position.set(30, 50, 20);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, {
  left: -30,
  right: 30,
  top: 30,
  bottom: -30,
  far: 140,
});
scene.add(sun);

const fill = new THREE.DirectionalLight(0xd0e4f8, 0.7);
fill.position.set(-15, 8, -12);
scene.add(fill);

const hemi = new THREE.HemisphereLight(0xe8f0ff, 0x9aabb8, 0.55);
scene.add(hemi);

// Ground plane (receives shadows)
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(120, 120),
  new THREE.MeshLambertMaterial({ color: 0xcdd5de }),
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.02;
ground.receiveShadow = true;
scene.add(ground);

// ═══════════════════════════════════════════════════════════
// 3. SHARED MATERIAL HELPERS
// ═══════════════════════════════════════════════════════════
const MAT = {
  steel: new THREE.MeshStandardMaterial({
    color: 0x8fa8b8,
    roughness: 0.35,
    metalness: 0.8,
  }),
  steelDk: new THREE.MeshStandardMaterial({
    color: 0x607585,
    roughness: 0.4,
    metalness: 0.75,
  }),
  rust: new THREE.MeshStandardMaterial({
    color: 0xa05030,
    roughness: 0.9,
    metalness: 0.2,
  }),
  paint: new THREE.MeshStandardMaterial({
    color: 0xd4e8f0,
    roughness: 0.5,
    metalness: 0.15,
  }),
  concrete: new THREE.MeshStandardMaterial({
    color: 0xa8b4be,
    roughness: 0.92,
    metalness: 0.0,
  }),
  glass: new THREE.MeshStandardMaterial({
    color: 0x88ccee,
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.35,
  }),
  pipe: new THREE.MeshStandardMaterial({
    color: 0x7a9aaa,
    roughness: 0.28,
    metalness: 0.88,
  }),
  pipeDk: new THREE.MeshStandardMaterial({
    color: 0x4a6a7a,
    roughness: 0.32,
    metalness: 0.85,
  }),
  tankBody: new THREE.MeshStandardMaterial({
    color: 0xb8ccd8,
    roughness: 0.22,
    metalness: 0.7,
  }),
  valve: new THREE.MeshStandardMaterial({
    color: 0xcc4444,
    roughness: 0.5,
    metalness: 0.6,
  }),
  galv: new THREE.MeshStandardMaterial({
    color: 0xc8d4dc,
    roughness: 0.18,
    metalness: 0.85,
  }),
  orange: new THREE.MeshStandardMaterial({
    color: 0xe07820,
    roughness: 0.55,
    metalness: 0.3,
  }),
  yellow: new THREE.MeshStandardMaterial({
    color: 0xe8c020,
    roughness: 0.6,
    metalness: 0.2,
  }),
  floor: new THREE.MeshStandardMaterial({
    color: 0x9ab0bc,
    roughness: 0.88,
    metalness: 0.05,
  }),
  floorEp: new THREE.MeshStandardMaterial({
    color: 0x608898,
    roughness: 0.18,
    metalness: 0.1,
  }),
};

// ═══════════════════════════════════════════════════════════
// 4. GEOMETRY HELPERS
// ═══════════════════════════════════════════════════════════
function box(w, h, d, mat, cast = true) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.castShadow = cast;
  m.receiveShadow = true;
  return m;
}
function cyl(rT, rB, h, seg, mat, cast = true) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, h, seg), mat);
  m.castShadow = cast;
  m.receiveShadow = true;
  return m;
}
function sph(r, seg, mat) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, seg), mat);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}
function tor(r, tube, seg, mat) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 8, seg), mat);
  m.castShadow = true;
  return m;
}

// I-Beam helper: flanges + web
function iBeam(len, mat) {
  const grp = new THREE.Group();
  const fw = 0.35,
    ft = 0.05,
    wh = 0.6,
    wt = 0.04;
  const topFlange = box(fw, ft, len, mat);
  topFlange.position.y = wh / 2 + ft / 2;
  const botFlange = box(fw, ft, len, mat);
  botFlange.position.y = -wh / 2 - ft / 2;
  const web = box(wt, wh, len, mat);
  grp.add(topFlange, botFlange, web);
  return grp;
}

// Pipe segment
function pipe(r, len, mat, axis = "y") {
  const m = cyl(r, r, len, 16, mat);
  if (axis === "x") m.rotation.z = Math.PI / 2;
  if (axis === "z") m.rotation.x = Math.PI / 2;
  return m;
}

// Flange (torus + disc)
function flange(r, mat) {
  const grp = new THREE.Group();
  const disc = cyl(r * 1.45, r * 1.45, 0.06, 20, mat);
  grp.add(disc);
  return grp;
}

// ═══════════════════════════════════════════════════════════
// 5. PROCEDURAL MODEL BUILDERS (placeholder — swap GLB here)
// ═══════════════════════════════════════════════════════════

// Helper: add mesh to group + track for raycasting
function addM(grp, mesh, pos, rot) {
  if (pos) mesh.position.set(pos.x, pos.y, pos.z);
  if (rot) mesh.rotation.set(rot.x, rot.y, rot.z);
  grp.add(mesh);
  return mesh;
}

// ── 1. KẾT CẤU THÉP ────────────────────────────────────────
function buildKetCauThep() {
  const grp = new THREE.Group();
  const cols = [
    [-3, 0, -3],
    [3, 0, -3],
    [3, 0, 3],
    [-3, 0, 3],
  ];
  const H = 6;

  // Columns (I-beams)
  cols.forEach(([x, , z]) => {
    const col = iBeam(H, MAT.steel);
    col.rotation.x = Math.PI / 2; // stand vertical
    col.rotation.z = 0;
    col.position.set(x, H / 2, z);
    grp.add(col);
    // Base plate
    const base = box(0.7, 0.08, 0.7, MAT.steelDk);
    base.position.set(x, 0.04, z);
    grp.add(base);
  });

  // Top beams (connecting columns)
  [
    [-3, -3],
    [3, -3],
    [3, 3],
    [-3, 3],
  ].forEach(([x, z], i) => {
    const beam = iBeam(6.6, MAT.steelDk);
    const nextX = cols[(i + 1) % 4][0],
      nextZ = cols[(i + 1) % 4][2];
    const cx = (x + nextX) / 2,
      cz = (z + nextZ) / 2;
    const angle = Math.atan2(nextZ - z, nextX - x);
    beam.position.set(cx, H, cz);
    beam.rotation.y = angle + Math.PI / 2;
    grp.add(beam);
  });

  // Mid-height beams
  [
    [-3, -3],
    [3, -3],
    [3, 3],
    [-3, 3],
  ].forEach(([x, z], i) => {
    const nextX = cols[(i + 1) % 4][0],
      nextZ = cols[(i + 1) % 4][2];
    const cx = (x + nextX) / 2,
      cz = (z + nextZ) / 2;
    const angle = Math.atan2(nextZ - z, nextX - x);
    const mBeam = iBeam(6.6, MAT.steel);
    mBeam.position.set(cx, H * 0.55, cz);
    mBeam.rotation.y = angle + Math.PI / 2;
    grp.add(mBeam);
  });

  // Cross bracing
  [
    [-3, H * 0.275, -3],
    [3, H * 0.275, -3],
  ].forEach(([x, y, z]) => {
    const brace = box(0.06, H * 0.55 * 1.05, 0.06, MAT.steelDk);
    brace.rotation.z = Math.atan2(H * 0.55, 6);
    brace.position.set(0, y, z);
    grp.add(brace);
  });

  // Roof trusses (across Z=-3 to Z=3)
  [-1, 1].forEach((x) => {
    const chord = iBeam(7.0, MAT.steelDk);
    chord.position.set(x, H + 0.08, 0);
    chord.rotation.y = Math.PI / 2;
    grp.add(chord);
    // Verticals
    [-2, 0, 2].forEach((z) => {
      const v = box(0.06, 0.5, 0.06, MAT.steel);
      v.position.set(x, H + 0.3, z);
      grp.add(v);
    });
  });

  // Roof panels (corrugated simulation via thin boxes)
  for (let i = -3; i < 3; i++) {
    const panel = box(
      6.2,
      0.04,
      0.9,
      new THREE.MeshStandardMaterial({
        color: 0xbbc8d2,
        roughness: 0.6,
        metalness: 0.5,
      }),
    );
    panel.position.set(0, H + 0.5, i + 0.5);
    panel.receiveShadow = true;
    grp.add(panel);
  }

  // Sàn boong / grating (mặt boong)
  const grating = box(6.2, 0.06, 6.2, MAT.galv);
  grating.position.set(0, H * 0.55 + 0.03, 0);
  grp.add(grating);

  // Stair
  for (let s = 0; s < 8; s++) {
    const step = box(0.8, 0.06, 0.3, MAT.steelDk);
    step.position.set(3.7, s * 0.42, 3.0 - s * 0.24);
    grp.add(step);
  }
  // Handrail
  const rail = cyl(0.025, 0.025, 4.5, 8, MAT.galv);
  rail.rotation.z = Math.atan2(4.5 * 0.55, 4.5);
  rail.position.set(3.7, 1.8, 1.2);
  grp.add(rail);

  // Weld dots at column tops
  cols.forEach(([x, , z]) => {
    const weld = sph(0.08, 8, MAT.rust);
    weld.position.set(x, H + 0.02, z);
    grp.add(weld);
  });

  grp.position.y = 0;
  return grp;
}

// ── 2. BỒN CHỨA HÓA CHẤT ────────────────────────────────────
function buildBonChua() {
  const grp = new THREE.Group();
  const R = 2.4,
    TH = 6.5;

  // Legs (foundation)
  [0, 60, 120, 180, 240, 300].forEach((deg) => {
    const rad = (deg * Math.PI) / 180;
    const leg = cyl(0.12, 0.14, 1.2, 8, MAT.steelDk);
    leg.position.set(Math.cos(rad) * (R - 0.3), 0.6, Math.sin(rad) * (R - 0.3));
    grp.add(leg);
    const foot = cyl(0.2, 0.22, 0.12, 8, MAT.steelDk);
    foot.position.set(
      Math.cos(rad) * (R - 0.3),
      0.06,
      Math.sin(rad) * (R - 0.3),
    );
    grp.add(foot);
  });
  // Ring beam at base
  const ringBase = tor(R - 0.3, 0.07, 32, MAT.steelDk);
  ringBase.rotation.x = Math.PI / 2;
  ringBase.position.y = 1.1;
  grp.add(ringBase);

  // Tank shell (cylinder)
  const tankBody = cyl(R, R, TH, 40, MAT.tankBody);
  tankBody.position.y = 1.2 + TH / 2;
  grp.add(tankBody);

  // Dome top (hemisphere)
  const domeTop = new THREE.Mesh(
    new THREE.SphereGeometry(R, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
    MAT.tankBody,
  );
  domeTop.castShadow = true;
  domeTop.position.y = 1.2 + TH;
  grp.add(domeTop);

  // Cone bottom
  const coneBot = cyl(R, R * 0.3, 1.0, 40, MAT.tankBody);
  coneBot.position.y = 1.2;
  grp.add(coneBot);
  const botCap = cyl(R * 0.3, R * 0.3, 0.2, 16, MAT.steelDk);
  botCap.position.y = 0.85;
  grp.add(botCap);

  // Stiffening rings
  [1.5, 2.5, 3.5, 4.5].forEach((h) => {
    const ring = tor(R + 0.04, 0.06, 40, MAT.steelDk);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 1.2 + h * (TH / 5);
    grp.add(ring);
  });

  // Vent / manway on top
  const vent = cyl(0.25, 0.25, 0.4, 12, MAT.steelDk);
  vent.position.set(0.8, 1.2 + TH + R * 0.5 + 0.2, 0);
  grp.add(vent);
  const ventCap = cyl(0.32, 0.32, 0.06, 12, MAT.steelDk);
  ventCap.position.set(0.8, 1.2 + TH + R * 0.5 + 0.44, 0);
  grp.add(ventCap);

  // Pipes
  const pipeBot = pipe(0.12, 2.5, MAT.pipe, "z");
  pipeBot.position.set(R - 0.1, 1.0, 0);
  grp.add(pipeBot);
  const fl1 = flange(0.12, MAT.steelDk);
  fl1.rotation.x = Math.PI / 2;
  fl1.position.set(R + 1.1, 1.0, 0);
  grp.add(fl1);

  const pipeSide = pipe(0.1, 1.8, MAT.pipeDk, "z");
  pipeSide.position.set(R - 0.1, 3.0, 0);
  grp.add(pipeSide);
  const fl2 = flange(0.1, MAT.steelDk);
  fl2.rotation.x = Math.PI / 2;
  fl2.position.set(R + 0.8, 3.0, 0);
  grp.add(fl2);

  // Ladder (series of rungs)
  for (let r = 0; r < 14; r++) {
    const rung = box(0.4, 0.04, 0.04, MAT.galv);
    rung.position.set(R + 0.12, 0.8 + r * 0.6, -0.05);
    grp.add(rung);
  }
  const rail1 = cyl(0.04, 0.04, 9.5, 6, MAT.galv);
  rail1.position.set(R + 0.3, 5.5, -0.1);
  grp.add(rail1);
  const rail2 = cyl(0.04, 0.04, 9.5, 6, MAT.galv);
  rail2.position.set(R - 0.1, 5.5, -0.1);
  grp.add(rail2);

  // Platform ring near top
  const platform = tor(R + 0.35, 0.18, 40, MAT.galv);
  platform.rotation.x = Math.PI / 2;
  platform.position.y = 1.2 + TH - 0.8;
  grp.add(platform);

  grp.position.y = 0;
  return grp;
}

// ── 3. ĐƯỜNG ỐNG ────────────────────────────────────────────
function buildDuongOng() {
  const grp = new THREE.Group();

  // Main horizontal run (Z axis)
  const mainPipe = pipe(0.22, 14, MAT.pipe, "z");
  mainPipe.position.set(0, 2.2, 0);
  grp.add(mainPipe);

  // Flanges on main pipe
  [-5, -2, 1, 4].forEach((z) => {
    const f = flange(0.22, MAT.steelDk);
    f.position.set(0, 2.2, z);
    f.rotation.x = Math.PI / 2;
    grp.add(f);
  });

  // Branch pipes (X axis)
  [-4, 0, 4].forEach((z) => {
    const branch = pipe(0.14, 3.5, MAT.pipeDk, "x");
    branch.position.set(-1.5, 2.2, z);
    grp.add(branch);
    const fl = flange(0.14, MAT.steelDk);
    fl.position.set(-3.15, 2.2, z);
    fl.rotation.z = Math.PI / 2;
    grp.add(fl);
  });

  // Vertical drop pipes
  [-4, 4].forEach((z) => {
    const vp = pipe(0.14, 2.5, MAT.pipeDk, "y");
    vp.position.set(-3.2, 1.05, z);
    grp.add(vp);
  });

  // Insulated pipe (lagged)
  const insulated = cyl(
    0.38,
    0.38,
    8,
    20,
    new THREE.MeshStandardMaterial({
      color: 0xddd8c0,
      roughness: 0.85,
      metalness: 0,
    }),
  );
  insulated.rotation.z = Math.PI / 2;
  insulated.position.set(0, 4.0, 0);
  grp.add(insulated);
  // Inner pipe showing
  const innerP = pipe(0.22, 0.5, MAT.pipe, "z");
  innerP.position.set(0, 4.0, -4.2);
  grp.add(innerP);

  // Valves
  [-2, 2].forEach((z) => {
    const vh = box(0.18, 0.44, 0.18, MAT.valve);
    vh.position.set(0, 2.2 + 0.44, z);
    grp.add(vh);
    const vbody = cyl(0.28, 0.28, 0.3, 8, MAT.valve);
    vbody.position.set(0, 2.2, z);
    grp.add(vbody);
    const handle = box(0.55, 0.06, 0.06, MAT.steelDk);
    handle.position.set(0, 2.2 + 0.7, z);
    grp.add(handle);
  });

  // Support structures
  [-5, -1, 3].forEach((z) => {
    const leg1 = cyl(0.06, 0.06, 2.2, 8, MAT.steelDk);
    leg1.position.set(0.5, 1.1, z);
    grp.add(leg1);
    const leg2 = cyl(0.06, 0.06, 2.2, 8, MAT.steelDk);
    leg2.position.set(-0.5, 1.1, z);
    grp.add(leg2);
    const crossbar = box(1.2, 0.06, 0.06, MAT.steelDk);
    crossbar.position.set(0, 2.15, z);
    grp.add(crossbar);
    // Anchor feet
    const foot = box(0.3, 0.06, 0.3, MAT.steelDk);
    foot.position.set(0.5, 0.03, z);
    grp.add(foot);
    const foot2 = box(0.3, 0.06, 0.3, MAT.steelDk);
    foot2.position.set(-0.5, 0.03, z);
    grp.add(foot2);
  });

  // Small instrument lines
  for (let i = -5; i < 5; i++) {
    const instLine = pipe(0.035, 1.5, MAT.galv, "y");
    instLine.position.set(0.26, 2.95, i * 1.2);
    grp.add(instLine);
  }

  // Underground pipe suggestion (trench cross-section)
  const trench = box(
    1.2,
    0.25,
    8,
    new THREE.MeshStandardMaterial({
      color: 0x7a8a94,
      roughness: 0.95,
      metalness: 0,
    }),
  );
  trench.position.set(-5.5, -0.1, 0);
  grp.add(trench);
  const ugPipe = pipe(
    0.22,
    8,
    new THREE.MeshStandardMaterial({
      color: 0x3a5a6a,
      roughness: 0.3,
      metalness: 0.8,
    }),
    "z",
  );
  ugPipe.position.set(-5.5, -0.04, 0);
  grp.add(ugPipe);

  grp.position.y = 0;
  return grp;
}

// ── 4. SÀN BÊ TÔNG ──────────────────────────────────────────
function buildSanBeTong() {
  const grp = new THREE.Group();
  const W = 14,
    D = 12;

  // Main floor slab
  const slab = box(W, 0.24, D, MAT.concrete);
  slab.position.set(0, 0.12, 0);
  grp.add(slab);

  // Epoxy coated zone (central)
  const epFloor = box(6, 0.02, 6, MAT.floorEp);
  epFloor.position.set(-1, 0.25, 0);
  grp.add(epFloor);

  // Chemical zone (left section, slightly different color)
  const chemFloor = box(
    3.5,
    0.02,
    5.5,
    new THREE.MeshStandardMaterial({
      color: 0x4a7888,
      roughness: 0.14,
      metalness: 0.08,
    }),
  );
  chemFloor.position.set(-5, 0.25, 0.25);
  grp.add(chemFloor);

  // Outdoor / parking zone (right)
  const outdoor = box(
    4.5,
    0.01,
    D,
    new THREE.MeshStandardMaterial({
      color: 0xa0b0b8,
      roughness: 0.85,
      metalness: 0,
    }),
  );
  outdoor.position.set(4.75, 0.245, 0);
  grp.add(outdoor);

  // Grid lines on slab
  for (let i = -6; i <= 7; i++) {
    const gl = box(
      0.03,
      0.01,
      D + 0.5,
      new THREE.MeshStandardMaterial({
        color: 0x8898a4,
        roughness: 1,
        metalness: 0,
      }),
    );
    gl.position.set(i, 0.26, 0);
    grp.add(gl);
  }
  for (let i = -5; i <= 6; i++) {
    const gl = box(
      W + 0.5,
      0.01,
      0.03,
      new THREE.MeshStandardMaterial({
        color: 0x8898a4,
        roughness: 1,
        metalness: 0,
      }),
    );
    gl.position.set(0, 0.26, i);
    grp.add(gl);
  }

  // Yellow safety line
  const yLine = box(14.5, 0.015, 0.12, MAT.yellow);
  yLine.position.set(0, 0.255, -2.5);
  grp.add(yLine);
  const yLine2 = box(14.5, 0.015, 0.12, MAT.yellow);
  yLine2.position.set(0, 0.255, 2.5);
  grp.add(yLine2);

  // Columns on slab
  [
    [-6, 6],
    [0, 6],
    [6, 6],
    [-6, -6],
    [0, -6],
    [6, -6],
  ].forEach(([x, z]) => {
    const c = box(0.5, 5.5, 0.5, MAT.concrete);
    c.position.set(x, 3.0, z);
    grp.add(c);
  });

  // Walls (partial)
  const wall1 = box(W, 4.5, 0.25, MAT.concrete);
  wall1.position.set(0, 2.5, -6.1);
  grp.add(wall1);
  const wall2 = box(W, 4.5, 0.25, MAT.concrete);
  wall2.position.set(0, 2.5, 6.1);
  grp.add(wall2);

  // Door opening in wall
  const doorVoid = box(
    2.0,
    3.5,
    0.3,
    new THREE.MeshStandardMaterial({ color: 0xdde3ea, roughness: 1 }),
  );
  doorVoid.position.set(-3, 2.0, -6.1);
  grp.add(doorVoid);

  // Drain channels
  const drain = box(
    12,
    0.07,
    0.22,
    new THREE.MeshStandardMaterial({
      color: 0x607070,
      roughness: 0.8,
      metalness: 0.3,
    }),
  );
  drain.position.set(0, 0.24, 0);
  grp.add(drain);

  // Forklift tire tracks (orange markings)
  for (let i = 0; i < 4; i++) {
    const track = box(0.25, 0.01, 5, MAT.orange);
    track.position.set(-2 + i * 0.35, 0.255, 1.5);
    grp.add(track);
  }

  grp.position.y = 0;
  return grp;
}

// ── 5. LĨNH VỰC ĐẶC BIỆT ────────────────────────────────────
function buildDacBiet() {
  const grp = new THREE.Group();

  // — FIRE PROTECTION COLUMN —
  const steelCol = iBeam(5.0, MAT.steel);
  steelCol.rotation.x = Math.PI / 2;
  steelCol.position.set(-5, 2.8, 0);
  grp.add(steelCol);
  // Intumescent layer (slightly thicker, off-white)
  const intuLayer = box(
    0.55,
    5.05,
    0.12,
    new THREE.MeshStandardMaterial({
      color: 0xe8e0d0,
      roughness: 0.85,
      metalness: 0,
    }),
  );
  intuLayer.position.set(-5, 2.8, 0);
  grp.add(intuLayer);
  // Fire label
  const firePlaque = box(
    0.8,
    0.3,
    0.04,
    new THREE.MeshStandardMaterial({
      color: 0xcc2222,
      roughness: 0.7,
      metalness: 0,
    }),
  );
  firePlaque.position.set(-5, 1.8, 0.1);
  grp.add(firePlaque);

  // — OFFSHORE / COASTAL STRUCTURE —
  // Jacket legs
  [
    [-1.5, -1.5],
    [1.5, -1.5],
    [1.5, 1.5],
    [-1.5, 1.5],
  ].forEach(([x, z]) => {
    const jLeg = cyl(0.14, 0.16, 6.0, 12, MAT.pipeDk);
    jLeg.position.set(x, 3.2, z);
    grp.add(jLeg);
    // Splash zone highlighting (different material)
    const splash = cyl(
      0.16,
      0.16,
      1.0,
      12,
      new THREE.MeshStandardMaterial({
        color: 0xc84a22,
        roughness: 0.5,
        metalness: 0.4,
      }),
    );
    splash.position.set(x, 1.5, z);
    grp.add(splash);
  });
  // Horizontal bracing at levels
  [1.0, 3.5].forEach((y) => {
    [
      [-1.5, -1.5, 1.5, -1.5],
      [-1.5, -1.5, -1.5, 1.5],
      [1.5, -1.5, 1.5, 1.5],
      [-1.5, 1.5, 1.5, 1.5],
    ].forEach(([x1, z1, x2, z2]) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const brace = cyl(0.07, 0.07, len, 8, MAT.pipe);
      brace.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
      brace.rotation.y = Math.atan2(z2 - z1, x2 - x1);
      brace.rotation.z = Math.PI / 2;
      grp.add(brace);
    });
    // Diagonal braces
    const diag1 = cyl(0.05, 0.05, 4.33, 8, MAT.steelDk);
    diag1.position.set(0, y, 0);
    diag1.rotation.z = Math.atan2(y, 1.5 * 2);
    grp.add(diag1);
  });
  // Deck
  const deck = box(3.6, 0.2, 3.6, MAT.galv);
  deck.position.set(0, 6.3, 0);
  grp.add(deck);
  // Helideck suggestion
  const heli = cyl(1.4, 1.4, 0.08, 40, MAT.orange);
  heli.position.set(0, 6.45, 0);
  grp.add(heli);

  // — HIGH-TEMP EQUIPMENT —
  const stack = cyl(
    0.5,
    0.55,
    7.5,
    16,
    new THREE.MeshStandardMaterial({
      color: 0xc8a060,
      roughness: 0.45,
      metalness: 0.5,
    }),
  );
  stack.position.set(5, 3.8, 0);
  grp.add(stack);
  // Hot zone band
  for (let i = 0; i < 3; i++) {
    const band = tor(
      0.55,
      0.06,
      20,
      new THREE.MeshStandardMaterial({
        color: 0xff4444,
        roughness: 0.4,
        metalness: 0.4,
        emissive: 0xff1100,
        emissiveIntensity: 0.3,
      }),
    );
    band.rotation.x = Math.PI / 2;
    band.position.set(5, 1.5 + i * 1.8, 0);
    grp.add(band);
  }
  // Stack top cap
  const stackCap = cyl(0.6, 0.5, 0.3, 16, MAT.steelDk);
  stackCap.position.set(5, 7.65, 0);
  grp.add(stackCap);

  // — ESD FLOOR ZONE —
  const esdFloor = box(
    4.5,
    0.05,
    4.5,
    new THREE.MeshStandardMaterial({
      color: 0x1a3a4a,
      roughness: 0.15,
      metalness: 0.25,
    }),
  );
  esdFloor.position.set(-5, 0.025, -3.5);
  grp.add(esdFloor);
  // ESD stripe
  const esdStripe = box(4.5, 0.01, 0.15, MAT.yellow);
  esdStripe.position.set(-5, 0.06, -3.5);
  grp.add(esdStripe);
  // Ground bonding point
  const gbolt = cyl(0.08, 0.08, 0.15, 8, MAT.orange);
  gbolt.position.set(-3.5, 0.08, -3.5);
  grp.add(gbolt);

  grp.position.y = 0;
  return grp;
}

// ═══════════════════════════════════════════════════════════
// 6. TAB SCENE MANAGEMENT
// ═══════════════════════════════════════════════════════════
const TAB_BUILDERS = {
  ket_cau_thep: buildKetCauThep,
  bon_chua: buildBonChua,
  duong_ong: buildDuongOng,
  san_be_tong: buildSanBeTong,
  dac_biet: buildDacBiet,
};

// Camera presets per tab
const CAM_PRESETS = {
  ket_cau_thep: { pos: [12, 9, 14], target: [0, 3.5, 0] },
  bon_chua: { pos: [14, 10, 10], target: [0, 4.5, 0] },
  duong_ong: { pos: [10, 6, 12], target: [0, 2.2, 0] },
  san_be_tong: { pos: [10, 10, 8], target: [0, 0.5, 0] },
  dac_biet: { pos: [14, 9, 14], target: [0, 3.5, 0] },
};

const tabGroups = {}; // key → THREE.Group
let activeTabKey = null;

// Lazy-build and switch tab scene
function switchTab(key) {
  showLoading(t().hintBuilding(TABS.find((t) => t.key === key)?.label || ""));

  // Hide previous
  if (activeTabKey && tabGroups[activeTabKey]) {
    tabGroups[activeTabKey].visible = false;
  }

  activeTabKey = key;
  clearInfoPanel();
  clearHotspotMarkers();

  setTimeout(() => {
    if (!tabGroups[key]) {
      // Check if GLB available, else use procedural
      const tab = TABS.find((t) => t.key === key);
      tryLoadGLB(key, tab.modelFile, () => {
        if (!tabGroups[key]) {
          tabGroups[key] = TAB_BUILDERS[key]();
          scene.add(tabGroups[key]);
        }
        afterTabBuilt(key);
      });
    } else {
      afterTabBuilt(key);
    }
  }, 80);
}

function afterTabBuilt(key) {
  tabGroups[key].visible = true;
  flyToPreset(key);
  buildHotspotMarkers(key);
  hideLoading();
}

// Try to load a GLB, fallback to procedural on error
function tryLoadGLB(key, filename, fallback) {
  const path = `./assets/models/${filename}`;
  new GLTFLoader().load(
    path,
    (gltf) => {
      const model = gltf.scene;
      // Normalize size to ~10 units
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
      tabGroups[key] = model;
      scene.add(model);
      fallback();
    },
    (xhr) => {
      const p = xhr.total ? Math.round((xhr.loaded / xhr.total) * 100) : 0;
      setLoadingPct(p, filename);
    },
    () => {
      fallback();
    }, // silently fall back to procedural
  );
}

// ═══════════════════════════════════════════════════════════
// 7. HOTSPOT SYSTEM
// ═══════════════════════════════════════════════════════════
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const hotspotMeshes = []; // { mesh, key, zoneId }
const hotspotMarkers = []; // DOM elements

// Invisible sphere at hotspot position for raycasting
function buildHotspotMarkers(tabKey) {
  clearHotspotMarkers();
  const zones = TAB_ZONES[tabKey] || [];
  zones.forEach((zone) => {
    const { x, y, z } = zone.position;
    const mat = new THREE.MeshBasicMaterial({ visible: false });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 8), mat);
    mesh.position.set(x, y, z);
    mesh.userData = { tabKey, zoneId: zone.id };
    scene.add(mesh);
    hotspotMeshes.push(mesh);

    // DOM marker (CSS overlay)
    const tab = TABS.find((t) => t.key === tabKey);
    const color = tab?.color || "#0c1e35";
    const el = document.createElement("div");
    el.className = "hs-marker";
    el.dataset.zoneId = zone.id;
    el.innerHTML = `
      <div class="hs-core" style="background:${color}"></div>
      <div class="hs-ring" style="color:${color};border-color:${color}"></div>
      <div class="hs-ring hs-ring-2" style="color:${color};border-color:${color}"></div>
      <div class="hs-ring hs-ring-3" style="color:${color};border-color:${color}"></div>`;
    el.addEventListener("mouseenter", () => showHotspotTooltip(zone.label, el));
    el.addEventListener("mouseleave", hideHotspotTooltip);
    el.addEventListener("click", () => openZone(tabKey, zone.id));
    el.style.pointerEvents = "auto";
    canvasWrap.appendChild(el);
    hotspotMarkers.push({ el, mesh, worldPos: new THREE.Vector3(x, y, z) });
  });
}

function clearHotspotMarkers() {
  hotspotMeshes.forEach((m) => scene.remove(m));
  hotspotMeshes.length = 0;
  hotspotMarkers.forEach(({ el }) => el.remove());
  hotspotMarkers.length = 0;
}

// Project world pos → screen pos, update CSS markers
function updateMarkerPositions() {
  if (!activeTabKey) return;
  hotspotMarkers.forEach(({ el, worldPos }) => {
    const v = worldPos.clone().project(camera);
    if (v.z > 1) {
      el.style.display = "none";
      return;
    }
    const rect = canvasWrap.getBoundingClientRect();
    const sx = (v.x * 0.5 + 0.5) * rect.width + rect.left;
    const sy = (-v.y * 0.5 + 0.5) * rect.height + rect.top;
    if (
      sx < rect.left - 30 ||
      sx > rect.right + 30 ||
      sy < rect.top - 30 ||
      sy > rect.bottom + 30
    ) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
      el.style.left = sx - 14 + "px";
      el.style.top = sy - 14 + "px";
    }
  });
}

// Hotspot tooltip
const tooltip = document.getElementById("hotspot-tooltip");
function showHotspotTooltip(label, el) {
  tooltip.textContent = label;
  tooltip.style.display = "block";
  const r = el.getBoundingClientRect();
  tooltip.style.left = r.left + r.width / 2 + "px";
  tooltip.style.top = r.top + "px";
}
function hideHotspotTooltip() {
  tooltip.style.display = "none";
}

// ═══════════════════════════════════════════════════════════
// 8. INFO PANEL
// ═══════════════════════════════════════════════════════════
const infoPanel = document.getElementById("info-panel");
let activeZoneId = null;

function openZone(tabKey, zoneId) {
  const tab = TABS.find((t) => t.key === tabKey);
  const zones = TAB_ZONES[tabKey] || [];
  const zone = zones.find((z) => z.id === zoneId);
  if (!zone) return;
  activeZoneId = zoneId;
  flyToHotspot(zone.position);

  const color = tab?.color || "#0c1e35";
  const isInt = zone.type === "interior";
  const typeLabel = isInt ? t().typeInterior : t().typeExterior;
  const rgb = hexToRgb(color);

  const paintsHTML = zone.paints
    .map(
      (p, i) => `
    <div class="paint-card">
      <div class="paint-card-body">
        <div class="paint-num" style="background:${color}">${i + 1}</div>
        <div class="paint-info">
          <div class="paint-name">${p.name}</div>
          <div class="paint-desc">${p.desc}</div>
        </div>
      </div>
      <div class="paint-card-footer">
        <a href="${p.link || "#"}" target="_blank" rel="noopener" class="product-link" style="color:${color}">
          <span class="link-icon">⬡</span>
          <span class="link-text">${t().viewProduct}</span>
          <span class="link-arrow">→</span>
        </a>
      </div>
    </div>`,
    )
    .join("");

  infoPanel.innerHTML = `
    <div class="panel-content">
      <div class="panel-header">
        <button class="panel-close-btn" id="panelClose">${t().closePanel}</button>
        <div class="panel-type-badge">
          <div class="panel-type-dot" style="background:${color}"></div>
          <div class="panel-type-label">${isInt ? "▪" : "◆"} ${typeLabel}</div>
        </div>
        <div class="panel-zone-name">${zone.label}</div>
      </div>

      <div class="panel-desc">${zone.description}</div>

      <div class="panel-reason">
        <div class="panel-reason-label">${t().reasonLabel}</div>
        ${zone.reason}
      </div>

      <div class="cta-inline">
        <span class="cta-inline-label">${t().ctaInlineLabel}</span>
        <a href="${CTA_URL}" target="_blank" class="cta-inline-btn">${t().ctaInlineBtn}</a>
      </div>

      <div style="height:1px;background:#eef0f3;margin:10px 0 0"></div>

      <div class="paint-section-header">
        <span class="paint-section-label">${t().paintLabel}</span>
        <div class="paint-section-line"></div>
        <span class="paint-count-badge" style="background:${color}">${zone.paints.length}</span>
      </div>
      <div class="paint-cards-wrap">${paintsHTML}</div>

      <div class="cta-divider"></div>
      <div class="cta-block">
        <div class="cta-block-inner">
          <span class="cta-block-icon">💬</span>
          <div class="cta-block-label">${t().ctaBlockLabel}</div>
          <div class="cta-block-sub">${t().ctaBlockSub}</div>
          <a href="${CTA_URL}" target="_blank" class="cta-block-btn">
            ${t().ctaBlockBtn}
            <span class="cta-block-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </div>`;

  document
    .getElementById("panelClose")
    ?.addEventListener("click", clearInfoPanel);

  // Mobile: show panel
  infoPanel.classList.add("visible");
}

function clearInfoPanel() {
  activeZoneId = null;
  infoPanel.classList.remove("visible");
  infoPanel.innerHTML = `
    <div class="panel-empty">
      <div class="panel-empty-icon">🎯</div>
      <div class="panel-empty-title">${t().panelEmptyTitle}</div>
      <div class="panel-empty-desc">${t().panelEmptyDesc}</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════
// 9. CAMERA FLY-TO
// ═══════════════════════════════════════════════════════════
let flyTarget = null,
  flyT = 1;
const FLY_SPEED = 0.035;
const _sp = new THREE.Vector3(),
  _sl = new THREE.Vector3(),
  _tl = new THREE.Vector3();

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

function flyToHotspot(worldPos) {
  _sp.copy(camera.position);
  _sl.copy(controls.target);
  const look = new THREE.Vector3(worldPos.x, worldPos.y, worldPos.z);
  const dir = new THREE.Vector3()
    .subVectors(camera.position, controls.target)
    .normalize();
  const pos = look.clone().addScaledVector(dir, 10);
  flyTarget = { pos, look };
  flyT = 0;
}

function ease(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ═══════════════════════════════════════════════════════════
// 10. LOADING UI
// ═══════════════════════════════════════════════════════════
const overlay = document.getElementById("loading-overlay");
const loadTitle = document.getElementById("loading-title");
const loadBar = document.getElementById("loading-bar");
const loadPct = document.getElementById("loading-pct");

function showLoading(msg) {
  loadTitle.textContent = msg || t().hintLoading;
  loadBar.style.width = "0%";
  loadPct.textContent = "0%";
  overlay.classList.remove("hidden");
}

function setLoadingPct(p, label) {
  loadTitle.textContent = label ? `Đang tải ${label}...` : t().hintLoading;
  loadBar.style.width = p + "%";
  loadPct.textContent = p + "%";
}

function hideLoading() {
  loadBar.style.width = "100%";
  loadPct.textContent = "100%";
  setTimeout(() => overlay.classList.add("hidden"), 350);
}

// ═══════════════════════════════════════════════════════════
// 11. BUILD SIDEBAR TABS
// ═══════════════════════════════════════════════════════════
const tabList = document.getElementById("tab-list");

function renderTabList() {
  tabList.innerHTML = "";
  TABS.forEach((tab) => {
    const item = document.createElement("div");
    item.className = "tab-item" + (activeTabKey === tab.key ? " active" : "");
    item.dataset.key = tab.key;
    item.style.borderLeftColor =
      activeTabKey === tab.key ? tab.color : "transparent";
    item.innerHTML = `
      <span class="tab-color-bar" style="background:${tab.color}"></span>
      <span class="tab-icon">${tab.icon}</span>
      <span class="tab-name">${tab.label}</span>
      <span class="tab-arrow">›</span>`;
    item.addEventListener("click", () => onTabClick(tab.key));
    tabList.appendChild(item);
  });
}

function onTabClick(key) {
  if (activeTabKey === key) return;
  // Update active styling
  document.querySelectorAll(".tab-item").forEach((el) => {
    const isActive = el.dataset.key === key;
    const tab = TABS.find((t) => t.key === el.dataset.key);
    el.classList.toggle("active", isActive);
    el.style.borderLeftColor = isActive
      ? tab?.color || "transparent"
      : "transparent";
    el.querySelector(".tab-name").style.fontWeight = isActive ? "600" : "400";
    el.querySelector(".tab-name").style.color = isActive ? "#1a2b3c" : "";
  });
  switchTab(key);
}

// ═══════════════════════════════════════════════════════════
// 12. TOOLBAR BUTTONS
// ═══════════════════════════════════════════════════════════
let autoRotate = false;
const btnRotate = document.getElementById("btn-rotate");

document.getElementById("btn-reset")?.addEventListener("click", () => {
  flyToPreset(activeTabKey || TABS[0].key);
});

document.getElementById("btn-fit")?.addEventListener("click", () => {
  if (!activeTabKey) return;
  const grp = tabGroups[activeTabKey];
  if (!grp) return;
  const bbox = new THREE.Box3().setFromObject(grp);
  const cen = bbox.getCenter(new THREE.Vector3());
  const size = bbox.getSize(new THREE.Vector3());
  const maxD = Math.max(size.x, size.y, size.z);
  const dist = maxD * 1.6;
  _sp.copy(camera.position);
  _sl.copy(controls.target);
  flyTarget = {
    pos: new THREE.Vector3(
      cen.x + dist * 0.6,
      cen.y + dist * 0.4,
      cen.z + dist * 0.7,
    ),
    look: cen.clone(),
  };
  flyT = 0;
});

btnRotate?.addEventListener("click", () => {
  autoRotate = !autoRotate;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 1.2;
  btnRotate.dataset.active = String(autoRotate);
});

// ═══════════════════════════════════════════════════════════
// 13. LANGUAGE TOGGLE
// ═══════════════════════════════════════════════════════════
document.getElementById("btn-lang")?.addEventListener("click", () => {
  lang = lang === "vi" ? "en" : "vi";
  document.getElementById("lang-label").textContent = t().toggleBtn;
  renderTabList();
  if (activeZoneId && activeTabKey) openZone(activeTabKey, activeZoneId);
  else clearInfoPanel();
});

// ═══════════════════════════════════════════════════════════
// 14. MOUSE / CLICK EVENTS
// ═══════════════════════════════════════════════════════════
renderer.domElement.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / canvasWrap.clientWidth) * 2 - 1;
  // Need to account for canvas top offset
  const rect = canvasWrap.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(hotspotMeshes, false);
  renderer.domElement.style.cursor = hits.length ? "pointer" : "grab";
});

renderer.domElement.addEventListener("click", (e) => {
  const rect = canvasWrap.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(hotspotMeshes, false);
  if (hits.length) {
    const { tabKey, zoneId } = hits[0].object.userData;
    openZone(tabKey, zoneId);
  }
});

// ═══════════════════════════════════════════════════════════
// 15. HOTSPOT GLOW ANIMATION (time-based)
// ═══════════════════════════════════════════════════════════
let _elapsed = 0;

function animateHotspots(dt) {
  _elapsed += dt;
  hotspotMarkers.forEach(({ el }, i) => {
    const phase = i * 0.6;
    const pulse = 0.92 + Math.sin(_elapsed * 2.2 + phase) * 0.08;
    const core = el.querySelector(".hs-core");
    if (core) core.style.transform = `translate(-50%,-50%) scale(${pulse})`;
  });
}

// ═══════════════════════════════════════════════════════════
// 16. ANIMATION LOOP
// ═══════════════════════════════════════════════════════════
const clock = new THREE.Clock();

(function loop() {
  requestAnimationFrame(loop);
  const dt = Math.min(clock.getDelta(), 0.05);

  // Camera fly animation
  if (flyTarget && flyT < 1) {
    flyT = Math.min(1, flyT + FLY_SPEED);
    const e = ease(flyT);
    camera.position.lerpVectors(_sp, flyTarget.pos, e);
    _tl.lerpVectors(_sl, flyTarget.look, e);
    controls.target.copy(_tl);
    if (flyT >= 1) flyTarget = null;
  }

  animateHotspots(dt);
  updateMarkerPositions();
  controls.update();
  renderer.render(scene, camera);
})();

// ═══════════════════════════════════════════════════════════
// 17. UTILITY
// ═══════════════════════════════════════════════════════════
function hexToRgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).join(",");
}

// ═══════════════════════════════════════════════════════════
// 18. INIT
// ═══════════════════════════════════════════════════════════
function init() {
  renderTabList();
  showLoading(t().hintLoading);
  // Load first tab after short delay
  setTimeout(() => switchTab(TABS[0].key), 200);
}

init();
