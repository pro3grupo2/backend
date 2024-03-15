const {Webhook} = require('discord-webhook-node')
const hook = new Webhook('https://discord.com/api/webhooks/1218293234661462087/Zb-GqwK4JZkloexknHOCPJkxdYmDso-OQV6BeYP_8SzRNoaeDXqzlL9zCli2ZDo7zLxQ')

hook.setUsername('Reservorio U-Tad - Errores')
hook.setAvatar('https://st1.u-tad.com/media/2020/11/Ij8G0b_x_400x400.png')

module.exports = hook