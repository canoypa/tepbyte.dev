import { FC, PropsWithChildren } from 'react'

export type MarkdownComponentProps = PropsWithChildren<{
  node: any
}>
export type MdFC = FC<MarkdownComponentProps>
export type MarkdownComponents = Record<string, MdFC>
