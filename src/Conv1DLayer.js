class Conv1D
{
    constructor()
    {
        this.act = act
        this.weights = [.1,.2,-.3];
        this.bias = 0;
        this.padding = 1;
        this.name ="Conv1D";
    }

    forwardPass(input)
    {
        this.input = input;
        return Conv1DInputForward(input, this.weights, this.bias, this.padding)
    }

    backPropagation()
    {
        var revWeights =  ReverseKernel1D(this.weights);
        return Conv1DInputForward(this.layerDerivative, revWeights, 0, this.padding);
    }

    computeGradients(layerDerivative)
    {
        var deltas = []
        for(var i=0;i<this.weights.length+1;i++)
        {
            deltas[i]=[]
        }

        var input = Add1DPaddingMat(this.input) 

        for(var y=0;y<input.length-this.weights.length+ this.padding;y++)
        {
            for(var j=0;j<this.weights.length;j++)
            {
                deltas[j][y] = input[y+j][0];
            }
            deltas[this.weights.length].push(1);
        }
        
        this.deltas = MulMat(deltas,this.layerDerivative);
    }

    train(LearningRate)
    {
        var weights = this.weights.slice(0);
        weights.push(this.bias);
        weights = [weights];
        var deltas = SubMat( weights, TransposeMat((MulKMat(LearningRate,this.deltas))));
        
        this.weights = deltas[0].slice(0,3);
        this.bias = deltas[0][3];
    }
}
