$(document).ready(() => {

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

});

displayAvatars = (avs) => {
  avs.forEach( av => {
    let element = `<div class="image-wrapper circle"><img class="avatar-image" src="${av}"></div>`
    $('.avatar-wrapper').append(element);
  });
}

postSentMessage = () => {
  if(event.which === 13) {
    let message = $('.new-message').val();
    let element = `<div class="sent-message"><p>${message}</p></div>`;
    $('.messages-wrapper').prepend(element);
    $('.new-message').val('');
  }
}
