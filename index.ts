import {groupBy as _groupBy} from 'lodash'
import styles from './index.module.less'
import { unary } from '@/utils.js'
import { next } from '@components/Counter.js'

console.log(import.meta.env.VITE_APP_KEY, styles)
const add = (a: number, b: number) => a + b
const add10 = unary(add, 10)

console.log(add10(15))
console.log(next())

export const groupBy = (...args: any[]) => _groupBy(...args)
document.body.className = styles.body;

fetch('/api/users').then(res => {
    console.log(res.json())
})