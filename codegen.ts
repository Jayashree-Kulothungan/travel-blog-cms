import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://travel-blog-cms.local/graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
