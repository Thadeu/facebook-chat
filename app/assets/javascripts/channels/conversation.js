App.conversation = App.cable.subscriptions.create("ConversationChannel", {
  connected: function() {},
  disconnected: function() {},

  received: function(data) {
    var conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");
    var countConversationsList = $('#conversations-list').find('[data-conversation-id]').length

    if (conversation.length <= 0){
      $('#conversations-list').append(data['window']);
      conversation = $('#conversations-list').find("[data-conversation-id='" + data['conversation_id'] + "']");
      conversation.find('.panel-body').show();
    }else {
      if (!conversation.find('.panel-body').is(':visible')){
        conversation.find('.panel-body').show();
      }

      conversation.find('.messages-list').find('ul').append(data['message']);
    }

    var $conversationItem = $('.conversation-item')
    $conversationItem.eq(0).css('right', '250px')
    $conversationItem.eq(1).css('right', '523px')
    $conversationItem.eq(2).css('right', '797px')

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
