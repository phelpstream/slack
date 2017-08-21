module.exports = api => {
  /**
 * Creates a channel.
 * See: https://api.slack.com/methods/channels.create
 */
  api.channels.create = async name =>
    api.utils.handleError(async () => {
      let response = await api.utils.post("channels.create", {
        name: name.replace(/\#+/, "")
      });
      if (response.ok === true) {
        return response.channel;
      } else {
        throw response;
      }
    });

  /**
 * Renames a channel.
 * See: https://api.slack.com/methods/channels.rename
 */
  api.channels.rename = async (id, newName, validate = true) =>
    api.utils.handleError(async () => {
      let response = await api.utils.post("channels.rename", {
        name: newName.replace(/\#+/, ""),
        channel: id,
        validate: validate
      });

      if (response.ok === true) {
        return response.channel;
      } else {
        throw response;
      }
    });

  /**
 * Renames a channel by a channel name.
 * See: unofficial method
 */
  api.channels.renameByChannelName = async (name, newName, validate = true) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.rename(id, newName, validate);
    });

  /**
 * Fetches history of messages and events from a channel.
 * See: https://api.slack.com/methods/channels.history
 */
  api.channels.history = async (id, options) =>
    api.utils.handleError(async () => {
      let response = await api.utils.post(
        "channels.history",
        Object.assign({ channel: id }, options)
      );
      if (response.ok === true) {
        return response.messages;
      } else {
        throw response;
      }
    });

  /**
 * Fetches history of messages and events from a channel by its name.
 * See: unofficial method
 */
  api.channels.historyByChannelName = async (name, options) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.history(id, options);
    });

  /**
 * Fetch last message of a channel
 * See: unofficial method
 */
  api.channels.lastMessage = async (id, options) =>
    api.utils.handleError(async () => {
      let messages = await api.channels.history(id, options);
      return messages[0] || null;
    });

  /**
 * Get id of last message of a channel
 * See: unofficial method
 */
  api.channels.getIdOflastMessage = async (id, options) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessage(id, options);
      return message.id || null;
    });

  /**
 * Get timestamp of last message of a channel
 * See: unofficial method
 */
  api.channels.getTimestampOfLastMessage = async (id, options) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessage(id, options);
      return message.ts || null;
    });

  /**
 * Fetch last message of a channel by channel name
 * See: unofficial method
 */
  api.channels.lastMessageByChannelName = async (id, options) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      let messages = await api.channels.lastMessage(id, options);
      return messages[0] || null;
    });

  /**
 * Get id of last message of a channel by channel name
 * See: unofficial method
 */
  api.channels.getIdOflastMessageByChannelName = async (name, options) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessageByChannelName(name, options);
      return message.id || null;
    });

  /**
 * Get id of last message of a channel by channel name
 * See: unofficial method
 */
  api.channels.getTimestampOflastMessageByChannelName = async (name, options) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessageByChannelName(name, options);
      return messages.ts || null;
    });

  /**
 * Fetch last message starting by a text.
 * See: unofficial method
 */
  api.channels.lastMessageStartingWith = async (
    id,
    messageStartingText,
    options
  ) =>
    api.utils.handleError(async () => {
      let messages = await api.channels.history(id, options);
      return (
        messages.find(message =>
          message.text.startsWith(messageStartingText)
        ) || null
      );
    });

  /**
 * Fetch last message starting by a text by a channel name.
 * See: unofficial method
 */
  api.channels.lastMessageStartingWithByChannelName = async (
    name,
    messageStartingText,
    options
  ) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.lastMessageStartingWith(
        id,
        messageStartingText,
        options
      );
    });

  /**
 * Get id of last message of a channel by channel name
 * See: unofficial method
 */
  api.channels.getTimestampOflastMessageStartingWithByChannelName = async (
    name,
    messageStartingWith,
    options
  ) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessageStartingWithByChannelName(
        name,
        messageStartingWith,
        options
      );
      return message && message.ts ? message.ts : null;
    });

  /**
 * Fetch last message id starting by a text.
 * See: unofficial method
 */
  api.channels.getIdOfLastMessageStartingWith = async (
    id,
    messageStartingText,
    options
  ) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessageStartingWith(
        id,
        messageStartingText,
        options
      );
      return message && message.id ? message.id : null;
    });

  /**
 * Fetch last message id starting by a text by a channel name.
 * See: unofficial method
 */
  api.channels.getIdOfLastMessageStartingWithByChannelName = async (
    name,
    messageStartingText,
    options
  ) =>
    api.utils.handleError(async () => {
      let channel = await api.channels.lastMessageStartingWithByChannelName(
        name,
        messageStartingText,
        options
      );
      return channel.id || null;
    });

  /**
 * Lists all channels in a Slack team.
 * See: https://api.slack.com/methods/channels.list
 */
  api.channels.list = async () =>
    api.utils.handleError(async () => {
      let response = await api.utils.post("channels.list", {});
      if (response.ok === true) {
        return response.channels;
      } else {
        throw response;
      }
    });

  /**
 * Return a channel object from a given name
 * See: unofficial method
 */
  api.channels.findByChannelName = async name =>
    api.utils.handleError(async () => {
      let channelsList = await api.channels.list();
      return channelsList.find(channel => channel.name === name) || null;
    });

  /**
 * Return an id from a given channel name
 * See: unofficial method
 */
  api.channels.getIdByChannelName = async name =>
    api.utils.handleError(async () => {
      let foundChannel = await api.channels.findByChannelName(name);
      return foundChannel.id || null;
    });

  /**
 * Archives a channel.
 * See: https://api.slack.com/methods/channels.archive
 */
  api.channels.archive = async id =>
    api.utils.handleError(async () => {
      let response = await api.utils.post("channels.archive", {
        channel: id
      });
      if (response.true) {
        return reponse.channel;
      } else {
        throw response;
      }
    });

  /**
 * Archives a channel by name
 * See: unofficial method
 */
  api.channels.archiveByChannelName = async name =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.archive(id);
    });

  /**
 * Sets the purpose for a channel.
 * See: https://api.slack.com/methods/channels.setPurpose
 */
  api.channels.setPurpose = async (id, purpose) =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.setPurpose", {
          channel: id,
          purpose: purpose
        })
    );

  /**
 * Sets the purpose for a channel by a channel name.
 * See: unofficial method
 */
  api.channels.setPurposeByChannelName = async (name, purpose) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.setPurpose(id, purpose);
    });

  /**
 * Sets the topic for a channel.
 * See: https://api.slack.com/methods/channels.setTopic
 */
  api.channels.setTopic = async (id, topic) =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.setTopic", {
          channel: id,
          topic: topic
        })
    );

  /**
 * Sets the topic for a channel by a channel name.
 * See: unofficial method
*/
  api.channels.setTopicByChannelName = async (name, topic) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.setTopic(id, topic);
    });

  /**
 * Unarchives a channel.
 * See: https://api.slack.com/methods/channels.unarchive
*/
  api.channels.unarchive = async id =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.unarchive", {
          channel: id
        })
    );

  /**
 * Unarchives a channel by a channel name.
 * See: unofficial method
*/
  api.channels.unarchiveByChannelName = async name =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.unarchive(id);
    });

  /**
 * Retrieve a thread of messages posted to a channel
 * See: https://api.slack.com/methods/channels.replies
*/
  api.channels.replies = async (id, thread_ts) =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.replies", {
          channel: id,
          thread_ts: thread_ts
        })
    );

  /**
 * Retrieve a thread of messages posted to a channel by a channel name
 * See: unofficial method
*/
  api.channels.repliesByChannelName = async (name, thread_ts) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.replies(id, thread_ts);
    });

  /**
 * Retrieve a thread of from the last message starting with a text and posted to a channel by a channel name
 * See: unofficial method
*/
  api.channels.repliesFromLastMessageStartingWithByChannelName = async (
    name,
    messageStartingText
  ) =>
    api.utils.handleError(async () => {
      let message = await api.channels.lastMessageStartingWithByChannelName(
        messageStartingText,
        name
      );
      return await api.channels.repliesByChannelName(name, message.ts);
    });

  /**
 * Removes a user from a channel.
 * See: https://api.slack.com/methods/channels.kick
*/
  api.channels.kick = async (id, userId) =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.kick", {
          channel: id,
          user: userId
        })
    );

  /**
 * Removes a user from a channel by channel name.
 * See: unofficial method
*/
  api.channels.kickByChannelName = async (name, userId) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.kick(id, userId);
    });

  /**
   * Removes a user by user name from a channel.
   * See: unofficial method
  */
  api.channels.kickByUserName = async (id, userName) =>
    api.utils.handleError(async () => {
      let userId = await api.users.getIdByUserName(userName);
      return await api.channels.kick(id, userId);
    });

  /**
 * Removes a user by user name from a channel by channel name.
 * See: unofficial method
*/
  api.channels.kickByChannelNameAndUserName = async (name, userName) =>
    api.utils.handleError(async () => {
      let userId = await api.users.getIdByUserName(userName);
      return await api.channels.kickByChannelName(name, userId);
    });

  /**
 * Invites a user to a channel.
 * See: https://api.slack.com/methods/channels.invite
*/
  api.channels.invite = async (id, userId) =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.invite", {
          channel: id,
          user: userId
        })
    );

  /**
* Invites a user from a channel by channel name.
* See: unofficial method
*/
  api.channels.inviteByChannelName = async (name, userId) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.invite(id, userId);
    });

  /**
 * Invites a user by user name from a channel.
 * See: unofficial method
*/
  api.channels.inviteByUserName = async (id, userName) =>
    api.utils.handleError(async () => {
      let userId = await api.users.getIdByUserName(userName);
      return await api.channels.invite(id, userId);
    });

  /**
* Invites a user by user name from a channel by channel name.
* See: unofficial method
*/
  api.channels.inviteByChannelNameAndUserName = async (name, userName) =>
    api.utils.handleError(async () => {
      let userId = await api.users.getIdByUserName(userName);
      return await api.channels.inviteByChannelName(name, userId);
    });

  /**
* Sets the read cursor in a channel.
* See: https://api.slack.com/methods/channels.mark
*/
  api.channels.mark = async (id, timestamp) =>
    api.utils.handleError(
      async () =>
        await api.utils.post("channels.mark", {
          channel: id,
          ts: timestamp
        })
    );

  /**
* Sets the read cursor in a channel by a channel name.
* See: unofficial method
*/
  api.channels.markByChannelName = async (name, timestamp) =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      return await api.channels.mark(id, timestamp);
    });

  /**
* Sets the read cursor in a channel by a channel name and the latest message by channel name.
* See: unofficial method
*/
  api.channels.markByChannelNameAndLastMessageByChannelName = async name =>
    api.utils.handleError(async () => {
      let id = await api.channels.getIdByChannelName(name);
      let ts = await api.channels.getTimestampOflastMessageByChannelName(name);
      return await api.channels.mark(id, ts);
    });
};