# Vaikuntha Institute - Online Learning Platform

A modern, responsive online learning platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern UI with smooth animations
- 📱 Fully responsive design
- 🔐 Authentication system
- 📚 Course management
- 👨‍🏫 Faculty profiles
- 🎯 Interactive learning experience
- 🌙 Dark/Light mode support

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Animations:** Framer Motion
- **Authentication:** NextAuth.js
- **Database:** Prisma with PostgreSQL
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/vaikuntha-institute.git
   cd vaikuntha-institute
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in the required environment variables in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # App router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── layout/         # Layout components
│   └── home/           # Home page components
├── lib/                # Utility functions
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── services/           # API services
├── styles/             # Global styles
└── public/             # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/vaikuntha-institute](https://github.com/yourusername/vaikuntha-institute)
