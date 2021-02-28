import BaseCommand from '../../../structures/commands/BaseCommand.js'

export default class Unban extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(Unban, {
      category: category,

      name: 'crazy diamond',
      aliases: ['unban'],
      description: 'Unban provided user',
      usage: 'crazy diamond <ID> [reason]',
      params: [
        {
          name: 'id',
          description: 'The id of the user you want to unban.',
          type: 'string',
          required: true
        },
        {
          name: 'reason',
          description: 'The reason you issued this unban.',
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
            name: 'BAN_MEMBERS'
          }
        ]
      },
      self_permission: {
        text_channel: 'BAN_MEMBERS'
      },
      example: 'crazy diamond @Yimura#6969'
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    const mention =
      this.msgObj.mentions.members.first() ||
      this.msgObj.guild.members.cache.get(this.args[0]) ||
      this.args[0]

    const errorEmbed = new this.Discord.MessageEmbed().setColor(
      this._m.config.colors.error
    )

    if (!mention) {
      errorEmbed.setTitle('Invalid id was provided, please try again.')
      this.send(errorEmbed)

      return true
    }

    errorEmbed.setTitle("Couldn't unban " + mention.toString())

    const reason = this.args.length > 1 ? this.args[1].join(" ") : false

    try {
      await this.msgObj.guild.members.unban(
        mention,
        'Unbanned by: ' + this.user.tag + (reason ? ' for: ' + reason : '')
      )
      const items = [
        'https://i.imgur.com/DTg3Vgy.gif',
        'https://i.imgur.com/N3CRfX5.gif',
        'https://i.imgur.com/BOMgn93.gif'
      ]
      const item = items[Math.floor(Math.random() * items.length)]
      const embed = new this.Discord.MessageEmbed()
        .setTitle('DORARARARARA')
        .setAuthor(
          this.user.tag,
          this.user.displayAvatarURL({
            format: 'png',
            dynamic: true
          })
        )
        .addField('Unbanned user', mention.toString(), true)
        .addField('Unbanned by', this.user.toString(), true)
        .addField('Reason', reason || 'None', true)
        .setTimestamp()
        .setImage(item)
        .setFooter('Unbanned on: ')
        .setColor(this.randomEmbedColor)
      this.send(embed)
    } catch {
      this.send(errorEmbed)
    }

    return true
  }
}
