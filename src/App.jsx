import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import ProductGridCarousel from './components/ProductGridCarousel';
import {
  ArrowUpRight,
  BadgeCheck,
  BatteryCharging,
  Building2,
  CircuitBoard,
  Droplets,
  Leaf,
  Lightbulb,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Wrench,
} from 'lucide-react';
import * as THREE from 'three';

const navItems = [
  { label: 'Layanan', href: '#layanan' },
  { label: 'Produk', href: '#produk' },
  { label: 'Proyek', href: '#proyek' },
  { label: 'Nilai', href: '#nilai' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Kontak', href: '#kontak' },
];

const services = [
  {
    icon: SunMedium,
    title: 'Pengembangan energi surya',
    text: 'Desain, instalasi, dan pemeliharaan PLTS on-grid, off-grid, dan hybrid untuk rumah, industri, sekolah, dan fasilitas publik.',
  },
  {
    icon: Lightbulb,
    title: 'PJUTS',
    text: 'Penerangan jalan umum tenaga surya untuk desa, kawasan industri, dan area layanan publik dengan cakupan titik yang luas.',
  },
  {
    icon: Droplets,
    title: 'Pompa air tenaga surya',
    text: 'Sistem AC/DC hybrid maupun DC-only untuk kebutuhan air bersih, pertanian, perikanan, dan lokasi terpencil.',
  },
  {
    icon: Recycle,
    title: 'Infrastruktur hijau',
    text: 'Ekosistem penunjang energi bersih seperti EV charging, BESS, dan solusi operasional berkelanjutan.',
  },
  {
    icon: CircuitBoard,
    title: 'Konsultasi & studi kelayakan',
    text: 'Analisis potensi, risiko, dan proyeksi finansial agar proyek energi berjalan dengan dasar yang jelas.',
  },
  {
    icon: Wrench,
    title: 'Operasional & pemeliharaan',
    text: 'Dukungan teknis berkala supaya sistem tetap stabil, aman, dan siap pakai setelah instalasi selesai.',
  },
];

const projectShots = [
  {
    src: '/assets/plts-rooftop.webp',
    title: 'PLTS rooftop',
    text: 'Instalasi rooftop untuk kebutuhan energi harian.',
  },
  {
    src: '/assets/pju-pole-installation.webp',
    title: 'PJU tenaga surya',
    text: 'Pemasangan tiang dan luminer untuk ruang publik.',
  },
  {
    src: '/assets/rooftop-panel-team.webp',
    title: 'Tim instalasi',
    text: 'Koordinasi lapangan dan verifikasi panel.',
  },
  {
    src: '/assets/night-pju-light.webp',
    title: 'Lighting malam',
    text: 'Hasil akhir yang tetap terang dan rapi saat malam.',
  },
  {
    src: '/assets/field-team.webp',
    title: 'Field crew',
    text: 'Pekerjaan lapangan di berbagai area proyek.',
  },
  {
    src: '/assets/green-infrastructure.webp',
    title: 'Infrastruktur hijau',
    text: 'Solusi yang mendukung energi bersih jangka panjang.',
  },
];

const productCards = [
  {
    imgUrl: '/assets/product-rooftop.webp',
    label: 'PLTS',
    title: 'Panel surya rooftop',
    text: 'Solusi panel surya untuk rumah, kantor, sekolah, fasilitas publik, dan kebutuhan industri.',
  },
  {
    imgUrl: '/assets/product-pjut.webp',
    label: 'PJUTS',
    title: 'Lampu jalan tenaga surya',
    text: 'Penerangan mandiri untuk jalan desa, kawasan industri, dan ruang publik.',
  },
  {
    imgUrl: '/assets/product-pump.webp',
    label: 'Pompa air',
    title: 'Pompa air tenaga surya',
    text: 'Sistem pompa untuk pertanian, peternakan, perikanan, dan akses air di lokasi terpencil.',
  },
  {
    imgUrl: '/assets/product-inverter.webp',
    label: 'Penyimpanan',
    title: 'Inverter & baterai',
    text: 'Pengaturan daya dan penyimpanan energi agar sistem lebih siap dipakai setiap hari.',
  },
  {
    imgUrl: '/assets/solar-farm.webp',
    label: 'Skala besar',
    title: 'Solar farm & ground mount',
    text: 'Perencanaan dan instalasi array panel surya untuk kebutuhan energi yang lebih besar.',
  },
  {
    imgUrl: '/assets/green-city.webp',
    label: 'Go green',
    title: 'Infrastruktur hijau',
    text: 'Pendampingan solusi energi bersih untuk operasional yang lebih hemat dan berkelanjutan.',
  },
];

const values = [
  {
    letter: 'A',
    title: 'Accountable',
    text: 'Bertanggung jawab penuh atas proyek dan dampaknya.',
  },
  {
    letter: 'E',
    title: 'Excellent',
    text: 'Mengutamakan kualitas premium dan presisi kerja.',
  },
  {
    letter: 'R',
    title: 'Reliable',
    text: 'Menjadi mitra yang bisa diandalkan di lapangan.',
  },
  {
    letter: 'I',
    title: 'Innovative',
    text: 'Terus beradaptasi dengan teknologi energi terbaru.',
  },
  {
    letter: 'S',
    title: 'Sustainable',
    text: 'Setiap langkah diarahkan ke kelestarian jangka panjang.',
  },
];

const milestones = [
  { label: 'PLTS', value: 'Rooftop, on-grid, off-grid, hybrid' },
  { label: 'PJUTS', value: 'Ratusan titik di berbagai daerah' },
  { label: 'Pompa air', value: 'Solusi air bersih untuk banyak medan' },
  { label: 'Fokus', value: 'Industri, komersial, dan pemerintahan' },
];

function usePointerTilt(ref, strength = 0.35) {
  useEffect(() => {
    const onMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      ref.current.targetX = x * strength;
      ref.current.targetY = -y * strength;
    };

    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [ref, strength]);
}

function usePanelTexture() {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, '#0b1730');
    gradient.addColorStop(0.5, '#10305a');
    gradient.addColorStop(1, '#07111d');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    ctx.strokeStyle = 'rgba(123, 224, 255, 0.28)';
    ctx.lineWidth = 3;
    for (let x = 64; x < 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 64; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(126, 240, 164, 0.16)';
    ctx.lineWidth = 1.5;
    for (let x = 32; x < 512; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 32; y < 512; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.fillRect(0, 0, 512, 512);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.anisotropy = 8;
    return tex;
  }, []);

  return texture;
}

