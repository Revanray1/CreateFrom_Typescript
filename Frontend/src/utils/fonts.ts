import {Kanit,Playfair_Display,Sofadi_One} from 'next/font/google'
const kanit_init = Kanit({
  subsets: ['latin'],
  weight: ['100','300','700'],
  variable : '--font-kanit',

})

const playfair_init = Playfair_Display({
  subsets: ['latin'],
  weight: ['600'],
  variable : '--font-playfair_display',

})  
const sofadi_one_init = Sofadi_One({
    subsets: ['latin'],
    weight: ['400'],
    variable : '--font-sofadi_one',
})

export const kanit = kanit_init.variable;
export const playfair_display = playfair_init.variable;
export const sofadi_one = sofadi_one_init.variable;