$(function(){
  function buildHTML(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img class="message__text__image" src='${message.image}' alt="">` : "";
      var html = `<div class="message" data-message-id="${message.id}">
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
                        ${content}
                      </p>
                      ${img}
                    </div>
                  </div>`
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
      $('#new_message')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    })
    .always(function() {
      $('.form__submit').prop('disabled', false);
    })
  })

  function reloadMessages () {
    var last_message_id = $('.message:last').data("message-id");
    var href = 'api/messages'
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: href,
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        console.log(messages)
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        alert('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});