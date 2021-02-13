import BaseCommand from '../../../../structures/commands/BaseCommand.js'

export default class Ban extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Ban, {
      category: category,

      name: 'star platinum ban',
      aliases: ['punch'],
      description: 'Ban provided user',
      usage: 'star platinum ban <@ mention> [reason]',
      params: [
        {
          name: 'mention',
          description: 'The user you want to ban.',
          type: 'mention',
          required: true
        },
        {
          name: 'reason',
          description: 'The reason you issued this ban.',
          type: 'string',
          default: null,
          allow_sentence: true
        }
      ],
      permissions: {
        logic: 'AND',
        levels: [
          {
            type: 'SERVER',
            name: 'BAN_MEMBERS'
          }
        ]
      },
      self_permission: {
        text_channel: 'BAN_MEMBERS'
      },
      example: 'star platinum ban @Yimura#6969'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    const mention =
      this.msgObj.mentions.members.first() ||
      this.msgObj.guild.members.cache.get(this.args[0])

    const errorEmbed = new this.Discord.MessageEmbed().setColor(
      this._m.config.colors.error
    )

    if (!mention) {
      errorEmbed.setTitle('Invalid user was mentioned, please try again.')
      this.send(errorEmbed)

      return true
    }

    errorEmbed.setTitle("Couldn't ban " + mention.user.tag)

    if (mention.permissions.has('BAN_MEMBERS')) {
      errorEmbed.setDescription(
        mention.toString() + ' has the `BAN_MEMBERS` permission.'
      )
      this.send(errorEmbed)

      return true
    }

    if (!mention.manageable) {
      errorEmbed.setDescription(
        mention.toString() + ' is higher than me in the roles hierarchy.'
      )
      this.send(errorEmbed)

      return true
    }

    const reason = this.args.length > 1 ? this.args.slice(1) : false

    try {
      await mention.ban({
        reason:
          'Banned by: ' + this.user.tag + (reason ? ' for: ' + reason : '')
      })
      const items = [
        'https://i.imgur.com/6ucyz3a.gif',
        'https://i.imgur.com/kheevZ6.gif',
        'https://i.imgur.com/WKn212N.gif',
        'https://i.imgur.com/DRy61OC.gif'
      ]
      const item = items[Math.floor(Math.random() * items.length)]
      const embed = new this.Discord.MessageEmbed()
        .setTitle('ORAORAORAORAORAORAORAORA')
        .setAuthor(
          this.user.tag,
          this.user.displayAvatarURL({
            format: 'png',
            dynamic: true
          })
        )
        .addField('Banned user', mention.toString(), true)
        .addField('Banned by', this.user.toString(), true)
        .addField('Reason', reason || 'None', true)
        .setTimestamp()
        .setImage(item)
        .setFooter('Banned on: ')
        .setColor(this.randomEmbedColor)
      this.send(embed)
    } catch {
      this.send(errorEmbed)
    }

    return true
  }
}
