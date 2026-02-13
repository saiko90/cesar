'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Download, Briefcase, GraduationCap, 
  Award, User, CheckCircle, Sparkles, ExternalLink, ChevronDown
} from 'lucide-react';

// --- DATA DU CV ---
const DATA = {
  profile: {
    name: "MAXIME SALVADORI",
    role: "Assistant Administratif",
    email: "maxime.salvadori@outlook.fr",
    phone: "07 71 22 61 59",
    location: "Mobilité : Rhône-Alpes",
    bio: "Curieux de nature et adepte de la résolution de problèmes, j'aime explorer et optimiser les outils numériques pour créer des solutions fluides. Fort de 10 ans d'expérience, je mets ma résilience et ma rigueur au service d'une collaboration transparente et humaine.",
    avatar: "/avatar.jpeg" 
  },
  cvFile: "/cv.pdf",
  skills: [
    "Gestion de projet", "Communication", "Gestion RH", "Analyse de données", 
    "Résolution de problèmes", "Gestion de paie", "Pack Office", "Normes et sécurité"
  ],
  softSkills: [
    "Résilience", "Intelligence relationnelle", "Capacité d'adaptation", 
    "Rigueur & organisation", "Sens des responsabilités", "Discrétion"
  ],
  experience: [
    {
      id: 1,
      role: "Apprenti en Gestion PME",
      company: "CPAM de la Loire",
      date: "2023 - 2024",
      desc: "Accompagnement des assurés (téléservices), gestion administrative & commerciale, élaboration de tableaux de bord et KPI."
    },
    {
      id: 2,
      role: "Apprenti Gestionnaire de Paie",
      company: "Conseil départemental du Var",
      date: "2022",
      desc: "Classement administratif, bulletins de paie, suivi des agents, veille sociale."
    },
    {
      id: 3,
      role: "Employé Polyvalent",
      company: "Auchan / Géant Casino",
      date: "2017 - 2021",
      desc: "Gestion de rayon, logistique, préparation de commandes Drive (200 clients/jour)."
    },
    {
      id: 4,
      role: "Responsable de Conditionnement",
      company: "Jardin de réinsertion d'Astrée",
      date: "2016",
      desc: "Encadrement de 3 salariés, gestion des stocks et préparation de commandes."
    }
  ],
  education: [
    { degree: "BTS GPME", school: "Groupe Alternance", date: "2023/2024" },
    { degree: "Certificat Gestion de Paie", school: "CFAS LADAPT", date: "2021/2023" },
    { degree: "HACCP & Plan Sanitaire", school: "Formation Pro", date: "2023" },
    { degree: "BEP et BAC PRO VENTE", school: "L.P Benoit CHARVET", date: "2008/2010" }
  ]
};

export default function CVPage() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white min-h-screen overflow-x-hidden relative">
      <BackgroundParticles />
      
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 transform-origin-left z-50 shadow-[0_0_15px_rgba(37,99,235,0.5)]" />

      {/* Bouton Scroll Flottant (Cliquable) */}
      <ScrollIndicator scrollY={scrollY} />

      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <FooterSection />
    </div>
  );
}

// --- VISUAL COMPONENTS ---

function ScrollIndicator({ scrollY }: any) {
    const opacity = useTransform(scrollY, [0, 150], [1, 0]);
    const scale = useTransform(scrollY, [0, 150], [1, 0.5]);

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.button 
            onClick={scrollToAbout}
            style={{ opacity, scale }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 cursor-pointer group"
        >
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-slate-100 group-hover:text-blue-600 transition-colors"
            >
                Scroll
            </motion.p>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all"
            >
                <ChevronDown size={28} strokeWidth={2.5} />
            </motion.div>
        </motion.button>
    );
}

function BackgroundParticles() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-blue-600/5 rounded-full blur-3xl"
                    initial={{
                        x: Math.random() * 100 + "vw",
                        y: Math.random() * 100 + "vh",
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: [
                            Math.random() * 100 + "vw",
                            Math.random() * 100 + "vw",
                        ],
                        y: [
                            Math.random() * 100 + "vh",
                            Math.random() * 100 + "vh",
                        ],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        width: Math.random() * 400 + 100 + "px",
                        height: Math.random() * 400 + 100 + "px",
                    }}
                />
            ))}
        </div>
    );
}

