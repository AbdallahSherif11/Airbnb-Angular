import { Component, inject, AfterViewInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { HouseService } from '../../../features/services/house-services/house.service';
import { AccountService } from '../../services/account/account.service';

declare const window: any; // To access Flowbite from global scope

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements AfterViewInit {
  private accountService = inject(AccountService);
  private router = inject(Router);
  private houseService = inject(HouseService);

  searchKeyword = '';
  showMobileSearch = false;

  get isLoggedIn(): boolean {
    return this.accountService.isLoggedIn();
  }

  get currentUserEmail(): string | null {
    return this.accountService.currentUserEmail();
  }

  toggleMobileSearch(): void {
    this.showMobileSearch = !this.showMobileSearch;
  }

  search(): void {
    if (this.searchKeyword.trim()) {
      this.router.navigate(['search'], {
        queryParams: { q: this.searchKeyword },
        queryParamsHandling: 'merge'
      });
      this.searchKeyword = '';
      this.showMobileSearch = false;
    }
  }

  signOut(): void {
    this.accountService.signOut();
  }

  ngAfterViewInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      setTimeout(() => {
        this.reinitializeDropdown();
      }, 0);
    });
  }

  reinitializeDropdown() {
    // Flowbite's initDropdowns if available
    if (window?.Flowbite?.initDropdowns) {
      window.Flowbite.initDropdowns();
    } else if (typeof window.initFlowbite === 'function') {
      window.initFlowbite();
    } else {
      // Optional: console warning for debugging
      console.warn('Flowbite dropdown init not found');
    }
  }
}


// export class NavbarComponent {
//   private accountService = inject(AccountService);
//   private router = inject(Router);
//   private houseService = inject(HouseService);

//   searchKeyword = '';
//   showMobileSearch = false;

//   get isLoggedIn(): boolean {
//     return this.accountService.isLoggedIn();
//   }

//   get currentUserEmail(): string | null {
//     return this.accountService.currentUserEmail();
//   }

//   toggleMobileSearch(): void {
//     this.showMobileSearch = !this.showMobileSearch;
//   }

//   search(): void {
//     if (this.searchKeyword.trim()) {

//       this.router.navigate(['search'], {
//         queryParams: { q: this.searchKeyword },
//         queryParamsHandling: 'merge'
//       });
//       this.searchKeyword = '';
//       this.showMobileSearch = false;
//     }
//   }

//   signOut(): void {
//     this.accountService.signOut();
//   }
// }
