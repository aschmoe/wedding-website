/* Globals jQuery, document */
(function ($) {

  $(window).load(function() {

    // Setting up draggables
    // -----------------------

    // var drake = dragula([$('#bucket')[0]], { 
    //   // moves: function (el, container, handle) {
    //   //   return handle.classList.contains('handle');
    //   // },
    //   accepts: function(el, target, source, sibling) {
    //     if(target.attributes['data-time'].value === '0') {
    //       return true;
    //     }
    //     return !target.children.length || target.children.length < 2;
    //   }
    // })
    // .on('drop', function (el, container) {
    //   // console.log($(el).data('key'), $(container).data('time'));
    //   updateContact($(el).data('key'), $(container).data('time'));
    // });

    var times = [ 
      {
        time: '4:00',
        message: '(Outside)'
      },  
      {
        time: '4:20',
        message: '(Outside)'
      },  
      {
        time: '4:40',
        message: '(Outside)'
      },  
      {
        time: '5:00',
        message: '(Outside) 15 minute shift'
      },
      { 
        time: '5:15 - 7:30',
        message: 'Dinner and Toasts',
        disabled: true
      },
      { 
        time: '7:20',
        message: '(Upstairs) make sure bar set'
      }, 
      {
        time: '7:40',
        message: '(Upstairs)'
      },  
      {
        time: '8:00',
        message: '(Upstairs)'
      },  
      {
        time: '8:20',
        message: '(Upstairs)'
      },  
      {
        time: '8:40',
        message: '(Upstairs)'
      },  
      {
        time: '9:00',
        message: '(Upstairs)'
      },  
      {
        time: '9:20',
        message: '(Upstairs)'
      },  
      {
        time: '9:40',
        message: '(Upstairs)'
      },  
      {
        time: '10:00',
        message: '(Upstairs)'
      }, 
      {
        time: '10:20',
        message: '(Upstairs)'
      }, 
      {
        time: '10:40',
        message: '(Upstairs)'
      }, 
      {
        time: '11:00',
        message: '(Upstairs)'
      }, 
      {
        time: '11:20',
        message: '(Upstairs)'
      },
      {
        time: '11:40',
        message: '(Upstairs)'
      },  
      {
        time: '12:00',
        message: 'Mr. Brown\'s Open for Business',
        disabled: true
      },
    ];
    $timeSection = $('#time-section');
    $.each(times, function(key, timeObj) {
      var $container = $('<div class="container' + (timeObj.disabled ? ' disabled' : '' ) + '" data-time="' + timeObj.time + '"/>');
      var label = timeObj.time + 'pm';
      if (timeObj.message) {
        label += ' <small>' + timeObj.message + '</small>';
      }
      $timeSection.append(
        $('<div class="time-item-wrap"><label>' + label + '</label></div>').append($container)
      );
      if(!timeObj.disabled) {
        // drake.containers.push($container[0]);
      }
    });

    // Firebase
    // -----------------------

    var config = {
      apiKey: "AIzaSyAQxcxbNChO21inp1SKnHfRkY5EEfFs-s0",
      authDomain: "bartenders-844fa.firebaseapp.com",
      databaseURL: "https://bartenders-844fa.firebaseio.com",
      projectId: "bartenders-844fa",
      storageBucket: "bartenders-844fa.appspot.com",
      messagingSenderId: "207417592709"
    };
    firebase.initializeApp(config);

    console.log('app done');

    // List
    var contactsList = {};

    //create firebase reference
    var contactsRef;

    firebase.auth().signInAnonymously()
      .then(function() {
        console.log('signed in');
        contactsRef = firebase.database().ref();

        //load older conatcts as well as any newly added one...
        contactsRef.on('child_added', function(snap) {
          console.log('added', snap.key, snap.val());
          var val = snap.val();
          contactsList[snap.key] = {
            value: val,
            html: contactFromObject(val, snap.key)
          };
          addToBucket(snap.key);
        });

        //load older conatcts as well as any newly added one...
        contactsRef.on('child_changed', function(snap) {
          console.log('updated', snap.key, snap.val());
          var val = snap.val();
          // Different than our record
          if (val.time !== contactsList[snap.key].value.time) {
            contactsList[snap.key]['value'] = snap.val();
            addToBucket(snap.key); 
          }    
        });
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
      }
    );

    // Helper funcs
    // -----------------------

    function updateContact(key, time) {
      if (time !== contactsList[key]['value'].time) {
        contactsList[key]['value'].time = time;
        firebase.database().ref(key).set(contactsList[key]['value']);
      }
    }

    // move the html around
    function addToBucket(key) {
      // Already has time
      if (contactsList[key].value.time) {
        $('[data-time="' + contactsList[key].value.time + '"]').append(contactsList[key].html);
      } else {
        contactsList[key].value.time = 0;
        $('#bucket').append(contactsList[key].html);
      }
    }

    //prepare conatct object's HTML
    function contactFromObject(contact, key){
      console.log( contact );
      var html = '';
      html += '<div class="person">';
        // html += '<span class="handle">+</span>';
        html += '<span>'+contact.name+'</span>';
      html += '</div>';
      return $(html).data({ 'key': key });
    }
  });

}(jQuery));