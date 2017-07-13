# Liftables

[Liftables live][l]
[l]: https://musicianhub.herokuapp.com/#/


Liftables is a React Native application that uses Firebase as its backend. Users can create customized workouts and follow a daily schedule that creates exercises based on the user's personal stats.

Developed by Aaron Huynh, Hyun Kim, and Brian Tsai

![image of Sample Schedule](/docs/photos/homepage.png)

## Firebase Auth and Users

On successful signup, a user is created in the Firebase database. Users have stats, a workout schedule, and a personal progress tracker. Using firebase.auth API, signup and authentication are straightforward:

```javascript
firebase.auth().createUserWithEmailAndPassword(email, password)
firebase.auth().signInWithEmailAndPassword(email, password)
```

Each method returns a Promise where further actions can take place. To find the currentUser:

```javascript
  firebase.auth().currentUser.uid;
```

## Firebase API

There are many ways to retrieve and set data in Firebase; on,
once, and set were the three most popular methods used.

```javascript
   firebase.database().ref('users/' + userId + '/data').on('value', callback)
```

On is a reader method that serves as an event listener. The event type 'value' causes the method to listen to any changes at the specific path provided. If a value were changed at 'users/ + userId + /data', the callback will fire.

```javascript
   firebase.database().ref('users/' + userId + '/data').once('value', callback)
```

Once serves the same purpose as on but does not work as a listener; it only retrieves data once at the specified location.

```javascript
   firebase.database().ref('users/' + userId + '/data').set({
     completed: 5
   })
```

The set method writes data at the specified path. The set data must be in object form, and will override any siblings at the specified path. To update an existing value without overriding siblings, you must use the child method to specify
an existing child:

```javascript
   firebase.database().ref('users/' + userId + '/data').child(val).set(newValue);
```

## Component based front-end

Every screen in React Native was divided into reusable components. Input, Spinner, Button, and Header are some of the common components seen in every screen, so component classes were created for those features. Below you can see Header, Input, and Button Components utilized in the Stats page.

![image of Components](/docs/photos/components.png)

## Calendar API

A npm module was used for the Calendar API, downloaded as react-native-calendars.

![image of Components](/docs/photos/calendar.png)

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

MarkedDates indicated the color of specific dates, markingType gave a wider range of color schemes for each date, selected tells you which date is currently selected, and onDayPress is the event listener when a date is pressed.


## Navigation


## Future Project Plans

I plan to create playlists for users, as well as the ability to queue songs in the song player.
