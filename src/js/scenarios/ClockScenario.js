import Scene from "../canvas/Scene";
import GlobalContext from "../GlobalContext"; // Import GlobalContext to access the global context
import { hexToRgb } from "../utils/HexToRgb"; // Utility to convert hex colors to RGB

//Class defining a clock scenario within a canvas scene
export default class ClockScenario extends Scene {
    constructor(id, timeZoneOffset = 0, config = {}) {
        super(id); // Initialize the scene with the provided ID

        this.globalContext = new GlobalContext(); // Initialize the global context
        
        // Initialize properties after basic setup
        this.timeZoneOffset = timeZoneOffset; // Time zone offset to adjust time

        // Default values for clock configuration
        this.defaults = {
            trailSize: 3,
            trailLength: 180,        
            dialColor: '#030303',
            dialBackground: '#f0f0f0',
            trailColor: '#030303',
            handColors: {
                hour: '#A4031F',
                minute: '#00f289',
                second: '#DB9065',
                millisecond: '#0000FF'
            },
            handWidths: {
                hour: 8,
                minute: 6,
                second: 4,
                millisecond: 2
            },
            centerDotSize: 6
        };
        
        // Update the configuration with custom values if provided
        this.updateConfig(config);

        // Then proceed with any setup that depends on those properties
        this.initDebug();
        // Setup resize listener
        this.setupResize();
        // Initial call to resize
        this.resize(); 
    }

    // Update clock configuration
    updateConfig(config) {
        if (!this.defaults) {
            console.error('Defaults not defined');
            return;
        }
    
        // Merge specific configurations with default values
        Object.keys(this.defaults).forEach(key => {
            if (config[key] !== undefined) {
                if (typeof this.defaults[key] === 'object' && !Array.isArray(this.defaults[key]) && this.defaults[key] !== null) {
                    // Merge specific configurations with default values
                    this[key] = {...this.defaults[key], ...config[key]};
                } else {
                    // Direct replacement for simple properties
                    this[key] = config[key];
                }
            } else {
                // Use default values in the absence of specific configuration
                this[key] = this.defaults[key];
            }
        });
    }
    
    // Initialize debug controls
    initDebug() {
        // Ensure debug is active before adding controls
        if (this.globalContext.debug && this.globalContext.debug.active) {
            this.debugFolder = this.globalContext.debug.ui.addFolder(`Clock Controls - ${this.id}`);
            // Add controls for adjusting colors and sizes
            this.debugFolder.addColor(this.handColors, 'hour').name("Hour Hand");
            this.debugFolder.addColor(this.handColors, 'minute').name("Minute Hand");
            this.debugFolder.addColor(this.handColors, 'second').name("Second Hand");
            this.debugFolder.addColor(this.handColors, 'millisecond').name("Millisecond Hand");
            this.debugFolder.addColor(this, 'dialColor').name("Dial");
            this.debugFolder.addColor(this, 'dialBackground').name("Dial Background");
            this.debugFolder.addColor(this, 'trailColor').name("Trail");
            this.debugFolder.add(this, 'trailSize').min(1).max(20).name("Trail Size");
            this.debugFolder.add(this, 'trailLength').min(0).max(360).name("Trail Length");
        }
    }

    // Update drawing parameters based on canvas size
    updateDrawingParameters() {
        const scaleFactor = this.canvas.width / 500;
    
        // Update the widths of the hands according to scale
        this.handWidths.hour = 8 * scaleFactor;
        this.handWidths.minute = 6 * scaleFactor;
        this.handWidths.second = 4 * scaleFactor;
        this.handWidths.millisecond = 2 * scaleFactor;
    
        // Update the size of the central dot according to scale
        this.centerDotSize = 6 * scaleFactor;
    }
    

