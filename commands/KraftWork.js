import BaseCommand from '../../../structures/commands/BaseCommand.js'

export default class KraftWork extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(KraftWork, {
      category: category,

      name: 'kraft work',
      aliases: [],
      description:
        'This command prevents anyone from sending messages, redoing the command will disable the effects of this command.',
      usage: 'kraft work',
      params: [],
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
      example: ''
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  run(command) {
    let permissionOverwrites = [
      {
        id: this.msgObj.guild.id,
        deny: ['SEND_MESSAGES']
      }
    ]
    let reason = 'Krafts Work LockDown'

    if (
      !this.textChannel
        .permissionsFor(this.msgObj.guild.id)
        .has('SEND_MESSAGES')
    ) {
      permissionOverwrites = [
        {
          id: this.msgObj.guild.id,
          allow: ['SEND_MESSAGES']
        }
      ]

      reason = 'Krafts Work Unlock'
    }

    this.textChannel.overwritePermissions(permissionOverwrites, reason)

    const items = [
      'https://i.imgur.com/dd0m0XG.gif',
      'https://i.imgur.com/1N7bfMD.gif'
    ]
    const item = items[(Math.random() * items.length) | 0]
    const embed = new this.Discord.MessageEmbed()
      .setAuthor('KRAFT WORK')
      .setTitle(reason)
      .setImage(item)
      .setColor(this.randomEmbedColor)
    this.send(embed)
    this.send(
      'To undo the effects of Kraft Work, use `kraft work` again.'
    ).then((msg) => msg.delete({ timeout: 5e3 }))

    return true
  }
}
