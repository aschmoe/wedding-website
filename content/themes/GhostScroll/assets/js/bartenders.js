firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
});

/* Globals jQuery, document */
(function ($) {

  var contactsList = {};

  // Firebase
  // -----------------------

  //create firebase reference
  var contactsRef = firebase.database().ref();

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
      html += '<span class="handle">+</span>';
      html += '<span>'+contact.name+'</span>';
    html += '</div>';
    return $(html).data({ 'key': key });
  }

  $(window).load(function() {

    var drake = dragula([$('#bucket')[0]], { 
      moves: function (el, container, handle) {
        return handle.classList.contains('handle');
      },
      accepts: function(el, target, source, sibling) {
        if(target.attributes['data-time'].value === '0') {
          return true;
        }
        return !target.children.length || target.children.length < 2;
      }
    })
    .on('drop', function (el, container) {
      console.log($(el).data('key'), $(container).data('time'));
      updateContact($(el).data('key'), $(container).data('time'));
    });

    var times = [ 
      {
        time: '4:00',
        message: 'Outside'
      },  
      {
        time: '4:20',
        message: 'Outside'
      },  
      {
        time: '4:40',
        message: 'Outside'
      },  
      {
        time: '5:00',
        message: '15 minute shift'
      },
      { 
        time: '5:15 - 7:30',
        message: 'Dinner',
        disabled: true
      },
      { 
        time: '7:20'
      }, 
      {
        time: '7:40'
      },  
      {
        time: '8:00'
      },  
      {
        time: '8:20'
      },  
      {
        time: '8:40'
      },  
      {
        time: '9:00'
      },  
      {
        time: '9:20'
      },  
      {
        time: '9:40'
      },  
      {
        time: '10:00'
      }, 
      {
        time: '10:20'
      }, 
      {
        time: '10:40'
      }, 
      {
        time: '11:00'
      }, 
      {
        time: '11:20'
      }, 
      {
        time: '11:40'
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
        drake.containers.push($container[0]);
      }
    });
    

  });

}(jQuery));