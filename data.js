// ═══════════════════════════════════════════════════════════
// DATA.JS — Bảng màu Sơn Hải Vân + Dữ liệu hệ sơn theo lĩnh vực
// ═══════════════════════════════════════════════════════════

// ── Bảng màu từ catalogue Sơn Hải Vân ─────────────────────
// (lấy từ bảng màu thực tế của công ty)
export const PALETTE = {
  // Sơn Lót (Primer)
  primer: [
    { code: "701", name: "Xám trung", hex: "#8e8e8e" },
    { code: "275", name: "Xanh lá đậm", hex: "#2e7a30" },
    { code: "352", name: "Xanh dương", hex: "#1e3e8a" },
    { code: "550", name: "Nâu đỏ đậm", hex: "#5a1c14" },
    { code: "375", name: "Xanh ngọc", hex: "#48b8b0" },
    { code: "796", name: "Kem vàng nhạt", hex: "#e8dba8" },
    { code: "950", name: "Bạc ghi", hex: "#c0c4c8" },
    { code: "770", name: "Xám đậm", hex: "#686868" },
    { code: "702", name: "Xám trung nhạt", hex: "#787878" },
    { code: "750", name: "Xám xanh", hex: "#8090a0" },
    { code: "752", name: "Xám nhạt", hex: "#9898a0" },
    { code: "790", name: "Xám xanh đậm", hex: "#708090" },
    { code: "268", name: "Xanh lá tươi", hex: "#28985a" },
    { code: "738", name: "Xám bạc nhạt", hex: "#a8a8a8" },
    { code: "452", name: "Xanh đen", hex: "#1e3828" },
    { code: "373", name: "Gần đen", hex: "#282828" },
  ],
  // Sơn Phủ (Topcoat)
  topcoat: [
    { code: "605", name: "Đỏ", hex: "#c02020" },
    { code: "653", name: "Vàng vàng", hex: "#d4a020" },
    { code: "669", name: "Vàng chanh", hex: "#dcd050" },
    { code: "660", name: "Vàng nhạt", hex: "#eee090" },
    { code: "262", name: "Xanh lá sáng", hex: "#28c858" },
    { code: "670", name: "Cát vàng", hex: "#c8b878" },
    { code: "671", name: "Vàng oliu", hex: "#b8a850" },
    { code: "349", name: "Xanh tím than", hex: "#1a2870" },
    { code: "551", name: "Đỏ đậm", hex: "#8a1818" },
    { code: "640", name: "Cam đất", hex: "#c86020" },
    { code: "555", name: "Cam đỏ", hex: "#e04820" },
    { code: "503", name: "Nâu", hex: "#6a3018" },
    { code: "355", name: "Xanh trời", hex: "#48a8d8" },
    { code: "450", name: "Đen", hex: "#1a1a1a" },
    { code: "557", name: "Cam tươi", hex: "#e06020" },
    { code: "WHITE", name: "Trắng", hex: "#f0f0f0" },
  ],
};

