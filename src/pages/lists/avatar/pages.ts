import { Component } from '@angular/core';


@Component({
    templateUrl: 'template.html'
})
export class AvatarPage {
  items: Array<{ title: string, note: string, icon: string }>;

  constructor() {
    this.items = [];

    for (let i = 1; i < 11; i++) {

      this.items.push({
        title: 'Avatar ' + i,
        note: 'This is avatar #' + i,
        icon: 'assets/img/avatar-ts-woody.png'
      });

    }

  }

  



}
