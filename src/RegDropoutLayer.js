class RegDropoutLayer
{
    constructor(dropoutRate)
    {
        this.dropoutRate = dropoutRate;
        this.name ="Reg Dropout";
    }

    forwardPass(input)
    {               
        var fmout = TensorZero(input.length, input[0].length, input[0][0].length, input[0][0][0].length);        
        
        for(var l=0;l<input.length;l++)
        {        
            for(var k=0;k<input[0].length;k++)
            {        
                for(var y=0;y<input[0][0].length;y++)
                {
                    for(var x=0;x<input[0][0][0].length;x++)
                    {
                        fmout[l][k][y][x] = (Math.random() < this.dropoutRate) ? 0 : input[l][k][y][x];
                    }
                }        
            }
        }        
        return fmout;
    }

    backPropagation(layerDerivative)    
    {                      
        return layerDerivative;                
    }
}
