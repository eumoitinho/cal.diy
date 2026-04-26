import type { CSSProperties } from "react";

import { portfolioTheme } from "../lib/portfolioTheme";

import EmailCommonDivider from "./EmailCommonDivider";

const EmailScheduledBodyHeaderContent = (props: {
  title: string;
  subtitle?: React.ReactNode;
  headStyles?: CSSProperties;
}) => (
  <EmailCommonDivider headStyles={{ padding: 0, ...props.headStyles }} mutipleRows>
    <tr>
      <td
        align="center"
        style={{
          fontSize: 0,
          padding: "10px 25px",
          paddingTop: 24,
          paddingBottom: 0,
          wordBreak: "break-word",
        }}>
        <div
          data-testid="heading"
          style={{
            fontFamily: portfolioTheme.font.serif,
            fontSize: 28,
            fontWeight: 500,
            lineHeight: "32px",
            letterSpacing: "-0.02em",
            textAlign: "center",
            color: portfolioTheme.color.foreground,
          }}>
          {props.title}
        </div>
      </td>
    </tr>
    {props.subtitle && (
      <tr>
        <td align="center" style={{ fontSize: 0, padding: "10px 25px", wordBreak: "break-word" }}>
          <div
            data-testid="subHeading"
            style={{
              fontFamily: portfolioTheme.font.sans,
              fontSize: 15,
              fontWeight: 400,
              lineHeight: "24px",
              textAlign: "center",
              color: portfolioTheme.color.foregroundMuted,
            }}>
            {props.subtitle}
          </div>
        </td>
      </tr>
    )}
  </EmailCommonDivider>
);

export default EmailScheduledBodyHeaderContent;
