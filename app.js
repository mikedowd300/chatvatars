$(document).ready(() => {

  let chatter = {
    avatar: '',
    message: ''
  }

  let isActive = false;

  let serverUrl = 'http://127.0.0.1:4200';

  try {
    var socket = io.connect(serverUrl);
  }
  catch(e) {
    console.log("Couldn't connect!!!");
  }

  if( socket !== undefined) {
    socket.on('say-hi', (data) => {
      console.log(data);
      displayAvatars(data.avatars);
    })
  }

  $('.new-message').keyup((event) => {
    postSentMessage();
  });

  displayAvatars = (avs) => {
    avs.forEach( av => {
      let $element = $(`<div class="image-wrapper circle"><img class="avatar-image" src="${av}"></div>`);
      createAvatarClickedEvent($element, av);
      $('.avatar-wrapper').append($element);
    });
  }

  createAvatarClickedEvent = ($elem, av) => {
    $elem.click(() => {
      chatter.avatar = av;
      $('.new-message').attr('placeholder', '');
      isActive = true;
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
      console.log('wrong!!!!');
      let $message = $(`<p class="nasty-message">YOU MUST FIRST SELECT AN AVATAR!!!</p>`);
      $('.messages-wrapper').prepend($message);
    }
  }

});
