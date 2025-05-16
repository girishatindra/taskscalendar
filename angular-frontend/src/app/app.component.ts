import { Component, inject, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Calendar } from './calendar.service';
import { ApiService } from './api.service';
import { MatRippleModule } from '@angular/material/core'
import { Message } from './message.service';
import { Dialog } from './dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrl: "../styles.css",
  imports: [MatRippleModule],
  encapsulation: ViewEncapsulation.None,
})


export class AppComponent {
  // variables
  date = new Date();
  currentDate = this.date;
  endDate: any | undefined;
  response: any | undefined;
  dates: any[] = [];
  completed: any[] = [];
  on_going: any[] = [];
  private calendar = inject(Calendar)
  private api = inject(ApiService)
  private message = inject(Message)
  private dialog = inject(Dialog)
  constructor(private cdr: ChangeDetectorRef) { }

  //Generate calendar
  GenerateCalendar(ed: any, task: string): void {
    this.elements('generate')
    this.dates = []
    if (task) {
      ed = parseInt(ed)
      if (!isNaN(ed)) {
        // checks if task exists
        this.api.check(task).subscribe((response: boolean) => {
          if (response) {
            //console.log(response, 'task already exists')
            // asks for regenerating the calendar if it already exists
            this.dialog.confirmationDialog(`Do You Want To Regenerate ${task} ?`, 'Task Regeneration').subscribe((result) => {
              if (result) {
                this.endDate = this.calendar.calculate_end_date(ed); //calculates end date
                this.dates = this.calendar.Generate_calendar(this.endDate,task); //Generates calendar
                //console.log("dates:",this.dates)
                this.cdr.detectChanges()
                this.checkDates()
                // validates the dates and sets the colors
                document.querySelectorAll('.date').forEach((date, index) => {
                  this.calendar.validate_date(this.dates[index], date);
                })
                // saves the calendar
                this.api.save({ 'task': task, 'data': this.dates }).subscribe({
                  next: (response) => {
                    this.response = response;
                    if (this.response.message) {
                      //console.log(this.response.message)
                    }
                    else {
                      console.log(this.response.error)
                      this.message.open('An error ocurred, please try again', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        panelClass: 'red-snackbar',
                      })
                    }
                  },
                  error: (err) => {
                    console.error('Error:', err);
                    this.message.open('An error ocurred, please try again', '', {
                      duration: 3000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center',
                      panelClass: 'red-snackbar',
                    });

                  }
                });
              }
              else {
                console.log('Cancelled Regeneration')
              }
            })
          }
          else {
            // fresh task is created
            //console.log(response, 'task dosent exists')
            this.endDate = this.calendar.calculate_end_date(ed); //calculates end date
            this.dates = this.calendar.Generate_calendar(this.endDate,task); //Generates calendar
            //console.log("dates:",this.dates)
            this.cdr.detectChanges()
            this.checkDates()
            // validates dates and sets color
            document.querySelectorAll('.date').forEach((date, index) => {
              this.calendar.validate_date(this.dates[index], date);
            })
            // creates the task
            this.api.create({ 'task': task, 'data': this.dates }).subscribe({
              next: (response) => {
                this.response = response;
                if (this.response.message) {
                  //console.log(this.response.message)
                  this.message.open(`${this.response.message}`, '', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: 'green-snackbar',
                  })
                }
                else {
                  console.log(this.response.error)
                  this.message.open('An error ocurred, please try again', '', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                  })
                }
              },
              error: (err) => {
                console.error('Error:', err);
                this.message.open('An error ocurred, please try again', '', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  panelClass: 'red-snackbar',
                })
              }
            });
          }

        })

      }
      else {
        this.message.open('Please enter the number of days', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'red-snackbar',
        })
      }
    }
    else {
      this.message.open('Please enter the task name', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'red-snackbar',
      })
    }
  }

  //removes a task
  removeTask(task: string) {
    this.dates = [];
    this.elements('remove');
    if (task) {
      // checks if task exists
      this.api.check(task).subscribe((response: boolean) => {
        if (response) {
          this.dialog.confirmationDialog(`Are You Sure Yow Want To Delete ${task} ?`, 'Remove Task').subscribe((result) => {
            if (result) {
              console.log('Confirmed')
              this.api.remove(task).subscribe({
                next: (response) => {
                  this.response = response;
                  if (this.response.message) {
                    //console.log(this.response.message)
                    this.message.open(this.response.message, '', {
                      duration: 3000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center',
                      panelClass: 'green-snackbar',
                    })
                  }
                  else {
                    console.log(this.response.error)
                    this.message.open('An error ocurred, please try again', '', {
                      duration: 3000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center',
                      panelClass: 'red-snackbar',
                    })
                  }
                },
                error: (err) => {
                  console.error('Error:', err);
                  this.message.open('An error ocurred, please try again', '', {
                    duration: 3000,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    panelClass: 'red-snackbar',
                  })
                }
              });
            }
            else {
              //console.log('canceled')
            }
          })
        }
        else {
          this.message.open(`${task}: task does not exist`, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'red-snackbar',
          })
        }
      })
    }
    else {
      this.message.open('Please enter a task name', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        panelClass: 'red-snackbar',
      })
    }
  }

  // fetches already existsing task
  fetchTask(task: string) {
    this.elements('show')
    this.dates = [];
    if (task) {
      // checks if task exists
      this.api.check(task).subscribe((response: boolean) => {
        if (response) {
          console.log(response)
          // fteches task
          this.api.fetch(task).subscribe({
            next: (response) => {
              this.response = response;
              if (this.response.message) {
                //console.log(this.response.message,this.response.data['data'])
                this.dates = this.response.data
                this.cdr.detectChanges()
                this.checkDates()
                // validates dates
                document.querySelectorAll('.date').forEach((date, index) => {
                  this.calendar.validate_date(this.dates[index], date);
                })
                // saves calendar
                this.api.save({ 'task': task || this.dates[0]['task'], 'data': this.dates }).subscribe({
                  next: (response) => {
                    this.response = response;
                    if (this.response.message) {
                      //console.log(this.response.message)
                    }
                    else {
                      console.log(this.response.error)
                      this.message.open('An error ocurred, please try again', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        panelClass: 'red-snackbar',
                      })
                    }
                  },
                  error: (err) => {
                    console.error('Error:', err);
                    this.message.open('An error ocurred, please try again', '', {
                      duration: 3000,
                      verticalPosition: 'top',
                      horizontalPosition: 'center',
                      panelClass: 'red-snackbar',
                    })

                  }
                });

              }
              else {
                console.log(this.response.error)
                this.message.open('An error ocurred, please try again', '', {
                  duration: 3000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  panelClass: 'red-snackbar',
                })
              }
            },
            error: (err) => {
              console.error('Error:', err);
              this.message.open('An error ocurred, please try again', '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: 'red-snackbar',
              })
            }
          });

        }
        else {
          //console.log(`${task} does not exist`)
          this.message.open(`${task}: task does not exist`, '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'red-snackbar',
          })
        }
      })
    }
    else {
      //if input is empty
      this.elements('show_all')
      this.api.fetch('ALL').subscribe({
        next: (response) => {
          console.log(response)
          this.response = response
          if (this.response.completed.length != 0 || this.response.on_going.length != 0) {
            console.log("completed:",this.response.completed,"on going:",this.response.on_going)
            this.completed = this.response.completed;
            this.on_going = this.response.on_going;
          }
          else{
            this.completed = []
            this.on_going = []
            this.message.open("no tasks found !","",{
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'red-snackbar',
            })
          }

        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }

  // click events
  clickDates(index: any, event: any): void {
    if (this.dates[index]["state"] == "default") {
      this.dates[index]["state"] = "true";
      //console.log(this.dates[index]);
      this.calendar.validate_date(this.dates[index], event.target);
    }
    else if (this.dates[index]["state"] == "true") {
      this.dates[index]["state"] = "false";
      //console.log(this.dates[index]);
      this.calendar.validate_date(this.dates[index], event.target);
    }
    else {
      this.dates[index]["state"] = "default";
      //console.log(this.dates[index]);
      this.calendar.validate_date(this.dates[index], event.target);
    }
    this.cdr.detectChanges()
    const task = this.dates[0]['task']
    console.log(task)
    this.api.save({ 'task': task, 'data': this.dates }).subscribe({
      next: (response) => {
        this.response = response;
        if (this.response.message) {
          //console.log(this.response.message)
        }
        else {
          console.log(this.response.error)
          this.message.open('An error ocurred, please try again', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: 'red-snackbar',
          })
        }
      },
      error: (err) => {
        console.error('Error:', err);
        this.message.open('An error ocurred, please try again', '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: 'red-snackbar',
        })
      }
    });

  }
  // checking and validating dates
  checkDates(): void {
    //console.log('checking dates')
    const all_dates = document.querySelectorAll('div.date');
    console.log(all_dates)
    const today = new Date()
    //today.setDate(10)
    all_dates.forEach((date, index) => {
      const dateElement = date as HTMLElement;
      if (this.dates[index]['full_date'] == today.toDateString()) {
        //console.log(this.dates[index])
        dateElement.style.border = '2px dashed blue'
        let currentElement = dateElement;
        while (currentElement) {
          currentElement.style.pointerEvents = 'auto';
          currentElement = currentElement.previousElementSibling as HTMLElement;
          index -= 1
          if (this.dates[index] && this.dates[index]['state'] == 'default') {
            this.dates[index]['state'] = 'false';
            this.calendar.validate_date(this.dates[index], currentElement)
            //console.log("dates index:",this.dates[index])
          }
        }
      }
    })


  }

  close(state: boolean) {
    if (state) {
      const cls = document.querySelector('.note') as HTMLElement;
      cls.style.display = "none";

    }
  }

  elements(btn: string) {
    const calendar_container = document.querySelector('.calendar') as HTMLElement;
    const tasks_table = document.querySelector('table') as HTMLElement;
    if (btn == "generate") {
      if (calendar_container) {
        calendar_container.style.display = 'grid';
      }
      if (tasks_table) {
        tasks_table.style.display = 'none';
      }
    }
    else if (btn == "show_all") {
      if (calendar_container) {
        calendar_container.style.display = 'none';
      }
      if (tasks_table) {
        tasks_table.style.display = 'table';
      }
    }
    else if (btn == "show") {
      if (calendar_container) {
        calendar_container.style.display = 'grid';
      }
      if (tasks_table) {
        tasks_table.style.display = 'none';
      }
    }
    else if (btn == "remove") {
      if (calendar_container) {
        calendar_container.style.display = 'none';
      }
      if (tasks_table) {
        tasks_table.style.display = 'none';
      }
    }
  }


}
