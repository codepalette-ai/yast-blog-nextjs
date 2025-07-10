import Image from 'next/image';

/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
export const mdxComponents = {
  h1: (props: any) => (
    <h1 className="mt-8 mb-4 font-bold text-4xl" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="mt-6 mb-3 border-b pb-2 font-bold text-3xl" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="mt-4 mb-2 font-bold text-2xl" {...props} />
  ),
  p: (props: any) => (
    <p
      className="text-foreground leading-7 [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
  code: (props: any) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm"
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre className="mt-6 mb-4 overflow-x-auto rounded-lg border bg-black p-4">
      <code className="text-white" {...props} />{' '}
    </pre>
  ),
  Image: (props: any) => <Image className="my-6 rounded-lg" {...props} />,
};
