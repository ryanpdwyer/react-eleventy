class KeypointDisplay {
    constructor(config) {
        this.config = {
          containerElement: config.containerElement,
          predictor: config.predictor,
          displayFormat: config.displayFormat || 'simple', // 'simple' or 'detailed'
          updateFrequency: config.updateFrequency || 100 // ms between updates
        };
    
        this.lastUpdateTime = 0;
        this.createElements();
        this.attachEventListeners();
      }
    
      createElements() {
        // Create main container
        this.display = document.createElement('div');
        this.display.className = 'keypoint-display';
        
        // Create styles
        const style = document.createElement('style');
        style.textContent = `
          .keypoint-display {
            font-family: monospace;
            padding: 10px;
            background-color: #f5f5f5;
            border-radius: 4px;
            margin: 10px 0;
            max-height: 400px;
            overflow-y: auto;
          }
          
          .keypoint-display.error {
            background-color: #ffebee;
            color: #c62828;
            padding: 10px;
            margin: 10px 0;
            border-radius: 4px;
          }
    
          .hand-data {
            margin-bottom: 15px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
    
          .keypoint {
            margin: 2px 0;
            display: flex;
            justify-content: space-between;
          }
    
          .coordinate {
            display: inline-block;
            width: 60px;
            text-align: right;
          }
    
          @media (prefers-color-scheme: dark) {
            .keypoint-display {
              background-color: #333;
              color: #fff;
            }
            
            .keypoint-display.error {
              background-color: #421c1c;
              color: #ff8a8a;
            }
          }
        `;
        document.head.appendChild(style);
        this.styleElement = style;
    
        // Create status element
        this.statusElement = document.createElement('div');
        this.statusElement.textContent = 'Waiting for predictions...';
        this.display.appendChild(this.statusElement);
    
        this.config.containerElement.appendChild(this.display);
      }
    
      attachEventListeners() {
        this.config.predictor.addEventListener('prediction', this.handlePrediction.bind(this));
        this.config.predictor.addEventListener('error', this.handleError.bind(this));
      }
    
      handlePrediction(event) {
        const currentTime = performance.now();
        if (currentTime - this.lastUpdateTime < this.config.updateFrequency) {
          return; // Skip update if too soon
        }
        this.lastUpdateTime = currentTime;
    
        const { results } = event.detail;
        
        // Clear previous content
        this.statusElement.textContent = '';
        this.display.className = 'keypoint-display';
    
        if (!results.landmarks || results.landmarks.length === 0) {
          this.statusElement.textContent = 'No hands detected';
          return;
        }
    
        // Display results based on format
        if (this.config.displayFormat === 'detailed') {
          this.displayDetailedFormat(results);
        } else {
          this.displaySimpleFormat(results);
        }
      }
    
      displaySimpleFormat(results) {
        results.landmarks.forEach((hand, handIndex) => {
          const handDiv = document.createElement('div');
          handDiv.className = 'hand-data';
          handDiv.innerHTML = `<strong>Hand ${handIndex + 1}:</strong>`;
    
          // Display key landmarks (e.g., fingertips)
          const fingertipIndices = [4, 8, 12, 16, 20]; // Thumb to pinky fingertips
          const fingerNames = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
          
          fingertipIndices.forEach((index, fingerIndex) => {
            const point = hand[index];
            const div = document.createElement('div');
            div.className = 'keypoint';
            div.innerHTML = `
              ${fingerNames[fingerIndex]}: 
              <span>
                <span class="coordinate">x: ${point.x.toFixed(3)}</span>
                <span class="coordinate">y: ${point.y.toFixed(3)}</span>
                <span class="coordinate">z: ${point.z.toFixed(3)}</span>
              </span>
            `;
            handDiv.appendChild(div);
          });
    
          this.statusElement.appendChild(handDiv);
        });
      }
    
      displayDetailedFormat(results) {
        results.landmarks.forEach((hand, handIndex) => {
          const handDiv = document.createElement('div');
          handDiv.className = 'hand-data';
          handDiv.innerHTML = `<strong>Hand ${handIndex + 1} (${hand.length} points):</strong>`;
    
          hand.forEach((point, index) => {
            const div = document.createElement('div');
            div.className = 'keypoint';
            div.innerHTML = `
              Point ${index}: 
              <span>
                <span class="coordinate">x: ${point.x.toFixed(3)}</span>
                <span class="coordinate">y: ${point.y.toFixed(3)}</span>
                <span class="coordinate">z: ${point.z.toFixed(3)}</span>
              </span>
            `;
            handDiv.appendChild(div);
          });
    
          this.statusElement.appendChild(handDiv);
        });
      }
    
      handleError(event) {
        this.display.className = 'keypoint-display error';
        this.statusElement.textContent = `Error: ${event.detail.message || event.detail}`;
      }
    
      destroy() {
        this.styleElement.remove();
        this.display.remove();
      }
    
      setUpdateFrequency(ms) {
        this.config.updateFrequency = ms;
      }
    
      setDisplayFormat(format) {
        if (['simple', 'detailed'].includes(format)) {
          this.config.displayFormat = format;
        } else {
          console.warn('Invalid display format. Use "simple" or "detailed".');
        }
      }
    }
  
  export { KeypointDisplay };