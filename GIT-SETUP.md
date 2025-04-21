# Git Setup Guide

This document provides instructions for setting up Git in your Video Training Funnel project and making your first commit to GitHub.

## 1. Create a .gitignore File

Create a file named `.gitignore` in the root directory of your project with the following content:

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build
/frontend/build
/dist

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
logs/
*.log

# Editor directories and files
.idea/
.vscode/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# OS specific
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp
```

## 2. Initialize Git

Open your terminal in the root directory of your project and run:

```bash
git init
```

## 3. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and log in with your account (username: Drakeyvespropulsion)
2. Click on the "+" icon in the top right corner and select "New repository"
3. Enter the repository name: `video-training-funnel` (or your preferred name)
4. Add a description: "A professional React/Node.js web application with video training funnel and email capture"
5. Keep the repository public (or select private if preferred)
6. Do NOT initialize the repository with a README, .gitignore, or license since you already have these files locally
7. Click "Create repository"

## 4. Link Your Local Repository to GitHub

After creating the repository, GitHub will display instructions. Run the following commands in your terminal:

```bash
git remote add origin https://github.com/Drakeyvespropulsion/video-training-funnel.git
```

## 5. Make Your First Commit

```bash
# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Project structure and documentation"

# Push to GitHub
git push -u origin master
```

Note: If your default branch is called "main" instead of "master", use:

```bash
git push -u origin main
```

## 6. Verify Your Repository

Visit your GitHub repository URL to verify that all files have been pushed successfully:
https://github.com/Drakeyvespropulsion/video-training-funnel

## Important Git Commands for Future Use

- `git status` - Check the status of your repository
- `git add <file>` - Add a specific file to staging
- `git commit -m "Your message"` - Commit staged changes
- `git push` - Push commits to GitHub
- `git pull` - Pull changes from GitHub
- `git checkout -b <branch-name>` - Create and switch to a new branch
- `git merge <branch-name>` - Merge changes from another branch