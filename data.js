// ═══════════════════════════════════════════════════════════
// DATA.JS — Bảng màu Sơn Hải Vân + Dữ liệu hệ sơn theo lĩnh vực
// ═══════════════════════════════════════════════════════════

// ── Bảng màu chủ đạo Sơn Hải Vân ─────────────────────────
export const PALETTE = [
  { code: "XM", name: "Xám xanh đậm", hex: "#6A7984", metallic: false },
  { code: "XN", name: "Xám nhạt", hex: "#95999D", metallic: false },
  { code: "DC", name: "Đỏ cam", hex: "#8F2C15", metallic: false },
  { code: "DD", name: "Đỏ đậm", hex: "#430F03", metallic: false },
  { code: "NV", name: "Nâu đỏ", hex: "#57291D", metallic: false },
  { code: "XL", name: "Xanh lá đậm", hex: "#095219", metallic: false },
  { code: "XD", name: "Xanh dương đậm", hex: "#033D8B", metallic: false },
  { code: "XB", name: "Xám bạc", hex: "#727E8A", metallic: false },
  { code: "NB", name: "Nhũ bạc", hex: "#C8CDD4", metallic: true },
];

// ── Tabs lĩnh vực ──────────────────────────────────────────
export const TABS = [
  {
    key: "ket_cau_thep",
    icon: "⬛",
    label: "Kết cấu thép",
    labelEn: "Steel Structure",
    color: "#37474f",
    modelFile: "Nha-xuong-chuan.glb",
    desc: "Cung cấp nhiều chủng loại sơn cho các mục đích khác nhau của công trình từ kết cấu thép, cầu cảng đến các thiết bị xa bờ. Các sản phẩm thích hợp dùng cho các thiết bị máy móc trong công nghiệp lẫn các thiết bị dùng sản xuất thực phẩm.",
    descEn:
      "Paints for steel structures, bridges, offshore equipment, industrial machinery and food-grade applications.",
    products: [
      {
        name: "Sơn Epoxy",
        desc: "Bảo vệ chống ăn mòn, chịu hóa chất, phù hợp kết cấu thép công nghiệp",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Polyurethane",
        desc: "Lớp phủ ngoài giữ màu bền, chịu UV và thời tiết khắc nghiệt",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
      {
        name: "Sơn Alkyd",
        desc: "Tiết kiệm, phù hợp bảo trì định kỳ kết cấu thép nội thất",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-alkyd",
      },
      {
        name: "Sơn PU 1K",
        desc: "Một thành phần tiện dụng, bền bỉ cho thiết bị công nghiệp",
        link: "https://sonhaivan.com/san-pham/",
      },
    ],
  },
  {
    key: "bon_chua",
    icon: "⬛",
    label: "Bồn chứa hóa chất - phân bón",
    labelEn: "Chemical",
    color: "#1565c0",
    modelFile: "bon-chua-lop-thep.glb",
    desc: "Bảo vệ thiết bị lâu dài bằng các hệ sơn chịu hóa chất đặc biệt, giúp giảm chi phí bảo trì, thay mới cho các hệ thống bồn chứa hóa chất, nhà xưởng sản xuất hóa chất, nhà máy phân bón, dược phẩm, đường ống và bể chứa nước thải.",
    descEn:
      "Long-term protection with chemical-resistant coatings for tanks, chemical plants, fertilizer factories, pipelines and wastewater systems.",
    products: [
      {
        name: "Sơn Epoxy chuyên dụng",
        desc: "Chịu axit, kiềm và dung dịch muối, bảo vệ bồn hóa chất hiệu quả",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Phenolic",
        desc: "Kháng hóa chất mạnh, phù hợp bồn axit đậm đặc và môi trường khắc nghiệt",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Cao su clo hóa",
        desc: "Kháng hóa chất, chống tĩnh điện, phù hợp kho nhiên liệu và xưởng hóa chất",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-caosu-clo-hoa",
      },
      {
        name: "Sơn Silicate",
        desc: "Bền nhiệt và hóa chất cao, tiêu chuẩn ISO cho môi trường công nghiệp nặng",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-silicate",
      },
      {
        name: "Sơn Polyurethane",
        desc: "Lớp phủ ngoài bảo vệ mặt ngoài thiết bị khỏi UV và thời tiết",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
    ],
  },
  {
    key: "duong_ong",
    icon: "⬛",
    label: "Bồn chứa — Đường ống",
    labelEn: "Tanks & Pipelines",
    color: "#00695c",
    modelFile: "bon-chua-duong-ong-chuan.glb",
    desc: "Sơn Hải Vân cung cấp các hệ sơn bảo vệ cho nhiều ứng dụng bao gồm hệ thống đường ống dẫn nước phần nổi và chôn ngầm, bồn chứa nguyên liệu, đường ống cứu hỏa.",
    descEn:
      "Protective coatings for above-ground and buried pipelines, storage tanks, and fire suppression pipelines.",
    products: [
      {
        name: "Sơn Epoxy",
        desc: "Lớp bảo vệ bền chắc cho bồn chứa và đường ống công nghiệp",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
      },
      {
        name: "Sơn Coal Tar Epoxy",
        desc: "Chịu đất ăn mòn, chống thấm nước đất, bảo vệ ống chôn ngầm hiệu quả",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Polyurethane",
        desc: "Lớp phủ ngoài bền bỉ, chống tia UV và va đập cho đường ống lộ thiên",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
      {
        name: "Sơn Bitum",
        desc: "Chống thấm, bảo vệ tốt cho đường ống ngầm và bể chứa",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-bitum",
      },
      {
        name: "Sơn PU 1K",
        desc: "Một thành phần tiện dụng, lớp phủ ngoài bền, chịu va đập và tia UV",
        link: "https://sonhaivan.com/san-pham/",
      },
    ],
  },
  {
    key: "san_be_tong",
    icon: "⬛",
    label: "Sơn sàn bê tông",
    labelEn: "Floor Coatings",
    color: "#6d4c41",
    modelFile: "san-be-tong-chuan.glb",
    desc: "Sử dụng hệ thống sơn sàn bê tông là một trong những giải pháp tối ưu để bảo vệ hệ thống sàn, mang lại tính thẩm mỹ, chống thấm, chịu hóa chất và các công dụng đặc biệt như chống tĩnh điện, tăng ma sát. Đa dạng từ hệ thống sàn epoxy thông dụng đến các hệ thống chuyên dụng cho môi trường khắc nghiệt.",
    descEn:
      "Optimal floor protection with epoxy and PU systems offering aesthetics, waterproofing, chemical resistance, anti-static and anti-slip properties.",
    products: [
      {
        name: "Sơn Bê tông",
        desc: "Tăng cứng bề mặt bê tông, chống bụi, chống thấm dầu mỡ hiệu quả",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-be-tong",
      },
      {
        name: "Sơn Polyurethane",
        desc: "Đàn hồi tốt, chịu va đập và nhiệt độ dao động, phù hợp sàn kho bãi",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
      },
      {
        name: "Sơn Bê tông tự san phẳng",
        desc: "Bề mặt nhẵn bóng, chịu xe nâng tải nặng, phù hợp nhà xưởng và kho công nghiệp",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-be-tong",
      },
    ],
  },
  {
    key: "dac_biet",
    icon: "⬛",
    label: "Lĩnh vực đặc biệt",
    labelEn: "Special Applications",
    color: "#6a1fa2",
    modelFile: "linh-vuc-dac-biet.glb",
    desc: "Cung cấp nhiều giải pháp cho các ngành công nghiệp đặc biệt như: nhiệt điện, thủy điện, điện gió, nổi hơi, ống sấy và các thiết bị thường xuyên làm việc điều kiện nhiệt độ cao. Các hệ thống phủ bảo vệ bền bỉ giúp nhà máy và thiết bị hoạt động tốt hơn và cắt giảm chi phí bảo trì liên tục.",
    descEn:
      "Solutions for thermal power, hydropower, wind energy, boilers and high-temperature equipment. Durable coatings to reduce maintenance costs.",
    products: [
      {
        name: "Sơn chịu nhiệt 300°C",
        desc: "Ổn định màu sắc và độ bám dính ở nhiệt độ vận hành liên tục đến 300°C",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn chịu nhiệt 600°C",
        desc: "Không đổi màu, không bong tróc ở nhiệt độ cực cao, phù hợp ống khói và lò đốt",
        link: "https://sonhaivan.com/san-pham/",
      },
      {
        name: "Sơn Silicate",
        desc: "Tiêu chuẩn ISO 12944 C5-M, bền bỉ trong môi trường biển và công nghiệp nặng",
        link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-silicate",
      },
    ],
  },
];

export const CTA_URL = "https://sonhaivan.com/lien-he/";
