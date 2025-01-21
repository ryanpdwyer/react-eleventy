import ml5 from 'https://unpkg.com/ml5@latest/dist/ml5.min.js';
import {Chart} from 'https://unpkg.com/browse/chart.js@4.4.6/dist/chart.js';



// Base class for ML models
class MLModel {
    constructor(config) {
      if (new.target === MLModel) {
        throw new Error('MLModel is an abstract class');
      }
      this.config = config;
      this.model = null;
    }
  
    async train(data, options) { throw new Error('Not implemented'); }
    async predict(input) { throw new Error('Not implemented'); }
    async save(path) { throw new Error('Not implemented'); }
    async load(path) { throw new Error('Not implemented'); }
  }
  
  // ML5.js Neural Network implementation
  class ML5NeuralNetwork extends MLModel {
    constructor(config) {
      super(config);
      this.model = ml5.neuralNetwork({
        inputs: config.inputSize,
        outputs: config.outputSize,
        task: 'classification',
        debug: true
      });
    }
  
    async train(data, options) {
      // Format data for ML5
      const trainingData = this.formatData(data);
      
      // Add data to the model
      trainingData.forEach(sample => {
        this.model.addData(sample.input, sample.output);
      });
  
      // Normalize the data
      this.model.normalizeData();
  
      // Train the model
      const trainingOptions = {
        epochs: options.epochs || 50,
        batchSize: options.batchSize || 32,
        learningRate: options.learningRate || 0.2
      };
  
      return new Promise((resolve, reject) => {
        this.model.train(trainingOptions, 
          (epoch, loss) => {
            if (options.onEpoch) options.onEpoch(epoch, loss);
          },
          () => resolve(),
          (err) => reject(err)
        );
      });
    }
  
    formatData(gestureData) {
      const formattedData = [];
      Object.entries(gestureData).forEach(([label, data]) => {
        data.samples.forEach(sample => {
          // Flatten landmarks array into a single input array
          const input = sample.landmarks.flatMap(l => [l.x, l.y, l.z]);
          // One-hot encode the output label
          const output = { [label]: 1 };
          formattedData.push({ input, output });
        });
      });
      return formattedData;
    }
  
    async predict(input) {
      return new Promise((resolve, reject) => {
        this.model.classify(input, (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
    }
  }
  
  // Training interface that manages UI and training process
  class MLTrainingInterface {
    constructor(config) {
      this.validateConfig(config);
      this.container = config.containerElement;
      this.predictor = config.predictor;
      this.model = null;
      this.chart = null;
      this.lossData = [];
      
      this.createInterface();
      this.attachEventListeners();
    }
  
    validateConfig(config) {
      if (!config.containerElement || !(config.containerElement instanceof HTMLElement)) {
        throw new Error('containerElement is required and must be an HTML element');
      }
      if (!config.predictor) {
        throw new Error('predictor instance is required');
      }
    }
  
    createInterface() {
      this.container.innerHTML = `
        <div class="ml-training-container">
          <h3>Model Training</h3>
          <div class="data-section">
            <input type="file" accept=".json" id="dataUpload">
            <span class="data-status">No data loaded</span>
          </div>
          
          <div class="parameters-section">
            <h4>Training Parameters</h4>
            <div class="parameter">
              <label>Learning Rate:</label>
              <input type="number" class="learning-rate" value="0.2" step="0.01" min="0.01" max="1">
            </div>
            <div class="parameter">
              <label>Epochs:</label>
              <input type="number" class="epochs" value="50" step="1" min="1">
            </div>
            <div class="parameter">
              <label>Batch Size:</label>
              <input type="number" class="batch-size" value="32" step="1" min="1">
            </div>
          </div>
  
          <div class="training-controls">
            <button class="train-button">Train Model</button>
            <button class="test-button" disabled>Test Model</button>
            <button class="save-button" disabled>Save Model</button>
          </div>
  
          <div class="training-progress" style="display: none">
            <div class="progress-info">
              <span class="epoch-display">Epoch: 0/0</span>
              <span class="loss-display">Loss: --</span>
            </div>
            <canvas class="loss-chart"></canvas>
          </div>
        </div>
      `;
  
      // Store element references
      this.dataStatus = this.container.querySelector('.data-status');
      this.trainButton = this.container.querySelector('.train-button');
      this.testButton = this.container.querySelector('.test-button');
      this.saveButton = this.container.querySelector('.save-button');
      this.progressSection = this.container.querySelector('.training-progress');
      this.epochDisplay = this.container.querySelector('.epoch-display');
      this.lossDisplay = this.container.querySelector('.loss-display');
      this.lossChart = this.container.querySelector('.loss-chart');
    }
  
    attachEventListeners() {
      const dataUpload = this.container.querySelector('#dataUpload');
      dataUpload.addEventListener('change', (e) => this.handleDataUpload(e));
      
      this.trainButton.addEventListener('click', () => this.startTraining());
      this.testButton.addEventListener('click', () => this.testModel());
      this.saveButton.addEventListener('click', () => this.saveModel());
    }
  
    async handleDataUpload(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          const text = await file.text();
          this.gestureData = JSON.parse(text);
          this.dataStatus.textContent = `Data loaded: ${Object.keys(this.gestureData).length} classes`;
          this.trainButton.disabled = false;
        } catch (error) {
          console.error('Error loading data:', error);
          this.dataStatus.textContent = 'Error loading data';
        }
      }
    }
  
    async startTraining() {
      const learningRate = parseFloat(this.container.querySelector('.learning-rate').value);
      const epochs = parseInt(this.container.querySelector('.epochs').value);
      const batchSize = parseInt(this.container.querySelector('.batch-size').value);
  
      this.progressSection.style.display = 'block';
      this.lossData = [];
      this.initChart();
  
      // Create and configure model
      this.model = new ML5NeuralNetwork({
        inputSize: 21 * 3, // 21 landmarks with x,y,z coordinates
        outputSize: Object.keys(this.gestureData).length
      });
  
      try {
        await this.model.train(this.gestureData, {
          epochs,
          batchSize,
          learningRate,
          onEpoch: (epoch, loss) => this.updateProgress(epoch, loss)
        });
  
        this.testButton.disabled = false;
        this.saveButton.disabled = false;
      } catch (error) {
        console.error('Training error:', error);
        this.dataStatus.textContent = 'Training failed';
      }
    }
  
    initChart() {
      // Initialize Chart.js loss chart
      this.chart = new Chart(this.lossChart.getContext('2d'), {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Log Loss',
            data: [],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  
    updateProgress(epoch, loss) {
      this.epochDisplay.textContent = `Epoch: ${epoch}`;
      this.lossDisplay.textContent = `Loss: ${loss.toFixed(4)}`;
      
      // Update chart
      this.lossData.push(Math.log(loss));
      this.chart.data.labels.push(epoch);
      this.chart.data.datasets[0].data = this.lossData;
      this.chart.update();
    }
  
    async testModel() {
      // Implementation will connect with the predictor
      // and test the model on live input
    }
  
    async saveModel() {
      if (this.model) {
        await this.model.save('model');
      }
    }
  }

  export { MLModel, ML5NeuralNetwork, MLTrainingInterface };