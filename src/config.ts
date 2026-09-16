// ==============================================================
//  WEDDING CONFIG — Rohit weds Shirin
// ==============================================================

export const wedding = {
  groom: "Rohit",
  bride: "Shirin",
  groomFull: "Rohit",
  brideFull: "Shirin",
  groomParents: "Son of Mr. Abdur Rashid Mondal & Mrs. Nur Nahar Begum",
  brideParents: "Daughter of Mr. Md Ezaz & Mrs. Shamsunnahar Khatun",
  hashtag: "#RohitWedsShirin",
  monogram: "R ♡ S",

  // Wedding muhurat / timing (target: 22nd Nov 2026 at 6:00 PM IST)
  dateISO: "2026-11-22T18:00:00+05:30",
  dateLabel: "Sunday, 22nd November 2026",
  timeLabel: "6:00 PM Onwards",

  venue: {
    name: "Orchid Garden & Banquet",
    address: "Dakshin Barasat, South 24 Parganas, West Bengal",
    mapsQuery: "Orchid Garden & Banquet, Dakshin Barasat, South 24 Pgs",
    shareUrl: "https://share.google/1BE89hN773v1UuRiA",
  },

  verse: {
    arabic: "بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ",
    translation: "In the name of Allah, the Most Gracious, the Most Merciful",
    kicker: "IN THE NAME OF ALLAH, THE MOST MERCIFUL",
    invitation: "We joyfully invite you to celebrate our wedding",
    quranRef: "Surah Ar-Rum 30:21",
    quranVerse:
      "“And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them; and He placed between you love and mercy.”",
    text: "We seek your blessings and request the pleasure of your gracious presence on the auspicious occasion of our marriage ceremony.\n\nYour presence would add immense happiness to the celebration, and we would be honored to have you join us on this special day.",
  },

  // The main celebration event
  events: [
    {
      name: "Wedding Celebration",
      icon: "heart",
      date: "Sunday, 22nd November 2026",
      dayLabel: "Sunday",
      dayNum: "22",
      monthLabel: "November 2026",
      time: "6:00 PM Onwards",
      venue: "Orchid Garden & Banquet, Dakshin Barasat",
      note: "Nikah ceremony and reception dinner celebrating our wedding ceremony.",
    },
  ],

  // Ceremony program flow
  program: [
    { name: "Arrival of Guests", time: "6:00 PM" },
    { name: "Nikah Ceremony & Dua", time: "7:00 PM" },
    { name: "Dinner & Reception", time: "8:00 PM" },
    { name: "Rukhsati & Blessings", time: "10:30 PM" },
  ],

  sections: {
    events: true,
    venue: true,
    countdown: false,
  },

  music: {
    title: "Amaran - Uyire (Instrumental)",
    m4a: "/assets/music.m4a",
    webm: "/assets/music.webm",
  },
};

// Google Calendar deep link
export const googleCalendarUrl = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${wedding.groom} weds ${wedding.bride} — Wedding Celebration`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// Downloadable .ics file (works with Apple / Outlook / any calendar)
export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${wedding.groom} weds ${wedding.bride}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.groom}-${wedding.bride}-wedding.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl = wedding.venue.shareUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  wedding.venue.mapsQuery
)}`;
