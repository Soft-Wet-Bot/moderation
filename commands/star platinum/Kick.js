import BaseCommand from '../../../../structures/commands/BaseCommand.js'

export default class Kick extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Kick, {
      category: category,

      name: 'star platinum kick',
      aliases: ['star finger'],
      description: 'Kick provided user',
      usage: 'star platinum kick <mention> [reason]',
      params: [
        {
          name: 'mention',
          description: 'The user you want to kick.',
          type: 'string',
          required: true
        },
        {
          name: 'reason',
          description: 'The reason you issued this kick.',
          type: 'string',
          default: null,
          is_sentence: true
        }
      ],
      permissions: {
        logic: 'AND',
        levels: [
          {
            type: 'SERVER',
            name: 'KICK_MEMBERS'
          }
        ]
      },
      self_permission: {
        text_channel: 'KICK_MEMBERS'
      },
      example: 'star platinum kick @Yimura#6969'
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

    errorEmbed.setTitle("Couldn't kick " + mention.user.tag)

    if (mention.permissions.has('KICK_MEMBERS')) {
      errorEmbed.setDescription(
        mention.toString() + ' has the `KICK_MEMBERS` permission.'
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

    const reason = this.args.length > 1 ? this.args[1].join(" ") : false

    try {
      await mention.kick(
        'Kicked by: ' + this.user.tag + (reason ? ' for: ' + reason : '')
      )
      const items = [
        'https://i.imgur.com/tVcWEsv.gif',
        'https://i.imgur.com/7HfB9Ov.gif',
        'https://i.imgur.com/R0g1Dcl.gif'
      ]
      const item = items[Math.floor(Math.random() * items.length)]
      const embed = new this.Discord.MessageEmbed()
        .setTitle('STAR FINGER')
        .setAuthor(
          this.user.tag,
          this.user.displayAvatarURL({
            format: 'png',
            dynamic: true
          })
        )
        .addField('Kicked user', mention.toString(), true)
        .addField('Kicked by', this.user.toString(), true)
        .addField('Reason', reason || 'None', true)
        .setTimestamp()
        .setImage(item)
        .setFooter('Kicked on: ')
        .setColor(this.randomEmbedColor)
      this.send(embed)
    } catch {
      this.send(errorEmbed)
    }

    return true
  }
}
