interface ContentPageProps {
  title: string;
  htmlContent: string;
}

export default function ContentPage({ title, htmlContent }: ContentPageProps) {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <article className="rounded-2xl bg-white px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">{title}</h1>
          <hr className="my-6 border-0 border-t border-dashed border-gray-300" />
          <div
            className="content-body text-sm leading-7 text-gray-500 sm:text-[15px] sm:leading-8 [&_ol]:list-decimal [&_ol]:space-y-4 [&_ol]:pl-5 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-gray-600"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
}
