$(function(){
function buildHTML(message) {
  if (message.image) {
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                    <img class="message__text__image" src='${message.image}' alt="">
                  </div>
                </div>`
  } else {
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <div class="message__text">
                    <p class="message__text__content">
                      ${message.content}
                    </p>
                  </div>
                </div>`
  }
  return html;
}
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('#message_content').val('');
      $('.hidden').val('');
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
      $('.form__submit').prop('disabled', false);
    })
  })
})