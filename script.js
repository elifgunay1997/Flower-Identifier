class FlowerIdentifier {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.flowerDatabase = this.createFlowerDatabase();
    }

    initializeElements() {
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.cameraBtn = document.getElementById('cameraBtn');
        this.cameraPreview = document.getElementById('cameraPreview');
        this.video = document.getElementById('video');
        this.captureBtn = document.getElementById('captureBtn');
        this.closeCameraBtn = document.getElementById('closeCameraBtn');
        this.resultSection = document.getElementById('resultSection');
        this.loadingSection = document.getElementById('loadingSection');
        this.newSearchBtn = document.getElementById('newSearchBtn');

        // Result elements
        this.resultImage = document.getElementById('resultImage');
        this.flowerName = document.getElementById('flowerName');
        this.scientificName = document.getElementById('scientificName');
        this.family = document.getElementById('family');
        this.lightRequirements = document.getElementById('lightRequirements');
        this.waterNeeds = document.getElementById('waterNeeds');
        this.climate = document.getElementById('climate');
        this.description = document.getElementById('description');
        this.careTips = document.getElementById('careTips');
    }

    bindEvents() {
        this.uploadArea.addEventListener('click', () => this.fileInput.click());
        this.uploadArea.addEventListener('dragover', this.handleDragOver.bind(this));
        this.uploadArea.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.uploadArea.addEventListener('drop', this.handleDrop.bind(this));
        this.fileInput.addEventListener('change', this.handleFileSelect.bind(this));
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.cameraBtn.addEventListener('click', this.startCamera.bind(this));
        this.captureBtn.addEventListener('click', this.capturePhoto.bind(this));
        this.closeCameraBtn.addEventListener('click', this.stopCamera.bind(this));
        this.newSearchBtn.addEventListener('click', this.resetApp.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processImage(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processImage(file);
        }
    }

    async startCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            this.video.srcObject = stream;
            this.cameraPreview.style.display = 'inline-block';
            this.cameraBtn.style.display = 'none';
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please upload an image instead.');
        }
    }

    stopCamera() {
        const stream = this.video.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        this.cameraPreview.style.display = 'none';
        this.cameraBtn.style.display = 'inline-flex';
    }

    capturePhoto() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        context.drawImage(this.video, 0, 0);

        canvas.toBlob((blob) => {
            const file = new File([blob], 'captured-photo.jpg', { type: 'image/jpeg' });
            this.processImage(file);
            this.stopCamera();
        }, 'image/jpeg');
    }

    processImage(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file.');
            return;
        }

        this.showLoading();

        // Simulate image processing delay
        setTimeout(() => {
            this.identifyFlower(file);
        }, 2000);
    }

    async identifyFlower(file) {
        try {
            // Create a preview of the image
            const reader = new FileReader();
            reader.onload = (e) => {
                this.resultImage.src = e.target.result;
            };
            reader.readAsDataURL(file);

            // Simulate flower identification (in a real app, this would call an AI service)
            const flowerInfo = this.simulateFlowerIdentification();

            this.displayResults(flowerInfo);
            this.hideLoading();
            this.showResults();
        } catch (error) {
            console.error('Error processing image:', error);
            this.hideLoading();
            alert('Error processing image. Please try again.');
        }
    }

    simulateFlowerIdentification() {
        // Simulate different flower results
        const flowers = [
            {
                name: "Rose",
                scientificName: "Rosa",
                family: "Rosaceae",
                lightRequirements: "Full sun to partial shade",
                waterNeeds: "Moderate, well-draining soil",
                climate: "Temperate",
                description: "Roses are one of the most popular and beautiful flowering plants, known for their stunning blooms and delightful fragrance. They come in a wide variety of colors and are perfect for gardens, bouquets, and special occasions.",
                careTips: [
                    "Plant in well-draining soil with good organic matter",
                    "Water deeply but infrequently to encourage deep root growth",
                    "Prune in early spring to remove dead wood and shape the plant",
                    "Fertilize regularly during the growing season",
                    "Protect from extreme cold in winter"
                ]
            },
            {
                name: "Sunflower",
                scientificName: "Helianthus annuus",
                family: "Asteraceae",
                lightRequirements: "Full sun",
                waterNeeds: "Moderate, drought-tolerant once established",
                climate: "Warm, temperate",
                description: "Sunflowers are iconic annual plants known for their large, bright yellow flower heads that follow the sun throughout the day. They can grow to impressive heights and are excellent for attracting pollinators.",
                careTips: [
                    "Plant in full sun for best growth and flowering",
                    "Provide support for tall varieties to prevent toppling",
                    "Water regularly until established, then reduce frequency",
                    "Deadhead spent flowers to encourage more blooms",
                    "Harvest seeds when flower heads turn brown"
                ]
            },
            {
                name: "Tulip",
                scientificName: "Tulipa",
                family: "Liliaceae",
                lightRequirements: "Full sun to partial shade",
                waterNeeds: "Moderate, well-draining soil",
                climate: "Cool, temperate",
                description: "Tulips are spring-blooming bulbs that produce elegant, cup-shaped flowers in a rainbow of colors. They're perfect for spring gardens and make excellent cut flowers.",
                careTips: [
                    "Plant bulbs in fall for spring blooms",
                    "Ensure well-draining soil to prevent bulb rot",
                    "Plant at a depth of 2-3 times the bulb height",
                    "Remove spent flowers but leave foliage until it yellows",
                    "Fertilize in fall when planting and in spring when shoots appear"
                ]
            },
            {
                name: "Lavender",
                scientificName: "Lavandula",
                family: "Lamiaceae",
                lightRequirements: "Full sun",
                waterNeeds: "Low, drought-tolerant",
                climate: "Mediterranean, warm",
                description: "Lavender is a fragrant perennial herb known for its beautiful purple flowers and aromatic foliage. It's drought-tolerant and perfect for herb gardens, borders, and containers.",
                careTips: [
                    "Plant in full sun and well-draining soil",
                    "Water sparingly - lavender prefers dry conditions",
                    "Prune after flowering to maintain shape",
                    "Avoid overwatering which can cause root rot",
                    "Harvest flowers when they're just beginning to open"
                ]
            },
            {
                name: "Daisy",
                scientificName: "Bellis perennis",
                family: "Asteraceae",
                lightRequirements: "Full sun to partial shade",
                waterNeeds: "Moderate, evenly moist soil",
                climate: "Temperate",
                description: "Daisies are cheerful perennial flowers with white petals and yellow centers. They're easy to grow, attract pollinators, and make excellent ground cover or border plants.",
                careTips: [
                    "Plant in well-draining soil with good organic matter",
                    "Water regularly to keep soil evenly moist",
                    "Deadhead spent flowers to encourage more blooms",
                    "Divide clumps every 2-3 years to maintain vigor",
                    "Fertilize lightly in spring with balanced fertilizer"
                ]
            }
        ];

        // Randomly select a flower for demonstration
        return flowers[Math.floor(Math.random() * flowers.length)];
    }

    displayResults(flowerInfo) {
        this.flowerName.textContent = flowerInfo.name;
        this.scientificName.textContent = flowerInfo.scientificName;
        this.family.textContent = flowerInfo.family;
        this.lightRequirements.textContent = flowerInfo.lightRequirements;
        this.waterNeeds.textContent = flowerInfo.waterNeeds;
        this.climate.textContent = flowerInfo.climate;
        this.description.textContent = flowerInfo.description;

        // Update care tips
        this.careTips.innerHTML = flowerInfo.careTips.map(tip => `<li>${tip}</li>`).join('');
    }

    showLoading() {
        this.loadingSection.style.display = 'block';
        this.resultSection.style.display = 'none';
    }

    hideLoading() {
        this.loadingSection.style.display = 'none';
    }

    showResults() {
        this.resultSection.style.display = 'block';
    }

    resetApp() {
        this.resultSection.style.display = 'none';
        this.loadingSection.style.display = 'none';
        this.fileInput.value = '';
        this.flowerName.textContent = 'Loading...';
        this.scientificName.textContent = '';
        this.family.textContent = '-';
        this.lightRequirements.textContent = '-';
        this.waterNeeds.textContent = '-';
        this.climate.textContent = '-';
        this.description.textContent = '-';
        this.careTips.innerHTML = '<li>-</li>';
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new FlowerIdentifier();
});