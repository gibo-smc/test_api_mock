const bodyPerser = require('body-parser')

const items = {
  apple: {
    name: 'りんご',
    limit: 5,
    price: 100
  },
  orange: {
    name: 'みかん',
    limit: 10,
    price: 300
  },
  melon: {
    name: 'めろん',
    limit: 1,
    price: 10000
  }
}

module.exports = app => {
  app.use(bodyPerser.json())
  app.post("/api/shopping", (req, res) => {
    console.log('req.body', req.body)
    const { itemId, amount} = req.body
    const limit = items[itemId].limit
    const itemName = items[itemId].name
    // 上限数エラー
    if (limit < amount) {
      res.status(400).json({ message: `${itemName}はお一人様${limit}個までです！` })
      return
    }
    // 成功
    res.json({
      itemName,
      amount,
      totalPrice: items[itemId].price * amount
    })
  })
}