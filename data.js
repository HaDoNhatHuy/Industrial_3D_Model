// ═══════════════════════════════════════════════════════════
// DATA.JS — Dữ liệu vùng sơn & đề xuất sản phẩm
// Chỉnh sửa nội dung tại đây mà không cần động vào logic 3D
// ═══════════════════════════════════════════════════════════

export const TABS = [
  {
    key: "ket_cau_thep",
    icon: "🏗️",
    label: "Kết cấu thép",
    color: "#37474f",
    modelFile: "ket-cau-thep.glb",
  },
  {
    key: "bon_chua",
    icon: "🛢️",
    label: "Bồn chứa hóa chất & phân bón",
    color: "#1565c0",
    modelFile: "bon-chua.glb",
  },
  {
    key: "duong_ong",
    icon: "🔩",
    label: "Đường ống & bồn chứa",
    color: "#00695c",
    modelFile: "duong-ong.glb",
  },
  {
    key: "san_be_tong",
    icon: "🏭",
    label: "Sàn bê tông",
    color: "#6d4c41",
    modelFile: "san-be-tong.glb",
  },
  {
    key: "dac_biet",
    icon: "⚙️",
    label: "Lĩnh vực đặc biệt",
    color: "#6a1fa2",
    modelFile: "dac-biet.glb",
  },
];

