import { Sparkles, Brain, Target, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-12 h-12 text-purple-400 mr-3" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            UnicornX OS
          </h1>
        </div>
        
        <p className="text-xl text-slate-300 mb-8 max-w-2xl">
          พันธมิตรผู้ร่วมสร้างการเติบโต
        </p>
        
        <blockquote className="text-lg text-slate-400 italic max-w-3xl border-l-4 border-purple-500 pl-6">
          "ระบบนี้ไม่ได้ออกแบบมาเพื่อให้คุณทำได้ทุกอย่างภายในวันเดียว 
          แต่เพื่อให้คุณทำสิ่งสำคัญที่สุดหนึ่งอย่างให้สำเร็จในแต่ละวัน... 
          และทำมันให้ดีที่สุด"
        </blockquote>
      </div>

      {/* Core Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl">
        <ModuleCard
          icon={<Brain className="w-8 h-8" />}
          title="Mind-Biome"
          subtitle="จิต-ชีวนิเวศ"
          description="ภาพทิวทัศน์ดิจิทัลที่เติบโตตามความคืบหน้า"
          color="from-green-400 to-emerald-600"
        />
        
        <ModuleCard
          icon={<Zap className="w-8 h-8" />}
          title="Catalyst System"
          subtitle="ระบบตัวเร่งปฏิกิริยา"
          description="ย่อยปัญหาใหญ่ให้เป็นขั้นตอนย่อย"
          color="from-blue-400 to-cyan-600"
        />
        
        <ModuleCard
          icon={<Target className="w-8 h-8" />}
          title="Skill-Tree Symbiote"
          subtitle="ซิมไบโอตผังสกิล"
          description="ติดตามและรับรองทักษะจากงานจริง"
          color="from-purple-400 to-violet-600"
        />
        
        <ModuleCard
          icon={<Sparkles className="w-8 h-8" />}
          title="Runner Agents"
          subtitle="ผู้ส่งสารอัจฉริยะ"
          description="AI Agent ช่วยเหลือเชิงรุก"
          color="from-orange-400 to-red-600"
        />
      </div>

      {/* Status */}
      <div className="text-center">
        <div className="inline-flex items-center px-6 py-3 bg-slate-800/50 rounded-full border border-slate-700">
          <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
          <span className="text-slate-300">Phase 0: Foundation - กำลังพัฒนา</span>
        </div>
      </div>
    </div>
  )
}

function ModuleCard({ 
  icon, 
  title, 
  subtitle, 
  description, 
  color 
}: {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  color: string
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105">
      <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-4 text-white`}>
        {icon}
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-purple-300 mb-3">{subtitle}</p>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
