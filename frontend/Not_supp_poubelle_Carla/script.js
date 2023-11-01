function displayItems(items) {
  const content = document.getElementById('content')
  content.innerHTML = ''
  items.forEach(item => {
    const imgContainer = document.createElement('div')
    imgContainer.className = 'img-container'

    const imgElement = document.createElement('img')
    imgElement.src = item.images.small
    imgContainer.appendChild(imgElement)

    content.appendChild(imgContainer)
  })
}
