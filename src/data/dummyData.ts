
// Dummy user data
export const userData = {
  id: "1",
  name: "Arjun Mehta",
  username: "arjun-tatts",
  email: "arjun@example.com",
  bio: "Tattoo artist specializing in minimalist designs. Based in Mumbai, India. 5+ years of experience.",
  profileImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
  phone: "+91 98765 43210",
  createdAt: "2023-01-15T10:30:00Z",
};

// Dummy portfolio images
export const portfolioImages = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1571503464184-050a9c808ca0?q=80&w=400&auto=format&fit=crop",
    title: "Minimalist Lotus",
    description: "Simple line art lotus flower on forearm."
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1600471920771-1b7b98e35cb6?q=80&w=400&auto=format&fit=crop",
    title: "Custom Script",
    description: "Personalized calligraphy script on wrist."
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1580653926285-a8736ee6a5aa?q=80&w=400&auto=format&fit=crop",
    title: "Mountain Range",
    description: "Geometric mountain design on back."
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1542727365-19732a80dcfd?q=80&w=400&auto=format&fit=crop",
    title: "Floral Sleeve",
    description: "Detailed floral pattern sleeve design."
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1597217190093-96ef22f6717d?q=80&w=400&auto=format&fit=crop", 
    title: "Animal Silhouette",
    description: "Minimalist wolf silhouette design."
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1552627019-947c3789ffb5?q=80&w=400&auto=format&fit=crop",
    title: "Geometric Pattern",
    description: "Abstract geometric pattern on shoulder."
  }
];

// Dummy services data
export const servicesData = [
  {
    id: "s1",
    title: "Minimalist Tattoo",
    description: "Simple, clean line work design (up to 3 inches)",
    price: 1200,
    duration: 60, // minutes
  },
  {
    id: "s2",
    title: "Custom Script/Text",
    description: "Personalized text in your choice of style",
    price: 800,
    duration: 45,
  },
  {
    id: "s3",
    title: "Medium Design",
    description: "Detailed work up to 5 inches",
    price: 2500,
    duration: 120,
  },
  {
    id: "s4",
    title: "Large Piece",
    description: "Complex design, 5+ inches",
    price: 5000,
    duration: 180,
  },
  {
    id: "s5",
    title: "Touch-up Session",
    description: "For existing tattoos that need refreshing",
    price: 500,
    duration: 30,
  }
];

// Dummy bookings data
export const bookingsData = [
  {
    id: "b1",
    clientName: "Priya Sharma",
    clientEmail: "priya@example.com",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
    serviceId: "s1",
    serviceName: "Minimalist Tattoo",
    price: 1200,
    date: "2025-04-15",
    time: "10:00",
    duration: 60,
    status: "confirmed",
    notes: "Wants a small lotus flower on wrist",
  },
  {
    id: "b2",
    clientName: "Vikram Singh",
    clientEmail: "vikram@example.com",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
    serviceId: "s3",
    serviceName: "Medium Design",
    price: 2500,
    date: "2025-04-18",
    time: "14:00",
    duration: 120,
    status: "confirmed",
    notes: "Mountain range design on forearm",
  },
  {
    id: "b3",
    clientName: "Aisha Khan",
    clientEmail: "aisha@example.com",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=120&auto=format&fit=crop",
    serviceId: "s2",
    serviceName: "Custom Script/Text",
    price: 800,
    date: "2025-04-20",
    time: "16:30",
    duration: 45,
    status: "pending",
    notes: "Sanskrit quote, reference image provided",
  },
  {
    id: "b4",
    clientName: "Rohit Patel",
    clientEmail: "rohit@example.com",
    clientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
    serviceId: "s4",
    serviceName: "Large Piece",
    price: 5000,
    date: "2025-04-25",
    time: "11:00",
    duration: 180,
    status: "confirmed",
    notes: "Full sleeve initial consultation and outline",
  }
];

// Dummy earnings data
export const earningsData = {
  currentMonth: 32000,
  lastMonth: 27500,
  thisWeek: 12500,
  pendingPayouts: 8000,
  recentTransactions: [
    {
      id: "t1",
      clientName: "Priya Sharma",
      amount: 1200,
      date: "2025-04-15",
      service: "Minimalist Tattoo",
    },
    {
      id: "t2",
      clientName: "Vikram Singh",
      amount: 2500,
      date: "2025-04-18",
      service: "Medium Design",
    },
    {
      id: "t3",
      clientName: "Rohit Patel",
      amount: 5000,
      date: "2025-04-25",
      service: "Large Piece",
    }
  ]
};

// Dummy availability data
export const availabilityData = {
  weeklySchedule: {
    monday: { morning: true, afternoon: true, evening: false },
    tuesday: { morning: true, afternoon: true, evening: false },
    wednesday: { morning: false, afternoon: false, evening: false },
    thursday: { morning: true, afternoon: true, evening: true },
    friday: { morning: true, afternoon: true, evening: true },
    saturday: { morning: true, afternoon: true, evening: false },
    sunday: { morning: false, afternoon: false, evening: false },
  },
  timeSlots: [
    { id: "ts1", day: "Monday", date: "2025-04-14", time: "10:00", available: true },
    { id: "ts2", day: "Monday", date: "2025-04-14", time: "11:30", available: true },
    { id: "ts3", day: "Monday", date: "2025-04-14", time: "14:00", available: true },
    { id: "ts4", day: "Monday", date: "2025-04-14", time: "15:30", available: false },
    { id: "ts5", day: "Tuesday", date: "2025-04-15", time: "10:00", available: true },
    { id: "ts6", day: "Tuesday", date: "2025-04-15", time: "11:30", available: false },
    { id: "ts7", day: "Tuesday", date: "2025-04-15", time: "14:00", available: true },
    { id: "ts8", day: "Tuesday", date: "2025-04-15", time: "15:30", available: true },
    { id: "ts9", day: "Thursday", date: "2025-04-17", time: "10:00", available: true },
    { id: "ts10", day: "Thursday", date: "2025-04-17", time: "11:30", available: true },
    { id: "ts11", day: "Thursday", date: "2025-04-17", time: "14:00", available: true },
    { id: "ts12", day: "Thursday", date: "2025-04-17", time: "15:30", available: true },
    { id: "ts13", day: "Thursday", date: "2025-04-17", time: "18:00", available: true },
    { id: "ts14", day: "Thursday", date: "2025-04-17", time: "19:30", available: true },
    { id: "ts15", day: "Friday", date: "2025-04-18", time: "10:00", available: false },
    { id: "ts16", day: "Friday", date: "2025-04-18", time: "11:30", available: true },
    { id: "ts17", day: "Friday", date: "2025-04-18", time: "14:00", available: false },
    { id: "ts18", day: "Friday", date: "2025-04-18", time: "15:30", available: true },
    { id: "ts19", day: "Friday", date: "2025-04-18", time: "18:00", available: true },
    { id: "ts20", day: "Friday", date: "2025-04-18", time: "19:30", available: true },
    { id: "ts21", day: "Saturday", date: "2025-04-19", time: "10:00", available: true },
    { id: "ts22", day: "Saturday", date: "2025-04-19", time: "11:30", available: true },
    { id: "ts23", day: "Saturday", date: "2025-04-19", time: "14:00", available: true },
    { id: "ts24", day: "Saturday", date: "2025-04-19", time: "15:30", available: true }
  ]
};
