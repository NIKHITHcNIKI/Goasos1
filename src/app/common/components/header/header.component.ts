import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @ViewChild('nav') private nav!: ElementRef<HTMLElement>;

  public menuOpen = false;
  public solutionsOpen = false;

  public ToggleHeaderMenu(): void {
    this.menuOpen = !this.menuOpen;

    if (!this.menuOpen) {
      this.solutionsOpen = false;
    }

    this.SyncBodyScroll();
  }

  public CloseHeaderMenu(): void {
    this.menuOpen = false;
    this.solutionsOpen = false;
    this.SyncBodyScroll();
  }

  public ToggleSolutions(event: Event): void {
    event.stopPropagation();
    this.solutionsOpen = !this.solutionsOpen;
  }

  private SyncBodyScroll(): void {
    if (typeof document === 'undefined') {
      return;
    }

    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  @HostListener('document:click', ['$event'])
  private HandleDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen || !this.nav) {
      return;
    }

    const target = event.target as HTMLElement;
    const clickedInsideNav = this.nav.nativeElement.contains(target);
    const clickedHam = !!this.closestParent(target, 'button.ham');

    if (!clickedInsideNav && !clickedHam) {
      this.CloseHeaderMenu();
    }
  }

  @HostListener('document:keydown.escape')
  private HandleEscape(): void {
    if (this.menuOpen) {
      this.CloseHeaderMenu();
    }
  }

  private closestParent(element: HTMLElement, selector: string): HTMLElement | null {
    let current: HTMLElement | null = element;

    while (current) {
      if (current.matches && current.matches(selector)) {
        return current;
      }
      current = current.parentElement;
    }

    return null;
  }
}
