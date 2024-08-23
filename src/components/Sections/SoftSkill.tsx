import React from 'react'
import { Card, Subtitle2 } from '@fluentui/react-components'
import type * as t from '~/types'
import { Paragraph } from '../Paragraph'

export const SoftSkill = (props: t.SoftSkill): React.JSX.Element => {

  return (
    <Card>
      <Subtitle2>{props.name}</Subtitle2>
      <Paragraph>{props.description}</Paragraph>
    </Card>
  )
}
