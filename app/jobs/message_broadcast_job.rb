class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    sender = message.user
    recipient = message.conversation.opposed_user(sender)

    broadcast_to_sender(message, sender)
    broadcast_to_recipient(message, recipient)
  end

  def broadcast_to_sender(message, user)
    ActionCable.server.broadcast(
      "conversations-#{user.id}",
      message: render_message(message, user),
      conversation_id: message.conversation_id
    )
  end

  def broadcast_to_recipient(message, user)
    ActionCable.server.broadcast(
      "conversations-#{user.id}",
      message: render_message(message, user),
      window: render_window(message.conversation, user),
      conversation_id: message.conversation_id
    )
  end

  def render_message(message, user)
    ApplicationController.render(
      partial: 'messages/message',
      locals: { message: message, user: user }
    )
  end

  def render_window(conversation, user)
    ApplicationController.render(
      partial: 'conversations/conversation',
      locals: { conversation: conversation, user: user }
    )
  end
end
