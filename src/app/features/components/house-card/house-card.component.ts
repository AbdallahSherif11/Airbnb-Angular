// house-card.component.ts
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-house-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './house-card.component.html',
  styleUrls: ['./house-card.component.css']
})
export class HouseCardComponent {
  @Input() images: string[] = [];
  @Input() title: string = '';
  @Input() hostType: string = '';
  @Input() dateRange: string = '';
  @Input() price: number = 0;
  @Input() rating: number = 0;
  @Input() isGuestFavorite: boolean = false;
  @Input() houseId: number = 0;
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;
  private router = inject(Router);
  currentSlide = 0;
  isInWishlist = false;
  imageLoaded = false;
  onImageLoad() {
    this.imageLoaded = true;
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  toggleWishlist(): void {
    this.isInWishlist = !this.isInWishlist;
  }

  navigateToDetails(): void {
    // You'll need to pass the houseId to your card component
    this.router.navigate(['/houses', this.houseId]);
  }
}