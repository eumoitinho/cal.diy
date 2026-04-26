import { markdownToSafeHTML } from "@calcom/lib/markdownToSafeHTML";

import { portfolioTheme } from "../lib/portfolioTheme";

const Spacer = () => <p style={{ height: 6 }} />;

export const Info = (props: {
  label: string;
  description: React.ReactNode | undefined | null;
  extraInfo?: React.ReactNode;
  withSpacer?: boolean;
  lineThrough?: boolean;
  formatted?: boolean;
  isLabelHTML?: boolean;
}) => {
  if (!props.description || props.description === "") return null;

  const safeDescription = markdownToSafeHTML(props.description.toString()) || "";
  const safeLabel = markdownToSafeHTML(props.label.toString());

  const StyledHtmlContent = ({ htmlContent }: { htmlContent: string }) => {
    const css = `color: ${portfolioTheme.color.foreground}; font-weight: 400; line-height: 24px; margin: 0;`;
    return (
      <p
        className="dark:text-darkgray-600 mt-2 text-sm text-gray-500 [&_a]:text-blue-500 [&_a]:underline [&_a]:hover:text-blue-600"
        // eslint-disable-next-line react/no-danger
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Content is sanitized via markdownToSafeHTML
        dangerouslySetInnerHTML={{
          __html: htmlContent
            .replaceAll("<p>", `<p style="${css}">`)
            .replaceAll("<li>", `<li style="${css}">`),
        }}
      />
    );
  };

  return (
    <>
      {props.withSpacer && <Spacer />}
      <div>
        <p style={{ color: portfolioTheme.color.foregroundMuted, fontFamily: portfolioTheme.font.mono, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 6px" }}>
          {props.isLabelHTML ? <StyledHtmlContent htmlContent={safeLabel} /> : props.label}
        </p>
        <p
          style={{
            color: portfolioTheme.color.foreground,
            fontFamily: portfolioTheme.font.sans,
            fontWeight: 400,
            lineHeight: "24px",
            whiteSpace: "pre-wrap",
            textDecoration: props.lineThrough ? "line-through" : undefined,
          }}>
          {props.formatted ? <StyledHtmlContent htmlContent={safeDescription} /> : props.description}
        </p>
        {props.extraInfo}
      </div>
    </>
  );
};
