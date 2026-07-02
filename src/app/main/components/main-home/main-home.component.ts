import { Component, OnDestroy, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { GoasosTitleService } from '../../../common/services/title.service';
import { MetaService } from '../../../common/services/meta.service';
import { AnalyticsService } from '../../../common/services/analytics.service';
import { ContactLocationService } from '../../../common/services/contact-location.service';
import { SchemaService } from '../../../common/services/schema.service';
import { HomeSchema } from '../../../common/models/schema';

interface StatItem {
  label: string;
  target: number;
  suffix: string;
  current: number;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

interface ProjectItem {
  title: string;
  category: string;
  image: string;
  location: string;
}

interface ServiceItem {
  title: string;
  description: string;
  image: string;
  route: string;
  cta: string;
  analyticsKey: string;
}

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss',
  providers: [SchemaService]
})
export class MainHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  public activeTestimonial = 0;
  private testimonialInterval?: ReturnType<typeof setInterval>;
  private observer?: IntersectionObserver;
  private countersStarted = false;

  public stats: StatItem[] = [
    { label: 'Projects Completed', target: 500, suffix: '+', current: 0 },
    { label: 'Happy Clients', target: 250, suffix: '+', current: 0 },
    { label: 'Years of Experience', target: 15, suffix: '+', current: 0 },
    { label: 'Service Locations', target: 3, suffix: '', current: 0 },
  ];

  public whyChooseUs = [
    { icon: 'support', title: '24/7 Support', description: 'Round-the-clock technical assistance and emergency response for all automation and power systems.' },
    { icon: 'certified', title: 'Certified Engineers', description: 'Industry-certified professionals with deep expertise in automation, power systems, and software consulting.' },
    { icon: 'response', title: 'Fast Response', description: 'Rapid deployment and quick turnaround on service requests across Bangalore, Bhubaneswar, and Cuttack.' },
    { icon: 'reliable', title: 'Reliable Service', description: 'Proven track record delivering dependable solutions for homes, offices, and industrial facilities.' },
    { icon: 'quality', title: 'Quality Assurance', description: 'Rigorous quality standards and comprehensive testing on every project we undertake.' },
  ];

  public testimonials: Testimonial[] = [
    {
      name: 'Rajesh Kumar',
      role: 'Operations Director',
      company: 'Manufacturing Firm, Bangalore',
      text: 'GOASOS transformed our industrial facility with seamless automation integration. Their engineering team delivered on time with exceptional quality and ongoing support.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Priya Sharma',
      role: 'Facility Manager',
      company: 'Corporate Office, Bhubaneswar',
      text: 'From smart office automation to security systems, GOASOS provided end-to-end solutions that exceeded our expectations. Highly professional and responsive team.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'Anil Patnaik',
      role: 'Plant Head',
      company: 'Industrial Unit, Cuttack',
      text: 'Their power system solutions and industrial automation expertise helped us reduce operational costs significantly. A trusted partner for engineering excellence.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
  ];

  public projects: ProjectItem[] = [
    { title: 'Industrial Power Integration', category: 'Power Systems', image: '/images/services/industrial-automation-hero.png', location: 'Bangalore' },
    { title: 'Smart Factory Automation', category: 'Industrial Automation', image: '/images/services/industrial-automation-hero.png', location: 'Bhubaneswar' },
    { title: 'Solar Energy Deployment', category: 'Renewable Energy', image: '/images/services/solar-energy-hero.png', location: 'Cuttack' },
    { title: 'Electrical Panel Upgrade', category: 'Electrical Engineering', image: '/images/services/industrial-automation-hero.png', location: 'Bangalore' },
    { title: 'Security Surveillance Network', category: 'Security Systems', image: '/images/services/security-surveillance-hero.png', location: 'Bhubaneswar' },
    { title: 'Office Automation Suite', category: 'Smart Office', image: '/images/services/office-automation-hero.png', location: 'Cuttack' },
  ];

  public consultingServices = [
    { number: '01', title: 'Banking & Financial Services', description: 'We help financial institutions leverage automation to streamline operations, enhance security, and improve customer experiences.', image: '/images/services/banking-services-hero.png' },
    { number: '02', title: 'Capital Markets Solutions', description: 'Leverage our expertise in trade automation, risk management, and data analytics to optimize operations in capital markets.', image: '/images/services/capital-markets-hero.png' },
    { number: '03', title: 'Data & AI Services', description: 'Transform raw data into actionable insights with data strategy development, machine learning, predictive analytics, and business intelligence.', image: '/images/services/data-ai-services-hero.png' },
  ];

  public services: ServiceItem[] = [
    {
      title: 'Home Automation Solutions',
      description: 'Transform your living space with intelligent systems that enhance comfort, security, and energy efficiency.',
      image: '/images/services/home-automation-hero.png',
      route: 'smart-home-automation-solutions',
      cta: 'Make your Home Smarter',
      analyticsKey: 'home_smart_home'
    },
    {
      title: 'Office Automation Solutions',
      description: 'Streamline workplace operations with smart systems that boost productivity and strengthen security.',
      image: '/images/services/office-automation-hero.png',
      route: 'smart-office-automation-solutions',
      cta: 'Optimize Your Office',
      analyticsKey: 'home_automation_office'
    },
    {
      title: 'Industrial Automation Systems',
      description: 'Optimize your industrial operations with robust, cloud-based automation solutions.',
      image: '/images/services/industrial-automation-hero.png',
      route: 'industrial-automation-solutions',
      cta: 'Boost Production',
      analyticsKey: 'home_automation_industry'
    },
    {
      title: 'Security & Surveillance',
      description: 'Protect your assets with advanced video surveillance systems for residential, commercial, and industrial environments.',
      image: '/images/services/security-surveillance-hero.png',
      route: 'cctv-video-surveillance-security-cameras',
      cta: 'Upgrade Your Security',
      analyticsKey: 'home_automation_security'
    },
    {
      title: 'Space-Saving Furniture',
      description: 'Maximize functionality in limited spaces with innovative multi-functional furniture and smart storage solutions.',
      image: '/images/space-saving-automation-video-thumbnail.jpg',
      route: 'space-saving-furniture-solutions',
      cta: 'Optimize Your Space Today',
      analyticsKey: 'home_automation_space'
    },
    {
      title: 'Solar Energy Solutions',
      description: 'Optimize energy consumption with renewable solar solutions for homes and businesses.',
      image: '/images/services/solar-energy-hero.png',
      route: 'solar-energy-solutions',
      cta: 'Go Green',
      analyticsKey: 'home_go_green'
    },
  ];

  constructor(
    title: GoasosTitleService,
    meta: MetaService,
    public analytics: AnalyticsService,
    public cont: ContactLocationService,
    private schemaService: SchemaService,
    private el: ElementRef,
    private zone: NgZone
  ) {
    title.UpdateTitle = 'Automation Solutions Provider | Automation Services Company in India | GOAS';
    meta.Description = 'Empowering businesses with smart home, office, industrial and energy automation along with expert software consulting in Banking, Capital Markets, and Data & AI - serving Bangalore, Bhubaneswar, and Cuttack.';
    meta.Keywords = 'goasos home page, enter the world of automation, enter the world of consulting, your concern is our innovation';
  }

  ngOnDestroy(): void {
    this.schemaService.RemoveSchema();
    if (this.testimonialInterval) {
      clearInterval(this.testimonialInterval);
    }
    this.observer?.disconnect();
  }

  ngOnInit(): void {
    this.schemaService.UpdateSchema(new HomeSchema());
  }

  ngAfterViewInit(): void {
    this.setupScrollReveal();
    this.startTestimonialCarousel();
  }

  public CaptureClicks(cta: string): void {
    this.analytics.HomeCtaEvent(cta);
  }

  public scrollToServices(): void {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    this.analytics.HomeCtaEvent('home_explore_services');
  }

  public setTestimonial(index: number): void {
    this.activeTestimonial = index;
  }

  private startTestimonialCarousel(): void {
    this.testimonialInterval = setInterval(() => {
      this.zone.run(() => {
        this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
      });
    }, 6000);
  }

  private setupScrollReveal(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (entry.target.classList.contains('stats-section') && !this.countersStarted) {
              this.countersStarted = true;
              this.animateCounters();
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = this.el.nativeElement.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el: Element) => this.observer?.observe(el));
  }

  private animateCounters(): void {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    this.stats.forEach((stat) => {
      const increment = stat.target / steps;
      let step = 0;
      const timer = setInterval(() => {
        step++;
        stat.current = Math.min(Math.round(increment * step), stat.target);
        if (step >= steps) {
          stat.current = stat.target;
          clearInterval(timer);
        }
      }, interval);
    });
  }
}
