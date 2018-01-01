$(document).ready(() => {

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
