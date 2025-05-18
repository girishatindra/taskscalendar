<div align="center">
  
[![task_logo](/docs/logo.png)](#)

[![Angular Frontend](https://img.shields.io/badge/Angular-Frontend-skyblue?style=for-the-badge&logo=angular&labelColor=tomato)](https://angular.dev)
[![Flask Backend](https://img.shields.io/badge/Flask-Backend-skyblue?style=for-the-badge&logo=flask&labelColor=tomato)](https://flask.palletsprojects.com/en/stable/)
[![Static Badge](https://img.shields.io/badge/Pyinstaller-Python-skyblue?style=for-the-badge&logo=python&labelColor=tomato)](https://pyinstaller.org)


</div>

<br>

***

<br>

# :calendar: TasksCalendar - *A Goal Tracking Calendar*
Ever struggled to keep track of your habits or challenges?
Were you ever too busy or distracted to mark your calendar and lost your progress?
**TasksCalendar** is your solution.
[![Demo Video](/docs/demo-thumbnail.png)](#)
It allows you to generate a personalized calendar like a *21-day workout challenge* and mark each day as:
- :ballot_box_with_check: Completed
- :negative_squared_cross_mark: Missed
- :hourglass_flowing_sand: Default (*unmarked*)

<br>

## Table of Contents
- [About](#open_book-about)
  - [Features](#gear-features)
  - [Roadmap](#world_map-roadmap)
- [Installation](#hammer_and_wrench-installation)
  - [Executable](#desktop_computer-executable)
  - [Build From Source](#desktop_computer-build-from-source)
- [Usage](#wrench-usage)
  - [Create Tasks](#create-tasks)
  - [Mark Dates](#mark-dates)
  - [View All Tasks](#view-all-tasks)
  - [Access Tasks](#access-tasks)
  - [Delete Tasks](#delete-tasks)
  - [Regenerate Tasks](#regenerate-tasks)
- [Contributing](#handshake-contributing)
- [Contacts](#telephone_receiver-contacts)

<br>

## :open_book: About
A lightweight and customizable calendar tool built using Flask and Angular that helps you stay consistent with your habits, challenges, and routines.

>[!NOTE]
>This project is currently an **MVP (*Minimum Viable Product*)**.
The core functionality generating a calendar tailored to your task and marking dates accordingly is in place.
However, the project is still under active development, and additional features, improvements, and refinements are on the way. Expect changes and enhancements in future updates.

<br>

### :gear: Features
- generate a calednar tailored to your task eg: 21 days workout challenge
- Mark dates as completed, missed or default (unmarked)
- Default (unmarked) past dates are automatically flagged as missed
- Current date is always highlighted in blue borders
- Easily regenerate a calendar
- User-Friendly UI
- Lightweight Flask + Angular application
- Standalone executable
- JSON based storage
- Upcoming Features
  - :construction: Sqlite based stroage :construction:
  - :construction: Progress bar :construction:
  - :construction: Adding metadata to dates :construction:
  - :construction: Adding metadata to tasks :construction:
  - :construction: Cross-platform executable :construction:
  - :construction: Integrate google calendar :construction:

<br>

### :world_map: Roadmap
- [ ] Improve backend REST api
- [ ] Switch to Sqlite DB
- [ ] Optimize flask backend code
- [ ] Optimize angular frontend code
- [ ] Polish UI/UX

<br>

## :hammer_and_wrench: Installation
>[!NOTE]
>This application is currently only available for windows.

Installing TasksCalendar is simple. Users have two options:
1. Download the pre-built executable (Windows only)
2. Build from source (cross-platform)

<br>

### :desktop_computer: Executable
You can install the executable directly from the Releases page.

1. Download the latest :file_folder:`.zip` file from the Releases section.
   
2. Extract the contents. You’ll find:
      - **taskcalendar.exe** – *the standalone application*
      - **tasks.txt** – *used to track tasks*
        
3. Run taskcalendar.exe
   > A console window will appear displaying the Flask server output. You can `Ctrl + Click` the URL or copy and paste it into your browser to open the UI
   [![Executing taskscalendar.exe](/docs/executable.gif)](#)

<br>

>[!WARNING]
>The `tasks.txt` file is automatically created and updated as you create tasks within the app. Prentend it does not exist and avoid deleting or manupilating it in anyway

<br>

### :desktop_computer: Build From Source
1. Clone the repository

   ```bash
   git clone https://github.com/girishatindra/taskcalendar.git
   cd taskcalendar
   ```

2. Setup flask backend

    ```bash
      cd flask-backend
      pip install -r requirements
      python app
    ```

3. Install angular cli

   ```bash
    npm install -g @angular/cli
   ```

4. Setup angular-frontend

   ```bash
    cd ../angular-frontend
    npm install
    ng serve
   ```
<br>

## :wrench: Usage
In TaskCalendar you can easily:
- [Create a task / generate a calendar](#create-tasks)
- [Mark the dates](#mark-dates)
- [View all the completed and on going tasks](#view-all-tasks)
- [Access the tasks](#access-tasks)
- [Delete a task](#delete-tasks)
- [Regenerate a task](#regenerate-tasks)
  
<br>

### Create Tasks
>To create a task or generate a calendar simply enter the task name and the number of days you wish to track it for and click `generate`
>
>![task-creation-taskcalendar](/docs/task-creation.gif)


### Mark Dates
> You can mark a date as completed(green), missed(red) or default(white). Clicking on the date at default state sets it to completed, click again and it is marked as missed, click once again and its marked as default.
> 
> [![marking-dates-taskcalendar](/docs/dates.gif)](#)


### View All Tasks
> You can view all the ongoing and completed task by clicking on the `show` button, this will show all the tasks in a table format.
>
> [![show-all-taskcalendar](/docs/all-tasks-view.gif)](#)


### Access Tasks
> The tasks can be accessed in two ways
> - you can click `show` to view all tasks and then click on the specific task name you want to access from the table
> - you can enter the task name and click `show`
>
> [![access-tasks-taskcalendar](/docs/view-task.gif)](#)

>[!NOTE]
> If you ever forget to mark the dates the next time you access the task all those dates will be automatically marked as missed


### Delete Tasks
> To delete a task enter the task name and click `delete`, you will prompted to confirm or cancel the deletion
>
> [![deleting-tasks-taskcalendar](/docs/remove-task.gif)](#)

>[!WARNING]
>Do not delete the `json` files manually instead use the UI to remove the task and the associated json file, Avoid deleting or manupilating the `tasks.txt` in any way


### Regenerate Tasks
> If you broke your streak and want to start again, enter the task name the new number of days and click `generate`, you will be prompted if you want to regenerate or cancel
>
> [![regenrating-tasks-taskcalendar](/docs/regenerate-task.gif)](#)

<br>

## :handshake: Contributing 

>[!NOTE]
>Contributions are currently on hold while the project is in active development.
>The repository will be open for community contributions upon reaching 100% completion, as outlined in the [roadmap](#world_map-roadmap).

<br>

[![Progress Bar](https://progress-bar.xyz/0/?title=completed&style=for-the-badge)](#)

<br>

[![Project Status](https://img.shields.io/badge/project_status-MVP-blue?style=for-the-badge&labelColor=brightgreen)](#)

<br>

## :telephone_receiver: Contacts
Have questions, feedback, or suggestions?

Feel free to reach out:

- [![Gmail](https://img.shields.io/badge/gmail-girishatindra@gmail.com-white?style=social&logo=gmail)](mailto:girishatindra@gmail.com)
- [![Github Issue](https://img.shields.io/badge/Github-Open_an_issue_for_bugs_or_feature_requests-white?style=social&logo=github)](#)
