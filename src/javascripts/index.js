document.addEventListener('DOMContentLoaded', function () {
  const domIds = [
    'itemId',
    'amount',
    'btn',
    'staff'
  ]
  let dom = {}
  for (let id of domIds) {
    dom[id] = document.getElementById(id)
  }
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) {
      return
    }
    const res = JSON.parse(xhr.response)
    if (xhr.status === 400) {
      dom.staff.innerText = res.message
      return
    }
    dom.staff.innerText = `${res.itemName}を${res.amount}個お買い上げでお会計は${res.totalPrice}円です。`
  }
  dom.btn.addEventListener('click', () => {
    const amount = dom.amount.value
    if (amount === 0 || amount === '') {
      return
    }
    xhr.open('POST', '/api/shopping', false)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
      itemId: dom.itemId.value,
      amount
    }))
    xhr.abort()
  })
})