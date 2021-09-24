window.onload = () => {
    const canvas = document.getElementById('canvas');
    const canvas2 = document.getElementById('canvas2');

    const saveButton = document.getElementById('save');
    const loadInput = document.getElementById('load');
    const saveButton2 = document.getElementById('save2');
    const clear = document.getElementById('clear');

	var currentSize = 20;



	new Drawing(canvas,canvas2,saveButton, loadInput,saveButton2,clear);
  };
  
  class Drawing {
	constructor(canvas,canvas2, saveButton, loadInput,saveButton2,clear) {
	  this.isDrawing = false;
  
	  canvas.addEventListener('mousedown', () => this.startDrawing());
	  canvas.addEventListener('mousemove', (event) => this.draw(event));
	  canvas.addEventListener('mouseup', () => this.stopDrawing());
  
	  saveButton.addEventListener('click', () => this.save());
	  loadInput.addEventListener('change', (event) => this.load(event));
	  saveButton2.addEventListener('click', () => this.saveM(canvas2));
	  clear.addEventListener("click", function() {
        const context = canvas.getContext('2d');
        const destCtx = canvas2.getContext('2d');
		

        context.clearRect(0, 0, canvas.width, canvas.height);
        destCtx.clearRect(0, 0, canvas2.width, canvas2.height);

       context.beginPath();
       destCtx.beginPath();

       destCtx.fillStyle = '#000000'	
       destCtx.fillRect(0, 0, canvas2.width, canvas2.height);
      });

  
	  const rect = canvas.getBoundingClientRect();
  
	  this.offsetLeft = rect.left;
	  this.offsetTop = rect.top;
  
	  this.canvas = canvas;
	  this.context = this.canvas.getContext('2d');
	  this.canvas2 = canvas2;

      this.destCtx = this.canvas2.getContext('2d');
	  

	  this.destCtx.fillStyle = "black";
      this.destCtx.fillRect(0, 0, canvas2.width, canvas2.height);
	  


 
	}
	startDrawing() {
	  this.isDrawing = true;
	}
	stopDrawing() {
	  this.isDrawing = false;
	
	  this.context.beginPath();
	  this.destCtx.beginPath();


	}
	draw(event) {
	  if (this.isDrawing) {
	
        this.context.lineWidth  = 5;
        this.destCtx.lineWidth  = 5;

        this.context.strokeStyle = 'rgb(0,0,0)';
        this.destCtx.strokeStyle = 'white';


		    this.context.lineCap = "round";
        this.destCtx.lineCap = "round";

		    this.context.lineTo(event.clientX,event.clientY);
        this.destCtx.lineTo(event.clientX,event.clientY);

	    	this.context.stroke();
        this.destCtx.stroke();

        this.context.beginPath();
        this.destCtx.beginPath();

        this.context.moveTo(event.clientX,event.clientY);
       this.destCtx.moveTo(event.clientX,event.clientY);
        

	  }
	}
	save() {
	  const data = this.canvas.toDataURL('image/png');
	  const a = document.createElement('a');
	  a.href = data;
	  a.download = 'image.png';
	  a.click();
	}
	saveM(canvas2) {
        const data = this.canvas2.toDataURL('image/png');

        const a = document.createElement('a');
        a.href = data;
        a.download = 'mask.png';
        a.click();
      }
	load(event) {
	  const file = [...event.target.files].pop();
	  this.readTheFile(file)
		.then((image) => this.loadTheImage(image))
	}
	loadTheImage(image) {
	  const img = new Image();
	  const canvas = this.canvas;
	  img.onload = function () {
		const context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0,canvas.width, canvas.height);
	  };
	  img.src = image;
	}
	readTheFile(file) {
	  const reader = new FileReader();
	  return new Promise((resolve) => {
		reader.onload = (event) => {
		  resolve(event.target.result);
		};
		reader.readAsDataURL(file);
	  })
	}
  }