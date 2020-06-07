import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../../providers/api/api';

@Injectable()
export class Items {
  items: Item[] = [];

  defaultItem: any = {
    "name": "Burt Bear",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Burt is a Bear.",
  };


  constructor(public api: Api) {
    let items=[];
    let seq =api.get("employees/getEmployeeList",null).share();
    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      console.log(res)
      items = res.employeeList
      for (let item of items) {
        this.items.push(new Item(item));
      }
    }, err => {
      console.error('ERROR', err);
    });


  
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });

  }


  add(item: Item) {
      //  this.items.push(item);
     // this.items.unshift(item)
      let seq = this.api.post("employees/addEmployee", item).share()
      seq.subscribe((res: any) => {
        // If the API returned a successful response, mark the user as logged in
        console.log(res)
        
      }, err => {
        console.error('ERROR', err);
      });

  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
