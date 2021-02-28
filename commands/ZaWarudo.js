import BaseCommand from '../../../structures/commands/BaseCommand.js'

export default class ZaWarudo extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(ZaWarudo, {
      category: category,

      name: 'za warudo',
      aliases: ['the world'],
      description:
        'Enables slow mode for the current channel, use "za warudo reset" to reset the effects of this command.',
      usage: 'za warudo <seconds>',
      params: [
        {
          name: 'seconds',
          description: 'The amount of seconds for slow mode, 0 to reset.',
          type: 'int',
          required: true
        }
      ],
      permissions: {
        logic: 'AND',
        levels: [
          {
            type: 'SERVER',
            name: 'MANAGE_CHANNELS'
          }
        ]
      },
      self_permission: {
        text_channel: 'MANAGE_CHANNELS'
      },
      example: 'the world 60'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    const amount = this.args[0]
    if (isNaN(amount) || amount % 1 !== 0 || amount > 120 || amount < 5) {
      if (this.args[0] !== 'reset' && this.args[0] !== '0') {
        const embed = new this.Discord.MessageEmbed()
          .setColor(this._m.config.colors.error)
          .setTitle('Please provide a valid number.')
          .setDescription(
            'The number needs to be a natural number (round and positive) and be between 5 and 120.\nTo undo the effects of **ZA WARUDO**, use `za warudo reset` or `za warudo 0`!'
          )
        this.send(embed)

        return true
      }

      this.textChannel.setRateLimitPerUser(0)
      const embed = new this.Discord.MessageEmbed()
        .setTitle('Time has begun to move again!')
        .setImage('https://i.imgur.com/UsvBwzT.gif')
        .setColor(this._m.config.colors.success)
      this.send(embed)

      return true
    }

    this.textChannel.setRateLimitPerUser(amount)

    const items = [
      'https://i.imgur.com/7oeMpzm.gif',
      'https://i.imgur.com/93Odtaj.gif'
    ]
    const item = items[(Math.random() * items.length) | 0]
    const embed = new this.Discord.MessageEmbed()
      .setTitle(command.toUpperCase())
      .setImage(item)
      .setColor(this.randomEmbedColor)
    this.send(embed)
    this.send(
      'To undo the effects of **ZA WARUDO**, use `za warudo reset` or `za warudo 0`!'
    ).then((msg) => msg.delete({ timeout: 5e3 }))

    return true
  }
}
