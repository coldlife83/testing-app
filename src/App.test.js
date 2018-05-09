
const puppeteer = require('puppeteer')
let browser
let page
beforeAll(async () => {
  browser = await puppeteer.launch(isDebugging())
  page = await browser.newPage()
  await page.goto('http://localhost:3000/')
  page.setViewport({width: 500, height: 2400 })
})

afterAll(() => {
  if( isDebugging()) {
    browser.close()
  }
})

const isDebugging = () => {
  const debugging_mode = {
    headless: false,
    slowMo: 250,
    devtools: true,
  }
  return process.env.NODE_ENV === 'debug' ? debugging_mode : {}
}

describe('on page load', () => {
  test('h1 loads correctly', async() => {
    
    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: ''
    })

    await page.goto('http://localhost:3000/')
    const html = await page.$eval('.App-title', e => e.innerHTML)
    expect(html).toBe('Welcome to React')
  },
  16000
  )

  test('nav loads correctly', async () => {
    const navbar = await page.$eval('.navbar', el => el ? true : false)
    const listItems = await page.$$('.nav-li')

    expect(navbar).toBe(true)
    expect(listItems.length).toBe(4)
  })
})