$(document).ready(() => {

  let chatter = {
    avatar: '',
    message: ''
  }

  let isActive = false;

  let serverUrl = 'http://127.0.0.1:4300';

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
      chatter.avatar = av;
      $('.new-message').attr('placeholder', '');
      isActive = true;
      socket.emit('chatter-added', av);
    });
  }

  postSentMessage = () => {
    if(event.which === 13 && isActive) {
      $('.nasty-message').addClass('hidden');
      let message = $('.new-message').val();
      let element = `<div class="sent-message border flexer"><p>${message}</p><img class="avatar-mini circle border" src="${chatter.avatar}"></div>`;
      $('.messages-wrapper').prepend(element);
      $('.new-message').val('');
    } else if(event.which === 13 && !isActive ) {
      let $message = $(`<p class="nasty-message">YOU MUST FIRST SELECT AN AVATAR!!!</p>`);
      $('.messages-wrapper').prepend($message);
    }
  }

});
