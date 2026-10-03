import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface ContributionItem {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  keyPoints: string[];
  quote: string;
  pillar: string;
}

export interface LeadershipRole {
  title: string;
  organization: string;
  badge: string;
  icon: string;
  description: string;
  highlights: string[];
}

export interface MetricCard {
  value: string;
  subtitle: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private fb = inject(FormBuilder);

  // Permanent Official Profile Photo of Mr. Sumeet Puri (User-provided master image)
  readonly OFFICIAL_PHOTO = '/images/Sumeet_puri-20260926-WA0002(1).jpg';
  profilePhotoUrl = signal<string>('/images/Sumeet_puri-20260926-WA0002(1).jpg');
  imageLoadFailed = signal<boolean>(false);

  // Active navigation & scroll tracking
  activeSection = signal<string>('hero');
  scrollProgress = signal<number>(0);
  isMobileMenuOpen = signal<boolean>(false);
  copiedToast = signal<string | null>(null);

  // Floating Navigation Menu Items
  readonly navSections = [
    { id: 'hero', label: 'Home', icon: 'home' },
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'contributions', label: 'Contributions', icon: 'auto_stories' },
    { id: 'vision', label: 'Vision', icon: 'lightbulb' },
    { id: 'institutions', label: 'Institutions', icon: 'account_balance' },
    { id: 'contact', label: 'Contact', icon: 'mail' },
  ];

  // Modals state
  selectedContribution = signal<ContributionItem | null>(null);
  showBioModal = signal<boolean>(false);

  // Contact form submission state
  isSubmitting = signal<boolean>(false);
  contactSubmitted = signal<boolean>(false);
  submissionSuccessMessage = signal<string>('');

  // Active philosophy tab in Vision section
  activePhilosophyTab = signal<number>(0);

  // Reactive Contact Form
  contactForm: FormGroup = this.fb.group({
    fullName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(''),
    organization: new FormControl(''),
    inquiryType: new FormControl('Academic Collaboration', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(15)]),
  });

  // Key academic credentials & roles
  readonly qualifications = ['M.A.', 'B.Ed.', 'PGDCA'];

  readonly leadershipRoles: LeadershipRole[] = [
    {
      title: 'Director',
      organization: 'Jagat Jyoti Schools',
      badge: 'Institutional Governance',
      icon: 'account_balance',
      description:
        'Spearheading broad strategic direction, educational standards, and infrastructure expansion across campuses. Guiding faculty leadership to ensure nurturing, high-performing educational ecosystems.',
      highlights: [
        'Curriculum harmonization and administrative standard operating procedures',
        'Fostering teacher welfare, continuous training, and instructional leadership',
        'State-of-the-art learning facilities and progressive learning environments',
      ],
    },
    {
      title: 'Principal',
      organization: 'Modern Jagat Jyoti Senior Secondary School',
      badge: 'Academic Administration',
      icon: 'school',
      description:
        'Overseeing senior secondary scholastic excellence, character development, and board examination preparedness. Championing student-centered learning methodologies and co-curricular achievements.',
      highlights: [
        'Consistent exemplary results in secondary & senior secondary board examinations',
        'Holistic integration of sciences, commerce, technology, arts, and competitive sports',
        'Nurturing discipline, self-governance, and moral values among adolescent learners',
      ],
    },
    {
      title: 'Former President',
      organization: 'Bharat Vikas Parishad',
      badge: 'Social Welfare & Sanskar',
      icon: 'groups',
      description:
        'Led socio-cultural initiatives anchored in the enduring tenets of Sampark (Contact), Seva (Selfless Service), and Sanskar (Values) to empower communities and guide youth toward civic responsibility.',
      highlights: [
        'Organized youth value-orientation seminars and national awareness workshops',
        'Spearheaded community health, educational aid, and social welfare programs',
        'Strengthened civic engagement, cultural heritage preservation, and nation-building',
      ],
    },
  ];

  // Key Metrics Bar
  readonly stats: MetricCard[] = [
    {
      value: 'M.A. | B.Ed. | PGDCA',
      subtitle: 'Academic Foundations',
      label: 'Postgraduate Mastery & Computer Applications',
      icon: 'verified',
    },
    {
      value: 'Director',
      subtitle: 'Institutional Leadership',
      label: 'Jagat Jyoti Schools',
      icon: 'domain',
    },
    {
      value: 'Principal',
      subtitle: 'Senior School Headship',
      label: 'Modern Jagat Jyoti Sr. Sec. School',
      icon: 'military_tech',
    },
    {
      value: 'Former President',
      subtitle: 'Sampark · Seva · Sanskar',
      label: 'Bharat Vikas Parishad',
      icon: 'volunteer_activism',
    },
  ];

  // Areas of Contribution
  readonly contributions: ContributionItem[] = [
    {
      id: 'academic-leadership',
      title: 'Academic Leadership & Institutional Development',
      icon: 'account_balance',
      pillar: 'Governance & Strategy',
      shortDesc:
        'Setting institutional benchmarks, orchestrating administrative clarity, and driving long-term scholastic vision.',
      fullDesc:
        'Mr. Sumeet Puri provides visionary leadership that harmonizes administrative discipline with scholarly ambition. By establishing transparent systems, aligning curricula with modern standards, and optimizing campus resources, he has shaped institutions into recognized centers of academic distinction and cultural prestige.',
      keyPoints: [
        'Establishment of comprehensive academic quality benchmarks',
        'Continuous institutional review and modernized administrative workflows',
        'Transparent parent-educator communication protocols',
        'Strategic allocation of infrastructure and technological learning assets',
      ],
      quote:
        'True institutional strength is forged when administrative integrity and academic passion unite around the welfare of students.',
    },
    {
      id: 'teaching-learning',
      title: 'Strengthening Teaching-Learning Practices',
      icon: 'psychology',
      pillar: 'Pedagogical Excellence',
      shortDesc:
        'Transitioning classrooms from rote instruction to dynamic, experiential, and inquiry-led learning frameworks.',
      fullDesc:
        'Under Mr. Puri’s stewardship, pedagogy centers upon conceptual clarity and active student participation. By integrating multimedia classrooms, hands-on science laboratories, and structured formative evaluations, students cultivate analytical thinking and enduring intellectual curiosity.',
      keyPoints: [
        'Inquiry-based and experiential learning modules across all grades',
        'Integration of interactive digital classroom displays and modern labs',
        'Differentiated instruction tailored to diverse student learning paces',
        'Emphasis on conceptual problem-solving over rote memorization',
      ],
      quote:
        'When teaching ignites genuine curiosity, learning transforms from a classroom obligation into a lifelong devotion.',
    },
    {
      id: 'teacher-mentoring',
      title: 'Teacher Mentoring & Professional Development',
      icon: 'supervisor_account',
      pillar: 'Faculty Empowerment',
      shortDesc:
        'Empowering educators with continuous professional development, instructional workshops, and empathetic mentorship.',
      fullDesc:
        'Believing that inspired educators are the bedrock of great schools, Mr. Puri actively mentors faculty members. He fosters a supportive culture featuring continuous pedagogy workshops, peer review exchanges, and emotional intelligence training to cultivate masterful, compassionate teachers.',
      keyPoints: [
        'Regular pedagogy seminars conducted by distinguished educational leaders',
        'Structured peer observation and constructive feedback frameworks',
        'Recognition programs that celebrate instructional creativity and dedication',
        'Mental wellness and work-life balance initiatives for school staff',
      ],
      quote:
        'Empowering a single teacher sets off a perpetual chain reaction of inspiration that illuminates hundreds of young minds.',
    },
    {
      id: 'discipline-values',
      title: 'Discipline and Value-Based Education',
      icon: 'verified_user',
      pillar: 'Moral Foundation',
      shortDesc:
        'Instilling ethical conduct, mutual respect, self-discipline, and enduring moral values in everyday school life.',
      fullDesc:
        'Viewing discipline as self-mastery rather than mere conformity, Mr. Puri interlaces moral values (Sanskar) into daily school routines. Through reflective assemblies, value-orientation workshops, and exemplary teacher conduct, students learn integrity, empathy, and social responsibility.',
      keyPoints: [
        'Daily value-orientation assemblies reflecting ethical principles and culture',
        'Cultivation of self-discipline through peer responsibility and honor codes',
        'Positive behavioral reinforcement and compassionate pastoral care',
        'Instilling deep respect for elders, cultural roots, and national service',
      ],
      quote:
        'Knowledge without moral character is hazardous; true education builds intellect alongside an upright conscience.',
    },
    {
      id: 'holistic-development',
      title: 'Holistic Development of Students',
      icon: 'spa',
      pillar: 'All-Round Growth',
      shortDesc:
        'Nurturing physical vitality, creative expression, emotional resilience, and civic consciousness alongside academics.',
      fullDesc:
        'Mr. Puri champion’s a holistic philosophy where sports fields, performing arts studios, debating platforms, and community service projects are given equal weight with academic study. This comprehensive balance ensures learners develop into self-assured, versatile individuals ready for the world.',
      keyPoints: [
        'Robust sports facilities and training in athletics, basketball, and yoga',
        'Vibrant co-curricular clubs spanning oratory, drama, arts, and robotics',
        'Adolescent counseling, emotional intelligence, and stress-resilience programs',
        'Student council leadership opportunities fostering governance and teamwork',
      ],
      quote:
        'A resilient mind, a healthy body, and an empathetic heart are the hallmarks of a complete human being.',
    },
    {
      id: 'progressive-innovation',
      title: 'Encouraging Innovation & Progressive Education',
      icon: 'lightbulb',
      pillar: 'Future Readiness',
      shortDesc:
        'Harnessing modern educational technology, computer applications, and 21st-century problem-solving skills.',
      fullDesc:
        'Leveraging his qualification in Computer Applications (PGDCA), Mr. Puri is a forward-thinking advocate for educational technology. He champions early digital literacy, coding labs, environmental science fairs, and sustainable innovation projects that prepare students for global challenges.',
      keyPoints: [
        'Advanced computer laboratories and structured digital literacy courses',
        'Annual science, technology, and sustainability exhibitions',
        'Project-based learning centered around community problem-solving',
        'Fostering analytical thinking, adaptability, and technological discernment',
      ],
      quote:
        'Progressive education does not abandon our timeless roots; it employs modern innovation to help those roots flourish.',
    },
    {
      id: 'culture-of-excellence',
      title: 'Building a Culture of Excellence & Continuous Improvement',
      icon: 'trending_up',
      pillar: 'Institutional Striving',
      shortDesc:
        'Creating an institutional ethos where students and educators continuously surpass their personal bests.',
      fullDesc:
        'Excellence is sustained as a consistent habit rather than a sporadic achievement. Mr. Puri instituted transparent assessment rubrics, merit awards, and collaborative goal-setting programs that encourage every child and faculty member to strive for continuous growth.',
      keyPoints: [
        'Data-informed learning metrics to offer targeted student support',
        'Annual awards ceremony celebrating academic, artistic, and athletic triumphs',
        'Collaborative school improvement committees involving teachers and parents',
        'Continuous refinement of scholastic standards and safety standards',
      ],
      quote:
        'Excellence is not an accident—it is the gradual result of always striving to do better today than we did yesterday.',
    },
  ];

  // Core philosophy pillars for the Vision interactive section
  readonly philosophyPillars = [
    {
      title: 'EDUCATE',
      tagline: 'Intellectual Clarity & Scholastic Rigor',
      icon: 'menu_book',
      summary:
        'Equipping young minds with strong fundamentals, critical inquiry, and analytical competence that serve as lifelong intellectual anchors.',
      principles: [
        'Solid grounding in sciences, humanities, mathematics, and languages',
        'Encouraging questions and open investigative inquiry',
        'Developing articulate oral and written communication skills',
      ],
    },
    {
      title: 'EMPOWER',
      tagline: 'Teacher Autonomy & Student Confidence',
      icon: 'psychology_alt',
      summary:
        'Providing teachers with the pedagogical freedom to innovate, while cultivating in students the self-belief required to overcome challenges.',
      principles: [
        'Confidence-building through public speaking, debates, and athletics',
        'Continuous teacher professional development and emotional mentoring',
        'Instilling leadership agency and cooperative teamwork early in life',
      ],
    },
    {
      title: 'TRANSFORM',
      tagline: 'Value-Based Sanskar & Moral Character',
      icon: 'volunteer_activism',
      summary:
        'Instilling the profound principles of Sampark (Connection), Seva (Selfless Service), and Sanskar (Values) to nurture ethical, responsible citizens.',
      principles: [
        'Community engagement and empathy for underprivileged sections',
        'Respect for cultural traditions alongside modern progressive outlook',
        'Personal accountability, honesty, and emotional maturity',
      ],
    },
    {
      title: 'A BRIGHTER TOMORROW',
      tagline: 'Nation-Building & Global Readiness',
      icon: 'wb_sunny',
      summary:
        'Preparing versatile, compassionate individuals equipped to contribute meaningfully to Indian society and the global community.',
      principles: [
        'Awareness of environmental stewardship and social justice',
        'Preparedness for competitive higher education and vocational frontiers',
        'A lifelong commitment to ethical citizenship and service to humanity',
      ],
    },
  ];

  // Campus & Educational environment highlights
  readonly campusPillars = [
    {
      title: 'Modern Learning Infrastructure',
      subtitle: 'Modern Jagat Jyoti Sr. Sec. School',
      desc: 'Thoughtfully designed smart classrooms, well-ventilated learning spaces, and comprehensive libraries that promote quiet reflection and collaborative research.',
      icon: 'architecture',
      badge: 'Academic Spaces',
    },
    {
      title: 'Science & Computer Laboratories',
      subtitle: 'Technological Excellence',
      desc: 'High-specification computer labs backed by Mr. Puri’s PGDCA background, alongside physics, chemistry, and biology labs fostering hands-on empirical experimentation.',
      icon: 'science',
      badge: 'Practical Learning',
    },
    {
      title: 'Sports Grounds & Fitness Facilities',
      subtitle: 'Physical Resilience',
      desc: 'Sprawling outdoor sports facilities for cricket, football, volleyball, athletics, and dedicated indoor arenas for yoga and table tennis.',
      icon: 'sports_cricket',
      badge: 'Physical Vitality',
    },
    {
      title: 'Cultural Hall & Seminar Spaces',
      subtitle: 'Sanskar & Community',
      desc: 'A vibrant auditorium for value assemblies, drama, classical music, Bharat Vikas Parishad cultural competitions, and parent-educator conferences.',
      icon: 'theater_comedy',
      badge: 'Creative Arts',
    },
  ];

  ngOnInit(): void {
    // Reset any legacy local override so the new permanent official picture is loaded
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sumeet_puri_custom_photo');
        if (saved && saved.startsWith('data:')) {
          this.profilePhotoUrl.set(saved);
        } else {
          this.profilePhotoUrl.set(this.OFFICIAL_PHOTO);
          localStorage.removeItem('sumeet_puri_custom_photo');
        }
      } catch {
        // ignore
      }

      const handleHash = () => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          this.activeSection.set(hash);
        }
      };
      window.addEventListener('hashchange', handleHash);
      handleHash();

      // Live Scroll Progress Tracking with high-performance requestAnimationFrame throttling
      let scrollId: number | null = null;
      const onScroll = () => {
        if (scrollId !== null) return;
        scrollId = requestAnimationFrame(() => {
          const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
          this.scrollProgress.set(Math.min(100, Math.max(0, scrolled)));
          scrollId = null;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();

      // --- INTERACTIVE STARDUST CANVAS PARTICLE TRAIL SYSTEM (ULTRA-HIGH PERFORMANCE OPTIMIZED) ---
      setTimeout(() => {
        const canvas = document.getElementById('hero-stardust-canvas') as HTMLCanvasElement;
        const heroSection = document.getElementById('hero');
        if (!canvas || !heroSection) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = heroSection.clientWidth;
        let height = canvas.height = heroSection.clientHeight;

        let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
        window.addEventListener('resize', () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            if (!heroSection || !canvas) return;
            width = canvas.width = heroSection.clientWidth;
            height = canvas.height = heroSection.clientHeight;
          }, 150);
        }, { passive: true });

        interface Particle {
          x: number;
          y: number;
          vx: number;
          vy: number;
          size: number;
          color: string;
          alpha: number;
          decay: number;
          sparkle: boolean;
        }

        const particles: Particle[] = [];
        const goldTones = [
          'rgba(212, 175, 55, ',   // Regal Gold
          'rgba(247, 224, 122, ',  // Light Gold
          'rgba(251, 240, 185, ',  // Shimmering Gold
          'rgba(143, 108, 22, ',   // Deep Bronze Gold
          'rgba(255, 255, 255, '   // Diamond Sparkle White
        ];

        // Track mouse position on the hero section
        let mouseX: number | null = null;
        let mouseY: number | null = null;
        let lastMouseX: number | null = null;
        let lastMouseY: number | null = null;

        heroSection.addEventListener('mousemove', (e) => {
          const rect = heroSection.getBoundingClientRect();
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;

          // Spawn stardust trails based on mouse speed, capped at small numbers
          if (lastMouseX !== null && lastMouseY !== null && particles.length < 45) {
            const distance = Math.hypot(mouseX - lastMouseX, mouseY - lastMouseY);
            const count = Math.min(3, Math.floor(distance / 8));
            for (let i = 0; i < count; i++) {
              const ratio = i / count;
              const interpolatedX = lastMouseX + (mouseX - lastMouseX) * ratio;
              const interpolatedY = lastMouseY + (mouseY - lastMouseY) * ratio;
              particles.push({
                x: interpolatedX + (Math.random() * 6 - 3),
                y: interpolatedY + (Math.random() * 6 - 3),
                vx: (Math.random() * 2 - 1) * 0.35,
                vy: (Math.random() * 2 - 1) * 0.35 - 0.25, // Drifts upwards slightly
                size: Math.random() * 2.0 + 0.6,
                color: goldTones[Math.floor(Math.random() * goldTones.length)],
                alpha: 1.0,
                decay: Math.random() * 0.02 + 0.015,
                sparkle: Math.random() > 0.4
              });
            }
          }

          lastMouseX = mouseX;
          lastMouseY = mouseY;
        }, { passive: true });

        heroSection.addEventListener('mouseleave', () => {
          mouseX = null;
          mouseY = null;
          lastMouseX = null;
          lastMouseY = null;
        }, { passive: true });

        // Background ambient golden dust emitter (peaceful drifting, ultra-lightweight)
        const spawnAmbientDust = () => {
          if (particles.length < 25 && Math.random() < 0.12) {
            particles.push({
              x: Math.random() * width,
              y: height + 10,
              vx: (Math.random() * 1.5 - 0.75) * 0.2,
              vy: -(Math.random() * 1.5 + 0.4) * 0.2,
              size: Math.random() * 1.4 + 0.4,
              color: goldTones[Math.floor(Math.random() * (goldTones.length - 1))],
              alpha: Math.random() * 0.35 + 0.1,
              decay: Math.random() * 0.0035 + 0.0015,
              sparkle: Math.random() > 0.6
            });
          }
        };

        const draw = () => {
          ctx.clearRect(0, 0, width, height);

          // Spawn quiet ambient stardust
          spawnAmbientDust();

          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;

            // Sparkle logic
            let finalAlpha = p.alpha;
            if (p.sparkle) {
              finalAlpha = p.alpha * (0.45 + Math.sin(Date.now() * 0.012 + i) * 0.35);
            }

            if (p.alpha <= 0 || p.x < 0 || p.x > width || p.y < -10) {
              particles.splice(i, 1);
              continue;
            }

            const cleanAlpha = Math.max(0, Math.min(1, finalAlpha));

            // HIGH PERFORMANCE REPLACEMENT FOR SHADOW BLUR (DUAL LAYER FILLED CORE)
            // Outer semi-transparent ambient halo
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = p.color + (cleanAlpha * 0.14) + ')';
            ctx.fill();

            // Inner high-opacity solid star core
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + cleanAlpha + ')';
            ctx.fill();
          }

          requestAnimationFrame(draw);
        };

        draw();
      }, 500);

      // Live Section Observer for active navigation highlighting
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.activeSection.set(entry.target.id);
              }
            });
          },
          {
            rootMargin: '-20% 0px -55% 0px',
            threshold: 0.1,
          }
        );

        setTimeout(() => {
          this.navSections.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
          });
        }, 300);

        // Bidirectional Luxury Scroll Animation Observer (Triggers on scroll down AND scroll up)
        const animObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
              } else {
                // When scrolling away (both up and down), remove is-revealed so it animates every time it returns
                entry.target.classList.remove('is-revealed');
              }
            });
          },
          {
            rootMargin: '0px 0px -30px 0px',
            threshold: 0.05,
          }
        );

        const setupAnimElements = () => {
          const animElements = document.querySelectorAll(
            '.lux-reveal, .lux-reveal-left, .lux-reveal-right, .lux-reveal-scale, .lux-sheen, .lux-border-glow, .lux-gold-aura, .lux-gold-divider, .lux-box, .lux-beam-card, .word-split'
          );
          animElements.forEach((el) => animObserver.observe(el));
        };

        setTimeout(setupAnimElements, 100);
        setTimeout(setupAnimElements, 450);
      }
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Photo handlers
  onImageError(): void {
    if (!this.imageLoadFailed()) {
      this.imageLoadFailed.set(true);
      this.profilePhotoUrl.set('/images/sumeet_puri_official.jpg');
    }
  }

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          this.profilePhotoUrl.set(dataUrl);
          this.imageLoadFailed.set(false);
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem('sumeet_puri_custom_photo', dataUrl);
            } catch {
              // local storage size limit
            }
          }
          this.copiedToast.set('Profile photograph updated successfully!');
          setTimeout(() => {
            this.copiedToast.set(null);
          }, 3500);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  resetDefaultPhoto(): void {
    this.profilePhotoUrl.set(this.OFFICIAL_PHOTO);
    this.imageLoadFailed.set(false);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('sumeet_puri_custom_photo');
      } catch {
        // ignore
      }
    }
    this.copiedToast.set('Reset to official portrait of Mr. Sumeet Puri');
    setTimeout(() => this.copiedToast.set(null), 3000);
  }

  // Navigation handlers
  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);
    this.isMobileMenuOpen.set(false);
    if (typeof document !== 'undefined') {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  // Contribution modal handlers
  openContributionModal(item: ContributionItem): void {
    this.selectedContribution.set(item);
  }

  closeContributionModal(): void {
    this.selectedContribution.set(null);
  }

  // Bio Modal
  openBioModal(): void {
    this.showBioModal.set(true);
  }

  closeBioModal(): void {
    this.showBioModal.set(false);
  }

  // Copy to clipboard helper
  copyToClipboard(text: string, label: string): void {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.copiedToast.set(`Copied ${label} to clipboard!`);
        setTimeout(() => {
          this.copiedToast.set(null);
        }, 3000);
      });
    }
  }

  // Contact Form submit handler
  onSubmitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate authentic submission with feedback
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.contactSubmitted.set(true);
      const name = this.contactForm.get('fullName')?.value || 'Friend';
      this.submissionSuccessMessage.set(
        `Thank you, ${name}. Your message has been received with gratitude. The office of Mr. Sumeet Puri will review your inquiry and connect with you shortly.`
      );
    }, 1000);
  }

  resetContactForm(): void {
    this.contactForm.reset({
      inquiryType: 'Academic Collaboration',
    });
    this.contactSubmitted.set(false);
    this.submissionSuccessMessage.set('');
  }
}
