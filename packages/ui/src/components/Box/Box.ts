import { createBox } from '@dessert-box/react'
import { atoms } from '../../css/sprinkles.css'
import { AtomsFnBase } from '@dessert-box/core'

export const Box = createBox({ atoms })

declare type HTMLProperties = Omit<React.AllHTMLAttributes<HTMLElement>, 'as' | 'color' | 'height' | 'width'>

export type BoxProps<T extends AtomsFnBase = any> = Parameters<T>[0] & HTMLProperties & React.RefAttributes<HTMLElement>
