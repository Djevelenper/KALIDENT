import { useEffect, useState, useRef } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Stethoscope, 
  ShieldAlert, 
  CalendarCheck,
  ArrowRight,
  Menu,
  X,
  Instagram,
  Facebook,
  Mail,
  Heart,
  Star,
  Award,
  Quote,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, animate } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CLINIC_INFO = {
  name: "Kalident",
  fullName: "KALIDENT centar za estetsku stomatologiju",
  tagline: "Vrhunska stomatologija u srcu Beograda",
  phone: "060 630 50 90",
  mobile: "060 630 50 90",
  address: "Petra Kočića, kompleks Zelena avenija, Zemun, Beograd",
  email: "boskovic.dr.zoran@gmail.com",
  hours: "Pon - Pet: 12:00 - 20:00",
  instagram: "https://www.instagram.com/kalident_beograd/",
  facebook: "https://www.facebook.com/kalident.beograd/",
  doctors: [
    { name: "dr Zoran Bošković", role: "Stomatolog" },
    { name: "dr Jelena Tepavčević", role: "Stomatolog" },
    { name: "dr Luka Dobrić", role: "Stomatolog" }
  ],
  services: [
    { 
      title: "Implantologija", 
      desc: "Vrhunski zubni implanti za doživotno rešenje.",
      details: "Implantologija je grana koja se bavi nadoknadom izgubljenih zuba. Zubni implant je mali 'šraf' od titanijuma koji menja koren zuba. Procedura se radi pod lokalnom anestezijom, potpuno je bezbolna i traje kratko. Oporavak je brz, a rezultat je zub koji izgleda i funkcioniše kao prirodan.",
      invasiveness: "Niska (lokalna anestezija)",
      when: "Kada vam nedostaje jedan ili više zuba."
    },
    { 
      title: "Protetika", 
      desc: "Bezmetalne krunice i mostovi najnovije generacije.",
      details: "Protetika vraća funkciju i lepotu vašim zubima pomoću krunica, mostova ili proteza. Danas koristimo materijale poput cirkonijuma koji savršeno imitiraju prirodnu gleđ. Postupak podrazumeva pripremu zuba i uzimanje otiska, nakon čega se u laboratoriji izrađuje vaš novi zub.",
      invasiveness: "Minimalna",
      when: "Kada su zubi oštećeni, polomljeni ili nedostaju."
    },
    { 
      title: "Oralna hirurgija", 
      desc: "Bezbolne hirurške intervencije u lokalnoj anesteziji.",
      details: "Ova oblast obuhvata vađenje umnjaka, resekcije korena i druge zahvate u usnoj duplji. Iako zvuči strašno, uz modernu anesteziju i precizne tehnike, pacijenti ne osećaju bol. Naš cilj je da intervencija prođe što brže i sa što manje nelagodnosti.",
      invasiveness: "Srednja (bezbolno uz anesteziju)",
      when: "Kod komplikovanih vađenja zuba ili upalnih procesa."
    },
    { 
      title: "Estetska stomatologija", 
      desc: "Izbeljivanje zuba i fasete za savršen holivudski osmeh.",
      details: "Fokus je na lepoti vašeg osmeha. Fasete (viniri) su tanke ljuspice koje se lepe na prednju površinu zuba i menjaju mu boju i oblik. Izbeljivanje zuba je brz i efikasan način da osvežite izgled bez ikakvog oštećenja zuba.",
      invasiveness: "Nema (neinvazivno)",
      when: "Kada želite belji osmeh ili promenu oblika zuba."
    },
    { 
      title: "Dečija stomatologija", 
      desc: "Prva poseta zubaru bez straha i suza.",
      details: "Posebnu pažnju posvećujemo našim najmlađim pacijentima. Kroz igru i razgovor učimo decu kako da peru zube i zašto je važno da dolaze na kontrole. Cilj nam je da dete stekne poverenje i da nikada ne razvije strah od stomatologa.",
      invasiveness: "Nema",
      when: "Od nicanja prvih zuba radi preventive i zdravih navika."
    },
    { 
      title: "Ortodoncija", 
      desc: "Fiksne i mobilne proteze za pravilno poravnanje zuba.",
      details: "Ortodoncija se bavi ispravljanjem nepravilnog položaja zuba i vilica. Pored klasičnih fiksnih proteza, nudimo i moderne providne folije (alignere) koje su skoro nevidljive. Pravilni zubi nisu samo lepši, već se i lakše čiste, što sprečava kvarove.",
      invasiveness: "Nema",
      when: "Kod nepravilnog zagrižaja ili 'krivih' zuba u bilo kom uzrastu."
    },
    { 
      title: "Kompozitne fasete", 
      desc: "Brzo i ekonomično rešenje za savršen oblik zuba.",
      details: "Kompozitne fasete su tanki slojevi estetskog materijala koji se nanose direktno na vaše zube u ordinaciji. Za razliku od keramičkih faseta, ove se obično završavaju u jednoj poseti. Materijal se pažljivo oblikuje i polira kako bi se sakrile nepravilnosti, zatvorili razmaci ili promenila boja zuba. Rezultat je prirodan i lep osmeh uz minimalnu pripremu zuba.",
      invasiveness: "Minimalna (često bez brušenja zuba)",
      when: "Kada želite brzu promenu oblika, boje ili zatvaranje razmaka između zuba."
    }
  ],
  reviews: [
    { name: "Marko P.", text: "Najbolja ordinacija u gradu! Dr Zoran je vrhunski stručnjak, a atmosfera je veoma prijatna.", rating: 5 },
    { name: "Ana M.", text: "Prezadovoljna sam krunicama koje mi je uradila dr Jelena. Sve preporuke za Kalident!", rating: 5 },
    { name: "Nikola S.", text: "Profesionalizam na najvišem nivou. Zelena avenija je prelep kompleks, a ordinacija je moderna i čista.", rating: 5 },
    { name: "Milica V.", text: "Konačno zubar kod kojeg idem bez straha. Hvala celom timu Kalidenta!", rating: 5 }
  ],
  transformations: [
    { before: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&q=80&w=400", after: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=400", title: "Holivudski osmeh - Fasete" },
    { before: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400", after: "https://images.unsplash.com/photo-1516733968453-3d239216333c?auto=format&fit=crop&q=80&w=400", title: "Izbeljivanje zuba" }
  ]
};

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const node = ref.current;
      const controls = animate(0, value, {
        duration: 2,
        onUpdate(value) {
          node.textContent = Math.round(value).toString() + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix]);

  return <span ref={ref}>0</span>;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const heroRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-brand-turquoise selection:text-white">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-white/90 backdrop-blur-lg shadow-lg py-2 border-b border-brand-blue/10" 
          : "bg-transparent py-6"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={scrollToTop}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <span className="text-white font-black text-2xl">K</span>
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-2xl font-black tracking-tighter leading-none transition-colors",
                scrolled ? "text-brand-blue" : "text-white"
              )}>KALIDENT</span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors",
                scrolled ? "text-gray-400" : "text-white/70"
              )}>Centar za estetsku stomatologiju</span>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className={cn(
                "nav-link text-sm uppercase tracking-widest font-bold",
                scrolled ? "text-gray-700" : "text-white"
              )}
            >
              Početna
            </a>
            {['Usluge', 'O nama', 'Tim', 'Rezultati', 'Kontakt'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`} 
                className={cn(
                  "nav-link text-sm uppercase tracking-widest font-bold",
                  scrolled ? "text-gray-700" : "text-white"
                )}
              >
                {item}
              </a>
            ))}
            <a 
              href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} 
              className="btn-primary py-2.5 px-8 shadow-brand-blue/20"
            >
              <Phone size={16} />
              <span>{CLINIC_INFO.phone}</span>
            </a>
          </div>

          <button 
            className="lg:hidden p-2 rounded-lg bg-white/10 backdrop-blur-md" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} className="text-brand-blue" /> : <Menu size={28} className={scrolled ? "text-brand-blue" : "text-white"} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b">
              <span className="text-2xl font-black text-brand-blue">KALIDENT</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-brand-blue">
                <X size={32} />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center gap-10 p-6">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToTop(); }}
                className="text-4xl font-black text-gray-900 hover:text-brand-blue transition-colors"
              >
                Početna
              </a>
              {['Usluge', 'O nama', 'Tim', 'Rezultati', 'Kontakt'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-gray-900 hover:text-brand-blue transition-colors"
                >
                  {item}
                </a>
              ))}
              <a href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} className="btn-primary w-full text-xl py-5">
                POZOVITE ODMAH
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2070" 
            alt="Dental Clinic"
            className="w-full h-full object-cover scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-brand-blue/40" />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xl px-6 py-2 rounded-full mb-8 border border-white/30">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white font-bold text-sm uppercase tracking-widest">Najbolja stomatologija u Beogradu</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter">
              OSMEH KOJI <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-turquoise to-white">MENJA SVE</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              {CLINIC_INFO.fullName} nudi vrhunsku stomatološku negu i tim koji brine o svakom detalju vašeg zdravlja.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#usluge" className="btn-primary text-lg px-12 py-5 shadow-xl shadow-brand-blue/30">
                NAŠE USLUGE <ChevronRight size={20} />
              </a>
              <a href="#kontakt" className="btn-secondary text-lg px-12 py-5 bg-white/10 backdrop-blur-md border-white/50 text-white hover:bg-white hover:text-brand-blue">
                ZAKAŽITE TERMIN
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white opacity-50"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-20 -mt-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Award className="text-brand-turquoise" />} count={15} suffix="+" label="Godina iskustva" />
          <StatCard icon={<Heart className="text-brand-blue" />} count={4000} suffix="+" label="Zadovoljnih pacijenata" />
          <StatCard icon={<Star className="text-yellow-500" />} count={100} suffix="%" label="Garancija na rad" />
        </div>
      </section>

      {/* Services Grid */}
      <section id="usluge" className="py-32 bg-brand-light px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-turquoise/5 rounded-full blur-3xl -ml-48 -mb-48" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-brand-blue font-black text-sm uppercase tracking-[0.3em] mb-4">Naše ekspertize</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Kompletna stomatološka nega</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CLINIC_INFO.services.map((service, idx) => (
              <ServiceCard 
                key={idx}
                title={service.title}
                description={service.desc}
                delay={idx * 0.1}
                onClick={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setSelectedService(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-[2.5rem] max-w-2xl w-full overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-48 gradient-blue flex items-center justify-center">
                <button 
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                >
                  <X size={24} />
                </button>
                <Stethoscope size={64} className="text-white/50" />
                <h2 className="absolute bottom-6 left-10 text-4xl font-black text-white">{selectedService.title}</h2>
              </div>
              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-brand-light p-6 rounded-2xl">
                    <h4 className="text-brand-blue font-bold uppercase text-xs tracking-widest mb-2">Kada se radi?</h4>
                    <p className="text-gray-700 font-medium">{selectedService.when}</p>
                  </div>
                  <div className="bg-brand-light p-6 rounded-2xl">
                    <h4 className="text-brand-turquoise font-bold uppercase text-xs tracking-widest mb-2">Invazivnost</h4>
                    <p className="text-gray-700 font-medium">{selectedService.invasiveness}</p>
                  </div>
                </div>
                <div className="mb-10">
                  <h4 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Detalji usluge</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {selectedService.details}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="flex-1 btn-secondary py-4 flex items-center justify-center gap-2"
                  >
                    <ChevronRight size={20} className="rotate-180" /> Nazad
                  </button>
                  <a 
                    href="#kontakt" 
                    onClick={() => setSelectedService(null)}
                    className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2"
                  >
                    Zakažite termin <CalendarCheck size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Team Section */}
      <section id="tim" className="py-32 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-brand-blue font-black text-sm uppercase tracking-[0.3em] mb-4">Naš tim</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Upoznajte naše stručnjake</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {CLINIC_INFO.doctors.map((doctor, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="text-center group"
              >
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl border-4 border-brand-light group-hover:border-brand-blue transition-colors duration-500">
                  <img 
                    src={`https://picsum.photos/seed/doctor${idx}/600/800`} 
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-1">{doctor.name}</h4>
                <p className="text-brand-blue font-bold uppercase tracking-widest text-sm">{doctor.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section id="rezultati" className="py-32 bg-brand-light px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-brand-blue font-black text-sm uppercase tracking-[0.3em] mb-4">Rezultati</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Pre i Posle</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {CLINIC_INFO.transformations.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-[2.5rem] shadow-xl"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="relative">
                    <img src={item.before} alt="Pre" className="rounded-2xl w-full aspect-square object-cover" />
                    <span className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Pre</span>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt="Posle" className="rounded-2xl w-full aspect-square object-cover" />
                    <span className="absolute top-4 left-4 bg-brand-blue text-white px-3 py-1 rounded-full text-xs font-bold uppercase">Posle</span>
                  </div>
                </div>
                <h4 className="text-xl font-black text-center text-gray-900">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-32 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-brand-blue font-black text-sm uppercase tracking-[0.3em] mb-4">Recenzije</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">Šta kažu naši pacijenti</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CLINIC_INFO.reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-brand-light p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <Quote size={32} className="text-brand-blue/20 mb-4" />
                <p className="text-gray-600 italic mb-6 flex-1">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-turquoise rounded-full flex items-center justify-center text-white font-bold">
                    {review.name[0]}
                  </div>
                  <span className="font-bold text-gray-900">{review.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <a href="https://www.google.com/search?q=Kalident+Beograd+reviews" target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex">
              POGLEDAJ SVE RECENZIJE NA GOOGLE-U
            </a>
          </div>
        </div>
      </section>

      {/* Parallax Feature Section */}
      <section id="o-nama" className="relative py-40 overflow-hidden">
        <div className="absolute inset-0 z-0 parallax-bg" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=2000)' }}>
          <div className="absolute inset-0 bg-brand-blue/80 backdrop-blur-sm" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Zašto izabrati <br /> Kalident?</h2>
              <div className="space-y-8">
                <FeatureItem title="Najmodernija oprema" desc="Koristimo najnovije digitalne tehnologije za preciznu dijagnostiku i bezbolne tretmane." />
                <FeatureItem title="Vrhunski materijali" desc="Svi materijali koje koristimo su sertifikovani i dolaze od vodećih svetskih proizvođača." />
                <FeatureItem title="Individualni pristup" desc="Svaki pacijent dobija personalizovan plan lečenja prilagođen njegovim potrebama i željama." />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000" 
                  alt="Modern Dental Office"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 gradient-turquoise rounded-3xl flex flex-col items-center justify-center text-center p-4 shadow-2xl rotate-12">
                <span className="text-4xl font-black">100%</span>
                <span className="text-sm font-bold uppercase tracking-widest">Bezbolno</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Info Section */}
      <section id="kontakt" className="py-32 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-12">Gde se nalazimo?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <ContactInfo icon={<MapPin className="text-brand-blue" />} title="Adresa" content={CLINIC_INFO.address} />
                <ContactInfo icon={<Phone className="text-brand-turquoise" />} title="Telefon" content={CLINIC_INFO.phone} />
                <ContactInfo icon={<Clock className="text-brand-blue" />} title="Radno vreme" content={CLINIC_INFO.hours} />
                <ContactInfo icon={<Mail className="text-brand-turquoise" />} title="Email" content={CLINIC_INFO.email} />
              </div>
              
              <div className="flex gap-4">
                <a href={CLINIC_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 gradient-blue text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Instagram size={28} />
                </a>
                <a href={CLINIC_INFO.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 gradient-turquoise text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                  <Facebook size={28} />
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-8 border-brand-light h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.876543210987!2d20.40123456789012!3d44.82345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a654321098765%3A0x1234567890abcdef!2sPetra%20Ko%C4%8Di%C4%87a%2C%20Beograd!5e0!3m2!1ssr!2srs!4v1709190000000!5m2!1ssr!2srs" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-20 text-white px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xl">K</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">KALIDENT</span>
            </div>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              {CLINIC_INFO.fullName} - Vaše poverenje je naša najveća nagrada. Posetite nas i uverite se zašto smo prvi izbor za hiljade pacijenata.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-brand-turquoise">Linkovi</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#usluge" className="hover:text-white transition-colors">Usluge</a></li>
              <li><a href="#o-nama" className="hover:text-white transition-colors">O nama</a></li>
              <li><a href="#tim" className="hover:text-white transition-colors">Naš tim</a></li>
              <li><a href="#rezultati" className="hover:text-white transition-colors">Rezultati</a></li>
              <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-8 uppercase tracking-widest text-brand-blue">Kontakt</h4>
            <ul className="space-y-4 text-gray-400">
              <li>{CLINIC_INFO.address}</li>
              <li>{CLINIC_INFO.phone}</li>
              <li>{CLINIC_INFO.email}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>© {new Date().getFullYear()} Kalident Stomatološka Ordinacija. Sva prava zadržana.</p>
            <p className="text-xs opacity-50">Powered by <span className="text-brand-turquoise font-bold">UTvikler</span></p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Politika privatnosti</a>
            <a href="#" className="hover:text-white transition-colors">Uslovi korišćenja</a>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 w-14 h-14 gradient-blue text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group"
            title="Idi na vrh"
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronRight size={28} className="-rotate-90" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ icon, count, suffix = "", label }: { icon: React.ReactNode, count: number, suffix?: string, label: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-3xl shadow-xl flex items-center gap-6 border border-gray-100"
    >
      <div className="w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-3xl">
        {icon}
      </div>
      <div>
        <p className="text-3xl font-black text-gray-900">
          <Counter value={count} suffix={suffix} />
        </p>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</p>
      </div>
    </motion.div>
  );
}

function ServiceCard({ title, description, delay, onClick }: { title: string, description: string, delay: number, onClick: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full cursor-pointer"
    >
      <div className="w-16 h-16 gradient-blue rounded-2xl mb-8 flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
        <Stethoscope size={32} />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-brand-blue transition-colors">{title}</h3>
      <p className="text-gray-600 mb-8 leading-relaxed flex-1">
        {description}
      </p>
      <div className="flex items-center gap-2 font-bold text-brand-blue group-hover:gap-4 transition-all uppercase text-sm tracking-widest">
        Saznajte više <ArrowRight size={18} />
      </div>
    </motion.div>
  );
}

function FeatureItem({ title, desc }: { title: string, desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center flex-shrink-0">
        <ShieldAlert size={24} />
      </div>
      <div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-white/70 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ContactInfo({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
