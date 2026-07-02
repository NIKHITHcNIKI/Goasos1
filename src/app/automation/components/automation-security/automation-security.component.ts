import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutomationDataService } from '../../services/data.service';
import { Box, Interest } from '../../../common/models';
import { GoasosTitleService } from '../../../common/services/title.service';
import { MetaService } from '../../../common/services/meta.service';
import { SecurityTypes } from '../../models';
import { AnalyticsService } from '../../../common/services/analytics.service';
import { ContactLocationService } from '../../../common/services/contact-location.service';
import { HelperService } from '../../../common/services';
import { SchemaService } from '../../../common/services/schema.service';
import { SecurityAutomationSchema } from '../../../common/models/schema';

@Component({
  selector: 'app-automation-security',
  templateUrl: './automation-security.component.html',
  styleUrl: './automation-security.component.scss',
  providers: [HelperService, SchemaService]
})
export class AutomationSecurityComponent implements OnInit, OnDestroy {

  public others: Interest[] = [
    { h3: 'Home Automation Solutions:', p: 'Transform your living space with intelligent systems that enhance comfort, security, and energy efficiency.', cta: 'Make Your Home Smarter', link: 'smart-home-automation-solutions' },
    { h3: 'Office Automation Services:', p: 'Streamline workplace operations with smart systems that boost productivity and strengthen security.', cta: 'Optimize Your Office', link: 'smart-office-automation-solutions' },
    { h3: 'Industrial Automation Systems:', p: 'Optimize your industrial operations with robust, cloud-based solutions.', cta: 'Boost Production', link: 'industrial-automation-solutions' },
  ];

  public types: SecurityTypes[] = [
    { title: 'IP Security Cameras', points: ['High-definition video (HD, 4K)', 'Night vision and motion sensors', 'Weather-resistant construction for outdoor use', 'Network integration for centralized monitoring'] },
    { title: 'Solar-Powered CCTV Cameras', points: ['Independent, energy-efficient surveillance', 'Ideal for outdoor & remote installations', 'Works even during power outages', 'Lower operating costs than traditional systems'] },
    { title: 'Smart Surveillance Technology', points: ['AI-powered motion detection', 'Object recognition capabilities', 'Automated tracking of suspicious activities', 'Intelligent alert filtering'] },
    { title: 'App-Controlled Surveillance', points: ['Real-time mobile alerts on movement detection', 'View multiple camera feeds from anywhere', 'Centralized control via easy-to-use dashboard'] },
    { title: 'Centralized Video Management', points: ['Monitor multiple sites from one control panel', 'Record, replay, and analyze video feeds', 'Scalable from small homes to large industrial setups'] },
  ];
  constructor(title: GoasosTitleService,
    meta: MetaService,
    public analytics: AnalyticsService,
    public helper: HelperService,
    private schemaService: SchemaService,
    public cont: ContactLocationService) {
    title.UpdateTitle = 'Centralized Video Surveillance Systems | CCTV Installation Services in Bangalore, Bhubaneswar & Cuttack';
    meta.Description = 'Secure your spaces with solar-powered CCTV camera systems and centralized video surveillance. Expert installation across Bangalore, Bhubaneswar and Cuttack. Trusted security for homes, offices & industries. Contact us today!';
    meta.Keywords = 'security automation, security automation in bangalore, security automation in indiranagar, security automation in bengaluru, security automation in bhubaneshwar, security automation in cuttack, , security automation in usa';
  }
  ngOnInit(): void {
    this.schemaService.UpdateSchema(new SecurityAutomationSchema());
  }
  ngOnDestroy(): void {
    this.schemaService.RemoveSchema();
  }

  public CaptureClicks(cta: string): void {
    this.analytics.HomeCtaEvent(cta);
  }

  public getServiceImage(index: number): string {
    const images = [
      'url(/images/security/service-ip-cameras-office.png)',
      'url(/images/security/service-solar-cctv.png)',
      'url(/images/security/service-ai-analytics.png)',
      'url(/images/security/service-control-room.png)',
      'url(/images/security/service-monitoring-center.png)'
    ];
    return images[index % images.length];
  }
}
