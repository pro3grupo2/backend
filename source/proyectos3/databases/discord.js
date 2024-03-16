const {Webhook} = require('discord-webhook-node')

const hook_errors = new Webhook('https://discord.com/api/webhooks/1218293234661462087/Zb-GqwK4JZkloexknHOCPJkxdYmDso-OQV6BeYP_8SzRNoaeDXqzlL9zCli2ZDo7zLxQ')
hook_errors.setUsername('Reservorio U-Tad - Errores')
hook_errors.setAvatar('https://st1.u-tad.com/media/2020/11/Ij8G0b_x_400x400.png')

const hook_updates = new Webhook('https://discord.com/api/webhooks/1218510988790464522/eKUiBNIJGzd5B_WV1TZ4H-k3L-NOjZfWw1oBXWQLIzXB0BW1dQfSFdP4uYy68jizOKgt')
hook_updates.setUsername('Reservorio U-Tad - Updates')
hook_updates.setAvatar('https://st1.u-tad.com/media/2020/11/Ij8G0b_x_400x400.png')

module.exports = {
    hook_errors,
    hook_updates
}
