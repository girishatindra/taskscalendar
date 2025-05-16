import { Injectable } from '@angular/core';

export interface Dates{
  date: number,
  month: string,
  year: number,
  day: string,
  state: string,
  full_date: string,
  task: string,
}

@Injectable({
  providedIn: 'root'
})

export class Calendar {
  currentDate = new Date();
  days = ["sun", "mon","tue", "wed", "thu", "fri", "sat"]
  months = ["jan", "fed", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]

  calculate_end_date(ed: any) {
    const calculatedDate = new Date(this.currentDate);
    calculatedDate.setDate(calculatedDate.getDate() + ed - 1);
    //console.log("current date",this.currentDate)
    //console.log("end date",calculatedDate)
    return calculatedDate;
  }

  Generate_calendar(ed: any, task: string, cd = new Date(this.currentDate)): any {
    //console.log("current_date", this.currentDate)
    //console.log("end_date", ed)
    const dates: Dates[] = [];
    while (cd <= ed) {
      const date = cd.getDate();
      console.log("date",date)
      const month = cd.getMonth();
      const year = cd.getFullYear();
      const day = cd.getDay();
      console.log("day",day)
      const full_date = cd.toDateString();
      dates.push({ "date": date, "month": this.months[month], "year": year, "day": this.days[day], "state": "default", "full_date": full_date,"task":task });
      cd.setDate(cd.getDate() + 1);
    }
    return dates;
  }

  validate_date(dates: any, target: any){
    if(dates['state'] == 'true'){
      target.style.background = "lightgreen";
    }
    else if(dates['state'] == 'false'){
      target.style.background = "tomato";
    }
    else{
      target.style.background = "white";
    }
  }
}