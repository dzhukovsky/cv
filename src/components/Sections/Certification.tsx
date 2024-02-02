import React from 'react'
import { Card, Image, Link, Subtitle2, Text, makeStyles, mergeClasses, tokens } from '@fluentui/react-components'
import type * as t from '~/types'
import { Row } from '../Flex/Row'
import { Column } from '../Flex/Column'
import { useFlexStyles } from '../cssinjs/Flex'
import { useCommonStyles } from '../cssinjs/Common'

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalM

  },
  title: {
    alignSelf: 'start'
  },
  container: {
    width: '100%'
  }
})

export const Certification = (props: t.Certification): React.JSX.Element => {
  const styles = useStyles()
  const common = useCommonStyles()
  const flex = useFlexStyles()

  return (
        <Card className={mergeClasses(styles.root, flex.row, common.printCard)}>
            <Image src={props.issuingOrganizationIconUrl} height={32} width={32} />
            <Column className={styles.container}>
                <Link className={styles.title} appearance="subtle" href={props.credentialUrl} target="_blank">
                    <Subtitle2>
                        {props.name}
                    </Subtitle2>
                </Link>
                <Row className={flex.justifyBetween}>
                    <Text>
                        {[
                          props.issuingOrganization,
                          'Credential ID ' + props.credentialId
                        ].filter(x => x).join(' · ')}
                    </Text>
                    <Text>
                        {[
                          'Issued ' + props.issueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }),
                          props.expirationDate && ('Expires ' + props.expirationDate?.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }))
                        ].filter(x => x).join(' · ')}
                    </Text>
                </Row>
            </Column>
        </Card>
  )
}
