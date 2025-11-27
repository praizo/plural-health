// app/fonts.ts
import localFont from 'next/font/local'

const gilroy = localFont({
  src: [
    {
      path: './fonts/gilroy-light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/gilroy-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/gilroy-medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/gilroy-bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/gilroy-heavy.ttf',
      weight: '800',      
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
  preload: true,
})

export default gilroy