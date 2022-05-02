import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-books',
    template: `
    <router-outlet></router-outlet>
  `,
    styles: [
    ]
})
export class HomeBooksComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
