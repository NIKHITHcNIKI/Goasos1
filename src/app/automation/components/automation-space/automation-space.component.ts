import { Component, OnDestroy, OnInit } from '@angular/core';
import { Box, Interest, VideoBox } from '../../../common/models';
import { AutomationDataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { GoasosTitleService } from '../../../common/services/title.service';
import { MetaService } from '../../../common/services/meta.service';
import { SpaceHomes } from '../../models';
import { AnalyticsService } from '../../../common/services/analytics.service';
import { ContactLocationService } from '../../../common/services/contact-location.service';
import { SchemaService } from '../../../common/services/schema.service';
import { SpaceAutomationSchema } from '../../../common/models/schema';

@Component({
  selector: 'app-automation-space',
  templateUrl: './automation-space.component.html',
  styleUrl: './automation-space.component.scss',
  providers: [SchemaService]
})
export class AutomationSpaceComponent implements OnInit, OnDestroy {

  public others: Interest[] = [
    { h3: 'Home Automation Solutions:', p: 'Transform your living space with intelligent systems that enhance comfort, security, and energy efficiency.', cta: 'Make Your Home Smarter', link: 'smart-home-automation-solutions' },
    { h3: 'Security Cameras & Centralized Surveillance:', p: 'Protect your assets and ensure security with advanced video surveillance systems designed for residential, commercial and industrial environments', cta: 'Upgrade Your Security', link: 'cctv-video-surveillance-security-cameras' },
    { h3: 'Solar Energy Solutions:', p: 'Optimize energy consumption with renewable solutions for homes and businesses.', cta: 'Go Green', link: 'solar-energy-solutions' },
  ];

  public homes: SpaceHomes[] = [
    { h3: 'Apartments and Flats', p: 'Maximize limited space in urban apartments across Bangalore, Bhubaneswar and Cuttack.' },
    { h3: 'Independent Houses', p: 'Create multi-purpose rooms in traditional homes, transforming guest rooms into home offices or children\'s rooms into study areas.' },
    { h3: 'Studio Living', p: 'Turn a single room into a functional space for working, entertaining, and sleeping with our comprehensive solutions.' },
    { h3: 'Growing Families', p: 'Adapt your existing home to accommodate new family members without the need for costly renovation or relocation.' },
  ];

  constructor(title: GoasosTitleService,
    meta: MetaService,
    public analytics: AnalyticsService,
    private schemaService: SchemaService,
    public cont: ContactLocationService) {
    title.UpdateTitle = 'Space-Saving Furniture & Solutions | Bangalore, Bhubaneswar & Cuttack';
    meta.Description = 'Discover compact, modular, and multi-functional furniture for homes & offices in Bangalore, Bhubaneswar & Cuttack. Explore foldable beds, smart desks & innovative storage solutions. Upgrade your home today!';
    meta.Keywords = 'space automation, space automation in bangalore, space automation in indiranagar, space automation in bengaluru, space automation in bhubaneshwar, space automation in cuttack, , space automation in usa';
  }
  ngOnInit(): void {
    this.schemaService.UpdateSchema(new SpaceAutomationSchema());
  }
  ngOnDestroy(): void {
    this.schemaService.RemoveSchema();
  }

  public CaptureClicks(cta: string): void {
    this.analytics.HomeCtaEvent(cta);
  }

  public solutions = [
    {
      title: 'Bed with Storage and iDesk Combination',
      subtitle: 'The ultimate home office solution for compact spaces',
      description: 'Combines a bed, foldable desk, and under-bed storage (ideal for laptops, books, or seasonal clothing).',
      sizes: ['Single bed with iDesk (90cm x 190cm)', 'Queen size with iDesk (150cm x 200cm)', 'King size with iDesk (180cm x 200cm)']
    },
    {
      title: 'Multi-Functional Bed with Storage',
      subtitle: 'Maximize bedroom space with smart storage solutions',
      description: 'Our space-saving beds with integrated storage are engineered to eliminate the need for additional storage furniture, freeing up valuable floor space in your bedroom.',
      sizes: ['Single bed with storage (90cm x 190cm)', 'Queen size with storage (150cm x 200cm)', 'King size with storage (180cm x 200cm)']
    },
    {
      title: 'Bed with Storage and Sofa Combination',
      subtitle: 'Three-in-one solution: bed, storage, and seating',
      description: 'Turns into a stylish sofa by day, becomes a cozy bed by night—with smart storage built-in.',
      sizes: ['Single bed with sofa (90cm x 190cm)', 'Queen size with sofa (150cm x 200cm)', 'King size with sofa (180cm x 200cm)']
    }
  ];

  public getServiceImage(index: number): string {
    const images = [
      'url(/images/furniture/bed-storage-desk.png)',
      'url(/images/furniture/multifunctional-bed-storage.png)',
      'url(/images/furniture/sofa-bed-storage.png)'
    ];
    return images[index % images.length];
  }

  public getSolutionTitle(index: number): string {
    return this.solutions[index]?.title || '';
  }

  public getSolutionSubtitle(index: number): string {
    return this.solutions[index]?.subtitle || '';
  }

  public getSolutionDescription(index: number): string {
    return this.solutions[index]?.description || '';
  }

  public getSolutionSizes(index: number): string[] {
    return this.solutions[index]?.sizes || [];
  }

  public getHomeIcon(homeType: string): string {
    const icons: { [key: string]: string } = {
      'Apartments and Flats': '🏙️',
      'Independent Houses': '🏠',
      'Studio Living': '🎨',
      'Growing Families': '👨‍👩‍👧‍👦'
    };
    return icons[homeType] || '🏠';
  }
}
