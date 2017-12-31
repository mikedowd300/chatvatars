$(document).ready(() => {

  $('.new-message').keyup((event) => {
    if(event.which === 13) {
      let message = $('.new-message').val();
      let element = `<div class="sent-message border"><p>${message}</p></div>`;
      $('.messages-wrapper').prepend(element);
      $('.new-message').val('');
    }
  });

});
