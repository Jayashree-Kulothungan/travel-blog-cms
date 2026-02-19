import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const endpoint =
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_ENDPOINT ||
  'http://travel-blog-cms.local/graphql';

const config: CodegenConfig = {
  schema: endpoint,
  documents: 'src/graphql/**/*.graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