function HeroSection() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top, width, height } = currentTarget.getBoundingClientRect();
        let x = (clientX - left) / width;
        let y = (clientY - top) / height;
        mouseX.set(x);
        mouseY.set(y);
    }

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white/50 backdrop-blur-3xl" onMouseMove={handleMouseMove}>
            <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 pt-20">
                
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-1/2"
                >
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 font-bold rounded-full text-xs uppercase tracking-widest mb-6 shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Disponible immédiatement
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-4 leading-[0.9] tracking-tight">
                        {DATA.profile.name.split(' ')[0]} <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{DATA.profile.name.split(' ')[1]}</span>
                    </h1>
                    
                    <h2 className="text-2xl font-medium text-slate-500 mb-8 flex items-center gap-3">
                        <span className="w-12 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 block rounded-full"></span>
                        {DATA.profile.role}
                    </h2>
                    
                    <div className="flex flex-wrap gap-4 relative z-50">
                        <a 
                            href={`mailto:${DATA.profile.email}`} 
                            className="group relative px-8 py-4 bg-slate-900 text-white rounded-xl font-bold overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all cursor-pointer z-50"
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity z-0" />
                            <div className="relative flex items-center gap-2 z-10">
                                <Mail size={20} /> Me contacter
                            </div>
                        </a>
                        
                        <a 
                            href={DATA.cvFile} 
                            target="_blank" 
                            download="CV_Maxime_Salvadori.pdf"
                            className="group flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer z-50"
                        >
                            <Download size={20} className="group-hover:translate-y-1 transition-transform" /> 
                            Télécharger CV
                        </a>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6 text-slate-400 text-sm font-medium">
                        <a href={`mailto:${DATA.profile.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <Mail size={16} className="text-blue-500"/> {DATA.profile.email}
                        </a>
                        <span className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <Phone size={16} className="text-blue-500"/> {DATA.profile.phone}
                        </span>
                        <span className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                            <MapPin size={16} className="text-blue-500"/> {DATA.profile.location}
                        </span>
                    </div>
                </motion.div>

                <TiltCard mouseX={mouseX} mouseY={mouseY} />
            </div>
        </section>
    )
}

function TiltCard({ mouseX, mouseY }: any) {
    const rotateX = useTransform(mouseY, [0, 1], [15, -15]);
    const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

    return (
        <motion.div 
            style={{ rotateX, rotateY, perspective: 1000 }}
            className="w-full md:w-1/2 flex justify-center relative perspective-1000"
        >
            <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }} 
                animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                transition={{ type: "spring", duration: 1.5, bounce: 0.4 }}
                className="relative w-80 h-96 md:w-[26rem] md:h-[32rem] bg-white p-4 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100"
            >
                <div className="absolute inset-4 bg-slate-100 rounded-[2rem] overflow-hidden">
                     {DATA.profile.avatar ? (
                        <img 
                            src={DATA.profile.avatar} 
                            alt="Maxime" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110" 
                        />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                            Photo manquante
                        </div>
                     )}
                </div>
                
                <motion.div 
                    animate={{ y: [0, -10, 0] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl shadow-blue-900/5 z-20 flex items-center gap-4 border border-slate-50"
                >
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-400 p-3 rounded-xl text-white shadow-lg shadow-blue-500/30">
                        <CheckCircle size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expérience</p>
                        <p className="text-2xl font-black text-slate-800">10 Ans</p>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function AboutSection() {
    return (
        <section id="about" className="py-24 bg-white relative z-10 scroll-mt-20">
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <motion.div 
                    initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                    className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 rotate-3"
                >
                    <User className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h2 className="text-4xl font-black text-slate-900 mb-8">Mon Approche</h2>
                <p className="text-2xl text-slate-600 leading-relaxed font-light">
                    &quot;{DATA.profile.bio}&quot;
                </p>
            </div>
        </section>
    )
}

function ExperienceSection() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden z-10">
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="flex items-center gap-4 mb-16">
                    <div className="p-4 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl shadow-lg shadow-blue-500/20"><Briefcase size={24} /></div>
                    <h2 className="text-4xl font-black text-slate-900">Mon Parcours</h2>
                </div>

                <div className="space-y-6 relative">
                    <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-200 to-transparent hidden md:block"></div>

                    {DATA.experience.map((exp, i) => (
                        <motion.div 
                            key={exp.id}
                            initial={{ opacity: 0, x: -20 }} 
                            whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true, margin: "-100px" }} 
                            transition={{ delay: i * 0.1 }}
                            className="relative md:pl-24 group"
                        >
                            <div className="absolute left-[20px] top-8 w-4 h-4 bg-white rounded-full border-4 border-blue-500 shadow-sm hidden md:block group-hover:scale-150 transition-transform z-10"></div>
                            
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300">
                                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.role}</h3>
                                        <p className="text-blue-600 font-bold flex items-center gap-2">
                                            {exp.company} <ExternalLink size={14} />
                                        </p>
                                    </div>
                                    <span className="inline-block px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg h-fit">
                                        {exp.date}
                                    </span>
                                </div>
                                <p className="text-slate-500 leading-relaxed">{exp.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function SkillsSection() {
    return (
        <section className="py-24 bg-white relative z-10">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600"><Award size={20} /></div>
                            Compétences Clés
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {DATA.skills.map((skill, i) => (
                                <motion.span 
                                    key={i}
                                    whileHover={{ scale: 1.05, backgroundColor: "#eff6ff", borderColor: "#bfdbfe" }}
                                    className="px-5 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium shadow-sm transition-all cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                        <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600"><Sparkles size={20} /></div>
                            Savoir-Être
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            {DATA.softSkills.map((skill, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-transparent hover:border-green-200 hover:bg-green-50/50 transition-all"
                                >
                                    <div className="bg-white p-2 rounded-full text-green-500 shadow-sm"><CheckCircle size={16} /></div>
                                    <span className="text-slate-700 font-bold">{skill}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

function EducationSection() {
    return (
        <section className="py-24 bg-[#0f172a] text-white relative overflow-hidden z-10">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>
             
             <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl shadow-lg shadow-blue-500/30"><GraduationCap size={24} /></div>
                    <h2 className="text-3xl font-bold">Formation</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {DATA.education.map((edu, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">{edu.degree}</h3>
                                <span className="text-xs font-mono text-slate-400 border border-white/10 px-3 py-1 rounded-full">{edu.date}</span>
                            </div>
                            <p className="text-slate-300 font-medium flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full inline-block"></span>
                                {edu.school}
                            </p>
                        </motion.div>
                    ))}
                </div>
             </div>
        </section>
    )
}

function FooterSection() {
    return (
        <footer className="py-12 bg-white text-center border-t border-slate-100 relative z-10">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{DATA.profile.name}</h2>
            <div className="flex justify-center gap-6 mb-8">
                <SocialLink icon={<Mail size={20} />} href={`mailto:${DATA.profile.email}`} />
            </div>
            <p className="text-slate-400 text-sm font-medium">© 2026 - Conçu avec passion & Next.js</p>
        </footer>
    )
}

const SocialLink = ({ icon, href }: any) => (
    <a 
        href={href} 
        className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
    >
        {icon}
    </a>
)