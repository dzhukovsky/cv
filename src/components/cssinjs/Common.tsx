import { makeStyles, shorthands, tokens } from '@fluentui/react-components'

export const useCommonStyles = makeStyles({
  printCard: {
    '@media print': {
      // ...shorthands.padding(`var(${cardCSSVars.cardSizeVar})`, 0),
      boxShadow: 'none',
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke2)
    }
  },
  noBreak: {
    '@media print': {
      breakInside: 'avoid',
      pageBreakInside: 'avoid'
    }
  },
  noBreakBefore: {
    '@media print': {
      breakBefore: 'avoid',
      pageBreakBefore: 'avoid'
    }
  }
})

export const media = {
  sm: '@media (min-width: 480px)',
  md: '@media (min-width: 640px)',
  lg: '@media (min-width: 1000px)'
}
