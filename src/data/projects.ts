import { Project, Service, Stat } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 1, title: "Rumah", titleAccent: "Kanyon", location: "Bandung, ID", year: 2025, area: "420m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    client: "Keluarga Wijaya", status: "Selesai", duration: "18 bulan", team: "4 arsitek",
    brief: "Rumah keluarga berlantai tiga di lereng Bandung Utara, merespons kontur curam dan iklim pegunungan dengan kantilever kayu dan dinding batu lokal.",
    brief_en: "A three-storey family home on the slopes of North Bandung, responding to the steep contours and highland climate with timber cantilevers and local stone walls.",
    chapters: [
      { title: "Konteks", body: "Tapak berupa ngarai kecil dengan sungai musim di dasarnya. Massa bangunan disusun mengikuti kontur, dibelah oleh dua kantilever yang menghadap ke ngarai." },
      { title: "Material", body: "Struktur beton ekspos dikombinasikan dengan kayu ulin bekas dari galangan kapal dan batu candi lokal, ditata dalam pola acak yang tidak rata." },
      { title: "Ruang", body: "Ruang utama berada di level tengah, dengan dapur dan ruang makan yang terbuka penuh ke teras ngarai. Kamar tidur utama menempati kantilever paling jauh." },
    ],
    chapters_en: [
      { title: "Context", body: "The site is a small ravine with a seasonal stream at its base. The building mass follows the contours, split by two cantilevers that face the gorge." },
      { title: "Materials", body: "Exposed concrete structure is combined with reclaimed ulin timber from a shipyard and local candi stone, laid in an irregular random pattern." },
      { title: "Space", body: "The main living area sits at the middle level, with the kitchen and dining room opening fully onto the ravine terrace. The master bedroom occupies the furthest cantilever." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    ],
  },
  {
    id: 2, title: "Villa", titleAccent: "Sawah", location: "Ubud, Bali", year: 2024, area: "680m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
    client: "Private client", status: "Selesai", duration: "22 bulan", team: "6 arsitek",
    brief: "Vila peristirahatan di tengah terasering sawah di Ubud — tiga paviliun beratap pelana yang dihubungkan oleh koridor air terbuka.",
    brief_en: "A retreat villa set among the rice terraces of Ubud — three gabled pavilions connected by an open water corridor.",
    chapters: [
      { title: "Lanskap", body: "Terasering sawah dipertahankan utuh. Paviliun duduk di tiga tingkat ketinggian berbeda, seolah melayang di atas air." },
      { title: "Atap", body: "Atap pelana berlapis sirap kayu dibuat sangat landai untuk menangkap angin lembah. Overhang 2.4m melindungi dari hujan diagonal." },
      { title: "Privasi", body: "Paviliun tamu dan paviliun utama dipisahkan oleh kolam refleksi sepanjang 18 meter." },
    ],
    chapters_en: [
      { title: "Landscape", body: "The rice terraces are preserved intact. The pavilions sit at three different elevations, appearing to float above the water." },
      { title: "Roof", body: "The timber-shingled gable roof is kept very low-pitched to catch the valley breeze. A 2.4m overhang protects against diagonal rain." },
      { title: "Privacy", body: "The guest and main pavilions are separated by an 18-metre reflection pool." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    ],
  },
  {
    id: 3, title: "Pavilion", titleAccent: "Batu", location: "Yogyakarta, ID", year: 2024, area: "240m²", type: "Interior",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    client: "Galeri Lawas", status: "Selesai", duration: "10 bulan", team: "3 desainer",
    brief: "Renovasi paviliun galeri — dinding batu kali ekspos, lantai teraso buatan tangan, dan pencahayaan alami dari skylight memanjang.",
    brief_en: "Gallery pavilion renovation — exposed river-stone walls, hand-laid terrazzo floors, and natural light from an elongated skylight.",
    chapters: [
      { title: "Pembongkaran", body: "Pelapis semen pada dinding batu asli dikupas habis untuk mengembalikan tekstur aslinya." },
      { title: "Cahaya", body: "Skylight linear sepanjang 12 meter membelah atap, mencipta jalur cahaya yang bergerak sepanjang hari." },
      { title: "Lantai", body: "Teraso dengan serpihan batu lokal, dicor dan dipoles di tempat selama empat minggu." },
    ],
    chapters_en: [
      { title: "Stripping Back", body: "The cement render on the original stone walls was fully removed to restore their natural texture." },
      { title: "Light", body: "A 12-metre linear skylight splits the roof, creating a moving band of light throughout the day." },
      { title: "Floor", body: "Terrazzo inlaid with local stone chips, cast and polished on-site over four weeks." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
    ],
  },
  {
    id: 4, title: "Apartemen", titleAccent: "Senopati", location: "Jakarta, ID", year: 2024, area: "180m²", type: "Interior",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    client: "Private client", status: "Selesai", duration: "8 bulan", team: "3 desainer",
    brief: "Unit penthouse 180m² — dibongkar total, ditata ulang sebagai loft tunggal dengan inti servis di tengah.",
    brief_en: "A 180m² penthouse unit — fully stripped and reorganised as a single loft with a central service core.",
    chapters: [
      { title: "Pembongkaran", body: "Sembilan partisi internal dilepas. Tersisa inti struktural dan utilitas di tengah unit." },
      { title: "Palet", body: "Hanya tiga material: oak pucat, linen ivory, dan travertine pada inti kamar mandi." },
      { title: "Cahaya", body: "Jendela panoramik dibiarkan telanjang; tirai linen tipis menggantikan blinds." },
    ],
    chapters_en: [
      { title: "Demolition", body: "Nine internal partitions were removed. Only the structural core and utilities at the centre of the unit remained." },
      { title: "Palette", body: "Just three materials: pale oak, ivory linen, and travertine at the bathroom core." },
      { title: "Light", body: "The panoramic windows were left bare; sheer linen drapes replaced the blinds." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    ],
  },
  {
    id: 5, title: "Rumah", titleAccent: "Hujan", location: "Bogor, ID", year: 2023, area: "520m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    client: "Keluarga Pranata", status: "Selesai", duration: "20 bulan", team: "4 arsitek",
    brief: "Rumah di Bogor yang dirancang untuk merayakan hujan — atap tembaga yang menyalurkan air ke tujuh mata air buatan di halaman dalam.",
    brief_en: "A house in Bogor designed to celebrate the rain — a copper roof that channels water into seven man-made springs in the inner courtyard.",
    chapters: [
      { title: "Air", body: "Sistem pengumpul air hujan disamarkan sebagai ornamen arsitektural, membentuk ritme bunyi saat hujan." },
      { title: "Courtyard", body: "Halaman dalam berbentuk elips, dikelilingi kolonade kayu yang terbuka ke langit." },
      { title: "Material", body: "Tembaga yang dibiarkan patina, kayu jati tua, dan beton yang dicampur pasir sungai." },
    ],
    chapters_en: [
      { title: "Water", body: "The rainwater collection system is disguised as architectural ornament, forming a rhythm of sound when it rains." },
      { title: "Courtyard", body: "The elliptical inner courtyard is surrounded by a timber colonnade open to the sky." },
      { title: "Materials", body: "Copper left to patina, aged teak, and concrete mixed with river sand." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
    ],
  },
  {
    id: 6, title: "Studio", titleAccent: "Pohon", location: "Canggu, Bali", year: 2023, area: "140m²", type: "Interior",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    client: "Studio keramik", status: "Selesai", duration: "6 bulan", team: "2 desainer",
    brief: "Studio kerja untuk perupa keramik, dibangun mengelilingi sebuah pohon kamboja tua — ruang kerja, galeri kecil, dan tempat tinggal seniman.",
    brief_en: "A working studio for a ceramic artist, built around an old frangipani tree — workspace, small gallery, and artist's residence.",
    chapters: [
      { title: "Pohon", body: "Kamboja berusia 40 tahun menjadi pusat. Atap dibuat berlubang untuk memberinya ruang bernapas." },
      { title: "Kiln", body: "Tungku keramik ditempatkan di paviliun terpisah dengan ventilasi silang alami." },
      { title: "Lantai", body: "Lantai semen poles yang dicampur oksida besi, memberi warna terakota lembut." },
    ],
    chapters_en: [
      { title: "The Tree", body: "A 40-year-old frangipani is the centrepiece. The roof is open around it to let it breathe." },
      { title: "Kiln", body: "The ceramic kiln is housed in a separate pavilion with natural cross-ventilation." },
      { title: "Floor", body: "Polished cement floor mixed with iron oxide, giving a soft terracotta tone." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    ],
  },
  {
    id: 7, title: "Rumah", titleAccent: "Tebing", location: "Uluwatu, Bali", year: 2023, area: "780m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
    client: "Private client", status: "Selesai", duration: "26 bulan", team: "7 arsitek",
    brief: "Rumah tebing di Uluwatu — empat level yang menempel pada dinding karang, dengan teras utama yang melayang 60 meter di atas laut.",
    brief_en: "A clifftop house in Uluwatu — four levels built into the coral wall, with a main terrace cantilevering 60 metres above the ocean.",
    chapters: [
      { title: "Struktur", body: "Pondasi dipahat langsung ke dalam karang; tidak ada tiang yang terlihat dari sisi laut." },
      { title: "Angin", body: "Setiap ruang memiliki dua bukaan silang untuk meredakan tekanan angin laut." },
      { title: "Privasi", body: "Masuk dari sisi tebing atas; tamu tak pernah melihat rumah dari darat sampai tiba di pintu utama." },
    ],
    chapters_en: [
      { title: "Structure", body: "The foundations are carved directly into the coral; no columns are visible from the ocean side." },
      { title: "Wind", body: "Every room has two cross-openings to relieve the pressure of the sea wind." },
      { title: "Privacy", body: "Entry is from the top of the cliff; visitors never see the house from land until they arrive at the front door." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
    ],
  },
  {
    id: 8, title: "Vila", titleAccent: "Laut", location: "Lombok, ID", year: 2022, area: "340m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
    client: "Private client", status: "Selesai", duration: "14 bulan", team: "4 arsitek",
    brief: "Vila liburan berjarak 40 meter dari garis pantai — paviliun kayu yang diangkat dari pasir dengan tiang ulin, terinspirasi rumah adat Sasak.",
    brief_en: "A holiday villa 40 metres from the shoreline — a timber pavilion raised from the sand on ulin posts, inspired by traditional Sasak vernacular.",
    chapters: [
      { title: "Panggung", body: "Seluruh bangunan diangkat 1.8m dari tanah untuk menghindari pasang dan membiarkan angin mengalir bebas." },
      { title: "Atap", body: "Atap alang-alang 45 derajat dengan inti struktur kayu kelapa, dikerjakan oleh pengrajin lokal selama tiga bulan." },
      { title: "Bukaan", body: "Dinding geser kayu seluruhnya bisa terbuka, menghapus batas antara dalam dan luar." },
    ],
    chapters_en: [
      { title: "Raised Floor", body: "The entire building is lifted 1.8m from the ground to avoid the tide and allow the wind to flow freely." },
      { title: "Roof", body: "A 45-degree alang-alang thatch roof with a coconut timber structural core, crafted by local artisans over three months." },
      { title: "Openings", body: "The timber sliding walls can be fully opened, erasing the boundary between inside and out." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    ],
  },
  {
    id: 9, title: "Rumah", titleAccent: "Bambu", location: "Jakarta, ID", year: 2022, area: "280m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
    client: "Keluarga Surya", status: "Selesai", duration: "16 bulan", team: "4 arsitek",
    brief: "Rumah di Menteng — fasad kisi bambu laminasi yang menyaring cahaya sore dan mengurangi panas pada dinding barat.",
    brief_en: "A house in Menteng — a laminated bamboo screen façade that filters the afternoon light and reduces heat on the west wall.",
    chapters: [
      { title: "Fasad", body: "Kisi bambu laminasi pada tiga lapis kepadatan berbeda — buram di lantai bawah, makin renggang ke atas." },
      { title: "Konteks", body: "Dialog dengan rumah-rumah tua Menteng — skala atap pelana dipertahankan, material dimodernkan." },
      { title: "Hijau", body: "Taman dalam dengan satu pohon ketapang besar yang menjadi poros rumah." },
    ],
    chapters_en: [
      { title: "Façade", body: "Laminated bamboo screens in three densities — opaque at ground level, increasingly open towards the top." },
      { title: "Context", body: "A dialogue with the old Menteng houses — the gable roof scale is preserved, the materials modernised." },
      { title: "Green", body: "An inner garden with a single large sea almond tree as the axis of the house." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    ],
  },
  {
    id: 10, title: "Loft", titleAccent: "Kopi", location: "Bandung, ID", year: 2022, area: "120m²", type: "Interior",
    img: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80",
    client: "Kopi Kenangan (pilot store)", status: "Selesai", duration: "4 bulan", team: "2 desainer",
    brief: "Kedai kopi di gudang tua — dinding bata ekspos, plafon logam galvanis, dan bar kayu sepanjang 8 meter.",
    brief_en: "A coffee shop in an old warehouse — exposed brick walls, galvanised metal ceiling, and an 8-metre timber bar.",
    chapters: [
      { title: "Inti", body: "Bar kayu utuh dari batang jati daur ulang menjadi tulang punggung ruangan." },
      { title: "Plafon", body: "Struktur rangka logam asli dipertahankan, hanya dilapisi primer zinc." },
      { title: "Cahaya", body: "Lampu gantung industrial dari spool kabel, digantung pada ketinggian berbeda." },
    ],
    chapters_en: [
      { title: "Core", body: "A solid bar of reclaimed teak becomes the spine of the room." },
      { title: "Ceiling", body: "The original metal frame structure is retained, finished only with zinc primer." },
      { title: "Light", body: "Industrial pendants made from cable reels, hung at varying heights." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80",
    ],
  },
  {
    id: 11, title: "Rumah", titleAccent: "Kebun", location: "Bogor, ID", year: 2021, area: "380m²", type: "Residential",
    img: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
    client: "Keluarga Hartono", status: "Selesai", duration: "17 bulan", team: "4 arsitek",
    brief: "Rumah keluarga di atas kebun kopi kecil — rumah dibuat ringan agar tidak mengganggu akar pohon yang sudah tumbuh 30 tahun.",
    brief_en: "A family home above a small coffee garden — the structure is kept light to avoid disturbing the roots of trees that have grown for 30 years.",
    chapters: [
      { title: "Pondasi", body: "Pondasi titik — bukan jalur — untuk menghindari akar kopi yang menyebar." },
      { title: "Dinding", body: "Dinding batu bata tak diplester, disambung dengan semen campur abu sekam." },
      { title: "Kebun", body: "Jalur pengambilan panen kopi tetap dipertahankan melintasi halaman rumah." },
    ],
    chapters_en: [
      { title: "Foundation", body: "Point foundations — not strip — to avoid the spreading coffee roots." },
      { title: "Walls", body: "Unpainted brick walls, jointed with cement mixed with rice husk ash." },
      { title: "Garden", body: "The coffee harvest path is preserved running through the house's courtyard." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    ],
  },
  {
    id: 12, title: "Apartemen", titleAccent: "Taman", location: "Surabaya, ID", year: 2021, area: "210m²", type: "Interior",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
    client: "Private client", status: "Selesai", duration: "9 bulan", team: "3 desainer",
    brief: "Penggabungan dua unit apartemen menjadi satu hunian keluarga dengan taman interior sepanjang 11 meter sebagai poros.",
    brief_en: "The merging of two apartment units into a single family residence, with an 11-metre interior garden as its axis.",
    chapters: [
      { title: "Taman", body: "Tulang punggung unit: 11 meter taman kering dengan batu sungai, pakis, dan sebatang kamboja kecil." },
      { title: "Sirkulasi", body: "Semua ruang dicapai dengan mengelilingi taman, memperlambat pergerakan di dalam rumah." },
      { title: "Palet", body: "Kayu walnut gelap, dinding plester Maroko, dan lantai batu andesit yang dipoles halus." },
    ],
    chapters_en: [
      { title: "Garden", body: "The backbone of the unit: 11 metres of dry garden with river stones, ferns, and a small frangipani." },
      { title: "Circulation", body: "Every room is reached by going around the garden, slowing movement through the home." },
      { title: "Palette", body: "Dark walnut timber, Moroccan plaster walls, and finely polished andesite stone floors." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=80",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600&q=80",
    ],
  },
];

export const SERVICES: Service[] = [
  { num: "01", title: "Arsitektur<br/>Residensial", en: "Residential Architecture", desc: "Rumah tinggal yang dirancang untuk iklim tropis, lanskap lokal, dan cara hidup pemiliknya.", desc_en: "Homes designed for the tropical climate, local landscape, and the way their owners live.", tag: "Ground-up · Renovation" },
  { num: "02", title: "Desain Interior", en: "Interior Design", desc: "Ruang dalam yang tenang — memadukan material alami, pencahayaan lembut, dan detail yang sunyi.", desc_en: "Quiet interiors — balancing natural materials, gentle light, and restrained detail.", tag: "Turnkey · Furnishing" },
  { num: "03", title: "Konsultasi Lanskap", en: "Landscape Consulting", desc: "Taman dan halaman yang tumbuh bersama rumah, menghubungkan penghuni dengan alam di sekitar.", desc_en: "Gardens and courtyards that grow with the house, connecting its inhabitants with the surrounding nature.", tag: "Garden · Courtyard" },
  { num: "04", title: "Pengawasan Pembangunan", en: "Construction Supervision", desc: "Mengawasi kualitas material dan ketepatan detail di lapangan, dari awal hingga serah terima.", desc_en: "Overseeing material quality and precision of detail on site, from groundbreaking to handover.", tag: "Full-service" },
];

export const STATS: Stat[] = [
  { num: 12, sup: "+", label: "Tahun Berkarya", en: "Years of practice" },
  { num: 86, sup: "", label: "Proyek Selesai", en: "Completed projects" },
  { num: 24, sup: "", label: "Penghargaan", en: "Awards & features" },
  { num: 9, sup: "", label: "Arsitek & Desainer", en: "Architects & designers" },
];

export const MARQUEE_WORDS = [
  "Architecture", "Interior", "Residential", "Tropical", "Crafted", "Quiet", "Material", "Light", "Context",
];

export const ROTATING_WORDS = ["Tenang", "Terang", "Membumi", "Puitis"];
