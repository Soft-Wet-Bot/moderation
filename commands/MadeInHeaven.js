import BaseCommand from '../../../structures/commands/BaseCommand.js'

export default class MadeInHeaven extends BaseCommand {
  /**
   * @param {string} category
   * @param {Array<*>} args
   */
  constructor(category, ...args) {
    super(...args)

    this.register(MadeInHeaven, {
      category: category,

      name: 'made in heaven',
      aliases: ['madeinheaven'],
      description: 'Clear all messages in a channel',
      usage: 'made in heaven',
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
      }
    })
  }

  /**
   * @param {string} command string representing what triggered the command
   */
  async run(command) {
    console.log(this.user.username)
    let embed = new this.Discord.MessageEmbed()
      .setAuthor(
        this.user.username,
        this.user.displayAvatarURL({
          format: 'png',
          dynamic: true
        })
      )
      .setTitle('MADE IN HEAVEN IS ABOUT TO START')
      .setDescription(
        'Reply with __yes__ to start it!\n__Made in heaven will **delete** all messages in this channel!__'
      )
      .setFooter('This is irreversible.')
      .setColor(this._m.config.colors.warn)
    await this.send(embed)
    const response = await this.textChannel
      .awaitMessages((m) => m.author.id === this.user.id, {
        max: 1,
        time: 30000,
        errors: ['time']
      })
      .catch((collected) => null)
    if (response == null) {
      embed = new this.Discord.MessageEmbed()
        .setAuthor(
          this.user.username,
          this.user.displayAvatarURL({
            format: 'png',
            dynamic: true
          })
        )
        .setDescription('Took too long to reply')
        .setColor(this._m.config.colors.error)
      return this.send(embed)
    } else if (
      !['yes', 'ye', 'yas', 'ya', 'y'].includes(
        response.first().content.toLowerCase()
      )
    ) {
      embed = new this.Discord.MessageEmbed()
        .setAuthor(
          this.user.username,
          this.user.displayAvatarURL({
            format: 'png',
            dynamic: true
          })
        )
        .setDescription('Aborted')
        .setColor(this._m.config.colors.warn)
      return this.send(embed)
    }

    const items = [
      'https://vignette.wikia.nocookie.net/jjba/images/f/fb/Made_in_Heaven_2.png',
      'https://vignette.wikia.nocookie.net/jjba/images/2/27/MadeinHeaven.png'
    ]
    const item = items[Math.floor(Math.random() * items.length)]
    const position = this.textChannel.rawPosition
    embed = new this.Discord.MessageEmbed()
      .setTitle('MADE IN HEAVEN')
      .setImage(item)
      .setColor(this.randomEmbedColor)
    await this.send(embed)
    await this.delay(3000)
    const clone = await this.textChannel.clone({
      reason: 'MADE IN HEAVEN'
    })
    await clone.setPosition(position, {
      reason: 'MADE IN HEAVEN'
    })
    this.textChannel.delete('MADE IN HEAVEN')
    return true
  }
}
