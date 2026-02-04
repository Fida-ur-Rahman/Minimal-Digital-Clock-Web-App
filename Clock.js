 // DOM Elements
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        const ampmElement = document.getElementById('ampm');
        const dateElement = document.getElementById('date');
        const toggleFormatBtn = document.getElementById('toggleFormat');
        const pauseResumeBtn = document.getElementById('pauseResume');
        const refreshBtn = document.getElementById('refresh');
        
        // Clock state variables
        let is24HourFormat = false;
        let isClockRunning = true;
        let updateInterval;
        
        // Days and months for date display
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        // Initialize the clock
        function initClock() {
            updateClock();
            // Update the clock every second
            updateInterval = setInterval(updateClock, 1000);
        }
        
        // Update clock display
        function updateClock() {
            const now = new Date();
            
            // Get time components
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            
            // Format hours based on selected format
            let ampm = 'AM';
            let displayHours = hours;
            
            if (!is24HourFormat) {
                // 12-hour format
                if (hours >= 12) {
                    ampm = 'PM';
                }
                
                if (hours > 12) {
                    displayHours = hours - 12;
                } else if (hours === 0) {
                    displayHours = 12;
                }
            }
            
            // Format to always show two digits
            const formattedHours = displayHours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            
            // Update time display
            hoursElement.textContent = formattedHours;
            minutesElement.textContent = formattedMinutes;
            secondsElement.textContent = formattedSeconds;
            
            if (!is24HourFormat) {
                ampmElement.textContent = ampm;
                ampmElement.style.display = 'block';
            } else {
                ampmElement.style.display = 'none';
            }
            
            // Update date display
            updateDateDisplay(now);
        }
        
        // Update date display
        function updateDateDisplay(date) {
            const dayOfWeek = daysOfWeek[date.getDay()];
            const month = monthsOfYear[date.getMonth()];
            const dayOfMonth = date.getDate();
            const year = date.getFullYear();
            
            // Format: Monday, January 1, 2023
            dateElement.textContent = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
        }
        
        // Toggle between 12-hour and 24-hour format
        function toggleTimeFormat() {
            is24HourFormat = !is24HourFormat;
            
            if (is24HourFormat) {
                toggleFormatBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to 12-hour format';
                ampmElement.style.display = 'none';
            } else {
                toggleFormatBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to 24-hour format';
                ampmElement.style.display = 'block';
            }
            
            updateClock();
        }
        
        // Pause or resume the clock
        function toggleClock() {
            isClockRunning = !isClockRunning;
            
            if (isClockRunning) {
                // Resume clock
                updateInterval = setInterval(updateClock, 1000);
                pauseResumeBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Clock';
                pauseResumeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            } else {
                // Pause clock
                clearInterval(updateInterval);
                pauseResumeBtn.innerHTML = '<i class="fas fa-play"></i> Resume Clock';
                pauseResumeBtn.style.background = 'rgba(255, 77, 148, 0.3)';
            }
        }
        
        // Refresh the clock (force update)
        function refreshClock() {
            updateClock();
            
            // Visual feedback for refresh
            refreshBtn.innerHTML = '<i class="fas fa-check"></i> Refreshed!';
            refreshBtn.style.background = 'rgba(0, 255, 204, 0.3)';
            
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
                refreshBtn.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 1000);
        }
        
        // Event listeners
        toggleFormatBtn.addEventListener('click', toggleTimeFormat);
        pauseResumeBtn.addEventListener('click', toggleClock);
        refreshBtn.addEventListener('click', refreshClock);
        
        // Initialize the clock when page loads
        window.addEventListener('load', initClock);