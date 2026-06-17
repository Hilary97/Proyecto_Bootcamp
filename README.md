# Adicción Norteña - Los Layos 🎶

A single-page promotional site built for a Mexican norteño music band, designed to showcase their work, build an online presence, and convert visitors into booked gigs.

🔗 **Live demo:** https://anloslayos.netlify.app

![Prototype](<los-layos-app/Bloc%20de%20notas%20sin%20título%20(2)-2.jpg>)

## Overview

The band needed a modern, mobile-friendly landing page where fans could discover their music and potential clients could request a booking without friction. The site solves that with an audio player to preview covers, a presentation section to build trust, and a booking form that sends the request straight to WhatsApp — no backend required.

## Features

- 🎵 **Interactive music player** — expandable list of covers with native HTML5 audio playback
- 📅 **Booking form with WhatsApp integration** — captures name, day, date, and hours required, then opens a pre-filled WhatsApp message to the band's number
- 🌌 **Animated particle background** — custom canvas-based effect in a red/orange theme matching the band's identity
- 📱 **Fully responsive design** — built mobile-first with Tailwind CSS
- 🔗 **Social presence** — Facebook, Instagram, WhatsApp, and TikTok links in the footer
- ✨ **Micro-interactions** — gradient buttons, pulse and wiggle animations to draw attention to key CTAs

## Tech Stack

- **React 19** — component-based UI
- **Vite** — fast dev server and build tool
- **Tailwind CSS** — utility-first styling and custom animations
- **ESLint** — code quality and consistency

## Running Locally

```bash
cd los-layos-app
npm install
npm run dev
```

## What I Learned

This project was an exercise in shipping a complete, production-ready landing page without a backend: handling form state and validation in React, formatting dates for a polished user-facing message, and integrating directly with WhatsApp's URL scheme to turn a simple form into a working lead-generation tool.
