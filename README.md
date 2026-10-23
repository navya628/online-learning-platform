# LearnSpace — Online Learning Platform (Frontend)

A responsive React JS frontend for a college case study. It includes:
- Home page with the three project team members and roll numbers
- Course catalogue with search and category filters
- Demo course enrollment
- Student dashboard with progress tracking
- Interactive sample quiz with score calculation

## Technology
- React JS
- Vite
- Lucide React icons
- CSS

## Run locally
Install Node.js LTS first: https://nodejs.org/

Open this folder in VS Code, then open Terminal and run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Build for deployment
```bash
npm run build
```

The production files are created in the `dist` folder.

## Important backend note
This is the frontend portion only. Course data, enrollment, quiz results, and progress are currently demo data held in React state. They reset when the page is refreshed and are not saved to MySQL. When the Spring MVC backend is ready, replace the demo data and local state updates with API requests to the backend.

## Team
| Name | Roll number |
|---|---|
| Gourakkagari Navyasri | 25255A0507 |
| Hasini | 24251A05A3 |
| Rupa | 24251A05A5 |