// ── Hotspot & thông tin từng vùng theo tab ─────────────────
export const TAB_ZONES = {
  // ── 1. KẾT CẤU THÉP ──────────────────────────────────────
  ket_cau_thep: [
    {
      id: "cot_thep",
      label: "Cột thép chịu lực",
      type: "exterior",
      position: { x: 0, y: 2.0, z: 0 },
      description:
        "Cột thép là bộ phận chịu lực thẳng đứng chính của công trình. Tiếp xúc trực tiếp với môi trường khí quyển, độ ẩm cao và các tác nhân ăn mòn. Cần hệ sơn bảo vệ nhiều lớp từ lớp lót đến lớp hoàn thiện.",
      reason:
        "Ăn mòn khí quyển, nước mưa, độ ẩm tích tụ ở chân cột — gây rỉ sét nhanh nếu không bảo vệ đúng cách.",
      paints: [
        {
          name: "Sơn lót Epoxy giàu kẽm",
          desc: "Bảo vệ cathodic, chống ăn mòn ngay từ bề mặt thép",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn phủ trung gian Epoxy",
          desc: "Tăng độ dày màng sơn, chắn thấm ẩm hiệu quả",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn phủ ngoài Polyurethane",
          desc: "Giữ màu bền, chịu UV và thời tiết khắc nghiệt",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
      ],
    },
    {
      id: "dam_ngang",
      label: "Dầm ngang & xà gồ",
      type: "exterior",
      position: { x: 2.5, y: 4.2, z: 0 },
      description:
        "Hệ thống dầm ngang và xà gồ chịu tải trọng từ mái và sàn, thường khó tiếp cận để bảo trì. Cần hệ sơn bền dài hạn, ít bảo dưỡng nhất có thể.",
      reason:
        "Vị trí khó bảo trì, tích tụ hơi ẩm và nước đọng tại các mối nối — nguy cơ ăn mòn nội bộ cao.",
      paints: [
        {
          name: "Sơn lót Epoxy giàu kẽm",
          desc: "Bảo vệ chủ động nhờ cơ chế cathodic",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Epoxy bề dày cao",
          desc: "Phủ đầy góc cạnh, giảm số lớp thi công",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Alkyd biến tính",
          desc: "Tiết kiệm, phù hợp bảo trì định kỳ nội thất",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-alkyd",
        },
      ],
    },
    {
      id: "moi_han",
      label: "Mối hàn & bu-lông",
      type: "exterior",
      position: { x: -2.2, y: 3.5, z: 1.0 },
      description:
        "Các điểm nối hàn và bu-lông là vùng dễ bị ăn mòn nhất do ứng suất cơ học, khe hở nhỏ tích tụ ẩm và quá trình điện hóa giữa các kim loại khác nhau.",
      reason:
        "Mối hàn dễ xuất hiện rỗ khí, nứt vi mô — là điểm khởi phát ăn mòn sớm nhất trên kết cấu thép.",
      paints: [
        {
          name: "Sơn vệt hàn (Stripe Coat)",
          desc: "Phủ trước vào góc cạnh, mối hàn trước khi phun chính",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn lót Epoxy giàu kẽm",
          desc: "Bảo vệ mạnh nhất cho điểm nối kim loại",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn không dung môi Epoxy",
          desc: "Thân thiện môi trường, VOC thấp cho khu vực kín",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
      ],
    },
    {
      id: "mai_ton",
      label: "Mái tôn & vách panel",
      type: "exterior",
      position: { x: 0, y: 5.8, z: -1.5 },
      description:
        "Mái tôn và vách panel thường làm từ thép mạ kẽm hoặc thép tấm. Tiếp xúc trực tiếp và liên tục với mưa, nắng, gió bụi, yêu cầu sơn có độ kháng thời tiết rất cao.",
      reason:
        "Nắng UV và nhiệt độ biến đổi mạnh gây giòn hóa và bong tróc sơn — ảnh hưởng thẩm mỹ và khả năng chống nước.",
      paints: [
        {
          name: "Sơn Epoxy lót kẽm phốt-phát",
          desc: "Bám dính tốt trên tôn mạ, chống oxy hóa hiệu quả",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Polyurethane 2K",
          desc: "Chịu UV vượt trội, giữ màu và độ bóng lâu dài",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
        {
          name: "Sơn PU 1K acrylic",
          desc: "Thi công nhanh, phù hợp mái tôn nhà xưởng mới",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "chan_cot",
      label: "Chân cột & neo móng",
      type: "exterior",
      position: { x: -2.5, y: 0.3, z: -1.0 },
      description:
        "Vùng tiếp giáp giữa cột thép và móng bê tông — khu vực nguy hiểm nhất, thường xuyên tiếp xúc với ẩm từ đất, nước mưa đọng và kiềm từ bê tông.",
      reason:
        "Môi trường chuyển tiếp đất-thép tạo ăn mòn điện hóa nghiêm trọng — nguy cơ mất tải trong cấu kiện chịu lực.",
      paints: [
        {
          name: "Sơn Epoxy Coal tar",
          desc: "Chắn thấm tuyệt vời, chịu kiềm và axit từ đất",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn lót Epoxy giàu kẽm vô cơ",
          desc: "Bảo vệ tối đa vùng tiếp xúc đất và bê tông",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Băng bảo vệ chống ăn mòn",
          desc: "Kết hợp với sơn để bảo vệ cơ học vùng chân cột",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
  ],

  // ── 2. BỒN CHỨA HÓA CHẤT & PHÂN BÓN ─────────────────────
  bon_chua: [
    {
      id: "than_bon",
      label: "Thân bồn chứa",
      type: "exterior",
      position: { x: 0, y: 2.5, z: 2.2 },
      description:
        "Vỏ thân bồn chịu áp lực nội bộ của hóa chất/phân bón và áp lực ăn mòn từ cả bên trong lẫn bên ngoài. Lựa chọn hệ sơn phải tương thích với hóa chất cụ thể được chứa đựng.",
      reason:
        "Hóa chất ăn mòn thép từ bên trong; thời tiết và ẩm ướt tấn công từ bên ngoài — cần bảo vệ song song cả hai phía.",
      paints: [
        {
          name: "Sơn Epoxy kháng hóa chất",
          desc: "Chịu được axit loãng, kiềm và các dung dịch muối",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Vinyl Ester",
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
      id: "mai_bon",
      label: "Mái vòm bồn chứa",
      type: "exterior",
      position: { x: 0, y: 5.8, z: 0 },
      description:
        "Mái vòm bồn hứng chịu nhiều nhất ánh nắng và nhiệt độ dao động lớn trong ngày. Bề mặt cong khó thi công đòi hỏi sơn có độ đàn hồi và kháng UV tốt.",
      reason:
        "Nhiệt độ bề mặt mái vòm có thể đạt 70–80°C dưới nắng — gây phồng rộp và bong tróc sơn nếu dùng loại thường.",
      paints: [
        {
          name: "Sơn phản nhiệt đặc biệt",
          desc: "Giảm nhiệt độ bề mặt, giảm bay hơi hóa chất bên trong",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Polysiloxane",
          desc: "Chịu nhiệt và UV cực tốt, bền 15+ năm không bạc màu",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Epoxy cao nhiệt",
          desc: "Ổn định từ -20°C đến +150°C, phù hợp bồn nhiệt",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
      ],
    },
    {
      id: "day_bon",
      label: "Đáy bồn nội thất",
      type: "interior",
      position: { x: 0, y: -0.5, z: 0 },
      description:
        "Đáy bồn luôn tiếp xúc với hóa chất và cặn lắng đọng. Đây là vùng khắc nghiệt nhất, đòi hỏi hệ sơn có độ dày màng cao và khả năng kháng hóa chất mạnh nhất.",
      reason:
        "Cặn lắng tích tụ tạo môi trường cực kỳ ăn mòn — mất khả năng bảo vệ tại đây có thể dẫn đến rò rỉ thảm họa.",
      paints: [
        {
          name: "Sơn Epoxy không dung môi 100%",
          desc: "Màng dày, không co ngót, kháng hóa chất tuyệt đối",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Glass Flake Epoxy",
          desc: "Lớp bảo vệ vẩy thủy tinh, chống thấm siêu bền",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Lớp lót kẽm vô cơ",
          desc: "Nền bảo vệ cathodic cho đáy bồn chứa phân bón",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "duong_ong_bon",
      label: "Đường ống kết nối",
      type: "exterior",
      position: { x: 2.0, y: 1.5, z: -1.5 },
      description:
        "Hệ thống đường ống ra vào bồn chứa chịu cả áp lực nội bộ từ hóa chất lẫn rung động và ăn mòn bên ngoài. Mối nối flanges là điểm yếu cần ưu tiên bảo vệ.",
      reason:
        "Rò rỉ tại đường ống kết nối có thể gây ô nhiễm môi trường nghiêm trọng và tổn thất lớn về sản phẩm.",
      paints: [
        {
          name: "Sơn Epoxy ống nội bộ",
          desc: "Phù hợp truyền dẫn hóa chất, không gây ô nhiễm chất lỏng",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn nhiệt co sleeve",
          desc: "Bảo vệ mối nối và flanges khỏi ăn mòn điện hóa",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Polyurethane chịu hóa chất",
          desc: "Lớp ngoài bền, chịu va đập và tia UV",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
      ],
    },
    {
      id: "cau_thang_bon",
      label: "Cầu thang & nền móng bồn",
      type: "exterior",
      position: { x: -2.2, y: 3.0, z: 1.5 },
      description:
        "Cầu thang và nền móng bồn chịu tải người đi lại, va đập cơ học và tiếp xúc với nước mưa. Yêu cầu sơn có độ chống trượt và chịu mài mòn tốt.",
      reason:
        "An toàn lao động — bề mặt trơn trượt hoặc sàn bị ăn mòn là nguyên nhân tai nạn nghề nghiệp phổ biến.",
      paints: [
        {
          name: "Sơn chống trượt Epoxy",
          desc: "Hạt chống trượt tích hợp, an toàn ngay cả khi ướt",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn lót Epoxy giàu kẽm",
          desc: "Bảo vệ kết cấu thép cầu thang dài hạn",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Polyurethane chịu mài mòn",
          desc: "Bền bỉ dưới tải trọng di chuyển liên tục",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
      ],
    },
  ],

  // ── 3. ĐƯỜNG ỐNG & BỒN CHỨA ──────────────────────────────
  duong_ong: [
    {
      id: "ong_chinh",
      label: "Đường ống chính",
      type: "exterior",
      position: { x: 0, y: 1.5, z: 0 },
      description:
        "Đường ống dẫn lưu chất chịu áp lực nội bộ từ dầu, khí, nước hoặc hóa chất, đồng thời chịu ăn mòn từ môi trường ngoài. Sơn bảo vệ phải bám dính tốt và chịu được giãn nở nhiệt.",
      reason:
        "Ăn mòn bên ngoài do khí quyển và đất gây thủng ống — rủi ro cháy nổ và ô nhiễm môi trường nghiêm trọng.",
      paints: [
        {
          name: "Sơn FBE (Fusion Bonded Epoxy)",
          desc: "Tiêu chuẩn công nghiệp cho bảo vệ ống ngầm và trên mặt đất",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Epoxy Coal tar",
          desc: "Chịu đất ăn mòn, ngăn thẩm thấu nước đất hiệu quả",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn 3LPE/3LPP",
          desc: "Hệ 3 lớp polyethylene — tiêu chuẩn ống dầu khí quốc tế",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "van_khoa",
      label: "Van khóa & thiết bị",
      type: "exterior",
      position: { x: 2.0, y: 1.5, z: 1.0 },
      description:
        "Van khóa và các thiết bị phụ trợ có hình dạng phức tạp, khó sơn. Thường làm từ nhiều vật liệu khác nhau (thép, gang, đồng) — yêu cầu sơn bám dính đa chất liệu.",
      reason:
        "Van rò rỉ do ăn mòn thân van gây tổn thất năng lượng và rủi ro an toàn vận hành nghiêm trọng.",
      paints: [
        {
          name: "Sơn Epoxy nhiều lớp chuyên dụng",
          desc: "Bám dính trên gang và thép, kháng dầu và hơi nước",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Alkyd chịu nhiệt",
          desc: "Bảo vệ van trên đường ống hơi nước nhiệt độ cao",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-alkyd",
        },
        {
          name: "Sơn Polyurethane phân biệt màu",
          desc: "Màu sắc theo tiêu chuẩn nhận diện loại van/ống",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
      ],
    },
    {
      id: "ong_ngam",
      label: "Ống ngầm & bọc cách nhiệt",
      type: "interior",
      position: { x: -2.0, y: 0.2, z: 0 },
      description:
        "Đường ống ngầm chịu ăn mòn từ đất có độ pH thay đổi, vi khuẩn yếm khí (SRB) và dòng điện phân tán. Hệ bảo vệ bên ngoài phải kết hợp với bảo vệ cathodic.",
      reason:
        "Vi khuẩn SRB trong đất có thể ăn thủng ống thép chỉ trong vài năm nếu không có bảo vệ đúng cách.",
      paints: [
        {
          name: "Sơn Coal tar Epoxy",
          desc: "Hàng rào chắn điện hóa, chịu đất ăn mòn mạnh",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Băng bảo vệ polyethylene",
          desc: "Bọc cơ học bổ sung, bảo vệ toàn diện ống ngầm",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Lớp phủ kết hợp CTPU",
          desc: "Coal tar Polyurethane — bền bỉ nhất cho ống ngầm lâu dài",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "gia_do_ong",
      label: "Giá đỡ & móc treo",
      type: "exterior",
      position: { x: 0, y: 0.5, z: -2.0 },
      description:
        "Hệ thống giá đỡ, móc treo ống chịu tải trọng liên tục và tập trung ứng suất tại các điểm tiếp xúc, đồng thời dễ tích tụ nước và bụi bẩn trong các khe hở.",
      reason:
        "Ứng suất tập trung + ẩm đọng = điểm khởi phát ăn mòn tăng tốc — giá đỡ bị ăn mòn làm sụp đổ toàn bộ hệ ống.",
      paints: [
        {
          name: "Sơn kẽm phun nóng (Thermally Sprayed Zinc)",
          desc: "Bảo vệ cathodic tốt nhất cho kết cấu đỡ tải trọng cao",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Epoxy giàu kẽm",
          desc: "Phủ đầy khe hở và góc cạnh hiệu quả",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Polyurethane chịu mài mòn",
          desc: "Bề mặt cứng, chống trầy xước do rung động ống",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
      ],
    },
  ],

  // ── 4. SÀN BÊ TÔNG ───────────────────────────────────────
  san_be_tong: [
    {
      id: "san_nha_xuong",
      label: "Sàn nhà xưởng sản xuất",
      type: "interior",
      position: { x: 0, y: 0.1, z: 0 },
      description:
        "Sàn nhà xưởng chịu tải trọng xe nâng hàng, rung động máy móc và mài mòn liên tục. Yêu cầu sơn có độ cứng cao, kháng hóa chất và dễ vệ sinh.",
      reason:
        "Bê tông không phủ sơn bị bụi hóa và thấm dầu mỡ — vi khuẩn phát triển trong khe nứt gây mất vệ sinh an toàn thực phẩm.",
      paints: [
        {
          name: "Sơn sàn Epoxy tự phẳng",
          desc: "Bề mặt nhẵn bóng, chịu xe nâng tải 5–10 tấn",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Epoxy Quartz",
          desc: "Hạt thạch anh chịu mài mòn cực tốt cho nhà máy nặng",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Polyurethane sàn",
          desc: "Đàn hồi, chịu va đập và nhiệt độ dao động",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
      ],
    },
    {
      id: "san_hoa_chat",
      label: "Vùng tiếp xúc hóa chất",
      type: "interior",
      position: { x: -2.0, y: 0.1, z: 1.0 },
      description:
        "Khu vực sản xuất, pha chế hoặc lưu trữ hóa chất. Bê tông nền phải được bảo vệ toàn diện để tránh thấm hóa chất xuống đất ngầm và gây ô nhiễm môi trường.",
      reason:
        "Axit và kiềm thấm vào bê tông phá hủy cấu trúc từ bên trong — mất khả năng chịu lực và gây ô nhiễm nước ngầm.",
      paints: [
        {
          name: "Sơn Epoxy kháng hóa chất 100% rắn",
          desc: "Không dung môi, màng dày 2–4mm, chịu hóa chất mạnh",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Vinyl Ester sàn",
          desc: "Kháng axit đặc — tiêu chuẩn cho nhà máy hóa chất",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Cống rãnh thoát kèm lớp phủ",
          desc: "Bảo vệ đồng bộ sàn và hệ thoát nước từ hóa chất",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "san_lanh",
      label: "Sàn kho lạnh & phòng sạch",
      type: "interior",
      position: { x: 2.0, y: 0.1, z: -1.0 },
      description:
        "Sàn kho lạnh (-30°C đến +20°C) và phòng sạch yêu cầu sơn không bong tróc khi nhiệt độ dao động lớn, không phát thải bụi và đáp ứng tiêu chuẩn vệ sinh thực phẩm.",
      reason:
        "Sơn thường không đàn hồi đủ ở nhiệt độ thấp — nứt vỡ tạo khe hở cho vi khuẩn và thủy phần xâm nhập.",
      paints: [
        {
          name: "Sơn Polyurethane linh hoạt nhiệt độ thấp",
          desc: "Giữ tính đàn hồi từ -40°C đến +80°C",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
        {
          name: "Sơn Epoxy chứa thực phẩm (FDA)",
          desc: "Không độc hại, đạt chứng nhận tiếp xúc thực phẩm",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn kháng khuẩn chuyên dụng",
          desc: "Ức chế vi khuẩn, mốc — phù hợp phòng sạch và phòng mổ",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "san_lo_thien",
      label: "Sàn ngoài trời & bãi đỗ",
      type: "exterior",
      position: { x: 0, y: 0.1, z: -2.5 },
      description:
        "Sàn ngoài trời tiếp xúc trực tiếp với mưa, nắng UV và xe tải hạng nặng. Nứt bê tông do co ngót và tải trọng là nguyên nhân sơn bong tróc sớm.",
      reason:
        "Nước thấm vào vết nứt bê tông, đóng băng và giãn nở — phá hủy bề mặt nhanh chóng ngay cả khi không có tải trọng.",
      paints: [
        {
          name: "Sơn Polyurethane ngoại thất",
          desc: "Chịu UV, không bong vàng — bảo vệ bề mặt bê tông dài hạn",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
        {
          name: "Sơn bịt nứt Polyurethane",
          desc: "Cầu nối vết nứt đến 2mm, ngăn nước thấm hoàn toàn",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
        {
          name: "Lớp sơn chống thấm Acrylic",
          desc: "Tạo màng chống thấm thoáng hơi, không bong phồng",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
  ],

  // ── 5. LĨNH VỰC ĐẶC BIỆT ─────────────────────────────────
  dac_biet: [
    {
      id: "chong_chay",
      label: "Sơn chống cháy kết cấu",
      type: "interior",
      position: { x: 0, y: 3.5, z: 0 },
      description:
        "Sơn chống cháy (Intumescent) phồng lên khi tiếp xúc nhiệt, tạo lớp cách nhiệt bảo vệ kết cấu thép khỏi sụp đổ trong đám cháy. Giúp kết cấu duy trì tải trọng 30–120 phút theo tiêu chuẩn.",
      reason:
        "Thép mất 50% cường độ ở 550°C — kết cấu không có sơn chống cháy sẽ sụp đổ trong 5–10 phút đầu hỏa hoạn.",
      paints: [
        {
          name: "Sơn Intumescent gốc nước",
          desc: "Phù hợp nội thất, chứng nhận EN 13381, R30/R60/R90",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Intumescent gốc dung môi",
          desc: "Chịu thời tiết ngoài trời, cho kết cấu lộ thiên",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Epoxy lót tương thích",
          desc: "Nền bám dính cho lớp chống cháy intumescent",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
      ],
    },
    {
      id: "bien_gioi_bac",
      label: "Kết cấu vùng biển & offshore",
      type: "exterior",
      position: { x: 2.5, y: 2.0, z: 1.5 },
      description:
        "Công trình ngoài khơi và ven biển chịu môi trường ăn mòn cực kỳ khắc nghiệt: muối biển, sóng vỗ, vi sinh vật biển, tia UV mạnh và rào cản vật lý do tàu thuyền va chạm.",
      reason:
        "Môi trường biển ăn mòn gấp 5–10 lần so với khí quyển đô thị — tuổi thọ công trình không bảo vệ chỉ còn vài năm.",
      paints: [
        {
          name: "Sơn lót kẽm vô cơ Silicât",
          desc: "Tiêu chuẩn ISO 12944 C5-M, chịu môi trường biển khắc nghiệt",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Epoxy bề dày cao (HB)",
          desc: "Màng 200–400μm, chắn thấm muối biển tuyệt đối",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn Polysiloxane hoàn thiện",
          desc: "Tuổi thọ 20+ năm không bảo dưỡng cho ngoại thất biển",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "cao_nhiet",
      label: "Thiết bị nhiệt độ cao",
      type: "exterior",
      position: { x: -2.5, y: 2.5, z: -1.0 },
      description:
        "Ống khói, nồi hơi, lò nung và thiết bị công nghiệp nhiệt độ cao đòi hỏi sơn có thể chịu đựng oxy hóa nhiệt liên tục mà không bong tróc hay nứt vỡ.",
      reason:
        "Sơn thông thường cháy và bong khỏi bề mặt ở 200°C — để lộ thép chịu oxy hóa nhiệt tăng tốc nghiêm trọng.",
      paints: [
        {
          name: "Sơn chịu nhiệt Silicone 600°C",
          desc: "Chịu nhiệt liên tục đến 600°C, không đổi màu",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn Ceramic chịu nhiệt",
          desc: "Cách nhiệt, chịu sốc nhiệt đột ngột đến 800°C",
          link: "https://sonhaivan.com/san-pham/",
        },
        {
          name: "Sơn nhôm chịu nhiệt 200°C",
          desc: "Bảo vệ và thẩm mỹ cho thiết bị nhiệt trung bình",
          link: "https://sonhaivan.com/san-pham/",
        },
      ],
    },
    {
      id: "chong_tinh_dien",
      label: "Sàn & thiết bị chống tĩnh điện",
      type: "interior",
      position: { x: 0, y: 0.1, z: -2.0 },
      description:
        "Trong khu vực sản xuất điện tử, kho nhiên liệu và phòng sạch, tĩnh điện tích tụ có thể gây hỏng thiết bị hoặc kích nổ hỗn hợp khí/hơi dễ cháy. Sơn phải dẫn điện và tiêu tán điện tích.",
      reason:
        "Tia lửa điện tĩnh trong kho chứa nhiên liệu chỉ cần milijoule để kích nổ — sơn sàn cách điện là nguyên nhân nhiều vụ nổ.",
      paints: [
        {
          name: "Sơn ESD Epoxy chống tĩnh điện",
          desc: "Điện trở bề mặt 10^6–10^9 Ω, tiêu chuẩn ATEX/IECEx",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
        {
          name: "Sơn dẫn điện Polyurethane",
          desc: "Điện trở < 10^4 Ω, thoát điện an toàn về đất",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-polyurethane",
        },
        {
          name: "Sơn Epoxy chống cháy nổ ATEX",
          desc: "Chứng nhận khu vực nguy hiểm Zone 1/2, IIA-IIB",
          link: "https://sonhaivan.com/san-pham/?filter_dong-san-pham=son-epoxy",
        },
      ],
    },
  ],
};

// ── Màu nhãn tab & icon hotspot ───────────────────────────
export const ZONE_TYPE_LABELS = {
  vi: { exterior: "Ngoại thất", interior: "Nội thất / Bên trong" },
  en: { exterior: "Exterior", interior: "Interior" },
};

export const CTA_URL = "https://sonhaivan.com/lien-he/";