    // Setup the event listener for window resizing
    setupResize() {
        window.addEventListener('resize', () => this.resize());
    }
    // Adjust canvas size on resize
    resize() {
        // Determine the maximum size while maintaining a 1:1 aspect ratio
        const maxSize = Math.min(window.innerWidth, window.innerHeight, 400);
        this.canvas.width = maxSize;
        this.canvas.height = maxSize;

        // Adjust drawing parameters based on the new size
        this.updateDrawingParameters();
        
        // Trigger a redraw of the clock
        this.update();
    }

    // Draw a clock hand
    drawHand(ctx, length, width, value, max, offset = 0, color) {
        const angle = ((value / max) * 360 - 90 + offset) * (Math.PI / 180);
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.lineCap = 'round';
        ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
        ctx.lineTo(
            this.canvas.width / 2 + Math.cos(angle) * length,
            this.canvas.height / 2 + Math.sin(angle) * length
        );
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    // Draw all hands with configured parameters
    drawHands() {
        // Get the current time and adjust it based on the time zone offset
        const now = new Date();
        const adjustedNow = new Date(now.getTime() + this.timeZoneOffset * 60000);
        const milliseconds = adjustedNow.getMilliseconds();
        const seconds = adjustedNow.getSeconds();
        const minutes = adjustedNow.getMinutes();
        const hours = adjustedNow.getHours();

        // Draw the hands with the adjusted time values
        this.drawHand(this.context, 100, this.handWidths.millisecond, milliseconds, 1000, 0, this.handColors.millisecond);
        this.drawHand(this.context, 90, this.handWidths.second, seconds, 60, 0, this.handColors.second);
        this.drawHand(this.context, 70, this.handWidths.minute, minutes, 60, 0, this.handColors.minute);
        this.drawHand(this.context, 50, this.handWidths.hour, hours % 12, 12, minutes / 2, this.handColors.hour);
    }

// Draw the clock dial
    drawDial() {
        const now = new Date();
        const adjustedNow = new Date(now.getTime() + this.timeZoneOffset * 60000); // Adjusted time according to the time zone offset
        const currentHourPosition = adjustedNow.getHours() % 12;
        const currentMinutePosition = adjustedNow.getMinutes();
        let passedHour = 0;
        const radius = 120;

+       
        // Draw the outer circle
        this.context.beginPath();
        const outerRadius = radius + 3;
        this.context.arc(this.canvas.width / 2, this.canvas.height / 2, outerRadius, 0, Math.PI * 2);
        this.context.lineWidth = 8;
        this.context.strokeStyle = this.dialColor; 
        this.context.stroke();

        // Draw the inner circle
        this.context.fillStyle = this.dialBackground;
        this.context.fill();

        // Draw the indicators for hours and minutes
        for (let i = 0; i < 60; i++) {
            this.context.beginPath();
            this.context.lineWidth = i % 5 === 0 ? 4 : 2; // Hour indicators are thicker
            this.context.lineCap = 'round';
            
            // Calculate the angle, starting from -90 degrees to have the 0 position at the top
            const angle = ((i * 6) - 90) * (Math.PI / 180);
            

            // Change the color for the current hour and minute indicators

            if (i % 5 === 0 && passedHour === currentHourPosition && i % 5 === 0 && i === currentMinutePosition) {
                //if the current hour and minute are the same then the color will be random
                this.context.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            }else{
                if (i % 5 === 0 && passedHour === currentHourPosition) {
                    //if the current hour is the same then the color will be the hour color
                    this.context.strokeStyle = this.handColors.hour;
                } else if (i === currentMinutePosition) {
                    // if the current minute is the same then the color will be the minute color
                    this.context.strokeStyle = this.handColors.minute;
                } else {
                    this.context.strokeStyle = this.dialColor; // Default color for other indicators
                }
            }
            if (i % 5 === 0) passedHour++;

            
    
            // Calculate the start and end points for the indicators
            const lineLength = i % 5 === 0 ? 15 : 5; // Length difference for hour and minute indicators
            const startX = this.canvas.width / 2 + Math.cos(angle) * (radius - lineLength);
            const startY = this.canvas.height / 2 + Math.sin(angle) * (radius - lineLength);
            const endX = this.canvas.width / 2 + Math.cos(angle) * radius;
            const endY = this.canvas.height / 2 + Math.sin(angle) * radius;
            this.context.moveTo(startX, startY);
            this.context.lineTo(endX, endY);
            this.context.stroke();
            
        }
    }

    // Draw the trail around the dial
    drawDialTrail(milliseconds) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = 120 + 8;
        const numDots = this.trailLength;
        const dotMaxSize = this.trailSize;
        const angleStep = 360 / 1000;
    
        let currentAngle = ((milliseconds / 1000) * 360 - 90) % 360;
    
        // draw the trail dots
        for (let i = 0; i < numDots; i++) {
        
            let dotAngle = currentAngle - (i * angleStep * 2);
            let radians = dotAngle * (Math.PI / 180);
    
            let opacity = 1 - (i / numDots);
            let size = dotMaxSize * opacity;
    
            let x = centerX + Math.cos(radians) * radius;
            let y = centerY + Math.sin(radians) * radius;
    
            //Draw the dot
            this.context.beginPath();
            this.context.arc(x, y, size, 0, 2 * Math.PI, false);
            const rgb = hexToRgb(this.trailColor);
            this.context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`; // Use the trail color with varying opacity
            this.context.fill();
        }
    }
    
    // Draw the center dot of the clock
    drawCenterDot() {
        this.context.beginPath();
        this.context.arc(this.canvas.width / 2, this.canvas.height / 2, this.centerDotSize, 0, 2 * Math.PI, false);
        this.context.fillStyle = this.dialColor;
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = '#333';
        this.context.stroke();
    }

    // Draw the AM/PM indicator
    drawAMPMIndicator() {
        const now = new Date();
        const adjustedNow = new Date(now.getTime() + this.timeZoneOffset * 60000);
        const hours = adjustedNow.getHours();
        const isPM = hours >= 12;
    
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height - 30;
    
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'yellow';
    

        if (isPM) {
            // if it is PM, draw a moon    
            const moonRadius = 18;
    
            // Draw a yellow circle for the moon
            this.context.beginPath();
            this.context.fillStyle = 'yellow';
            this.context.arc(centerX, centerY, moonRadius+6, 0, 2 * Math.PI);
            this.context.fill();
            const cutRadius = moonRadius + 5;
    
            // Add bigger circle to cut the moon
            this.context.beginPath();
            this.context.fillStyle = '#b8b8b8'; // Same color as the background
            this.context.arc(centerX + moonRadius / 3, centerY - 4, cutRadius, 0, 2 * Math.PI);
            this.context.fill();
        } else {
            // if it is AM, draw a sun
            this.context.beginPath();
            this.context.arc(centerX, centerY, 10, 0, 2 * Math.PI);
            for (let i = 0; i < 12; i++) {
                const angle = Math.PI / 6 * i;
                const lineLength = 15;
                const startX = centerX + Math.cos(angle) * 10;
                const startY = centerY + Math.sin(angle) * 10;
                const endX = centerX + Math.cos(angle) * (10 + lineLength);
                const endY = centerY + Math.sin(angle) * (10 + lineLength);
                this.context.moveTo(startX, startY);
                this.context.lineTo(endX, endY);
            }
            this.context.stroke();
        }
    }
    
    // Update the clock display
    update() {
        const now = new Date();
        const adjustedNow = new Date(now.getTime() + this.timeZoneOffset * 60000);
        const milliseconds = adjustedNow.getMilliseconds();

        super.update(); // Call the base update method
        this.clear(); // Clear the canvas for the new drawing
        this.drawDial(); // Draw the dial
        this.drawDialTrail(milliseconds); // Draw the trail around the dial
        this.drawHands(); // Draw the clock hands
        this.drawCenterDot(); // Draw the center dot last to ensure it's on top
        this.drawAMPMIndicator(); // Draw the AM/PM indicator
    }

    // Clear the canvas
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}