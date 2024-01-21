import './style.css'
import Split from 'split-grid'
import { encode, decode } from 'js-base64'

Split({
  columnGutters: [{
    track: 1,
    element: document.querySelector('.gutter-col-1'),
  }],
  rowGutters: [{
    track: 1,
    element: document.querySelector('.gutter-row-1'),
  }]
})

const $ = selector => document.querySelector(selector)

const $js = $('#js')
const $css = $('#css')
const $html = $('#html')

$js.addEventListener('input', update)

$css.addEventListener('input', update)

$html.addEventListener('input', update)

function init () {
  const { pathname } = window.location

  const [rawHtml, rawCss, rawJs] = pathname.slice(1).split('%7C')
  console.log({rawHtml, rawCss, rawJs})

  const html = decode(rawHtml)
  const css = decode(rawCss)
  const js = decode(rawJs)
  
  $html.value = html
  $css.value = css
  $js.vale = js

  const htmlForPreview = createHtml({html, js, css})
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

function update () {
  const html = $html.value
  const css = $css.value
  const js = $js.value

  const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`
  
  history.replaceState(null, null, `/${hashedCode}`)

  const htmlForPreview = createHtml({html, js, css})
  $('iframe').setAttribute('srcdoc', htmlForPreview)
}

const createHtml = ({html, js, css}) => {

  return `
  <html>
    <head>
      <style>${css}</style>
    </head>
    <body>
      <script>${js}</script>
      ${html}
    </body>`
 
}

init()