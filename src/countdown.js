module.exports = countdown = () => {
  let count = 5;

  let timer = setInterval(_ => {
    count--
    console.log(count)
    if (count === 0) {
      clearInterval(timer)
    }
  }, 500)
}