// ── Tabs lĩnh vực ──────────────────────────────────────────
export const TABS = [
  {
    key: "ket_cau_thep",
    icon: "🏗️",
    label: "Kết cấu thép",
    labelEn: "Steel Structure",
    color: "#37474f",
    modelFile: "nha-xuong-2.glb",
    desc: "Kết cấu thép công nghiệp, nhà xưởng, cầu cảng",
    descEn: "Industrial steel structures, warehouses, ports",
    products: [
      {
        name: "Sơn lót Epoxy giàu kẽm",
        desc: "Bảo vệ cathodic, chống ăn mòn ngay từ bề mặt thép",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Epoxy phủ trung gian",
        desc: "Tăng độ dày màng sơn, chắn thấm ẩm hiệu quả",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Polyurethane phủ ngoài",
        desc: "Giữ màu bền, chịu UV và thời tiết khắc nghiệt",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
      {
        name: "Sơn Alkyd biến tính",
        desc: "Tiết kiệm, phù hợp bảo trì định kỳ nội thất",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-alkyd",
      },
    ],
  },
  {
    key: "bon_chua",
    icon: "🛢️",
    label: "Bồn chứa hóa chất",
    labelEn: "Chemical Tanks",
    color: "#1565c0",
    modelFile: "bon-chua-lop-thep.glb",
    desc: "Bồn chứa hóa chất, phân bón, dầu nhớt",
    descEn: "Chemical storage tanks, fertilizers, oils",
    products: [
      {
        name: "Sơn Epoxy kháng hóa chất",
        desc: "Chịu axit loãng, kiềm và dung dịch muối",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Coal Tar Epoxy",
        desc: "Chống thấm nước, bền bỉ vượt trội trong môi trường biển",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Phenolic",
        desc: "Kháng hóa chất mạnh, phù hợp bồn axit đậm đặc",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Polyurethane ngoại thất",
        desc: "Bảo vệ mặt ngoài khỏi UV và thời tiết",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
    ],
  },
  {
    key: "duong_ong",
    icon: "🔩",
    label: "Đường ống & bồn chứa",
    labelEn: "Pipelines & Tanks",
    color: "#00695c",
    modelFile: "bon-chua-duong-ong.glb",
    desc: "Hệ thống đường ống dẫn nước, dầu khí, cứu hỏa",
    descEn: "Water, oil & gas, fire protection pipelines",
    products: [
      {
        name: "Sơn Coal Tar Epoxy",
        desc: "Chịu đất ăn mòn, ngăn thẩm thấu nước đất hiệu quả",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Epoxy ống nội bộ",
        desc: "Phù hợp truyền dẫn hóa chất, không gây ô nhiễm",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Bitum",
        desc: "Chống thấm, bảo vệ ống ngầm hiệu quả",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-bitum",
      },
      {
        name: "Sơn PU 1K",
        desc: "Lớp phủ ngoài bền, chịu va đập và tia UV",
        link: "https://sonhaivan.com/san-pham/",
      },
    ],
  },
  {
    key: "san_be_tong",
    icon: "🏭",
    label: "Sàn bê tông",
    labelEn: "Concrete Floors",
    color: "#6d4c41",
    modelFile: "san-be-tong.glb",
    desc: "Sàn nhà xưởng, kho bãi, phòng sạch, bãi đỗ",
    descEn: "Factory floors, warehouses, clean rooms, parking",
    products: [
      {
        name: "Sơn Epoxy tự phẳng",
        desc: "Bề mặt nhẵn bóng, chịu xe nâng tải 5–10 tấn",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Bê tông chuyên dụng",
        desc: "Tăng cứng bề mặt, chống bụi và thấm dầu mỡ",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-be-tong",
      },
      {
        name: "Sơn Polyurethane sàn",
        desc: "Đàn hồi, chịu va đập và nhiệt độ dao động",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
    ],
  },
  {
    key: "dac_biet",
    icon: "⚙️",
    label: "Lĩnh vực đặc biệt",
    labelEn: "Special Applications",
    color: "#6a1fa2",
    modelFile: "linh-vuc-dac-biet.glb",
    desc: "Sơn chống cháy, chịu nhiệt, offshore, chống tĩnh điện",
    descEn: "Fire protection, heat resistant, offshore, anti-static",
    products: [
      {
        name: "Sơn Chống cháy Intumescent",
        desc: "Bảo vệ kết cấu thép R30 đến R180 phút",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Silicate kẽm vô cơ",
        desc: "Tiêu chuẩn ISO 12944 C5-M cho môi trường biển",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-silicate",
      },
      {
        name: "Sơn Chịu nhiệt 600°C",
        desc: "Ổn định nhiệt cao, không đổi màu và bong tróc",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Cao su clo hóa",
        desc: "Kháng hóa chất, chống tĩnh điện cho kho nhiên liệu",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-caosu-clo-hoa",
      },
    ],
  },
];

export const CTA_URL = "https://sonhaivan.com/lien-he/";