function SolarArray() {
  const panelTexture = usePanelTexture();
  const group = useRef();
  const core = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const particles = useRef();
  const pointer = useRef({ targetX: 0, targetY: 0 });

  usePointerTilt(pointer, 0.6);

  useFrame((state, delta) => {
    if (!group.current) return;

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      pointer.current.targetX * 0.8 + Math.sin(state.clock.elapsedTime * 0.08) * 0.1,
      delta * 1.8,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.current.targetY * 0.45,
      delta * 1.8,
    );

    if (core.current) {
      core.current.rotation.y += delta * 0.7;
      core.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
    }

    if (ring1.current) {
      ring1.current.rotation.z += delta * 0.6;
    }
    if (ring2.current) {
      ring2.current.rotation.z -= delta * 0.45;
    }
    if (particles.current) {
      particles.current.rotation.y -= delta * 0.08;
      particles.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
  });

  const panels = useMemo(() => {
    const items = [];
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        items.push({
          key: `${row}-${col}`,
          position: [(col - 1.5) * 1.9, (1 - row) * 1.02, row * 0.18],
          rotation: [-0.24, 0.1 * (col - 1.5), 0],
          scale: [1.22, 0.92, 1],
          delay: row * 0.18 + col * 0.08,
        });
      }
    }
    return items;
  }, []);

  const stars = useMemo(() => {
    const items = [];
    for (let i = 0; i < 54; i += 1) {
      items.push([
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.3) * 14,
        (Math.random() - 0.5) * 18,
      ]);
    }
    return items;
  }, []);

  return (
    <>
      <fog attach="fog" args={['#050816', 8, 24]} />
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 9, 7]} intensity={2.6} color="#d7f8ff" />
      <directionalLight position={[-5, 2, -3]} intensity={1.2} color="#76ffd1" />
      <pointLight position={[0, 1, 3]} intensity={4.8} color="#28d4ff" />
      <pointLight position={[-4, -1, 2]} intensity={2.6} color="#6cf0a4" />
      <gridHelper args={[28, 28, '#16324a', '#112033']} position={[0, -3, 0]} />

      <group ref={group} position={[0.6, -0.15, 0]}>
        <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3.8, 64]} />
          <meshBasicMaterial color="#1dc9ff" transparent opacity={0.09} />
        </mesh>

        <group position={[-0.1, -0.12, 0]}>
          {panels.map((panel) => (
            <group
              key={panel.key}
              position={panel.position}
              rotation={panel.rotation}
              scale={panel.scale}
            >
              <mesh>
                <boxGeometry args={[1.7, 1.05, 0.08]} />
                <meshStandardMaterial
                  map={panelTexture}
                  color="#153052"
                  metalness={0.35}
                  roughness={0.3}
                  emissive="#0b4974"
                  emissiveIntensity={0.22}
                />
              </mesh>
              <mesh position={[0, 0, 0.055]}>
                <boxGeometry args={[1.58, 0.94, 0.03]} />
                <meshBasicMaterial color="#67e8ff" transparent opacity={0.08} />
              </mesh>
            </group>
          ))}
        </group>

        <mesh ref={core} position={[0, 0.15, 1.1]}>
          <sphereGeometry args={[0.72, 48, 48]} />
          <meshStandardMaterial
            color="#ccffff"
            emissive="#7ef0ff"
            emissiveIntensity={1.4}
            transparent
            opacity={0.55}
            roughness={0.18}
            metalness={0.7}
          />
        </mesh>
        <mesh position={[0, 0.15, 1.1]}>
          <sphereGeometry args={[1.02, 48, 48]} />
          <meshBasicMaterial color="#00d7ff" transparent opacity={0.07} />
        </mesh>
        <mesh ref={ring1} position={[0, 0.15, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.45, 0.03, 16, 120]} />
          <meshBasicMaterial color="#78f6ff" transparent opacity={0.58} />
        </mesh>
        <mesh ref={ring2} position={[0, 0.15, 1.1]} rotation={[Math.PI / 2, 0.8, 0]}>
          <torusGeometry args={[1.88, 0.02, 16, 120]} />
          <meshBasicMaterial color="#6cf0a4" transparent opacity={0.42} />
        </mesh>

        <group ref={particles}>
          {stars.map((pos, index) => (
            <mesh key={index} position={pos}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial
                color={index % 3 === 0 ? '#73f7ff' : index % 3 === 1 ? '#9bffd0' : '#ffffff'}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
      </group>
    </>
  );
}

function Scene() {
  return (
    <Canvas dpr={[1, 1.35]} camera={{ position: [0, 1.3, 11], fov: 38 }}>
      <SolarArray />
    </Canvas>
  );
}

function HeroSceneLayer() {
  return (
    <div className="hero-scene three-active">
      <Scene />
    </div>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s` }}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-copy">{text}</p>
    </div>
  );
}

function App() {
  return (
    <div className="page-shell">
      <section className="hero" id="top">
        <HeroSceneLayer />
        <div className="hero-shade" />

        <header className="topbar container">
          <a className="brand" href="#top" aria-label="PT Aeris Energi Indonesia">
            <span className="brand-mark">
              <SunMedium size={18} />
            </span>
            <span className="brand-text">
              <strong>PT Aeris Energi Indonesia</strong>
              <span>energi terbarukan dan efisiensi energi</span>
            </span>
          </a>

          <nav className="nav">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

        </header>

        <div className="hero-content container">
          <div className="hero-copy">
            <Reveal>
              <p className="eyebrow hero-eyebrow">Solusi energi terbarukan untuk kebutuhan nyata</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1>
                Solusi tenaga surya
                <span>untuk efisiensi hari ini.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="hero-text">
                Pilih produk, jasa, dan dukungan teknis untuk menghadirkan energi surya yang lebih
                hemat, mandiri, dan berdampak baik untuk lingkungan.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="hero-actions">
                <a className="button primary" href="#produk">
                  <ArrowUpRight size={16} />
                  Lihat produk
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="milestone-row">
                {milestones.map((item) => (
                  <div className="milestone" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-visual" delay={0.1}>
            <div className="visual-stack">
              <div className="visual-card main">
                <img src="/assets/product-rooftop.webp" alt="Panel surya rooftop untuk kebutuhan energi bersih" />
              </div>
              <div className="visual-card floating one">
                <BadgeCheck size={18} />
                <span>Infrastruktur berorientasi ESG</span>
              </div>
              <div className="visual-card floating two">
                <Sparkles size={18} />
                <span>Instalasi siap lapangan</span>
              </div>
              <div className="visual-card floating three">
                <ShieldCheck size={18} />
                <span>Industri dan sektor publik</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <main>
        <section className="strip">
          <div className="container strip-inner">
            <span>PLTS rooftop</span>
            <span>PJUTS</span>
            <span>Pompa air tenaga surya</span>
            <span>Insinerator ramah lingkungan</span>
            <span>Studi kelayakan</span>
          </div>
        </section>

        <section className="section container" id="layanan">
          <SectionHeading
            eyebrow="Layanan utama"
            title="Satu mitra untuk seluruh kebutuhan energi."
            text="Layanan mencakup survei, perhitungan kebutuhan, instalasi, pengujian, dan pemeliharaan sistem energi terbarukan."
          />
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Reveal key={service.title} delay={index * 0.05}>
                  <article className="service-card">
                    <div className="service-icon">
                      <Icon size={20} />
                    </div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="section container product-showcase" id="produk">
          <SectionHeading
            eyebrow="Produk & solusi"
            title="Pilihan teknologi untuk berbagai kebutuhan."
            text="Setiap solusi dapat disesuaikan dengan lokasi, kapasitas, kebutuhan operasional, dan target efisiensi energi."
          />
          <ProductGridCarousel cards={productCards} />
        </section>

        <section className="section band">
          <div className="container band-inner">
            <Reveal>
              <div className="band-copy">
                <p className="eyebrow">Solusi menyeluruh</p>
                <h2>Dari perencanaan hingga sistem beroperasi.</h2>
                <p>
                  Tim Aeris membantu menentukan solusi yang tepat, menyiapkan instalasi, melakukan
                  pengujian, dan mendukung sistem setelah digunakan.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="band-metrics">
                <div>
                  <strong>Survei</strong>
                  <span>analisis kebutuhan dan kondisi lokasi</span>
                </div>
                <div>
                  <strong>Instalasi</strong>
                  <span>pemasangan dan pengujian sistem</span>
                </div>
                <div>
                  <strong>Dukungan</strong>
                  <span>pemeliharaan dan bantuan teknis</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section container" id="proyek">
          <SectionHeading
            eyebrow="Portofolio proyek"
            title="Bukti lapangan, bukan sekadar janji."
            text="Pengalaman Aeris mencakup PLTS rooftop, penerangan jalan tenaga surya, pompa air, dan infrastruktur hijau di berbagai lokasi."
          />
          <div className="gallery-grid">
            {projectShots.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.05}
                className={`gallery-item ${index === 0 ? 'span-wide' : index === 1 ? 'span-tall' : 'span-normal'}`}
              >
                <figure className="gallery-card">
                  <img src={item.src} loading="lazy" alt={item.title} />
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section container" id="nilai">
          <SectionHeading
            eyebrow="Nilai perusahaan"
            title="AERIS sebagai fondasi."
            text="Accountable, Excellent, Reliable, Innovative, dan Sustainable menjadi dasar dalam setiap pekerjaan Aeris."
          />
          <div className="value-grid">
            {values.map((value, index) => (
              <Reveal key={value.letter} delay={index * 0.05}>
                <article className="value-card">
                  <span className="value-letter">{value.letter}</span>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section container feature-split" id="tentang">
          <Reveal>
            <div className="feature-media">
              <img src="/assets/green-infrastructure.webp" alt="Infrastruktur hijau dan pekerjaan energi terbarukan" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="feature-copy">
              <p className="eyebrow">Tentang & portofolio</p>
              <h2>Pengalaman lapangan yang bisa dibawa ke proyek berikutnya.</h2>
              <p>
                Aeris mengerjakan solusi energi surya, penerangan publik, pompa air, dan
                infrastruktur hijau untuk kebutuhan industri, komersial, maupun pemerintahan.
              </p>
              <ul className="checklist">
                <li>
                  <BadgeCheck size={16} />
                  Survei dan perhitungan kebutuhan di lokasi
                </li>
                <li>
                  <BadgeCheck size={16} />
                  Instalasi, pengujian, dan serah terima sistem
                </li>
                <li>
                  <BadgeCheck size={16} />
                  Perawatan dan dukungan setelah proyek berjalan
                </li>
              </ul>
            </div>
          </Reveal>
        </section>

        <section className="section container feature-split contact" id="kontak">
          <Reveal>
            <div className="feature-copy">
              <p className="eyebrow">Kontak</p>
              <h2>Diskusikan kebutuhan energi Anda bersama tim Aeris.</h2>
              <p>
                Sampaikan lokasi, jenis kebutuhan, dan target penggunaan. Tim kami akan membantu
                menyiapkan solusi yang sesuai.
              </p>
              <div className="contact-list">
                <a href="https://wa.me/6281218000028" target="_blank" rel="noreferrer">
                  <Phone size={16} />
                  0812 1800 0028
                </a>
                <a href="mailto:aeris.energy.indonesia@gmail.com">
                  <Sparkles size={16} />
                  aeris.energy.indonesia@gmail.com
                </a>
                <span>
                  <MapPin size={16} />
                  Jl. Pembangunan, Garut, Jawa Barat
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="contact-panel">
              <div className="contact-card">
                <p>PT Aeris Energi Indonesia</p>
                <strong>Solusi energi terbarukan untuk kebutuhan industri, komersial, dan pemerintahan.</strong>
                <span>Hubungi tim kami untuk konsultasi produk, survei lokasi, dan rencana pekerjaan.</span>
              </div>
              <div className="contact-card compact">
                <div>
                  <Building2 size={18} />
                  <span>Industri</span>
                </div>
                <div>
                  <Leaf size={18} />
                  <span>Komersial</span>
                </div>
                <div>
                  <BatteryCharging size={18} />
                  <span>Pemerintahan</span>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}

export default App;
