const clear = (image: HTMLImageElement) => {
  image.style.backgroundImage = ''
}

for (const image of document.querySelectorAll<HTMLImageElement>(
  '[data-blurhash]',
)) {
  if (image.complete) {
    clear(image)
    continue
  }
  // 読み込みに失敗しても剥がす。先に起きた方で両方の listener を外す
  const settled = new AbortController()
  const onSettled = () => {
    clear(image)
    settled.abort()
  }
  image.addEventListener('load', onSettled, { signal: settled.signal })
  image.addEventListener('error', onSettled, { signal: settled.signal })
}
