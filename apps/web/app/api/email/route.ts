import { defaultResponderForAppDir } from "app/api/defaultResponderForAppDir";
import { NextResponse } from "next/server";

import renderEmail from "@calcom/emails/src/renderEmail";
import { getTranslation } from "@calcom/i18n/server";
import { IS_PRODUCTION } from "@calcom/lib/constants";

async function getHandler(request: Request) {
  if (IS_PRODUCTION) {
    return new NextResponse("Only for development purposes", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const template = searchParams.get("template") ?? "AttendeeScheduledEmail";

  const t = await getTranslation("pt-BR", "common");

  const emailHtml = await renderTemplate(template, t);

  if (!emailHtml) {
    return new NextResponse(`Unknown template "${template}". Try AttendeeScheduledEmail or MonthlyDigestEmail.`, {
      status: 400,
    });
  }

  const response = new NextResponse(emailHtml);
  response.headers.set("Content-Type", "text/html");
  response.headers.set("Cache-Control", "no-cache, no-store, private, must-revalidate");
  return response;
}

async function renderTemplate(template: string, t: Awaited<ReturnType<typeof getTranslation>>) {
  if (template === "AttendeeScheduledEmail") {
    const startTime = "2026-04-29T14:00:00.000-03:00";
    const endTime = "2026-04-29T14:30:00.000-03:00";
    const calEvent = {
      type: "30-minute-meeting",
      title: "Conversa de 30 minutos entre João Moitinho e Convidado",
      startTime,
      endTime,
      location: "integrations:google:meet",
      additionalNotes: "Quero entender melhor sobre Cal.com self-hosted.",
      organizer: {
        name: "João Vitor Moitinho",
        email: "joao.moitinho@m2z.com.br",
        timeZone: "America/Sao_Paulo",
        language: { translate: t, locale: "pt-BR" },
        username: "moitinho",
      },
      attendees: [
        {
          name: "Convidado de Exemplo",
          email: "convidado@example.com",
          timeZone: "America/Sao_Paulo",
          language: { translate: t, locale: "pt-BR" },
        },
      ],
      uid: "preview-mock-uid",
      bookerUrl: "https://calendar.moitinho.dev",
      videoCallData: {
        type: "google_meet_video",
        id: "abc-defg-hij",
        password: "",
        url: "https://meet.google.com/abc-defg-hij",
      },
    };

    return renderEmail("AttendeeScheduledEmail", {
      calEvent,
      attendee: calEvent.attendees[0],
    });
  }

  if (template === "MonthlyDigestEmail") {
    return renderEmail("MonthlyDigestEmail", {
      language: t,
      Created: 12,
      Completed: 13,
      Rescheduled: 14,
      Cancelled: 16,
      mostBookedEvents: [
        { eventTypeId: 3, eventTypeName: "Test1", count: 3 },
        { eventTypeId: 4, eventTypeName: "Test2", count: 5 },
      ],
      membersWithMostBookings: [
        {
          userId: 4,
          user: { id: 4, name: "User1 name", email: "email.com", avatar: "none", username: "User1" },
          count: 4,
        },
        {
          userId: 6,
          user: { id: 6, name: "User2 name", email: "email2.com", avatar: "none", username: "User2" },
          count: 8,
        },
      ],
      admin: { email: "admin.com", name: "admin" },
      team: { name: "Team1", id: 4 },
    });
  }

  return null;
}

export const GET = defaultResponderForAppDir(getHandler);
