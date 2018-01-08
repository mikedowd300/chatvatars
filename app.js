$(document).ready(() => {

  let avatar = '';

  let isActive = false;

  let serverUrl = 'http://chatvatars-server.herokuapp.com';

  try {
    var socket = io.connect(serverUrl);
  }
  catch(e) {
    console.log("Couldn't connect!!!");
  }

  if( socket !== undefined) {

    socket.on('display-avatars', data => {
      displayAvatars(data);
    });

    socket.on('new-message', data => {
      postReceivedMessage(data);
    });

  }

  postReceivedMessage = (data) => {
    if(socket.id !== data.id) {
      let element = `<div class="received-message flexer"><p class="flip-me">${data.message}</p><img class="avatar-mini circle " src="${data.avatar}"></div>`;
      $('.messages-wrapper').prepend(element);
    }
  }

  postSentMessage = () => {
    let message = $('.new-message').val().trim();
    if(event.which === 13 && isActive && message.length > 0 ) {
      socket.emit('incoming-message', { message, id: socket.id, avatar });
      $('.nasty-message').addClass('hidden');
      var element = `<div class="sent-message flexer"><img class="avatar-mini circle" src="${avatar}"><p class="flip-me">${message}</p></div>`;
      $('.new-message').val('');
    } else if(event.which === 13 && !isActive ) {
      var element = $(`<p class="nasty-message">YOU MUST FIRST SELECT AN AVATAR!!!</p>`);
    }
    $('.messages-wrapper').prepend(element);
  }

  $('.new-message').keyup((event) => {
    postSentMessage();
  });

  displayAvatars = (avs) => {
    avs = (isActive ? avs.usedAvatars : avs.avatars);
    $('.avatar-wrapper').empty();
    avs.forEach( av => {
      let $element = $(`<div class="image-wrapper circle"><img class="avatar-image" src="${av}"></div>`);
      if(!isActive) createAvatarClickedEvent($element, av);
      $('.avatar-wrapper').append($element);
    });
  }

  createAvatarClickedEvent = ($elem, av) => {
    $elem.click(() => {
      avatar = av;
      $('.new-message').attr('placeholder', '');
      isActive = true;
      socket.emit('chatter-added', av);
    });
  }

});
