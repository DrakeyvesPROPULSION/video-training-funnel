# GitHub Setup Commands

This document provides ready-to-use commands for setting up Git and GitHub for your Video Training Funnel project. Run these commands in your terminal from the root directory of your project.

## Initial Git Setup

```bash
# Initialize Git repository
git init

# Create .gitignore file (you'll need to manually create this file with the content from GIT-SETUP.md)

# Add all files to staging (excluding those in .gitignore)
git add .

# First commit
git commit -m "Initial commit: Project structure and documentation"
```

## Connect to GitHub

```bash
# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/Drakeyvespropulsion/video-training-funnel.git

# Verify remote was added
git remote -v

# Push to GitHub (if your default branch is main)
git push -u origin main

# If your default branch is master instead
git push -u origin master
```

## Set Up Development Branch

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop branch to GitHub
git push -u origin develop
```

## Verify Setup

```bash
# Check repository status
git status

# List all branches
git branch -a
```

## Common Git Commands for Daily Use

```bash
# Get latest changes
git pull origin develop

# Create a feature branch
git checkout -b feature/new-feature

# Stage your changes
git add .

# Commit your changes
git commit -m "Description of your changes"

# Push your feature branch
git push -u origin feature/new-feature
```

## Creating a Pull Request

After pushing your feature branch to GitHub:

1. Go to your repository on GitHub
2. Click "Compare & pull request"
3. Select base branch (develop) and compare branch (your feature branch)
4. Add title and description
5. Click "Create pull request"

## Command to Clone Your Repository (for other developers)

```bash
git clone https://github.com/Drakeyvespropulsion/video-training-funnel.git
cd video-training-funnel