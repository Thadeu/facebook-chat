App.conversation = App.cable.subscriptions.create("ConversationChannel", {
  connected: function() {},
  disconnected: function() {},

  received: function(data) {
    var conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");
    var countConversationsList = $('#conversations-list').find('[data-conversation-id]').length

    $('.conversation-item').eq(0).css('right', '250px')
    $('.conversation-item').eq(1).css('right', '523px')
    $('.conversation-item').eq(2).css('right', '797px')
    
    if (data['window'] !== undefined) {
      var conversation_visible = $(conversation).find('.panel-body').is(':visible');

      if (conversation_visible) {
        var messages_visible = $(conversation).find('.panel-body').is(':visible');

        if (!messages_visible) {
          conversation.removeClass('panel-default').addClass('panel-success');
        }

        conversation.find('.messages-list').find('ul').append(data['message']);
      }
      else {
        $('#conversations-list').append(data['window']);
        conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");
        conversation.find('.panel-body').show();
      }
    }
    else {
      conversation.find('ul').append(data['message']);
    }

    if (countConversationsList <= 0){
      $('#conversations-list').append(data['window']);
      conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");
      conversation.find('.panel-body').show();
    }

    var messages_list = conversation.find('.messages-list');
    var height = messages_list[0].scrollHeight;
    messages_list.scrollTop(height);
  },

  speak: function(message) {
    return this.perform('speak', {
      message: message
    });
  }
});
