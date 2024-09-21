# Homestay - Airbnb Clone

This is an Airbnb clone project built using [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), and [MongoDB](https://www.mongodb.com/). The project aims to replicate core functionalities of Airbnb, including user authentication, property listings, reservations, and more.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL="your-mongodb-connection-string"
   NEXTAUTH_SECRET="your-nextauth-secret"
   ```

4. **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- **`app/`**: Contains the main application components and pages.
- **`app/api/`**: API routes for handling backend logic.
- **`app/components/`**: Reusable UI components.
- **`app/hooks/`**: Custom hooks for managing state and side effects.
- **`app/actions/`**: Functions for interacting with the database.
- **`app/providers/`**: Context providers for global state management.
- **`prisma/`**: Prisma schema and migrations.
- **`public/`**: Static assets like images and icons.
- **`styles/`**: Global styles and CSS modules.

## Features

- **User Authentication**: Sign up, log in, and log out using NextAuth.js.
- **Property Listings**: View, create, and manage property listings.
- **Reservations**: Make and manage reservations for properties.
- **Favorites**: Add properties to favorites.
- **Search**: Search for properties based on location, date, and other filters.
- **Responsive Design**: Mobile-friendly UI.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **Prisma**: ORM for database management.
- **MongoDB**: NoSQL database.
- **Zustand**: State management library.
- **React Hook Form**: Form management library.
- **Tailwind CSS**: Utility-first CSS framework.
- **React Icons**: Icon library for React.
- **Axios**: Promise-based HTTP client.
- **React Hot Toast**: Notifications library.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
