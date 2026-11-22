
# GitHub Explorer

Explore GitHub developers and discover their repositories through a clean, responsive interface powered by the GitHub REST API.

GitHub Explorer is a frontend application built with Angular that allows users to search for GitHub profiles, browse repositories, filter and sort results, and save their favourite developers for quick access.

## ✨ Features

- **User search:** Find GitHub users by their username.
- **Profile overview:** Display profile information, avatar, biography, location, company and account statistics.
- **Repository explorer:** Browse a user's public repositories.
- **Search and filters:** Filter repositories by name and programming language.
- **Sorting:** Sort repositories by last update or number of stars.
- **Favourites:** Save and remove favourite developers.
- **Local persistence:** Favourite profiles are stored in `localStorage`, so they remain available after refreshing the page.
- **Responsive design:** Adapted to desktop and mobile screens.
- **Error handling:** Handle non-existent users, API rate limits and unexpected errors.

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| Angular | Frontend framework |
| TypeScript | Application logic and type safety |
| SCSS | Styling and responsive layouts |
| RxJS | Asynchronous API requests |
| GitHub REST API | User and repository data |
| LocalStorage | Persistent favourites |

## 📸 Screenshots

<!-- Add your screenshots here -->

<!--
![Home page](screenshots/home.png)
![User profile](screenshots/profile.png)
![Mobile view](screenshots/mobile.png)
-->

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Angular CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SrXpensive/github-explorer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd github-explorer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   ng serve
   ```

5. Open your browser at:

   ```text
   http://localhost:4200
   ```

## 🔌 API

This application uses the public [GitHub REST API](https://docs.github.com/en/rest).

No authentication token is required to search public user profiles and repositories.

**Note:** Unauthenticated requests are subject to GitHub's API rate limit (currently 60 requests per hour per IP address).

## 📁 Project Structure

```text
src/
└── app/
    ├── components/
    │   ├── search-bar/
    │   ├── profile-card/
    │   ├── repo-list/
    │   └── favorites-list/
    ├── models/
    │   ├── github-user.model.ts
    │   └── github-repo.model.ts
    ├── services/
    │   └── github.service.ts
    ├── app.component.ts
    ├── app.component.html
    └── app.component.scss
```

## 🎯 Project Goals

This project was developed to practise and demonstrate:

- Building component-based applications with Angular.
- Working with TypeScript interfaces and typed API responses.
- Consuming external REST APIs using Angular's `HttpClient`.
- Managing asynchronous operations with RxJS.
- Implementing reusable components and component communication.
- Filtering, sorting and displaying dynamic data.
- Persisting user preferences with browser storage.
- Creating responsive interfaces with modern CSS and SCSS.

## 📄 License

This project is intended for educational and portfolio purposes.

GitHub and its API are trademarks and services of GitHub, Inc. This project is not affiliated with or endorsed by GitHub.
