module.exports = countdown = (tick) => {
  let count = 5;

  let timer = setInterval(_ => {
    tick(count--)
    console.log(count)
    if (count === -1) {
      clearInterval(timer)
    }
  }, 500)
}

