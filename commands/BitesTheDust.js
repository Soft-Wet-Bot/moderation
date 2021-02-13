import BaseCommand from '../../../structures/commands/BaseCommand.js'

export default class BitesTheDust extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(BitesTheDust, {
      category: category,

      name: 'bites the dust',
      aliases: ['king crimson', 'killer queen', 'the hand', 'za hando'],
      description: 'Remove a given amount of messages in the current channel',
      usage: 'bites the dust <#amount>',
      params: [
        {
          name: 'amount',
          description: 'The message count to remove',
          type: 'number',
          required: true
        }
      ],
      permissions: {
        logic: 'AND',
        levels: [
          {
            type: 'SERVER',
            name: 'MANAGE_MESSAGES'
          }
        ]
      },
      self_permission: {
        text_channel: 'MANAGE_MESSAGES'
      },
      example: 'bites the dust 15'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    if (
      isNaN(this.args[0]) ||
      this.args[0] % 1 !== 0 ||
      this.args[0] > 100 ||
      this.args[0] < 0
    ) {
      const embed = new this.Discord.MessageEmbed()
        .setTitle('Please provide a valid number.')
        .setDescription('The number needs to be positive and smaller than 100.')
        .setColor(this._m.config.colors.error)
      this.send(embed)
      return true
    }

    const amount = Number(this.args[0]) === 100 ? 100 : this.args[0]++

    // Await because it could fail and then we can catch it within our normal try catch clause
    const deletedMessages = await this.textChannel.bulkDelete(amount, true)

    if (deletedMessages.size < amount) {
      const embed = new this.Discord.MessageEmbed()
        .setTitle(
          "Due to limitations imposed by Discord I can't delete messages older than 14 days"
        )
        .setDescription('I deleted as many as I could!')
        .setColor(this.randomEmbedColor)
      return this.send(embed)
    }

    const items = [
      'https://i.imgur.com/L7HF70j.gif',
      'https://i.imgur.com/UWKNByz.gif',
      'https://i.imgur.com/VAXy9IN.gif'
    ]
    const item = items[Math.floor(Math.random() * items.length)]
    const embed = new this.Discord.MessageEmbed()
      .setTitle('BITES THE DUST')
      .setImage(item)
      .setColor(this.randomEmbedColor)
    this.send(embed)

    return true
  }
}
