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
      displayAvatars();
    })
  }


  $('.new-message').keyup((event) => {
    postSentMessage();
  });

});

postSentMessage = () => {
  if(event.which === 13) {
    let message = $('.new-message').val();
    let element = `<div class="sent-message"><p>${message}</p></div>`;
    $('.messages-wrapper').prepend(element);
    $('.new-message').val('');
  }
}
