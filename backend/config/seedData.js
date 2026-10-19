import LearningResource from "../model/learningResourceModel.js";

export const initialLearningResources = [
  {
    title: "พื้นฐานการพัฒนาเว็บแอปพลิเคชันด้วย React 19",
    creator: "ดร.สมชาย สุขเกษม",
    category: "บทความ",
    publishedDate: "2026-01-15",
    description: "บทความสรุปพื้นฐานที่สำคัญสำหรับ React 19 รวมถึงแนวทางการใช้ Server Components, Hooks และ Actions ในการสร้างเว็บแอปพลิเคชันระดับองค์กรอย่างมีประสิทธิภาพ",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "วิดีโอสอนสร้าง RESTful API ด้วย Node.js และ Express",
    creator: "อาจารย์กิตติภพ ดำรงค์",
    category: "วิดีโอ",
    publishedDate: "2026-01-20",
    description: "วิดีโอบรรยายความยาว 45 นาที แนะนำโครงสร้าง Express แบบ Controller-Model-Router พร้อมตัวอย่างการ Validate ข้อมูลและการจัดการ Error ตามมาตรฐานสากล",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "แบบฝึกหัดทบทวนการออกแบบฐานข้อมูลเชิงสัมพันธ์",
    creator: "ผศ.ดร.วรรณภา สายสมร",
    category: "แบบฝึกหัด",
    publishedDate: "2026-02-01",
    description: "แบบฝึกหัด 15 ข้อ สำหรับฝึกฝนการทำ Normalization ระดับ 1NF ถึง 3NF และการเขียน ER-Diagram สำหรับระบบบริหารจัดการข้อมูล",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    status: false, // ฉบับร่าง
  },
  {
    title: "คู่มือการใช้งาน Sequelize ORM กับ PostgreSQL",
    creator: "พิชิตชัย ชัยเจริญ",
    category: "บทความ",
    publishedDate: "2026-02-10",
    description: "อธิบายขั้นตอนการเชื่อมต่อ Sequelize, การทำ Data Type Mapping, การจัดการ Constraint และการตั้งค่า Connection Pooling อย่างละเอียด",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "คลิปเจาะลึกเทคนิคการเขียน E2E Testing ด้วย Playwright",
    creator: "ภาณุพงศ์ อุดมสุข",
    category: "วิดีโอ",
    publishedDate: "2026-02-18",
    description: "สอนการทำ End-to-End Test อัตโนมัติบนเบราว์เซอร์จริง ทดสอบการเพิ่ม แก้ไข ลบ และกรองข้อมูลแบบ Step-by-Step",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "แบบฝึกหัดเตรียมสอบปฏิบัติการพัฒนา Fullstack Web",
    creator: "คณะทำงานวิชาการ 7153403",
    category: "แบบฝึกหัด",
    publishedDate: "2026-02-25",
    description: "ชุดโจทย์จำลองการสอบปฏิบัติการพัฒนา Fullstack Application พร้อมเกณฑ์การให้คะแนนและกรณีทดสอบเพื่อเตรียมความพร้อม",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "สถาปัตยกรรม Microservices เบื้องต้นสำหรับนักศึกษา",
    creator: "ดร.สมชาย สุขเกษม",
    category: "บทความ",
    publishedDate: "2026-03-02",
    description: "ทำความเข้าใจแนวคิดการแยกบริการ ระบบสื่อสารระหว่าง Service และข้อดีข้อเสียเมื่อเทียบกับ Monolithic Architecture",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    status: false, // ฉบับร่าง
  },
  {
    title: "วิดีโอสาธิตการ Deploy Frontend บน Vercel และ Backend บน Render",
    creator: "ณัฐวุฒิ สิทธิโชค",
    category: "วิดีโอ",
    publishedDate: "2026-03-05",
    description: "ขั้นตอนการตั้งค่า Git Repository, การผูก Environment Variables VITE_API_URL, และการจัดการ CORS ให้ทำงานได้สมบูรณ์บนคลาวด์",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "แบบทดสอบวัดระดับความรู้เรื่อง HTTP Status Code และ RESTful Standards",
    creator: "อาจารย์กิตติภพ ดำรงค์",
    category: "แบบฝึกหัด",
    publishedDate: "2026-03-10",
    description: "แบบทดสอบปรนัยและอัตนัยเพื่อประเมินความเข้าใจรหัสสถานะ 200, 201, 400, 404, 500 ตามมาตรฐานสากล",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    status: true, // เผยแพร่
  },
  {
    title: "แนวทางการเขียนโค้ดที่สะอาดและมีประสิทธิภาพด้วย Clean Code",
    creator: "ผศ.ดร.วรรณภา สายสมร",
    category: "บทความ",
    publishedDate: "2026-03-15",
    description: "ข้อคิดและเทคนิคการตั้งชื่อตัวแปร ฟังก์ชัน การลดความซับซ้อนของโค้ด และการเขียน Unit Test เพื่อการบำรุงรักษาระยะยาว",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop",
    status: false, // ฉบับร่าง
  },
];

export const seedLearningResources = async () => {
  try {
    const count = await LearningResource.count();
    if (count === 0) {
      console.log("🌱 [Seed] Seeding initial 10 learning resources with images...");
      await LearningResource.bulkCreate(initialLearningResources);
      console.log("✅ [Seed] Successfully seeded 10 learning resources!");
    } else {
      // อัปเดตรูปภาพให้รายการที่มีอยู่แล้ว หากยังไม่มี imageUrl
      for (let i = 0; i < initialLearningResources.length; i++) {
        const item = initialLearningResources[i];
        const existing = await LearningResource.findOne({ where: { title: item.title } });
        if (existing && !existing.imageUrl) {
          existing.imageUrl = item.imageUrl;
          await existing.save();
        }
      }
    }
  } catch (error) {
    console.error("❌ [Seed] Error seeding learning resources:", error.message);
  }
};
