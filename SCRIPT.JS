
        class Stopwatch {
            constructor() {
                this.time = 0;
                this.interval = null;
                this.isRunning = false;
                this.laps = [];
                
                this.display = document.getElementById('display');
                this.startBtn = document.getElementById('startBtn');
                this.pauseBtn = document.getElementById('pauseBtn');
                this.resetBtn = document.getElementById('resetBtn');
                this.lapBtn = document.getElementById('lapBtn');
                this.lapsContainer = document.getElementById('lapsContainer');
                this.lapsList = document.getElementById('lapsList');
                this.clearLapsBtn = document.getElementById('clearLaps');
                
                this.bindEvents();
            }
            
            bindEvents() {
                this.startBtn.addEventListener('click', () => this.start());
                this.pauseBtn.addEventListener('click', () => this.pause());
                this.resetBtn.addEventListener('click', () => this.reset());
                this.lapBtn.addEventListener('click', () => this.addLap());
                this.clearLapsBtn.addEventListener('click', () => this.clearLaps());
                
              
                document.addEventListener('keydown', (e) => {
                    if (e.code === 'Space') {
                        e.preventDefault();
                        if (this.isRunning) {
                            this.pause();
                        } else {
                            this.start();
                        }
                    } else if (e.code === 'KeyR') {
                        this.reset();
                    } else if (e.code === 'KeyL' && this.isRunning) {
                        this.addLap();
                    }
                });
            }
            
            start() {
                if (!this.isRunning) {
                    this.isRunning = true;
                    this.interval = setInterval(() => {
                        this.time += 10;
                        this.updateDisplay();
                    }, 10);
                    
                    this.startBtn.disabled = true;
                    this.pauseBtn.disabled = false;
                    this.lapBtn.disabled = false;
                    this.display.classList.add('running');
                    
                    this.startBtn.textContent = 'Running...';
                }
            }
            
            pause() {
                if (this.isRunning) {
                    this.isRunning = false;
                    clearInterval(this.interval);
                    
                    this.startBtn.disabled = false;
                    this.pauseBtn.disabled = true;
                    this.lapBtn.disabled = true;
                    this.display.classList.remove('running');
                    
                    this.startBtn.textContent = 'Resume';
                }
            }
            
            reset() {
                this.isRunning = false;
                clearInterval(this.interval);
                this.time = 0;
                this.updateDisplay();
                
                this.startBtn.disabled = false;
                this.pauseBtn.disabled = true;
                this.lapBtn.disabled = true;
                this.display.classList.remove('running');
                
                this.startBtn.textContent = 'Start';
            }
            
            addLap() {
                if (this.isRunning && this.time > 0) {
                    const lapTime = this.time;
                    const lapNumber = this.laps.length + 1;
                    
                    this.laps.push({
                        number: lapNumber,
                        time: lapTime,
                        formattedTime: this.formatTime(lapTime)
                    });
                    
                    this.renderLaps();
                    this.lapsContainer.style.display = 'block';
                }
            }
            
            clearLaps() {
                this.laps = [];
                this.lapsList.innerHTML = '';
                this.lapsContainer.style.display = 'none';
            }
            
            updateDisplay() {
                this.display.textContent = this.formatTime(this.time);
            }
            
            formatTime(time) {
                const minutes = Math.floor(time / 60000);
                const seconds = Math.floor((time % 60000) / 1000);
                const centiseconds = Math.floor((time % 1000) / 10);
                
                return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
            }
            
            renderLaps() {
                this.lapsList.innerHTML = '';
                
                
                const reversedLaps = [...this.laps].reverse();
                
                reversedLaps.forEach(lap => {
                    const lapItem = document.createElement('div');
                    lapItem.className = 'lap-item';
                    
                    lapItem.innerHTML = `
                        <span class="lap-number">Lap ${lap.number}</span>
                        <span class="lap-time">${lap.formattedTime}</span>
                    `;
                    
                    this.lapsList.appendChild(lapItem);
                });
            }
        }
        
        
        document.addEventListener('DOMContentLoaded', () => {
            new Stopwatch();
        });
        
       
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                e.target.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            }
        });