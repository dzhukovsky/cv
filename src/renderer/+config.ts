import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

// https://vike.dev/config
export default {
  extends: vikeReact,
  // https://vike.dev/clientRouting
  clientRouting: true,
  // https://vike.dev/meta
  meta: {
    // Define new setting 'title'
    title: {
      env: { server: true, client: true },
    },
    // Define new setting 'description'
    description: {
      env: { server: true },
    },
  },
  hydrationCanBeAborted: true,
} satisfies Config;
