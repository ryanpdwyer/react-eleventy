class ClassifierRecorder {
    constructor(config) {
        if (!config.containerElement || !(config.containerElement instanceof HTMLElement)) {
            throw new Error('containerElement is required and must be an HTML element');
        }
        if (!config.predictor) {
            throw new Error('predictor instance is required');
        }

        this.config = config;
        this.container = config.containerElement;
        
        this.classes = {};
        this.currentlyRecording = null;
        this.lastSampleTime = 0;
        this.samplesPerSecond = 10;
        this.recordingDuration = 5; // Default 5 seconds
        this.recordingStartTime = null;
        this.recordingTimeout = null;

        this.createInterface();
        this.attachEventListeners();
    }

    createInterface() {
        this.container.innerHTML = `
            <div style="margin-bottom: 20px">
                <label style="display: block; margin-bottom: 10px">
                    Samples per second:
                    <input type="number" class="samples-rate-input" min="1" max="60" value="10">
                </label>
                <label style="display: block;">
                    Recording duration (seconds):
                    <input type="number" class="duration-input" min="1" max="300" value="5">
                </label>
            </div>
            <h3>Gesture Classes</h3>
            <div>
                <input type="text" class="gesture-class-input" placeholder="Enter class name">
                <button class="add-class-btn">Add New Class</button>
            </div>
            <div class="gesture-class-list"></div>
            <div style="margin-top: 20px">
                <button class="export-btn">Export Data</button>
            </div>
        `;

        this.classInput = this.container.querySelector('.gesture-class-input');
        this.classList = this.container.querySelector('.gesture-class-list');
        this.rateInput = this.container.querySelector('.samples-rate-input');
        this.durationInput = this.container.querySelector('.duration-input');
        
        this.container.querySelector('.add-class-btn').addEventListener('click', () => this.addClass());
        this.container.querySelector('.export-btn').addEventListener('click', () => this.exportData());
        this.rateInput.addEventListener('change', (e) => {
            this.samplesPerSecond = Math.max(1, Math.min(60, parseInt(e.target.value) || 10));
            this.rateInput.value = this.samplesPerSecond;
        });
        this.durationInput.addEventListener('change', (e) => {
            this.recordingDuration = Math.max(1, Math.min(300, parseInt(e.target.value) || 5));
            this.durationInput.value = this.recordingDuration;
        });
    }

    attachEventListeners() {
        this.config.predictor.addEventListener('prediction', this.handlePrediction.bind(this));
    }

    handlePrediction(event) {
        const currentTime = performance.now();
        
        if (this.currentlyRecording && event.detail.results) {
            const timeSinceLastSample = currentTime - this.lastSampleTime;
            const minTimeBetweenSamples = 1000 / this.samplesPerSecond;

            if (timeSinceLastSample >= minTimeBetweenSamples) {
                this.recordSample(event.detail.results, currentTime);
                this.lastSampleTime = currentTime;
            }
        }
    }

    addClass() {
        const className = this.classInput.value.trim();
        
        if (!className) {
            alert('Please enter a class name');
            return;
        }
        
        if (this.classes[className]) {
            alert('Class already exists');
            return;
        }

        this.classes[className] = {
            samples: [],
            timestamp: Date.now()
        };

        this.classInput.value = '';
        this.updateClassList();
    }

    updateClassList() {
        this.classList.innerHTML = '';

        Object.keys(this.classes).forEach(className => {
            const classDiv = document.createElement('div');
            classDiv.className = 'class-container';
            
            const nameLabel = document.createElement('div');
            nameLabel.textContent = className;
            
            const statsDiv = document.createElement('div');
            statsDiv.className = 'stats';
            statsDiv.textContent = `${this.classes[className].samples.length} samples`;
            
            const recordButton = document.createElement('button');
            recordButton.textContent = this.currentlyRecording === className ? 'Stop Recording' : 'Record';
            recordButton.className = this.currentlyRecording === className ? 'recording' : '';
            recordButton.onclick = () => this.toggleRecording(className);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Class';
            deleteButton.onclick = () => this.deleteClass(className);
            
            classDiv.appendChild(nameLabel);
            classDiv.appendChild(statsDiv);
            classDiv.appendChild(recordButton);
            classDiv.appendChild(deleteButton);
            this.classList.appendChild(classDiv);
        });
    }

    toggleRecording(className) {
        if (this.currentlyRecording === className) {
            this.stopRecording();
        } else {
            this.startRecording(className);
        }
    }

    startRecording(className) {
        this.currentlyRecording = className;
        this.lastSampleTime = performance.now();
        this.recordingStartTime = Date.now();
        
        // Set timeout to stop recording after duration
        if (this.recordingTimeout) {
            clearTimeout(this.recordingTimeout);
        }
        this.recordingTimeout = setTimeout(() => {
            this.stopRecording();
        }, this.recordingDuration * 1000);
        
        this.updateClassList();
    }

    stopRecording() {
        this.currentlyRecording = null;
        if (this.recordingTimeout) {
            clearTimeout(this.recordingTimeout);
            this.recordingTimeout = null;
        }
        this.recordingStartTime = null;
        this.updateClassList();
    }

    recordSample(results, timestamp) {
        const sample = {
            landmarks: results.landmarks[0].map(landmark => ({
                x: landmark.x,
                y: landmark.y,
                z: landmark.z
            })),
            timestamp: timestamp
        };

        this.classes[this.currentlyRecording].samples.push(sample);
        this.updateClassList();
    }

    deleteClass(className) {
        if (confirm(`Are you sure you want to delete class "${className}" and all its samples?`)) {
            delete this.classes[className];
            if (this.currentlyRecording === className) {
                this.stopRecording();
            }
            this.updateClassList();
        }
    }

    exportData() {
        const dataStr = JSON.stringify(this.classes, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'gesture_data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
}

export { ClassifierRecorder };