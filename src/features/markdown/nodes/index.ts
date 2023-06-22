import { MarkdownComponents } from '../types'
import { Break } from './break'
import { Delete } from './delete'
import { Emphasis } from './emphasis'
import { Heading } from './heading'
import { InlineCode } from './inline_code'
import { Link } from './link'
import { List } from './list'
import { ListItem } from './list_item'
import { Paragraph } from './paragraph'
import { Root } from './root'
import { Strong } from './strong'
import { Text } from './text'

export const components: MarkdownComponents = {
  root: Root,
  paragraph: Paragraph,
  heading: Heading,
  list: List,
  listItem: ListItem,
  text: Text,
  emphasis: Emphasis,
  strong: Strong,
  inlineCode: InlineCode,
  delete: Delete,
  link: Link,
  break: Break,
}
