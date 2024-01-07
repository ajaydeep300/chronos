# Data Format

## Json Files

There are 2 types of Json files included with this data dump - <company_name>-employees.json files and <company_name>-time-entries.json.
The formats are described below.

### Employee Files
The employee json files each represent data for a single company. "GizmoGram", "LunchRock", and "Night Owls LLC" are each 100 employees large while "Onion Technology" is 2500 employees large.

Within each file is a single Json array containing every employee for the company. Each element in the array looks something like this:
```json
{
  "firstName" : "Parker",
  "lastName" : "Knight",
  "employeeId" : 2,
  "email" : "Parker_Knight@gizmogram.com",
  "companyId" : 3,
  "companyName" : "GizmoGram",
  "managerId" : 1,
  "positionTitle" : "Engineering Manager",
  "startDate" : "1995-05-27",
  "isManager" : true,
  "password" : "knightpa"
}
```

Descriptions for each field are as follows:
- firstName: The first name of the employee
- lastName: The last name of the employee
- employeeId: Unique identifier for the employee within the company. Within a company this is guaranteed to be unique but across companies employees may have the same identifier. A combination of companyId and employeeId is guaranteed to be unique across the full data set.
- email: Email address for the employee, may be used in combination with the password for authentication
- companyId: Unique identification number for the company that this employee belongs to
- companyName: The name of the company this employee works for
- managerId: employeeId for the manager of this employee. The CEO of a company is the only employee where this field is missing, all other employees will have this field defined.
- positionTitle: The name of the position this employee holds
- startDate: What date the employee started working for the company
- isManager: A boolean field for whether this employee is a manager or not
- password: A password that can be used to log into the system as this employee

### Time Files

Each company tracks their time in unique ways, and as such the data from each company is formatted slightly differently. The main structure of these json files is similar - each employee has an entry in the array with a number of associated time entries.

I would recommend starting with a simpler use case to get things off the ground quickly. As the project evolves, if you're looking for more of a challenge with the data feel free to explore the various time formats and see if your system can handle the various structures.

GizmoGram is the simplest use case for time tracking - they just track the number of hours worked each day. This is the company I'd recommend taking a look at first for the sake of simplicity.
```json
{
  "timeEntries" : [ {
    "date" : "2023-02-01",
    "hoursWorked" : 7.75
  }, {
    "date" : "2023-02-02",
    "hoursWorked" : 7.5
  }]
}
```

Employees of Night Owls LLC only work the night shift in New York. They clock in and out once on a daily basis - even on weekends! The time recorded represents the time of clock on the wall when they punch their card so you'll need to account for daylight savings when processing this data!
```json
{
  "timeEntries" : [ {
    "date" : "2022-11-01",
    "clockedIn" : "21:50:00",
    "clockedOut" : "04:14:00"
  }, {
    "date" : "2022-11-02",
    "clockedIn" : "21:18:00",
    "clockedOut" : "03:48:00"
  }]
}
```

LunchRock LLC requires employees to punch out for lunchtime so they're not eating on the clock. The format for this data is similar to Night Owls LLC, but you'll see two entries per day for each employee as they punch out for and back in after lunchtime.
```json
{
  "timeEntries" : [ {
    "date" : "2022-11-01",
    "clockedIn" : "08:48:00",
    "clockedOut" : "12:38:00"
  }, {
    "date" : "2022-11-01",
    "clockedIn" : "13:07:00",
    "clockedOut" : "16:58:00"
  }, {
    "date" : "2022-11-02",
    "clockedIn" : "08:43:00",
    "clockedOut" : "12:47:30"
  }, {
    "date" : "2022-11-02",
    "clockedIn" : "13:17:30",
    "clockedOut" : "17:22:00"
  }]
}
```

Onion Technology uses the Unix epoch millisecond to record when their employees clock in and out (very precise!). This number represents the number of milliseconds that have elapsed since midnight on January 1, 1970 at the time the clock was punched.
```json
{
  "timeEntries" : [ {
    "clockedInEpochMillisecond" : 1675259100000,
    "clockedOutEpochMillisecond" : 1675288920000
  }, {
    "clockedInEpochMillisecond" : 1675349100000,
    "clockedOutEpochMillisecond" : 1675380540000
  }]
}
```