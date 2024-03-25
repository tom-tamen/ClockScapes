
# ClockScapes

## Overview

ClockScapes is a web-based application that visualizes the current time across different global cities with distinctive, colorful clock interfaces. Each clock reflects a unique aesthetic aligned with the cultural or national colors of its city, offering a visual and interactive way to view time around the world.

## Features

- **Multiple Clock Displays:** Displays current time for Washington D.C., USA; Beijing, China; Moscow, Russia; Berlin, Germany; London, UK; Paris, France; Tokyo, Japan; New Delhi, India; and Brasilia, Brazil.
- **Customizable Aesthetics:** Each clock is styled with specific colors representing the flag or cultural identity of its corresponding location.
- **Responsive Design:** The clocks adjust in size based on the browser window to ensure optimal visibility across different devices.
- **Debug Mode:** Includes a debug mode for developers to fine-tune the visual parameters of the clocks.

## Installation

To set up ClockScapes on your local environment, follow these steps:

1. Clone the repository to your local machine.
2. Ensure you have Node.js and npm installed to manage the dependencies and run scripts.
3. Navigate to the project directory and run `npm install` to install the dependencies.
4. Open the `index.html` file in your browser or start a local development server using `npm run dev`.

## Development and Build Setup

This project uses Vite for an optimized development experience and build process. The configuration details are as follows:

- **Root Directory:** `src`
- **Build Output Directory:** `../dist`

To start the development server, run:

```
npm run dev
```

To build the project for production, use:

```
npm run build
```

This will compile your project to the `dist` directory, optimized for deployment.


### Debug Mode

For developers looking to modify the appearance or functionality of the clocks, activate debug mode by appending `#debug` to the URL (e.g., `http://localhost:3000/#debug`). Refresh the page to see the debug panel.
Example : https://clock-scapes.vercel.app/#debug

## Acknowledgements

This project utilizes the following resources:

- **Dat.GUI:** For the debug interface.
- **Vite:** For serving and building the web application.
- **EventEmitter:** To handle custom events within the application.

Special thanks to [Adrien Husson](https://github.com/hssnadr) for providing the basis for this project.
