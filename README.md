# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1CWg6R9vE9irH-EvUsF1UxdgyqYoapzeL

## Run Locally

How to Run This App on Your Local Computer
Follow these instructions to get a copy of the "My Reward Chart" app running on your machine for personal use and development.

Prerequisites
Before you begin, make sure you have the following software installed on your computer:

Git: To download the project code from GitHub. (Download Git)
Node.js: A JavaScript runtime that includes npm (Node Package Manager) for managing project dependencies. (Download Node.js)

### Installation & Setup
1. Clone the Repository
Open your terminal (Command Prompt on Windows, or Terminal on macOS/Linux) and run the following command to download the project files:
```
git clone https://github.com/sharminakthar/RewardsApp.git
```

2. Navigate to the Project Directory
Change into the folder you just downloaded:
```
cd RewardsApp
```

3. Set up a Local Server
Because this project uses modern web technologies like React and TypeScript (.tsx files), you can't just open the index.html file in your browser. You need a local development server to compile and serve the code correctly. The easiest way to do this is using npx, which comes with Node.js.
Run the following command in your terminal:
```
npx serve
```

This command will start a simple web server. It will give you one or more local addresses, such as:
Serving! Local: http://localhost:3000

4. Run the App
Open your web browser (like Chrome, Firefox, or Edge) and navigate to the local address provided by the server (e.g., http://localhost:3000).
The "My Reward Chart" application will now be running on your computer!

### How Your Progress Is Saved

Automatic & Private: Your goals, streaks, and rewards are automatically saved in your browser's localStorage. This data is stored securely on your computer and is not sent to any external server.
Persistent: You can close the browser tab or shut down your computer, and your progress will be waiting for you the next time you open the app. Your daily progress is tracked and saved seamlessly.
