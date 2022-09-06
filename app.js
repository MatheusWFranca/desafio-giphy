const form = document.querySelector('form')
const result = document.querySelector('body > section > div')

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const gif = await getGif()

  if (gif) {
    result.innerHTML += `<img src="${gif}">`
  }
})


const getApi = async () => {
  try {
    const input = document.querySelector('input')
    const api = `https://api.giphy.com/v1/gifs/search?api_key=Va46u3rKjsmcwhETX77jxDbRUr25ABD8&limit=1&q=${input.value}`

    const searchApi = await fetch(api)

    if (searchApi.status !== 200 && !searchApi.data) {
      throw new Error('Nada encontrado')
    }

    return searchApi.json()
  } catch (error) {
    console.log(error.message)
  }
}

const getGif = async () => {
  try {
    const gif = await getApi()
    const gifSearched = gif.data[0].images.downsized_medium.url

    return gifSearched
  } catch (e) {
    console.log(e)
    alert('Nada encontrado')
  }
}