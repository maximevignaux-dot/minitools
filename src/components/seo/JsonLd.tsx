interface Props {
  data: object | object[] | null;
}

export function JsonLd({ data }: Props) {
  if (!data) return null;
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
