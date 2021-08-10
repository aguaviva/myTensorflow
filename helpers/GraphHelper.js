
class Graph
{    
    constructor(name, xm, ym, xM, yM)
    {
        this.cvs= document.getElementById(name);
        this.ctx = this.cvs.getContext('2d');
		this.scaleCanvas(this.cvs.width, this.cvs.clientHeight) 
		this.setLimits(xm, ym, xM, yM)
        this.Clear();		
        this.DrawAxis();
    }

   scaleCanvas(width, height) 
   {
        // assume the device pixel ratio is 1 if the browser doesn't specify it
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // determine the 'backing store ratio' of the canvas context
        const backingStoreRatio = (
        this.ctx.webkitBackingStorePixelRatio ||
        this.ctx.mozBackingStorePixelRatio ||
        this.ctx.msBackingStorePixelRatio ||
        this.ctx.oBackingStorePixelRatio ||
        this.ctx.backingStorePixelRatio || 1
        );
        
        // determine the actual ratio we want to draw at
        this.ratio = devicePixelRatio / backingStoreRatio;
		this.invRatio = 1.0 / this.ratio;
        
        if (devicePixelRatio !== backingStoreRatio) 
        {
          // set the 'real' canvas size to the higher width/height
          this.cvs.width = width * this.ratio;
          this.cvs.height = height * this.ratio;
          
          // ...then scale it back down with CSS
          this.cvs.style.width = width + 'px';
          this.cvs.style.height = height + 'px';
        }
        else 
        {
          // this is a normal 1:1 device; just scale it simply
          this.cvs.width = width;
          this.cvs.height = height;
          this.cvs.style.width = '';
          cvs.style.height = '';
        }
        
        // scale the drawing context so everything will work at the higher ratio
        this.ctx.scale(this.ratio, this.ratio);
    }    

    Clear()
    {
        this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height);
    }
    
	setLimits(xm, ym, xM, yM) { this.xm = xm; this.ym = ym; this.xM = xM; this.yM = yM;}
	ToX(x) { var t = (x-this.xm)/(this.xM-this.xm); return (t*this.cvs.width)*this.invRatio + (1-t)*0; }
	ToY(y) { var t = (y-this.ym)/(this.yM-this.ym); return (t*this.cvs.height)*this.invRatio + (1-t)*0; }
    
    DrawAxis()
    {
        this.ctx.beginPath();
        this.ctx.strokeStyle="#000000";    
        this.ctx.moveTo(0,this.ToY(0)); 
        this.ctx.lineTo(this.cvs.width,this.ToY(0));
        this.ctx.moveTo(this.ToX(0),0); 
        this.ctx.lineTo(this.ToX(0),this.cvs.height);
        this.ctx.closePath();
        this.ctx.stroke(); 		
		this.ctx.font = (20*this.invRatio).toFixed(0) + 'px sans-serif';
    }
	
	DrawXMin()
	{
		this.ctx.textAlign = "start";		
		this.ctx.textBaseline = "top";
		this.ctx.fillText(this.xm+"", this.ToX(this.xm), this.ToY(0));
	}
	
	DrawXMax()
	{
		this.ctx.textAlign = "end";
		this.ctx.textBaseline = "top"
		this.ctx.fillText(this.xM+"", this.ToX(this.xM), this.ToY(0));
	}
	
	DrawYMin()
	{
		this.ctx.textAlign = "end";
		this.ctx.textBaseline = "top"
		this.ctx.fillText(this.ym+"", this.ToX(0), this.ToY(this.ym));
	}
	
	DrawYMax()
	{
		this.ctx.textAlign = "end";
		this.ctx.textBaseline = "bottom"
		this.ctx.fillText(this.yM+"", this.ToX(0), this.ToY(this.yM));	
	}
    
    AddSegment(x1,y1,x2,y2, color)
    {
		this.ctx.beginPath();
		this.ctx.strokeStyle=color;    
		this.ctx.moveTo(this.ToX(x1),this.ToY(y1)); 
		this.ctx.lineTo(this.ToX(x2),this.ToY(y2));       
		this.ctx.closePath();
		this.ctx.stroke();       
    }    
	
	drawPoint(x,y)
	{
		this.ctx.fillRect(this.ToX(x),this.ToY(y),1,1);
	}

	drawFunction(x,y, func, len)
	{
		this.ctx.beginPath();
		this.ctx.strokeStyle="#ff0000";    
		this.ctx.moveTo(this.ToX(0),this.ToY(func(0))); 
		for(var i=0;i<len;i++)
		{
			var v = func(i)
			this.ctx.lineTo(this.ToX(v[0]),this.ToY(v[1])); 
		}
		this.ctx.stroke();    	
	}
}
