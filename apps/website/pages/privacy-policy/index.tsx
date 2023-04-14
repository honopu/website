import { GetStaticProps } from 'next';
import path from 'path';
import { BlogLayout } from '../../layouts/Blog/Blog';
import { ComponentProps } from 'react';
import { parseFileByPath, renderMarkdown } from '@ironfish/markdown';
import { assertString } from '@ironfish/utils';
import { MDXRenderer } from '@ironfish/website/ui';

type Props = {
  markdown: ComponentProps<typeof MDXRenderer>['markdown'];
};

export default function PrivacyPolicy({ markdown }: Props) {
  return <BlogLayout title="Privacy Policy" markdown={markdown} />;
}

const CONTENT_PATH = path.join(
  process.cwd(),
  'apps',
  'website',
  'content',
  'legal',
  'privacy-policy.mdx'
);

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { frontMatter, content } = parseFileByPath(CONTENT_PATH);

  const markdown = await renderMarkdown(content);

  return {
    props: {
      title: assertString(frontMatter.title),
      description: assertString(frontMatter.description, ''),
      markdown,
    },
  };
};
