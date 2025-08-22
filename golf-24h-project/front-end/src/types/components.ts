export interface CalendarDay {
  day: number
  date: string
  booked: boolean
}

export interface Activity {
  id: number
  title: string
  description: string
  icon: string
  price: string
  duration: string
}

export interface ContactInfo {
  email: string
  phone: string
  address?: string
}
