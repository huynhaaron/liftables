# Liftables

[Liftables live link](https://play.google.com/store/apps/details?id=com.liftables)

Liftables is a React Native application that uses Firebase as its backend. Users can create customized workouts and follow a daily schedule that creates exercises based on the user's personal stats.

Developed by Aaron Huynh, Hyun Kim, and Brian Tsai

<!-- ![image of Sample Schedule](/docs/photos/homepage.png) -->
<img src="/docs/photos/homepage.png" alt="homepage" width="250"/>&nbsp;&nbsp;&nbsp;
<img src="/docs/photos/workouts.png" alt="workouts" width="250"/>

## Firebase Auth and Users

On successful signup, a user is created in the Firebase database. Users have stats, a workout schedule, and a personal progress tracker. Using firebase.auth API, signup and authentication are straightforward:

```javascript
firebase.auth().createUserWithEmailAndPassword(email, password)
firebase.auth().signInWithEmailAndPassword(email, password)
```

Each method returns a Promise where further actions can take place. To find the currentUser, use firebase.auth().currentUser.uid;


## Firebase API

There are many ways to retrieve and set data in Firebase; on,
once, and set were the three most popular methods used.

```javascript
   firebase.database().ref('users/' + userId + '/data').on('value', callback)
   firebase.database().ref('users/' + userId + '/data').once('value', callback)
   firebase.database().ref('users/' + userId + '/data').set({completed: 5})
```

On is a reader method that serves as an event listener. The event type 'value' causes the method to listen to any changes at the specific path provided. If a value were changed at 'users/ + userId + /data', the callback will fire.


Once serves the same purpose as on but does not work as a listener; it only retrieves data once at the specified location.

The set method writes data at the specified path. The set data must be in object form, and will override any siblings at the specified path. To update an existing value without overriding siblings, you must use the child method to specify
an existing child:

```javascript
   firebase.database().ref('users/' + userId + '/data').child(val).set(newValue);
```

## Component based front-end

Every screen in React Native was divided into reusable components. Input, Spinner, Button, and Header are some of the common components seen in every screen, so component classes were created for those features. Below you can see Header, Input, and Button Components utilized in the Stats page.


<img src="/docs/photos/components.png" alt="components" width= "250"/>

## Calendar API

A npm module was used for the Calendar API, downloaded as react-native-calendars.

<img src="/docs/photos/calendar.png" alt="calendar" width= "250"/>

The Calendar API was simple to use: every time a date was clicked, a firebase read request was sent to the database,
and setState was run to update the agenda for that date.
A sample calendar component has several props you can use:

```javascript
<Calendar style={styles.calendarStyle}
  markedDates = { markedDate }
  markingType = {'interactive'}
  selected = {[this.state.date, Date()]}
  onDayPress={(day)=> this.renderWorkout(day)}
  />
```

MarkedDates indicates the color of specific dates, markingType gives a wider range of color schemes, selected tells you which date is selected, and onDayPress is the event listener.


## Navigation

The npm modules React Native Router Flux and React Native Tabs were used
for navigation. Router Flux allows users to move between screen
by creating stack frames. To do this, "wells" were created:

```javascript
  <Scene key="auth">
    <Scene key="loginform" hideNavBar component={LoginForm} title="Liftables" initial={true} />
  </Scene>
  <Scene key="root" rightTitle="Logout" onRight={this.logout.bind(this)}>
    <Scene key="main" component={Main} title="Liftables" />
    <Scene key="about" component={About} title="About" />
    <Scene key="userstats" component={UserStats} title="Settings" />
    <Scene key="programs" component={ProgramIndex} title="Programs"/>
    <Scene key="programshow" component={ProgramShow} title="Program"/>
    <Scene key="calendar" component={MyCalendar} title="Calendar" />
    <Scene key="progress" component={Progress} title="Progress" />
  </Scene>
```

The auth well and the root well are separated. To move between scenes in the same well, invoke Actions.[key]. For example, Actions.about takes the user to the About Component.


## Future Project Plans

Additional workouts may be added, as well as adding a more detailed progress bar.
