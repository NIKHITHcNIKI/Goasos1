import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('nav') private nav!: ElementRef<HTMLElement>;

  public menuOpen = false;
  public activeAccordion: string | null = null;

  public ShowHeaderMenu(): void {
    this.menuOpen = true;
    this.nav.nativeElement.classList.add('show');
  }

  public toggleAccordion(accordion: string): void {
    this.activeAccordion = this.activeAccordion === accordion ? null : accordion;
  }

  public closeMenu(): void {
    this.menuOpen = false;
    this.activeAccordion = null;
  }

  @HostListener('document:click', ['$event'])
  private HideHeaderMenu(event: MouseEvent): void {
    const clickedElement = (event.target as HTMLElement);
    const hamButton = this.closestParent(clickedElement, 'button.ham');
    const mobileMenu = this.closestParent(clickedElement, '.mobile-menu');

    if (!hamButton && !mobileMenu && this.menuOpen) {
      this.menuOpen = false;
      this.activeAccordion = null;
      if (this.nav) {
        this.nav.nativeElement.classList.remove('show');
      }
    }
  }

  private closestParent(element: HTMLElement, selector: string): HTMLElement | null {
    let parent: HTMLElement | null = element.parentElement;

    while (parent) {
      if (parent.matches(selector)) {
        return parent;
      }
      parent = parent.parentElement;
    }

    return null;
  }
}
